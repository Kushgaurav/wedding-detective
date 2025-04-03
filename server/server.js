const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const path = require('path');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? 'https://your-production-domain.com' 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());

// Import middleware
const auth = require('./middleware/auth');
const admin = require('./middleware/admin');

// Import routes
const serviceRoutes = require('./routes/services');
const authRoutes = require('./routes/auth');
const consultationRoutes = require('./routes/consultations');
const documentRoutes = require('./routes/documents');
const caseRoutes = require('./routes/cases');

// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Wedding Detective API is running',
    env: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// API root route - Add this to handle /api requests
app.get('/api', (req, res) => {
  res.json({
    message: 'Wedding Detective API',
    version: '1.0.0',
    endpoints: [
      '/api/services',
      '/api/auth',
      '/api/consultations',
      '/api/documents',
      '/api/cases'
    ],
    documentation: 'For more information, contact the development team'
  });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/documents', documentRoutes);
app.use('/api/cases', caseRoutes);

// Serve uploaded files (with authentication)
app.use('/uploads', auth, (req, res, next) => {
  // Only allow authenticated requests to access uploads
  next();
}, express.static(path.join(__dirname, 'uploads')));

// Handle 404 errors for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ message: `API endpoint not found: ${req.originalUrl}` });
});

// Connect to MongoDB with improved error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/wedding-detective';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    console.log('Attempting to run server without database connection...');
  });

// Port
const PORT = process.env.PORT || 5000;

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});