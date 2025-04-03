const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Case = require('../models/Case');
const Document = require('../models/Document');

// @route   GET api/cases
// @desc    Get all cases for a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const cases = await Case.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(cases);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/cases/:id
// @desc    Get case by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    
    if (!caseItem) {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    // Check user owns the case
    if (caseItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    res.json(caseItem);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   POST api/cases
// @desc    Create a new case
// @access  Private
router.post('/', auth, async (req, res) => {
  const { title, description } = req.body;
  
  try {
    // Validate required fields
    if (!title) {
      return res.status(400).json({ msg: 'Case title is required' });
    }

    // Create new case with validated data
    const newCase = new Case({
      user: req.user.id,
      title,
      description: description || '',
      status: req.body.status || 'Active',
      progress: typeof req.body.progress === 'number' ? req.body.progress : 0,
      investigatorId: req.body.investigatorId || 'Agent #WD-117',
      nextUpdateDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days from now
      updateMethod: req.body.updateMethod || 'Encrypted Email'
    });
    
    // Save and return the new case
    const savedCase = await newCase.save();
    return res.json(savedCase);
    
  } catch (err) {
    console.error('Case creation error:', err);
    
    // Return more specific error messages based on the error type
    if (err.name === 'ValidationError') {
      // Extract validation error messages
      const errors = Object.values(err.errors).map(e => e.message);
      return res.status(400).json({ 
        msg: 'The case data is invalid. Please check all required fields.',
        errors
      });
    } else if (err.code === 11000) {
      return res.status(400).json({ 
        msg: 'Case ID conflict. Please try again.' 
      });
    }
    
    res.status(500).json({ msg: 'Server error while creating case' });
  }
});

// @route   PUT api/cases/:id
// @desc    Update case
// @access  Private
router.put('/:id', auth, async (req, res) => {
  const { title, description, status, progress } = req.body;
  
  // Build case object
  const caseFields = {};
  if (title) caseFields.title = title;
  if (description) caseFields.description = description;
  if (status) caseFields.status = status;
  if (progress !== undefined) caseFields.progress = progress;
  caseFields.lastUpdated = Date.now();
  
  try {
    let caseItem = await Case.findById(req.params.id);
    
    if (!caseItem) {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    // Check user owns the case
    if (caseItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    caseItem = await Case.findByIdAndUpdate(
      req.params.id,
      { $set: caseFields },
      { new: true }
    );
    
    res.json(caseItem);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/cases/:id
// @desc    Delete case
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    
    if (!caseItem) {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    // Check user owns the case
    if (caseItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    // Delete all related documents
    await Document.deleteMany({ caseId: caseItem.caseId });
    
    // Delete the case
    await Case.findByIdAndRemove(req.params.id);
    
    res.json({ msg: 'Case removed' });
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

// @route   GET api/cases/:id/documents
// @desc    Get all documents for a case
// @access  Private
router.get('/:id/documents', auth, async (req, res) => {
  try {
    const caseItem = await Case.findById(req.params.id);
    
    if (!caseItem) {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    // Check user owns the case
    if (caseItem.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    const documents = await Document.find({ caseId: caseItem.caseId }).sort({ createdAt: -1 });
    res.json(documents);
  } catch (err) {
    console.error(err.message);
    
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Case not found' });
    }
    
    res.status(500).send('Server Error');
  }
});

module.exports = router;