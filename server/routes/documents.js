const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const { check, validationResult } = require('express-validator');
const Document = require('../models/Document');
const Case = require('../models/Case');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + uuidv4();
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

// Configure upload with file size and type limits
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const allowedFileTypes = [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];
    
    if (!allowedFileTypes.includes(file.mimetype)) {
      return cb(new Error('Only specific file types are allowed'), false);
    }
    cb(null, true);
  }
});

/**
 * @route   GET api/documents
 * @desc    Get all documents for current user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    let documents;
    
    // Admin or investigator can see all documents
    if (user.role === 'admin' || user.role === 'investigator') {
      documents = await Document.find()
        .sort({ uploadDate: -1 });
    } else {
      // Clients can only see their own documents
      // First get the cases that belong to this client
      const userCases = await Case.find({ clientId: req.user.id }).select('_id');
      const caseIds = userCases.map(c => c._id);
      
      // Then get documents linked to these cases
      documents = await Document.find({ caseId: { $in: caseIds } })
        .sort({ uploadDate: -1 });
    }
    
    res.json({ documents });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/documents/case/:caseId
 * @desc    Get all documents for a specific case
 * @access  Private
 */
router.get('/case/:caseId', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const caseId = req.params.caseId;

    // First check access to this case
    const caseItem = await Case.findById(caseId);

    if (!caseItem) {
      return res.status(404).json({ msg: 'Case not found' });
    }

    if (
      user.role !== 'admin' && 
      user.role !== 'investigator' && 
      caseItem.clientId.toString() !== req.user.id
    ) {
      return res.status(403).json({ msg: 'Not authorized to access documents for this case' });
    }

    // Get documents for case
    const documents = await Document.find({ caseId })
      .sort({ uploadDate: -1 });

    res.json({ documents });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/documents/:id
 * @desc    Get a document by ID
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    const user = await User.findById(req.user.id);
    const caseItem = await Case.findById(document.caseId);
    
    // Check access rights
    if (
      user.role !== 'admin' && 
      user.role !== 'investigator' && 
      (caseItem && caseItem.clientId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ msg: 'Not authorized to access this document' });
    }

    res.json(document);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Document not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/documents/upload
 * @desc    Upload a new document
 * @access  Private
 */
router.post('/upload', auth, upload.single('file'), [
  check('caseId', 'Case ID is required').not().isEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    const { caseId, description, expiryDays, tags } = req.body;
    
    // Verify case exists and user has access
    const caseItem = await Case.findById(caseId);

    if (!caseItem) {
      // Remove uploaded file to prevent orphaned files
      fs.unlinkSync(req.file.path);
      return res.status(404).json({ msg: 'Case not found' });
    }

    const user = await User.findById(req.user.id);
    
    // Access check: admin, investigator, or client that owns the case
    if (
      user.role !== 'admin' && 
      user.role !== 'investigator' && 
      caseItem.clientId.toString() !== req.user.id
    ) {
      // Remove uploaded file
      fs.unlinkSync(req.file.path);
      return res.status(403).json({ msg: 'Not authorized to upload documents to this case' });
    }

    // Create new document
    const newDocument = new Document({
      caseId,
      fileName: req.file.originalname,
      filePath: req.file.path,
      fileSize: req.file.size,
      mimeType: req.file.mimetype,
      uploadedBy: req.user.id,
      description: description || '',
      expiryDays: expiryDays || 30,
      tags: tags ? tags.split(',').map(tag => tag.trim()) : []
    });

    const document = await newDocument.save();

    res.json(document);
  } catch (err) {
    console.error(err.message);
    
    // Remove uploaded file if any error occurs after upload
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkErr) {
        console.error('Error removing file:', unlinkErr);
      }
    }
    
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE api/documents/:id
 * @desc    Delete a document
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Check if user has permission to delete
    const user = await User.findById(req.user.id);
    const caseItem = await Case.findById(document.caseId);
    
    if (
      user.role !== 'admin' && 
      user.role !== 'investigator' && 
      document.uploadedBy.toString() !== req.user.id &&
      (caseItem && caseItem.clientId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ msg: 'Not authorized to delete this document' });
    }

    // Delete file from storage
    try {
      if (fs.existsSync(document.filePath)) {
        fs.unlinkSync(document.filePath);
      }
    } catch (err) {
      console.error('Error deleting file from storage:', err);
    }

    // Remove from database
    await document.remove();

    res.json({ msg: 'Document deleted' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Document not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   PATCH api/documents/:id/metadata
 * @desc    Update document metadata (description, tags, etc)
 * @access  Private
 */
router.patch('/:id/metadata', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Check if user has permission to update
    const user = await User.findById(req.user.id);
    const caseItem = await Case.findById(document.caseId);
    
    if (
      user.role !== 'admin' && 
      user.role !== 'investigator' && 
      document.uploadedBy.toString() !== req.user.id &&
      (caseItem && caseItem.clientId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ msg: 'Not authorized to update this document' });
    }

    // Update fields
    const { description, tags, expiryDays } = req.body;

    if (description !== undefined) {
      document.description = description;
    }
    
    if (tags !== undefined) {
      document.tags = typeof tags === 'string' 
        ? tags.split(',').map(tag => tag.trim())
        : tags;
    }
    
    if (expiryDays !== undefined) {
      document.expiryDays = expiryDays;
    }

    // Save changes
    await document.save();

    res.json(document);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Document not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/documents/:id/download
 * @desc    Download a document
 * @access  Private
 */
router.get('/:id/download', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }

    // Check if user has permission to download
    const user = await User.findById(req.user.id);
    const caseItem = await Case.findById(document.caseId);
    
    if (
      user.role !== 'admin' && 
      user.role !== 'investigator' && 
      document.uploadedBy.toString() !== req.user.id &&
      (caseItem && caseItem.clientId.toString() !== req.user.id)
    ) {
      return res.status(403).json({ msg: 'Not authorized to download this document' });
    }

    // Check if file exists
    if (!fs.existsSync(document.filePath)) {
      return res.status(404).json({ msg: 'File not found on server' });
    }

    // Log the download activity
    document.downloadCount += 1;
    document.lastDownloaded = Date.now();
    await document.save();

    // Set appropriate headers
    res.setHeader('Content-Type', document.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${encodeURIComponent(document.fileName)}"`);
    
    // Stream the file
    const fileStream = fs.createReadStream(document.filePath);
    fileStream.pipe(res);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Document not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/documents/admin/all
 * @desc    Get all documents (admin only)
 * @access  Admin
 */
router.get('/admin/all', [auth, admin], async (req, res) => {
  try {
    const { page = 1, limit = 10, caseId = null, search = '' } = req.query;
    const skip = (page - 1) * limit;
    
    // Build query
    const query = {};
    
    if (caseId) {
      query.caseId = caseId;
    }
    
    if (search) {
      query.$or = [
        { fileName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $regex: search, $options: 'i' } }
      ];
    }
    
    const documents = await Document.find(query)
      .sort({ uploadDate: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('uploadedBy', 'name email');
      
    const totalDocuments = await Document.countDocuments(query);
    
    res.json({
      documents,
      totalDocuments,
      totalPages: Math.ceil(totalDocuments / limit),
      currentPage: parseInt(page)
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;