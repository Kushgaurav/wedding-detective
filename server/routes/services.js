const express = require('express');
const router = express.Router();
const Service = require('../models/Service');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

// GET all services (public)
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a specific service (public)
router.get('/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST create a new service (Admin only)
router.post('/', [auth, admin], async (req, res) => {
  const service = new Service({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    currency: req.body.currency || '₹', // Default to Rupees
    features: req.body.features,
    popular: req.body.popular || false
  });

  try {
    const newService = await service.save();
    res.status(201).json(newService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT update a service (Admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    if (req.body.name) service.name = req.body.name;
    if (req.body.description) service.description = req.body.description;
    if (req.body.price) service.price = req.body.price;
    if (req.body.currency) service.currency = req.body.currency;
    if (req.body.features) service.features = req.body.features;
    if (req.body.popular !== undefined) service.popular = req.body.popular;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a service (Admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    
    await service.deleteOne();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;