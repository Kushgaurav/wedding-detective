const mongoose = require('mongoose');
const Service = require('../models/Service');
const { convertToRupees } = require('./helpers');

// Sample service data with prices in rupees
const serviceData = [
  {
    name: 'Basic Verification Package',
    description: 'Essential background verification for new relationships',
    price: convertToRupees(299),
    currency: '₹',
    features: [
      'Social media authenticity check',
      'Employment verification',
      'Basic criminal record check (domestic)'
    ],
    popular: false
  },
  {
    name: 'Comprehensive Background Check',
    description: 'Detailed investigation for serious relationships',
    price: convertToRupees(799),
    currency: '₹',
    features: [
      'All Basic package features',
      'Financial health assessment',
      'Relationship history verification',
      'Lifestyle pattern analysis'
    ],
    popular: true
  },
  {
    name: 'Premium Surveillance',
    description: 'Complete monitoring for total peace of mind',
    price: convertToRupees(1500),
    currency: '₹',
    features: [
      '7-day physical surveillance',
      'Undercover social engagement',
      'Digital behavior monitoring'
    ],
    popular: false
  },
  {
    name: 'International Background Check',
    description: 'For partners with international connections',
    price: convertToRupees(400),
    currency: '₹',
    features: [
      'Overseas record verification',
      'Immigration status check',
      'Cross-border asset search'
    ],
    popular: false
  },
  {
    name: 'Family Due Diligence',
    description: 'Understand the family you\'re marrying into',
    price: convertToRupees(999),
    currency: '₹',
    features: [
      '3-generation family history',
      'Hidden assets investigation',
      'Inheritance disputes check',
      'Social standing evaluation'
    ],
    popular: false
  }
];

// Function to seed the database with service data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await Service.deleteMany({});
    console.log('Existing services deleted');
    
    // Insert new data
    const insertedServices = await Service.insertMany(serviceData);
    console.log(`${insertedServices.length} services inserted successfully`);
    
    return insertedServices;
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error;
  }
};

module.exports = { seedDatabase };