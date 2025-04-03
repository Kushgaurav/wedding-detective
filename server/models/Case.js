const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caseId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Active', 'On Hold', 'Completed', 'Archived'],
    default: 'Active'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  investigatorId: {
    type: String,
    trim: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  nextUpdateDate: {
    type: Date
  },
  updateMethod: {
    type: String,
    enum: ['Email', 'Phone', 'In-person', 'Video Call', 'Encrypted Email'],
    default: 'Encrypted Email'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

// Generate a unique case ID before saving
CaseSchema.pre('save', async function(next) {
  try {
    // Skip if this isn't a new case or if caseId is already set
    if (!this.isNew || this.caseId) {
      return next();
    }
    
    // Default starting case number
    let caseNumber = 10000;
    
    try {
      // Try to find the last case to increment the number with findOneAndUpdate
      // This approach is more atomic and reduces race condition risk
      const lastCaseDoc = await mongoose.connection.db.collection('cases')
        .findOneAndUpdate(
          {}, // empty filter gets any document
          { $inc: { counter: 1 } },
          { 
            sort: { counter: -1 },
            upsert: true, // create counter doc if it doesn't exist
            returnDocument: 'after' // return document after update
          }
        );
      
      if (lastCaseDoc && lastCaseDoc.value && lastCaseDoc.value.counter) {
        caseNumber = 10000 + lastCaseDoc.value.counter;
      }
    } catch (queryError) {
      // If query fails, use timestamp as fallback
      console.error('Error generating sequential case ID:', queryError);
      const timestamp = Date.now();
      this.caseId = `WD-${timestamp}`;
      return next();
    }
    
    // Set the case ID using the determined number
    this.caseId = `WD-${caseNumber}`;
    next();
  } catch (error) {
    console.error('Error in case ID generation:', error);
    
    // Fallback to timestamp-based ID if everything else fails
    const timestamp = Date.now();
    this.caseId = `WD-${timestamp}`;
    next();
  }
});

module.exports = mongoose.model('Case', CaseSchema);