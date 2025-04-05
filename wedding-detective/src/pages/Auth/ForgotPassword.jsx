import { useState } from 'react';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateForm = () => {
    const errors = {};
    
    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    setServerError('');

    // In a real application, this would make an API call to request a password reset
    // For now, we'll just simulate a successful submission after a short delay
    try {
      // Simulating API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      setIsSubmitted(true);
    } catch (error) {
      setServerError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-serif font-bold text-light">Reset your <span className="text-accent">password</span></h2>
          <p className="mt-2 text-sm text-light/70">
            Enter your email address and we'll send you instructions to reset your password
          </p>
        </div>
        
        {serverError && (
          <div className="bg-red-900/30 border border-red-500 text-red-200 px-4 py-3 rounded relative" role="alert">
            <span className="block sm:inline">{serverError}</span>
          </div>
        )}
        
        {isSubmitted ? (
          <div className="bg-green-900/30 border border-green-500 text-green-200 px-4 py-5 rounded relative text-center" role="alert">
            <div className="mb-3">
              <svg className="w-10 h-10 mx-auto text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <span className="block text-lg font-medium mb-2">Check your email</span>
            <p className="mb-4">If an account exists with the email <strong>{email}</strong>, we've sent password reset instructions.</p>
            <Link to="/login" className="text-accent hover:text-darkGold">
              Return to login
            </Link>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={handleChange}
                className="appearance-none rounded-md relative block w-full px-3 py-3 border border-darkGray bg-secondary placeholder-gray-500 text-light focus:outline-none focus:ring-accent focus:border-accent sm:text-sm"
                placeholder="Email address"
                disabled={isLoading}
              />
              {formErrors.email && <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>}
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </span>
                ) : "Send Reset Link"}
              </button>
            </div>

            <div className="flex items-center justify-center">
              <div className="text-sm">
                <Link to="/login" className="font-medium text-accent hover:text-darkGold">
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        )}
        
        <div className="flex items-center justify-center mt-6">
          <div className="text-center">
            <p className="text-sm text-light/70">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-accent hover:text-darkGold">
                Register now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;