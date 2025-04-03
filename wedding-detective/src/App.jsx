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

// Footer component that checks if it should be displayed
const AppFooter = () => {
  const location = useLocation();
  
  if (location.pathname.startsWith('/portal') || location.pathname.startsWith('/admin')) {
    return null;
  }
  
  return (
    <footer className="bg-gray-800 text-white py-6 sm:py-8 mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div className="text-center md:text-left space-y-2">
            <h2 className="text-lg sm:text-xl font-bold">Wedding Detective Service</h2>
            <p className="text-gray-400 text-sm sm:text-base">Trust But Verify</p>
          </div>
          
          <div className="text-center md:text-right space-y-2">
            <p className="text-gray-400 text-sm sm:text-base">All communications are encrypted and confidential</p>
            <p className="text-gray-400 text-sm sm:text-base">&copy; {new Date().getFullYear()} Wedding Detective Service. All rights reserved.</p>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-gray-700">
          <nav className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <Link to="/terms-of-service" className="text-gray-400 hover:text-accent text-sm whitespace-nowrap">Terms of Service</Link>
            <Link to="/privacy-policy" className="text-gray-400 hover:text-accent text-sm whitespace-nowrap">Privacy Policy</Link>
          </nav>
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
