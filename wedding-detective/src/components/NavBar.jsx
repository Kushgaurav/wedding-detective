import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ProfileEdit from './ProfileEdit';

const NavBar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileButtonRef = useRef(null);

  // Add scroll listener for navbar animation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Add click outside listener to close dropdown
  useEffect(() => {
    function handleClickOutside(event) {
      // Only close if clicking outside both the dropdown and the button that opens it
      if (
        dropdownRef.current && 
        !dropdownRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setProfileDropdownOpen(false);
      }
    }

    // Add event listener when dropdown is open
    if (profileDropdownOpen) {
      // Small delay to prevent immediate closing
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 100);
    }
    
    // Clean up the event listener
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [profileDropdownOpen]);

  // Close dropdown when pressing escape key
  useEffect(() => {
    function handleEscKey(event) {
      if (event.key === 'Escape') {
        setProfileDropdownOpen(false);
      }
    }

    if (profileDropdownOpen) {
      document.addEventListener('keydown', handleEscKey);
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [profileDropdownOpen]);

  const toggleMobileMenu = () => {
    // Close profile dropdown if opening mobile menu
    if (!mobileMenuOpen) {
      setProfileDropdownOpen(false);
    }
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleProfileDropdown = (e) => {
    e.stopPropagation(); // Prevent event bubbling
    setProfileDropdownOpen(!profileDropdownOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setProfileDropdownOpen(false);
  };

  return (
    <>
      <header className={`fixed top-2 left-2 right-2 z-50 transition-all duration-300 ease-in-out ${scrolled ? 'translate-y-0' : 'translate-y-1'}`}>
        <div className={`backdrop-blur-md bg-black/85 rounded-full shadow-lg ${scrolled ? 'shadow-accent/20' : 'shadow-accent/10'} transition-all duration-300 mx-auto py-2 px-3 sm:px-4 flex flex-wrap sm:flex-nowrap justify-between items-center max-w-7xl`}>
          <div className="flex items-center justify-between w-full sm:w-auto">
            <Link to="/" className="text-base sm:text-lg font-serif font-bold flex items-center gap-1">
              <span className="text-accent">Wedding</span>
              <span className="text-light">Detective</span>
            </Link>
            <button 
              className="block sm:hidden text-light focus:outline-none hover:text-accent transition-colors p-2" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
          
          <nav className={`${mobileMenuOpen ? 'max-h-[calc(100vh-6rem)] opacity-100 mt-3' : 'max-h-0 opacity-0 sm:opacity-100 sm:max-h-none'} w-full sm:w-auto sm:mt-0 transition-all duration-300 ease-in-out overflow-hidden sm:overflow-visible`}>
            <ul className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 items-center text-sm">
              <li><Link to="/services" className="hover:text-accent transition-colors block" onClick={() => setMobileMenuOpen(false)}>Services</Link></li>
              <li><Link to="/process" className="hover:text-accent transition-colors block" onClick={() => setMobileMenuOpen(false)}>Process</Link></li>
              <li><Link to="/case-studies" className="hover:text-accent transition-colors block" onClick={() => setMobileMenuOpen(false)}>Cases</Link></li>
              <li><Link to="/consultation" className="hover:text-accent transition-colors block" onClick={() => setMobileMenuOpen(false)}>Consultation</Link></li>
              
              {isAuthenticated ? (
                <>
                  {/* Welcome message for logged-in users */}
                  <li className="border-l border-gray-700/40 pl-4 ml-2">
                    <div className="flex items-center">
                      <div className="hidden sm:block text-right">
                        <p className="text-light">Welcome, <span className="text-accent">{user?.name || 'User'}</span></p>
                        {user?.isAdmin && <p className="text-light/70 text-sm">Admin Dashboard</p>}
                      </div>
                      <div className="relative ml-3">
                        <div 
                          ref={profileButtonRef}
                          className="w-8 h-8 rounded-full bg-accent flex items-center justify-center text-primary font-bold cursor-pointer hover:bg-yellow-700 transition-colors hover:scale-105"
                          onClick={toggleProfileDropdown}
                          aria-expanded={profileDropdownOpen}
                          aria-haspopup="true"
                        >
                          {user?.name?.charAt(0) || 'U'}
                        </div>
                        
                        {profileDropdownOpen && (
                          <div 
                            className="fixed z-[1] top-16 sm:top-auto right-4 sm:right-0 w-[calc(100vw-2rem)] sm:w-64 bg-gray-800/95 border border-gray-700 rounded-xl shadow-lg shadow-accent/10 overflow-hidden backdrop-blur-md"
                            ref={dropdownRef}
                          >
                            <div className="py-1">
                              <div className="border-b border-gray-700/60 px-4 py-2">
                                <p className="text-light font-medium">Logged in as:</p>
                                <p className="text-accent">{user?.name || 'User'}</p>
                                <p className="text-light/70 text-xs">{user?.email}</p>
                              </div>
                              
                              <button 
                                onClick={() => {
                                  setShowProfileModal(true);
                                  setProfileDropdownOpen(false);
                                }}
                                className="block w-full text-left px-4 py-2 text-light hover:bg-gray-900/30 transition-colors"
                              >
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                                  </svg>
                                  My Profile
                                </div>
                              </button>
                              
                              <Link 
                                to={user?.isAdmin ? "/admin" : "/portal"} 
                                className="block px-4 py-2 text-light hover:bg-gray-900/30 w-full text-left transition-colors"
                                onClick={() => setProfileDropdownOpen(false)}
                              >
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                                  </svg>
                                  {user?.isAdmin ? "Admin Dashboard" : "Client Portal"}
                                </div>
                              </Link>
                              
                              <Link 
                                to="/documents" 
                                className="block px-4 py-2 text-light hover:bg-gray-900/30 w-full text-left transition-colors"
                                onClick={() => setProfileDropdownOpen(false)}
                              >
                                <div className="flex items-center">
                                  <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"></path>
                                  </svg>
                                  Document Vault
                                </div>
                              </Link>

                              <div className="border-t border-gray-700/60">
                                <button
                                  onClick={handleLogout}
                                  className="block w-full text-left px-4 py-2 text-light hover:bg-red-800/30 transition-colors"
                                >
                                  <div className="flex items-center text-red-400">
                                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    Sign Out
                                  </div>
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                </>
              ) : (
                <>
                  <li><Link to="/login" className="hover:text-accent transition-colors block" onClick={() => setMobileMenuOpen(false)}>Login</Link></li>
                  <li>
                    <Link 
                      to="/register" 
                      className="bg-accent/90 hover:bg-accent rounded-full px-5 py-1.5 text-primary font-medium transition-all hover:shadow-md hover:shadow-accent/20" 
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </header>
      
      {/* Increase offset height for mobile */}
      <div className="h-24 sm:h-20"></div>
      
      {/* Profile Edit Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-[200] p-4">
          <div className="relative max-h-[90vh] overflow-y-auto w-full max-w-2xl">
            <button 
              onClick={() => setShowProfileModal(false)}
              className="absolute top-4 right-4 text-light hover:text-accent focus:outline-none"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <ProfileEdit onClose={() => setShowProfileModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavBar;