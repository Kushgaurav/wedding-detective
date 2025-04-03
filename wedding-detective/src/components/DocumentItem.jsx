import React, { useState } from 'react';
import { downloadDocument, deleteDocument, updateDocument } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DocumentItem = ({ document, onDelete, onUpdate }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [description, setDescription] = useState(document.description);
  const [tags, setTags] = useState(document.tags.join(','));
  const [expiryDays, setExpiryDays] = useState(30);
  const [error, setError] = useState('');
  const { token } = useAuth();

  // Format the file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' bytes';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // File icon based on mime type
  const getFileIcon = () => {
    const mimetype = document.mimetype;
    
    if (mimetype.startsWith('image/')) {
      return (
        <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
        </svg>
      );
    }
    
    if (mimetype === 'application/pdf') {
      return (
        <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
        </svg>
      );
    }
    
    if (mimetype === 'application/msword' || mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
      return (
        <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
        </svg>
      );
    }
    
    if (mimetype === 'application/vnd.ms-excel' || mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      return (
        <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M5 4a1 1 0 00-1 1v10a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1H5zm9 1h-3v3h-2V5H6v4h2v2H6v4h3v-3h2v3h3v-4h-2v-2h2V5z" clipRule="evenodd"></path>
        </svg>
      );
    }
    
    return (
      <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
      </svg>
    );
  };
  
  const handleDownload = async () => {
    setIsDownloading(true);
    setError('');
    
    try {
      const blob = await downloadDocument(document._id, token);
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = url;
      link.download = document.originalFilename;
      
      // Append to the document, click it, and then remove it
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the URL
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Download failed:', err);
      setError('Failed to download the document. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };
  
  const handleDelete = async () => {
    if (window.confirm(`Are you sure you want to delete ${document.originalFilename}?`)) {
      setIsDeleting(true);
      setError('');
      
      try {
        await deleteDocument(document._id, token);
        onDelete(document._id);
      } catch (err) {
        console.error('Delete failed:', err);
        setError('Failed to delete the document. Please try again.');
        setIsDeleting(false);
      }
    }
  };
  
  const handleUpdate = async () => {
    try {
      const updatedDocument = await updateDocument(
        document._id, 
        { description, tags, expiryDays }, 
        token
      );
      
      onUpdate(updatedDocument);
      setShowEditModal(false);
    } catch (err) {
      console.error('Update failed:', err);
      setError('Failed to update document information. Please try again.');
    }
  };

  return (
    <div className="bg-secondary rounded shadow overflow-hidden">
      {/* Document Header */}
      <div className="p-4 border-b border-darkGray">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h4 className="text-light font-bold truncate" title={document.originalFilename}>
              {document.originalFilename}
            </h4>
            <p className="text-light/70 text-sm">
              {formatFileSize(document.size)} • Uploaded {formatDate(document.uploadDate)}
            </p>
          </div>
        </div>
        
        {/* Description */}
        {document.description && (
          <p className="text-light/70 mt-2 text-sm">{document.description}</p>
        )}
        
        {/* Tags */}
        {document.tags && document.tags.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1">
            {document.tags.map((tag, idx) => (
              <span 
                key={idx} 
                className="bg-primary px-2 py-0.5 rounded-full text-xs text-light/80"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-3 bg-red-700/20 border border-red-700 text-red-100 p-2 rounded text-sm">
            {error}
          </div>
        )}
      </div>
      
      {/* Document Preview/Icon */}
      <div className="h-40 bg-primary/50 flex items-center justify-center">
        {document.mimetype.startsWith('image/') ? (
          <img 
            src={`/uploads/${document.filename}`} 
            alt={document.originalFilename}
            className="max-h-full max-w-full object-contain"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '';
              e.target.parentElement.appendChild(getFileIcon());
            }}
          />
        ) : getFileIcon()}
      </div>
      
      {/* Actions */}
      <div className="p-3 flex justify-between items-center border-t border-darkGray">
        <div className="text-light text-sm">
          Expires: {formatDate(document.expiryDate)}
        </div>
        <div className="flex space-x-2">
          <button 
            onClick={() => setShowEditModal(true)}
            className="text-light hover:text-accent text-sm font-medium"
          >
            Edit
          </button>
          <button 
            onClick={handleDownload}
            className="text-accent hover:text-darkGold text-sm font-medium"
            disabled={isDownloading}
          >
            {isDownloading ? 'Downloading...' : 'Download'}
          </button>
          <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-400 text-sm font-medium"
            disabled={isDeleting}
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
      
      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-secondary p-6 rounded shadow-lg w-full max-w-md">
            <h4 className="text-lg font-bold text-light mb-4">Edit Document</h4>
            
            <div className="mb-4">
              <label className="block text-light mb-2">Document Name</label>
              <p className="text-light/70">{document.originalFilename}</p>
            </div>
            
            <div className="mb-4">
              <label className="block text-light mb-2">Description</label>
              <textarea
                className="w-full bg-primary border border-darkGray text-light p-2 rounded"
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            
            <div className="mb-4">
              <label className="block text-light mb-2">Tags</label>
              <input
                type="text"
                className="w-full bg-primary border border-darkGray text-light p-2 rounded"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Separate tags with commas"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-light mb-2">Automatic Deletion After</label>
              <select
                className="bg-primary border border-darkGray text-light p-2 rounded w-full"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
              >
                <option value="30">30 days after case completion</option>
                <option value="60">60 days after case completion</option>
                <option value="90">90 days after case completion</option>
              </select>
            </div>
            
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 border border-darkGray text-light hover:bg-darkGray rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleUpdate}
                className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentItem;