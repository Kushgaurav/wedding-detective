const express = require('express');
const router = express.Router();
const Consultation = require('../models/Consultation');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// Submit a new consultation request (public)
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, message, serviceInterest } = req.body;
    
    const consultation = new Consultation({
      name,
      email,
      phone,
      message,
      serviceInterest
    });
    
    const newConsultation = await consultation.save();
    res.status(201).json(newConsultation);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all consultation requests (admin only)
router.get('/', [auth, admin], async (req, res) => {
  try {
    const consultations = await Consultation.find().sort({ createdAt: -1 });
    res.json(consultations);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update consultation status (admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const { status } = req.body;
    
    const consultation = await Consultation.findById(req.params.id);
    if (!consultation) {
      return res.status(404).json({ message: 'Consultation not found' });
    }
    
    consultation.status = status;
    
    const updatedConsultation = await consultation.save();
    res.json(updatedConsultation);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;