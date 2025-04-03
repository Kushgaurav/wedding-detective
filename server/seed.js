require('dotenv').config();
const mongoose = require('mongoose');
const { seedDatabase } = require('./utils/seedData');

// Database connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-detective';

// Connect to MongoDB and seed the database
mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('Connected to MongoDB');
    try {
      await seedDatabase();
      console.log('Database seeded successfully');
      process.exit(0);
    } catch (error) {
      console.error('Error seeding database:', error);
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });