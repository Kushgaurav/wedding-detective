/**
 * API service for interacting with the Wedding Detective backend
 */

// Use a consistent fallback URL to ensure API works even if env variables aren't loaded
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Services API methods
export const getServices = async () => {
  try {
    const response = await fetch(`${API_URL}/services`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/services/${id}`);
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching service with id ${id}:`, error);
    throw error;
  }
};

// Consultation API methods
export const submitConsultation = async (consultationData) => {
  try {
    const response = await fetch(`${API_URL}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(consultationData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error submitting consultation:', error);
    throw error;
  }
};

// Auth API methods
export const register = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Profile API methods
export const updateProfile = async (userData, token) => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
};

// Admin user management methods
export const updateUserByAdmin = async (userId, userData, token) => {
  try {
    const response = await fetch(`${API_URL}/auth/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(userData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating user as admin:', error);
    throw error;
  }
};

// Documents API methods
export const uploadDocument = async (fileData, token) => {
  try {
    // Create form data for file upload
    const formData = new FormData();
    formData.append('file', fileData.file);
    formData.append('caseId', fileData.caseId);
    
    if (fileData.description) {
      formData.append('description', fileData.description);
    }
    
    if (fileData.expiryDays) {
      formData.append('expiryDays', fileData.expiryDays);
    }
    
    if (fileData.tags) {
      formData.append('tags', fileData.tags);
    }
    
    const response = await fetch(`${API_URL}/documents`, {
      method: 'POST',
      headers: {
        'x-auth-token': token
      },
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error uploading document:', error);
    throw error;
  }
};

export const getDocuments = async (token) => {
  try {
    const response = await fetch(`${API_URL}/documents`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching documents:', error);
    throw error;
  }
};

export const getDocumentsByCase = async (caseId, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/case/${caseId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching documents for case ${caseId}:`, error);
    throw error;
  }
};

export const getDocumentById = async (documentId, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching document ${documentId}:`, error);
    throw error;
  }
};

export const deleteDocument = async (documentId, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting document ${documentId}:`, error);
    throw error;
  }
};

export const updateDocument = async (documentId, documentData, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/${documentId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(documentData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating document ${documentId}:`, error);
    throw error;
  }
};

export const downloadDocument = async (documentId, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/download/${documentId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return response.blob();
  } catch (error) {
    console.error(`Error downloading document ${documentId}:`, error);
    throw error;
  }
};

// Case API methods
export const getUserCases = async (token) => {
  try {
    const response = await fetch(`${API_URL}/cases`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching user cases:', error);
    throw error;
  }
};

export const getCaseById = async (caseId, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${caseId}`, {
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error fetching case ${caseId}:`, error);
    throw error;
  }
};

export const createCase = async (caseData, token) => {
  try {
    // Ensure the case data meets model requirements
    const validatedCaseData = {
      title: caseData.title,
      description: caseData.description || '',
      // Adding default values that match the model's enum validation
      status: caseData.status || 'Active',
      progress: typeof caseData.progress === 'number' ? caseData.progress : 0,
      investigatorId: caseData.investigatorId || 'Agent #WD-117',
      updateMethod: caseData.updateMethod || 'Encrypted Email',
      // Add nextUpdateDate if not provided
      nextUpdateDate: caseData.nextUpdateDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
    };
    
    const response = await fetch(`${API_URL}/cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(validatedCaseData),
    });
    
    // Parse response JSON first, so we have it for both success and error cases
    const responseData = await response.json().catch(() => ({}));
    
    // Check if response is not ok and handle error
    if (!response.ok) {
      // Use the error message from the server if available
      if (responseData && responseData.msg) {
        throw new Error(responseData.msg);
      }
      throw new Error(`API error: ${response.status}`);
    }
    
    return responseData;
  } catch (error) {
    console.error('Error creating case:', error);
    throw error;
  }
};

export const updateCase = async (caseId, caseData, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${caseId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'x-auth-token': token
      },
      body: JSON.stringify(caseData),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating case ${caseId}:`, error);
    throw error;
  }
};

export const deleteCase = async (caseId, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${caseId}`, {
      method: 'DELETE',
      headers: {
        'x-auth-token': token
      }
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error deleting case ${caseId}:`, error);
    throw error;
  }
};