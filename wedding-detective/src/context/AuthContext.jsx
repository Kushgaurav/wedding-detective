import { createContext, useState, useEffect, useContext, useRef } from 'react';
import { login as apiLogin, register as apiRegister, updateProfile as apiUpdateProfile } from '../services/api';

// Create context
const AuthContext = createContext();

// Import API_URL from api.js or use the same configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create provider component
function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [token, setToken] = useState(localStorage.getItem('token'));
  
  // Use a ref to track initial authentication check
  const authCheckComplete = useRef(false);
  
  // Helper function to process user data
  const processUserData = (userData) => {
    const processedUser = { 
      ...userData,
      isAdmin: userData.role === 'admin'
    };
    return processedUser;
  };

  // Check if user is logged in on initial load only
  useEffect(() => {
    // Skip if we've already checked auth
    if (authCheckComplete.current) return;
    
    // Create a flag to prevent state updates if component unmounts during async operation
    let isMounted = true;
    
    const checkLoggedIn = async () => {
      try {
        const storedToken = localStorage.getItem('token');
        
        if (!storedToken) {
          // No token found, clear any lingering data
          if (isMounted) {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
            setLoading(false);
          }
          return;
        }
        
        // Make a request to verify the token
        const response = await fetch(`${API_URL}/auth/me`, {
          headers: {
            'x-auth-token': storedToken
          }
        });
        
        if (response.ok) {
          const userData = await response.json();
          const processedUser = processUserData(userData);
          
          // Only update state if component is still mounted
          if (isMounted) {
            // Update state with user data
            setUser(processedUser);
            localStorage.setItem('user', JSON.stringify(processedUser));
            setIsAuthenticated(true);
            setToken(storedToken);
          }
        } else {
          // Invalid token, clear data
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          
          if (isMounted) {
            setIsAuthenticated(false);
            setUser(null);
            setToken(null);
          }
        }
      } catch (err) {
        console.error('Error checking authentication:', err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        
        if (isMounted) {
          setIsAuthenticated(false);
          setUser(null);
          setToken(null);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
          authCheckComplete.current = true; // Mark auth check as complete
        }
      }
    };

    checkLoggedIn();
    
    // Cleanup function to prevent state updates after unmount
    return () => {
      isMounted = false;
    };
  }, []); // Empty dependency array ensures this runs only on mount
  
  // Update isAuthenticated when token changes
  useEffect(() => {
    setIsAuthenticated(!!token);
  }, [token]);

  // Login function
  const login = async (email, password) => {
    setError('');
    try {
      const response = await apiLogin({ email, password });
      
      // Store token in localStorage and state
      localStorage.setItem('token', response.token);
      setToken(response.token);
      
      // Fetch user data
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'x-auth-token': response.token
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        // Process user data to add isAdmin flag
        const processedUser = processUserData(userData);
        setUser(processedUser);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(processedUser));
        return true;
      }
      return false;
    } catch (err) {
      setError('Invalid email or password');
      return false;
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setError('');
    try {
      const response = await apiRegister({ name, email, password });
      
      // Store token in localStorage and state
      localStorage.setItem('token', response.token);
      setToken(response.token);
      
      // Fetch user data
      const userResponse = await fetch(`${API_URL}/auth/me`, {
        headers: {
          'x-auth-token': response.token
        }
      });
      
      if (userResponse.ok) {
        const userData = await userResponse.json();
        // Process user data to add isAdmin flag
        const processedUser = processUserData(userData);
        setUser(processedUser);
        // Store user data in localStorage
        localStorage.setItem('user', JSON.stringify(processedUser));
        setIsAuthenticated(true);
        return true;
      }
      return false;
    } catch (err) {
      console.error('Registration error:', err);
      // Provide more specific error messages based on error
      if (err.message && err.message.includes('duplicate')) {
        setError('Email already in use. Please try a different email.');
      } else {
        setError(err.message || 'Registration failed. Please try again.');
      }
      return false;
    }
  };

  // Update profile function
  const updateProfile = async (userData) => {
    setError('');
    try {
      if (!token) {
        setError('Authentication required. Please log in again.');
        return false;
      }
      
      const response = await apiUpdateProfile(userData, token);
      
      // Update user in state and localStorage
      const updatedUser = processUserData(response);
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      return true;
    } catch (err) {
      console.error('Profile update error:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        error,
        token,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthContext, AuthProvider, useAuth };