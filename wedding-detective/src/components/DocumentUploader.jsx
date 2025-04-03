import React, { useState, useRef } from 'react';
import { uploadDocument } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DocumentUploader = ({ onUploadSuccess, caseId = 'default' }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const fileInputRef = useRef(null);
  const { token } = useAuth();

  // Maximum file size in bytes (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setError('');
    
    if (selectedFile) {
      if (selectedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB limit');
        setFile(null);
        return;
      }
      
      // List of allowed file types
      const allowedTypes = [
        'image/jpeg', 'image/png', 'image/gif', 
        'application/pdf',
        'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
      ];
      
      if (!allowedTypes.includes(selectedFile.type)) {
        setError('Invalid file type. Only images, PDFs, documents, spreadsheets, and text files are allowed.');
        setFile(null);
        return;
      }
      
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError('');
    
    try {
      const fileData = {
        file,
        caseId,
        description,
        expiryDays,
        tags
      };
      
      const response = await uploadDocument(fileData, token);
      
      // Reset form
      setFile(null);
      setDescription('');
      setTags('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      
      // Notify parent component about successful upload
      onUploadSuccess(response);
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const getFileIcon = () => {
    if (!file) return null;
    
    if (file.type.startsWith('image/')) {
      return (
        <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd"></path>
        </svg>
      );
    }
    
    if (file.type === 'application/pdf') {
      return (
        <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
        </svg>
      );
    }
    
    return (
      <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
      </svg>
    );
  };

  return (
    <div className="bg-secondary p-6 rounded shadow">
      <h4 className="text-lg font-bold text-light mb-4">Upload New Document</h4>
      
      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-700/20 border border-red-700 text-red-100 p-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-light mb-2">Select File</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="text-light text-sm block w-full cursor-pointer bg-primary border border-darkGray rounded p-2"
            ref={fileInputRef}
            disabled={uploading}
          />
          <p className="text-light/60 text-xs mt-1">Max 5MB. Supported formats: Images, PDF, Word, Excel, Text</p>
        </div>
        
        {file && (
          <div className="mb-4 p-3 bg-primary/30 border border-darkGray rounded flex items-center">
            {getFileIcon()}
            <div className="ml-3">
              <p className="text-light font-medium">{file.name}</p>
              <p className="text-light/60 text-xs">{(file.size / 1024).toFixed(2)} KB</p>
            </div>
          </div>
        )}
        
        <div className="mb-4">
          <label className="block text-light mb-2">Description</label>
          <textarea
            className="w-full bg-primary border border-darkGray text-light p-2 rounded"
            rows="2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description for this document (optional)"
            disabled={uploading}
          ></textarea>
        </div>
        
        <div className="mb-4">
          <label className="block text-light mb-2">Tags</label>
          <input
            type="text"
            className="w-full bg-primary border border-darkGray text-light p-2 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Separate tags with commas (e.g., financial, id, proof)"
            disabled={uploading}
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-light mb-2">Automatic Deletion After</label>
          <select
            className="bg-primary border border-darkGray text-light p-2 rounded w-full"
            value={expiryDays}
            onChange={(e) => setExpiryDays(e.target.value)}
            disabled={uploading}
          >
            <option value="30">30 days after case completion</option>
            <option value="60">60 days after case completion</option>
            <option value="90">90 days after case completion</option>
          </select>
        </div>
        
        <div className="flex justify-end">
          <button
            type="submit"
            className={`bg-accent hover:bg-darkGold text-white px-4 py-2 rounded-md ${
              uploading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={uploading}
          >
            {uploading ? 'Uploading...' : 'Upload Document'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DocumentUploader;