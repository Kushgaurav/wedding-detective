const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const auth = require('../middleware/auth');
const Document = require('../models/Document');

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, '../uploads');
    
    // Create upload directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    // Generate unique filename with original extension
    const uniqueFilename = `${uuidv4()}${path.extname(file.originalname)}`;
    cb(null, uniqueFilename);
  }
});

// Configure upload limits and file filters
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB limit
  },
  fileFilter: function (req, file, cb) {
    const allowedTypes = [
      'image/jpeg', 'image/png', 'image/gif',
      'application/pdf',
      'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'text/plain'
    ];
    
    if (!allowedTypes.includes(file.mimetype)) {
      const error = new Error('Invalid file type. Only images, PDFs, documents, spreadsheets, and text files are allowed.');
      error.code = 'INVALID_FILE_TYPE';
      return cb(error, false);
    }
    
    cb(null, true);
  }
});

// @route   POST api/documents
// @desc    Upload a new document
// @access  Private
router.post('/', auth, upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }
    
    const { caseId, description = '', tags = '', expiryDays = '30' } = req.body;
    
    if (!caseId) {
      return res.status(400).json({ msg: 'Case ID is required' });
    }
    
    // Calculate expiry date
    const expiryDate = new Date();
    expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays));
    
    // Process tags (convert comma-separated string to array)
    const tagArray = tags
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag !== '');
    
    // Create document record
    const newDocument = new Document({
      user: req.user.id,
      caseId,
      filename: req.file.filename,
      originalFilename: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      description,
      tags: tagArray,
      expiryDate
    });
    
    // Save document to database
    await newDocument.save();
    
    // Add access log for upload
    newDocument.accessLogs.push({
      user: req.user.id,
      action: 'upload',
      ipAddress: req.ip
    });
    
    await newDocument.save();
    
    return res.status(201).json(newDocument);
  } catch (err) {
    console.error('Document upload error:', err);
    
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ msg: 'File size exceeds the limit (5MB)' });
    }
    
    if (err.code === 'INVALID_FILE_TYPE') {
      return res.status(400).json({ msg: err.message });
    }
    
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/documents
// @desc    Get all documents for the authenticated user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const documents = await Document.find({ user: req.user.id })
      .sort({ uploadDate: -1 });
    
    return res.json(documents);
  } catch (err) {
    console.error('Get documents error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/documents/case/:caseId
// @desc    Get all documents for a specific case
// @access  Private
router.get('/case/:caseId', auth, async (req, res) => {
  try {
    const documents = await Document.find({ 
      user: req.user.id,
      caseId: req.params.caseId
    }).sort({ uploadDate: -1 });
    
    return res.json(documents);
  } catch (err) {
    console.error('Get case documents error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/documents/:id
// @desc    Get document by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }
    
    // Check if the document belongs to the user
    if (document.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    // Add access log
    document.accessLogs.push({
      user: req.user.id,
      action: 'view',
      ipAddress: req.ip
    });
    
    await document.save();
    
    return res.json(document);
  } catch (err) {
    console.error('Get document error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   GET api/documents/download/:id
// @desc    Download a document
// @access  Private
router.get('/download/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }
    
    // Check if the document belongs to the user
    if (document.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    // Add access log for download
    document.accessLogs.push({
      user: req.user.id,
      action: 'download',
      ipAddress: req.ip
    });
    
    await document.save();
    
    // Verify file exists
    if (!fs.existsSync(document.path)) {
      return res.status(404).json({ msg: 'File not found on server' });
    }
    
    // Set headers for file download
    res.setHeader('Content-Type', document.mimetype);
    res.setHeader('Content-Disposition', `attachment; filename=${encodeURIComponent(document.originalFilename)}`);
    
    // Stream the file
    const fileStream = fs.createReadStream(document.path);
    fileStream.pipe(res);
  } catch (err) {
    console.error('Download document error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   PUT api/documents/:id
// @desc    Update document information
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { description, tags, expiryDays } = req.body;
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }
    
    // Check if the document belongs to the user
    if (document.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    // Update document fields
    if (description !== undefined) {
      document.description = description;
    }
    
    if (tags !== undefined) {
      document.tags = tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
    }
    
    if (expiryDays !== undefined) {
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + parseInt(expiryDays));
      document.expiryDate = expiryDate;
    }
    
    // Add access log
    document.accessLogs.push({
      user: req.user.id,
      action: 'update',
      ipAddress: req.ip
    });
    
    await document.save();
    
    return res.json(document);
  } catch (err) {
    console.error('Update document error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

// @route   DELETE api/documents/:id
// @desc    Delete a document
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    
    if (!document) {
      return res.status(404).json({ msg: 'Document not found' });
    }
    
    // Check if the document belongs to the user
    if (document.user.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    // Delete the file from the server
    if (fs.existsSync(document.path)) {
      fs.unlinkSync(document.path);
    }
    
    // Delete the document from the database
    await document.remove();
    
    return res.json({ msg: 'Document deleted', documentId: req.params.id });
  } catch (err) {
    console.error('Delete document error:', err);
    return res.status(500).json({ msg: 'Server error' });
  }
});

module.exports = router;