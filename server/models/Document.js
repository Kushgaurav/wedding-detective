const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  caseId: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  originalFilename: {
    type: String,
    required: true
  },
  mimetype: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: function() {
      const date = new Date();
      date.setDate(date.getDate() + 30); // Default 30 days expiry
      return date;
    }
  },
  accessLogs: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
      action: {
        type: String,
        enum: ['upload', 'view', 'download', 'update', 'delete']
      },
      timestamp: {
        type: Date,
        default: Date.now
      },
      ipAddress: {
        type: String
      }
    }
  ]
});

// Virtual property to check if document is expired
DocumentSchema.virtual('isExpired').get(function() {
  return this.expiryDate < new Date();
});

// Method to check user access rights
DocumentSchema.methods.canAccess = function(userId) {
  return this.user.toString() === userId.toString();
};

// Pre-save hook to ensure path is properly formatted
DocumentSchema.pre('save', function(next) {
  // Ensure path uses forward slashes for cross-platform compatibility
  if (this.path) {
    this.path = this.path.replace(/\\/g, '/');
  }
  
  next();
});

module.exports = mongoose.model('document', DocumentSchema);