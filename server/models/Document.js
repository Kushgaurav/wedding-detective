const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
  caseId: {
    type: Schema.Types.ObjectId,
    ref: 'case',
    required: true
  },
  fileName: {
    type: String,
    required: true
  },
  filePath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  uploadedBy: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String,
    default: ''
  },
  tags: [String],
  downloadCount: {
    type: Number,
    default: 0
  },
  lastDownloaded: {
    type: Date,
    default: null
  },
  expiryDays: {
    type: Number,
    default: 30 // Number of days after case completion when document gets deleted
  },
  metadata: {
    type: Object,
    default: {}
  }
});

module.exports = Document = mongoose.model('document', DocumentSchema);