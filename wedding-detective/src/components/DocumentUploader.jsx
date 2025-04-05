import React, { useState, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { uploadDocument } from '../services/api';
import { useAuth } from '../context/AuthContext';

const DocumentUploader = ({ onUploadSuccess, onUploadError, caseId = 'default' }) => {
  const [file, setFile] = useState(null);
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState('');
  const [expiryDays, setExpiryDays] = useState(30);
  const fileInputRef = useRef(null);
  const { token, user } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [errors, setErrors] = useState({});

  // Maximum file size in bytes (5MB)
  const MAX_FILE_SIZE = 5 * 1024 * 1024;

  // Allowed file types
  const ALLOWED_TYPES = [
    'image/jpeg', 'image/png', 'image/gif', 
    'application/pdf',
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'text/plain'
  ];

  // Format bytes to human-readable size
  const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };

  // File validation
  const validateFile = (file) => {
    const errors = {};
    
    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      errors.size = `File is too large. Maximum size is ${formatBytes(maxSize)}.`;
    }
    
    // Check file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      errors.type = 'This file type is not supported. Please upload an image, PDF, Word document, Excel spreadsheet, or text file.';
    }
    
    return errors;
  };

  const handleFileChange = useCallback((e) => {
    const selectedFile = e.target.files[0];
    setError('');
    setUploadProgress(0);
    
    if (!selectedFile) {
      setFile(null);
      return;
    }
    
    if (selectedFile.size > MAX_FILE_SIZE) {
      setError('File size exceeds 5MB limit');
      setFile(null);
      return;
    }
    
    if (!ALLOWED_TYPES.includes(selectedFile.type)) {
      setError('Invalid file type. Only images, PDFs, documents, spreadsheets, and text files are allowed.');
      setFile(null);
      return;
    }
    
    setFile(selectedFile);
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      const droppedFile = droppedFiles[0];
      
      // Simulate the same validation as handleFileChange
      setError('');
      
      if (droppedFile.size > MAX_FILE_SIZE) {
        setError('File size exceeds 5MB limit');
        return;
      }
      
      if (!ALLOWED_TYPES.includes(droppedFile.type)) {
        setError('Invalid file type. Only images, PDFs, documents, spreadsheets, and text files are allowed.');
        return;
      }
      
      setFile(droppedFile);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setUploading(true);
    setError('');
    setUploadProgress(0);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('caseId', caseId);
      formData.append('description', description);
      formData.append('expiryDays', expiryDays);
      formData.append('tags', tags);
      formData.append('uploadedBy', user?._id || 'anonymous');
      
      // Using XMLHttpRequest for upload progress tracking
      const xhr = new XMLHttpRequest();
      
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const progress = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(progress);
        }
      });
      
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          const response = JSON.parse(xhr.responseText);
          
          // Reset form
          setFile(null);
          setDescription('');
          setTags('');
          setUploadProgress(0);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
          
          // Notify parent component about successful upload
          if (onUploadSuccess) {
            onUploadSuccess(response);
          }
        } else {
          throw new Error('Upload failed');
        }
      });
      
      xhr.addEventListener('error', () => {
        throw new Error('Network error occurred during upload');
      });
      
      xhr.addEventListener('abort', () => {
        throw new Error('Upload aborted');
      });
      
      xhr.open('POST', `${process.env.REACT_APP_API_URL || '/api'}/documents/upload`);
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.send(formData);
      
    } catch (error) {
      console.error('Upload error:', error);
      setError('Failed to upload file. Please try again.');
      
      if (onUploadError) {
        onUploadError(error.message || 'Unknown upload error');
      }
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

  const renderProgressBar = () => {
    if (!uploading || uploadProgress === 0) return null;
    
    return (
      <div className="mt-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-light/70">Upload Progress</span>
          <span className="text-light">{uploadProgress}%</span>
        </div>
        <div className="w-full bg-darkGray rounded-full h-2">
          <div 
            className="bg-accent h-2 rounded-full transition-all duration-300 ease-in-out"
            style={{ width: `${uploadProgress}%` }}
          ></div>
        </div>
      </div>
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
        
        <div 
          className={`mb-4 border-2 border-dashed border-darkGray rounded p-6 text-center cursor-pointer bg-primary/30 hover:bg-primary/50 transition-colors
            ${dragActive ? 'border-accent bg-accent/10' : 'border-darkGray hover:border-accent/50'}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
            ref={fileInputRef}
            disabled={uploading}
          />
          
          <svg className="w-12 h-12 text-accent mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
          </svg>
          
          <p className="text-light font-medium mb-1">
            {file ? file.name : 'Drag and drop your file here, or click to select'}
          </p>
          <p className="text-light/60 text-xs">
            Max 5MB. Supported formats: Images, PDF, Word, Excel, Text
          </p>
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
        
        {renderProgressBar()}
        
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
            <option value="180">180 days after case completion</option>
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

DocumentUploader.propTypes = {
  caseId: PropTypes.string.isRequired,
  onUploadSuccess: PropTypes.func,
  onUploadError: PropTypes.func
};

export default DocumentUploader;