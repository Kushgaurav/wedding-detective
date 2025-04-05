import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    termsAgreed: false
  });
  const [formErrors, setFormErrors] = useState({});
  const { register, error } = useAuth();
  const navigate = useNavigate();

  const { name, email, password, confirmPassword, termsAgreed } = formData;

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const validateForm = () => {
    const errors = {};
    
    if (!name.trim()) errors.name = 'Name is required';
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }
    
    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }
    
    if (!termsAgreed) {
      errors.termsAgreed = 'You must agree to the Terms of Service and Privacy Policy';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      const success = await register(name, email, password);
      if (success) {
        navigate('/portal');
      }
    }
  };

  return (
    <div className="min-h-screen bg-primary py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-light">Create your <span className="text-accent">account</span></h2>
          <p className="mt-2 text-sm text-light/70">
            Or{' '}
            <Link to="/login" className="font-medium text-accent hover:text-darkGold">
              sign in to your existing account
            </Link>
          </p>
        </div>
        
        {error && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={name}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-darkGray bg-secondary placeholder-gray-500 text-light focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Full Name"
              />
              {formErrors.name && <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>}
            </div>
            
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-darkGray bg-secondary placeholder-gray-500 text-light focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
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
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-darkGray bg-secondary placeholder-gray-500 text-light focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Password"
              />
              {formErrors.password && <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>}
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-darkGray bg-secondary placeholder-gray-500 text-light focus:outline-none focus:ring-accent focus:border-accent focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
              {formErrors.confirmPassword && <p className="text-red-400 text-xs mt-1">{formErrors.confirmPassword}</p>}
            </div>
          </div>

          <div className="flex items-center mt-4">
            <input
              id="termsAgreed"
              name="termsAgreed"
              type="checkbox"
              checked={termsAgreed}
              onChange={handleChange}
              className={`h-4 w-4 text-accent focus:ring-accent border-darkGray rounded bg-secondary ${formErrors.termsAgreed ? 'border-red-500 ring-1 ring-red-500' : ''}`}
            />
            <label htmlFor="termsAgreed" className={`ml-2 block text-sm ${formErrors.termsAgreed ? 'text-red-400' : 'text-light/70'}`}>
              I agree to the <Link to="/terms-of-service" className="text-accent hover:text-darkGold">Terms of Service</Link> and <Link to="/privacy-policy" className="text-accent hover:text-darkGold">Privacy Policy</Link>
            </label>
          </div>
          {formErrors.termsAgreed && (
            <div className="mt-2 bg-red-900/30 border border-red-500 text-red-400 text-xs px-3 py-2 rounded-md font-medium">
              {formErrors.termsAgreed}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="btn-primary group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              Register
            </button>
          </div>
        </form>
        
        <div className="border-t border-darkGray pt-6">
          <div className="flex items-center">
            <svg className="h-6 w-6 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
            </svg>
            <span className="text-sm text-light/70">All communications are encrypted and confidential</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;