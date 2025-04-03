import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useEffect, useState } from 'react';

const AdminRoute = ({ children }) => {
  const { isAuthenticated, loading, user } = useAuth();
  const [redirectToLogin, setRedirectToLogin] = useState(false);

  useEffect(() => {
    // Only make a decision once the authentication check is complete
    if (!loading) {
      // If not authenticated or not admin, we'll redirect to login
      if (!isAuthenticated || !user?.isAdmin) {
        setRedirectToLogin(true);
      }
    }
  }, [loading, isAuthenticated, user]);
  
  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  // Redirect to login if needed
  if (redirectToLogin) {
    return <Navigate to="/login" replace />;
  }
  
  // If authenticated and admin, render the protected component
  return children;
};

export default AdminRoute;