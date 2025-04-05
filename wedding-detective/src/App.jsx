import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import './App.css'

// Import Components
import NavBar from './components/NavBar'

// Import Pages
import HomePage from './pages/HomePage'
import ServicePage from './pages/ServicePage'
import VerificationProcess from './pages/VerificationProcess'
import CaseStudies from './pages/CaseStudies'
import ComplianceCenter from './pages/ComplianceCenter'
import ConfidentialConsultation from './pages/ConfidentialConsultation'
import InvestigatorNetwork from './pages/InvestigatorNetwork'
import ClientPortal from './pages/ClientPortal'
import VerificationReports from './pages/VerificationReports'
import DocumentVault from './pages/DocumentVault'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminDashboard from './pages/Admin/AdminDashboard'
import TermsOfService from './pages/TermsOfService'
import PrivacyPolicy from './pages/PrivacyPolicy'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

// ScrollToTop component to ensure page starts from the top on navigation and refresh
const ScrollToTop = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
};

// Enhanced Footer component with better design that matches the wedding detective theme
const AppFooter = () => {
  const location = useLocation();
  
  // Don't show footer in portal or admin areas
  if (location.pathname.startsWith('/portal') || location.pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <footer className="bg-secondary border-t border-darkGray text-light mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-10 sm:py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            {/* Brand section */}
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center gap-2">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10H3" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 6H3" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 14H3" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 18H3" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className="text-xl font-serif font-bold">
                  <span className="text-accent">Wedding</span>
                  <span className="text-light">Detective</span>
                </span>
              </div>
              <p className="mt-3 text-light/70 text-center md:text-left text-sm">
                Professional pre-marital investigation services to ensure peace of mind before saying "I do"
              </p>
              <div className="mt-4 flex space-x-4">
                <a href="https://twitter.com" className="text-light hover:text-accent transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="https://facebook.com" className="text-light hover:text-accent transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd"></path>
                  </svg>
                </a>
                <a href="https://instagram.com" className="text-light hover:text-accent transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="md:mx-auto">
              <h3 className="text-lg font-bold mb-3 sm:mb-4 text-light">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/services" className="text-light/70 hover:text-accent transition-colors text-sm">Services</Link>
                </li>
                <li>
                  <Link to="/process" className="text-light/70 hover:text-accent transition-colors text-sm">Process</Link>
                </li>
                <li>
                  <Link to="/case-studies" className="text-light/70 hover:text-accent transition-colors text-sm">Case Studies</Link>
                </li>
                <li>
                  <Link to="/consultation" className="text-light/70 hover:text-accent transition-colors text-sm">Book Consultation</Link>
                </li>
                <li>
                  <Link to="/login" className="text-light/70 hover:text-accent transition-colors text-sm">Client Login</Link>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div className="text-center md:text-right">
              <h3 className="text-lg font-bold mb-3 sm:mb-4 text-light">Contact</h3>
              <div className="space-y-2">
                <p className="text-light/70 text-sm flex items-center justify-center md:justify-end">
                  <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  <span>gauravkushwaha@outlook.in</span>
                </p>
                <p className="text-light/70 text-sm flex items-center justify-center md:justify-end">
                  <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"></path>
                  </svg>
                  <span>+91 6388850059</span>
                </p>
                <p className="text-light/70 text-sm flex items-center justify-center md:justify-end">
                  <svg className="w-4 h-4 mr-2 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <span>Gramsabha Gate, Chaka, Naini,<br className="hidden md:inline" /> Prayagraj, UP, India - 211008</span>
                </p>
                <p className="text-light/70 text-sm flex items-center justify-center md:justify-end mt-1">
                  <svg className="w-4 h-4 mr-2 text-accent flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                  <span>Gaurav Kushwaha, Founder</span>
                </p>
              </div>
              <div className="mt-4">
                <Link to="/consultation" className="bg-accent text-primary hover:bg-dark-gold px-4 py-2 rounded text-sm font-medium inline-block transition-colors">
                  Free Consultation
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="py-4 border-t border-darkGray flex flex-col sm:flex-row justify-between items-center">
          <p className="text-light/70 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Wedding Detective. <span className="hidden sm:inline">All communications are encrypted and confidential.</span>
          </p>
          <div className="flex gap-4 sm:gap-8 mt-3 sm:mt-0">
            <Link to="/terms-of-service" className="text-light/70 hover:text-accent text-xs sm:text-sm transition-colors">Terms of Service</Link>
            <Link to="/privacy-policy" className="text-light/70 hover:text-accent text-xs sm:text-sm transition-colors">Privacy Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-primary flex flex-col">
          <NavBar />

          <main className="flex-1 w-full max-w-[95rem] mx-auto px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicePage />} />
              <Route path="/process" element={<VerificationProcess />} />
              <Route path="/case-studies" element={<CaseStudies />} />
              <Route path="/compliance" element={<ComplianceCenter />} />
              <Route path="/consultation" element={<ConfidentialConsultation />} />
              <Route path="/investigators" element={<InvestigatorNetwork />} />
              <Route path="/reports" element={<VerificationReports />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/documents" element={
                <ProtectedRoute>
                  <DocumentVault />
                </ProtectedRoute>
              } />
              <Route path="/portal/*" element={
                <ProtectedRoute>
                  <ClientPortal />
                </ProtectedRoute>
              } />
              <Route path="/admin/*" element={
                <AdminRoute>
                  <AdminDashboard />
                </AdminRoute>
              } />
            </Routes>
          </main>

          <AppFooter />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
