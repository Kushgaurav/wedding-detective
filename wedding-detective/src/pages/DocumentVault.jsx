import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { getDocuments } from '../services/api';
import DocumentUploader from '../components/DocumentUploader';
import DocumentItem from '../components/DocumentItem';

const DocumentVault = () => {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const { currentUser, token } = useAuth();

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await getDocuments(token);
      setDocuments(data);
      setError('');
    } catch (err) {
      console.error('Failed to fetch documents:', err);
      setError('Failed to load documents. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [token]);

  const handleUploadSuccess = (newDocument) => {
    setDocuments([newDocument, ...documents]);
  };

  const handleDeleteDocument = (documentId) => {
    setDocuments(documents.filter(doc => doc._id !== documentId));
  };

  const handleUpdateDocument = (updatedDocument) => {
    setDocuments(documents.map(doc => 
      doc._id === updatedDocument._id ? updatedDocument : doc
    ));
  };

  // Filter documents by type
  const filterDocuments = () => {
    let filteredDocs = [...documents];
    
    // Apply tag filter
    if (filter !== 'all') {
      filteredDocs = filteredDocs.filter(doc => 
        doc.tags.includes(filter)
      );
    }
    
    // Apply search term
    if (searchTerm) {
      filteredDocs = filteredDocs.filter(doc => 
        doc.originalFilename.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    
    return filteredDocs;
  };

  // Get unique tags for filter options
  const getUniqueTags = () => {
    const allTags = documents.flatMap(doc => doc.tags);
    return [...new Set(allTags)];
  };

  const filteredDocuments = filterDocuments();

  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-3xl font-bold text-light mb-8 text-center">Document Vault</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <DocumentUploader onUploadSuccess={handleUploadSuccess} />
        </div>
        
        <div className="md:col-span-2">
          <div className="bg-secondary p-6 rounded shadow">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-light mb-4 sm:mb-0">Your Documents</h3>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                <div className="relative">
                  <input 
                    type="text"
                    placeholder="Search documents..."
                    className="w-full sm:w-64 bg-primary border border-darkGray text-light p-2 rounded"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <select 
                  className="bg-primary border border-darkGray text-light p-2 rounded"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="all">All Documents</option>
                  {getUniqueTags().map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </select>
              </div>
            </div>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
              </div>
            ) : error ? (
              <div className="bg-red-700/20 border border-red-700 text-red-100 p-4 rounded">
                {error}
              </div>
            ) : filteredDocuments.length === 0 ? (
              <div className="text-center py-16 bg-primary/30 rounded">
                <svg className="mx-auto h-12 w-12 text-light/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <p className="mt-4 text-light/80">
                  {filter !== 'all' || searchTerm ? 'No documents match your search criteria' : 'You haven\'t uploaded any documents yet'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredDocuments.map(doc => (
                  <DocumentItem 
                    key={doc._id} 
                    document={doc} 
                    onDelete={handleDeleteDocument} 
                    onUpdate={handleUpdateDocument} 
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentVault;