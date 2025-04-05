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

// API service for the Wedding Detective application
const API_URL = process.env.REACT_APP_API_URL || '/api';

// Authentication API calls
export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Registration failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

export const forgotPassword = async (email) => {
  try {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    
    if (!response.ok) {
      throw new Error(`Password reset request failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Forgot password error:', error);
    throw error;
  }
};

export const resetPassword = async (token, newPassword) => {
  try {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token, newPassword })
    });
    
    if (!response.ok) {
      throw new Error(`Password reset failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Reset password error:', error);
    throw error;
  }
};

export const updateUserProfile = async (userData, token) => {
  try {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`Profile update failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update profile error:', error);
    throw error;
  }
};

export const getCurrentUser = async (token) => {
  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to get user: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get current user error:', error);
    throw error;
  }
};

// Consultation API calls
export const submitConsultation = async (consultationData) => {
  try {
    const response = await fetch(`${API_URL}/consultations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(consultationData)
    });
    
    if (!response.ok) {
      throw new Error(`Consultation submission failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Submit consultation error:', error);
    throw error;
  }
};

export const getConsultations = async ({ page = 1, limit = 10, status = 'all' }, token) => {
  try {
    const response = await fetch(`${API_URL}/consultations?page=${page}&limit=${limit}&status=${status}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch consultations: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get consultations error:', error);
    throw error;
  }
};

export const updateConsultationStatus = async (id, statusData, token) => {
  try {
    const response = await fetch(`${API_URL}/consultations/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(statusData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update consultation status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update consultation status error:', error);
    throw error;
  }
};

// User management API calls (admin)
export const getUsers = async ({ page = 1, limit = 10, role = 'all', search = '' }, token) => {
  try {
    const response = await fetch(
      `${API_URL}/users?page=${page}&limit=${limit}&role=${role}&search=${encodeURIComponent(search)}`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch users: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get users error:', error);
    throw error;
  }
};

export const createUser = async (userData, token) => {
  try {
    const response = await fetch(`${API_URL}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`User creation failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create user error:', error);
    throw error;
  }
};

export const updateUser = async (id, userData, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok) {
      throw new Error(`User update failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update user error:', error);
    throw error;
  }
};

export const deleteUser = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/users/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`User deletion failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Delete user error:', error);
    throw error;
  }
};

// Service management API calls
export const getServices = async () => {
  try {
    const response = await fetch(`${API_URL}/services`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch services: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get services error:', error);
    throw error;
  }
};

export const getServiceById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/services/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch service: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get service error:', error);
    throw error;
  }
};

export const createService = async (serviceData, token) => {
  try {
    const response = await fetch(`${API_URL}/services`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    });
    
    if (!response.ok) {
      throw new Error(`Service creation failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create service error:', error);
    throw error;
  }
};

export const updateService = async (id, serviceData, token) => {
  try {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(serviceData)
    });
    
    if (!response.ok) {
      throw new Error(`Service update failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update service error:', error);
    throw error;
  }
};

export const deleteService = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/services/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Service deletion failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Delete service error:', error);
    throw error;
  }
};

// Case management API calls
export const getUserCases = async (token) => {
  try {
    const response = await fetch(`${API_URL}/cases/user`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch user cases: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get user cases error:', error);
    throw error;
  }
};

export const getCases = async ({ page = 1, limit = 10, status = 'all', search = '' }, token) => {
  try {
    const response = await fetch(
      `${API_URL}/cases?page=${page}&limit=${limit}&status=${status}&search=${encodeURIComponent(search)}`, 
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch cases: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get cases error:', error);
    throw error;
  }
};

export const getCaseById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch case: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get case error:', error);
    throw error;
  }
};

export const createCase = async (caseData, token) => {
  try {
    const response = await fetch(`${API_URL}/cases`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(caseData)
    });
    
    if (!response.ok) {
      throw new Error(`Case creation failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create case error:', error);
    throw error;
  }
};

export const updateCase = async (id, caseData, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(caseData)
    });
    
    if (!response.ok) {
      throw new Error(`Case update failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update case error:', error);
    throw error;
  }
};

export const deleteCase = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Case deletion failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Delete case error:', error);
    throw error;
  }
};

export const updateCaseStatus = async (id, statusData, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${id}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(statusData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update case status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update case status error:', error);
    throw error;
  }
};

export const updateCaseProgress = async (id, progressData, token) => {
  try {
    const response = await fetch(`${API_URL}/cases/${id}/progress`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(progressData)
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update case progress: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update case progress error:', error);
    throw error;
  }
};

// Document management API calls
export const getDocumentsByCase = async (caseId, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/case/${caseId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch documents: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get documents error:', error);
    throw error;
  }
};

export const getDocumentById = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get document error:', error);
    throw error;
  }
};

export const uploadDocument = async (documentData, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: documentData // FormData object should be sent as is, without JSON stringification
    });
    
    if (!response.ok) {
      throw new Error(`Document upload failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Upload document error:', error);
    throw error;
  }
};

export const updateDocumentMetadata = async (id, metadataData, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/${id}/metadata`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(metadataData)
    });
    
    if (!response.ok) {
      throw new Error(`Document metadata update failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Update document metadata error:', error);
    throw error;
  }
};

export const deleteDocument = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Document deletion failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Delete document error:', error);
    throw error;
  }
};

export const downloadDocument = async (id, token) => {
  try {
    const response = await fetch(`${API_URL}/documents/${id}/download`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      throw new Error(`Document download failed: ${response.status}`);
    }
    
    return await response.blob();
  } catch (error) {
    console.error('Download document error:', error);
    throw error;
  }
};

// Payment management API calls
export const getPayments = async ({ page = 1, limit = 10, userId = '' }, token) => {
  try {
    const response = await fetch(
      `${API_URL}/payments?page=${page}&limit=${limit}${userId ? `&userId=${userId}` : ''}`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error(`Failed to fetch payments: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Get payments error:', error);
    throw error;
  }
};

export const createPayment = async (paymentData, token) => {
  try {
    const response = await fetch(`${API_URL}/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(paymentData)
    });
    
    if (!response.ok) {
      throw new Error(`Payment creation failed: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Create payment error:', error);
    throw error;
  }
};