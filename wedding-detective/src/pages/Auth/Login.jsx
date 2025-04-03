import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const { login, error, user } = useAuth();
  const navigate = useNavigate();

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = await login(email, password);
      if (success) {
        // Access the user directly from context, which now has the isAdmin property
        // that's calculated based on the role field from the database
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData?.isAdmin) {
          navigate('/admin'); // Redirect admins to admin dashboard
        } else {
          navigate('/portal'); // Redirect regular users to client portal
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-light">Sign <span className="text-accent">in</span></h2>
          <p className="mt-2 text-sm text-light/70">
            Or{' '}
            <Link to="/register" className="font-medium text-accent hover:text-darkGold">
              create a new account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div className="mb-4">
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-darkGray bg-secondary placeholder-gray-500 text-light rounded-t-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
              {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={handleChange}
                className="appearance-none rounded-none relative block w-full px-3 py-3 border border-darkGray bg-secondary placeholder-gray-500 text-light rounded-b-md focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {formErrors.password && <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-accent focus:ring-accent border-darkGray rounded bg-secondary"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-light/70">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" className="font-medium text-accent hover:text-darkGold">
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
        
        <div className="flex items-center justify-center mt-6">
          <div className="text-center">
            <p className="text-sm text-light/70">
              Need professional verification services?{' '}
              <Link to="/services" className="font-medium text-accent hover:text-darkGold">
                View our packages
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;