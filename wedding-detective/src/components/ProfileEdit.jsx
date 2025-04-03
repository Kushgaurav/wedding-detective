import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

// Component that can be used for both admin editing a user and users editing their own profile
const ProfileEdit = ({ userId = null, onClose = () => {}, isAdmin = false }) => {
  const { user, updateProfile, updateUserByAdmin } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  // Load user data - either the logged-in user or specified user (admin mode)
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // In a real app, if admin is editing someone else, we'd fetch that user
        // For now just use either the specified user or the current user
        const userData = userId ? await fetchUserById(userId) : user;
        
        if (userData) {
          setFormData(prev => ({
            ...prev,
            name: userData.name || '',
            email: userData.email || '',
            phone: userData.phone || '',
            address: userData.address || '',
          }));
        }
      } catch (error) {
        setMessage({ type: 'error', text: 'Failed to load user data' });
      }
    };

    fetchUserData();
  }, [user, userId]);

  // Placeholder for admin-only function to fetch user by ID
  const fetchUserById = async (id) => {
    // This would be an actual API call in a real implementation
    // For now, return mock data
    return user; // Placeholder implementation
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleTogglePasswordFields = () => {
    setShowPasswordFields(prev => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      // Validate form data
      if (showPasswordFields) {
        if (!formData.currentPassword && !isAdmin) {
          throw new Error('Current password is required to change password');
        }
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error('New passwords do not match');
        }
      }

      // Prepare data for submission
      const profileData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        ...(showPasswordFields && formData.newPassword ? { 
          password: formData.newPassword,
          ...(isAdmin ? {} : { currentPassword: formData.currentPassword })
        } : {})
      };

      // Submit the profile update
      if (isAdmin && userId) {
        await updateUserByAdmin(userId, profileData);
      } else {
        await updateProfile(profileData);
      }

      setMessage({ 
        type: 'success', 
        text: isAdmin ? 'User updated successfully' : 'Profile updated successfully' 
      });
      
      // Close the form after successful update
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to update profile' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-secondary p-6 rounded shadow w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-light mb-6">
        {isAdmin ? 'Edit User Profile' : 'Edit Your Profile'}
      </h2>
      
      {message.text && (
        <div className={`mb-4 p-3 rounded ${
          message.type === 'success' ? 'bg-green-500/20 text-green-500' : 
          'bg-red-500/20 text-red-500'
        }`}>
          {message.text}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-light mb-1">Full Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full bg-darkGray text-light p-2 rounded focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="email" className="block text-light mb-1">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full bg-darkGray text-light p-2 rounded focus:outline-none focus:ring-1 focus:ring-accent"
            required
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="phone" className="block text-light mb-1">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full bg-darkGray text-light p-2 rounded focus:outline-none focus:ring-1 focus:ring-accent"
          />
        </div>
        
        <div className="mb-4">
          <label htmlFor="address" className="block text-light mb-1">Address</label>
          <textarea
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full bg-darkGray text-light p-2 rounded focus:outline-none focus:ring-1 focus:ring-accent"
            rows="3"
          />
        </div>
        
        <div className="mb-4">
          <button 
            type="button"
            onClick={handleTogglePasswordFields}
            className="text-accent hover:text-darkGold underline"
          >
            {showPasswordFields ? 'Hide Password Fields' : 'Change Password'}
          </button>
        </div>
        
        {showPasswordFields && (
          <div className="space-y-4 mb-4 bg-darkGray/50 p-4 rounded">
            {!isAdmin && (
              <div>
                <label htmlFor="currentPassword" className="block text-light mb-1">Current Password</label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full bg-darkGray text-light p-2 rounded focus:outline-none focus:ring-1 focus:ring-accent"
                />
              </div>
            )}
            
            <div>
              <label htmlFor="newPassword" className="block text-light mb-1">New Password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-darkGray text-light p-2 rounded focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-light mb-1">Confirm New Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-darkGray text-light p-2 rounded focus:outline-none focus:ring-1 focus:ring-accent"
              />
            </div>
          </div>
        )}
        
        <div className="flex justify-end space-x-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-darkGray text-light rounded hover:bg-gray-700"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-accent text-dark rounded hover:bg-darkGold"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileEdit;