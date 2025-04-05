import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProfileEdit from '../../components/ProfileEdit';
import {
  getConsultations, 
  updateConsultationStatus, 
  getCases, 
  getUsers, 
  getServices, 
  getPayments,
  updateCase,
  deleteCase,
  createCase
} from '../../services/api';

const AdminDashboard = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    activeCases: 0,
    pendingConsultations: 0,
    completedInvestigations: 0,
    totalClients: 0
  });
  const [recentConsultations, setRecentConsultations] = useState([]);
  const [activeCases, setActiveCases] = useState([]);
  const [services, setServices] = useState([]);
  const [recentPayments, setRecentPayments] = useState([]);
  const [users, setUsers] = useState([]);
  const [clientMessages, setClientMessages] = useState([]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [messageReply, setMessageReply] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationNotes, setConsultationNotes] = useState('');
  const [dataLoading, setDataLoading] = useState(true);
  const [apiError, setApiError] = useState(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newCaseData, setNewCaseData] = useState({
    title: '',
    description: '',
    assignedTo: '',
    clientId: '',
    status: 'Active',
    priority: 'Medium',
    updateMethod: 'Encrypted Email'
  });
  const [editCase, setEditCase] = useState(null);
  const [showCaseModal, setShowCaseModal] = useState(false);
  
  // Pagination states
  const [casesPage, setCasesPage] = useState(1);
  const [consultationsPage, setConsultationsPage] = useState(1);
  const [usersPage, setUsersPage] = useState(1);
  const [paymentsPage, setPaymentsPage] = useState(1);
  
  const limit = 10;

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user?.isAdmin)) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate, loading]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Initialize data fetching
  useEffect(() => {
    if (loading || !isAuthenticated || !user?.isAdmin) return;
    
    const fetchDashboardData = async () => {
      setDataLoading(true);
      setApiError(null);
      
      try {
        const [consultationsData, casesData, usersData, servicesData, paymentsData] = await Promise.allSettled([
          getConsultations({ page: 1, limit: 10, status: 'all' }),
          getCases({ page: 1, limit: 10, status: 'Active' }),
          getUsers({ page: 1, limit: 10 }),
          getServices(),
          getPayments({ page: 1, limit: 10 })
        ]);
        
        // Process consultations data
        if (consultationsData.status === 'fulfilled' && consultationsData.value) {
          setRecentConsultations(consultationsData.value.consultations || []);
          setStats(prev => ({ 
            ...prev, 
            pendingConsultations: consultationsData.value.consultations.filter(c => c.status === 'pending').length || 0
          }));
        }
        
        // Process cases data
        if (casesData.status === 'fulfilled' && casesData.value) {
          setActiveCases(casesData.value.cases || []);
          setStats(prev => ({ 
            ...prev, 
            activeCases: casesData.value.totalCases || 0,
            completedInvestigations: casesData.value.cases.filter(c => c.status === 'Completed').length || 0
          }));
        }
        
        // Process users data
        if (usersData.status === 'fulfilled' && usersData.value) {
          setUsers(usersData.value.users || []);
          setStats(prev => ({ 
            ...prev, 
            totalClients: usersData.value.users.filter(u => u.role === 'client').length || 0
          }));
        }
        
        // Process services data
        if (servicesData.status === 'fulfilled' && servicesData.value) {
          setServices(servicesData.value || []);
        }
        
        // Process payments data
        if (paymentsData.status === 'fulfilled' && paymentsData.value) {
          setRecentPayments(paymentsData.value.payments || []);
        }
        
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
        setApiError('Failed to load dashboard data. Please try again.');
      } finally {
        setDataLoading(false);
      }
    };
    
    fetchDashboardData();
  }, [user?.isAdmin, isAuthenticated, loading]);

  // Handle consultation status update
  const handleUpdateConsultationStatus = async (id, status) => {
    try {
      const response = await updateConsultationStatus(id, { status });
      
      if (response) {
        // Update the consultations list with the updated status
        setRecentConsultations(prev => 
          prev.map(consultation => 
            consultation._id === id ? { ...consultation, status } : consultation
          )
        );
        
        // If a consultation is selected and visible in the modal, update that too
        if (selectedConsultation && selectedConsultation._id === id) {
          setSelectedConsultation({ ...selectedConsultation, status });
        }
        
        // Update the count in stats
        if (status === 'pending' || selectedConsultation?.status === 'pending') {
          setStats(prev => ({
            ...prev,
            pendingConsultations: status === 'pending' 
              ? prev.pendingConsultations + 1 
              : prev.pendingConsultations - 1
          }));
        }
      }
    } catch (error) {
      console.error('Error updating consultation status:', error);
      setApiError('Failed to update consultation status');
    }
  };

  // Filter consultations based on status and search term
  const getFilteredConsultations = () => {
    return recentConsultations.filter(consultation => {
      const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
      const matchesSearch = searchTerm === '' || 
        (consultation.name && consultation.name.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (consultation.email && consultation.email.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (consultation._id && consultation._id.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return matchesStatus && matchesSearch;
    });
  };

  // Load more consultations
  const loadMoreConsultations = async () => {
    try {
      setDataLoading(true);
      const nextPage = consultationsPage + 1;
      const response = await getConsultations({ page: nextPage, limit, status: statusFilter });
      
      if (response && response.consultations && response.consultations.length > 0) {
        setRecentConsultations(prev => [...prev, ...response.consultations]);
        setConsultationsPage(nextPage);
      }
    } catch (error) {
      console.error('Error loading more consultations:', error);
      setApiError('Failed to load more consultations');
    } finally {
      setDataLoading(false);
    }
  };

  // Handle case create/update
  const handleCaseSubmit = async (e) => {
    e.preventDefault();
    
    try {
      let response;
      
      if (editCase) {
        // Update existing case
        response = await updateCase(editCase._id, {
          ...newCaseData,
          updatedAt: new Date()
        });
        
        if (response) {
          setActiveCases(prev => 
            prev.map(c => c._id === editCase._id ? response : c)
          );
        }
      } else {
        // Create new case
        response = await createCase({
          ...newCaseData,
          createdAt: new Date(),
          progress: 0
        });
        
        if (response) {
          setActiveCases(prev => [response, ...prev]);
          setStats(prev => ({
            ...prev,
            activeCases: prev.activeCases + 1
          }));
        }
      }
      
      // Reset and close modal
      setShowCaseModal(false);
      setEditCase(null);
      setNewCaseData({
        title: '',
        description: '',
        assignedTo: '',
        clientId: '',
        status: 'Active',
        priority: 'Medium',
        updateMethod: 'Encrypted Email'
      });
      
    } catch (error) {
      console.error('Error submitting case:', error);
      setApiError('Failed to submit case data');
    }
  };

  // Handle case delete
  const handleDeleteCase = async (caseId) => {
    try {
      await deleteCase(caseId);
      
      setActiveCases(prev => prev.filter(c => c._id !== caseId));
      setStats(prev => ({
        ...prev,
        activeCases: prev.activeCases - 1
      }));
      
    } catch (error) {
      console.error('Error deleting case:', error);
      setApiError('Failed to delete case');
    }
  };

  // Open case modal for editing
  const handleEditCase = (caseData) => {
    setEditCase(caseData);
    setNewCaseData({
      title: caseData.title || '',
      description: caseData.description || '',
      assignedTo: caseData.assignedTo || '',
      clientId: caseData.clientId || '',
      status: caseData.status || 'Active',
      priority: caseData.priority || 'Medium',
      updateMethod: caseData.updateMethod || 'Encrypted Email'
    });
    setShowCaseModal(true);
  };

  // Create new case
  const handleNewCase = () => {
    setEditCase(null);
    setNewCaseData({
      title: '',
      description: '',
      assignedTo: '',
      clientId: '',
      status: 'Active',
      priority: 'Medium',
      updateMethod: 'Encrypted Email'
    });
    setShowCaseModal(true);
  };

  // Case Modal component
  const CaseModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
      <div className="bg-secondary rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center border-b border-darkGray p-4">
          <h4 className="text-xl font-bold text-light">
            {editCase ? 'Edit Case' : 'Create New Case'}
          </h4>
          <button 
            onClick={() => setShowCaseModal(false)}
            className="text-light/50 hover:text-light"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <form onSubmit={handleCaseSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-light/70 mb-1">Case Title*</label>
                <input
                  type="text"
                  value={newCaseData.title}
                  onChange={(e) => setNewCaseData({...newCaseData, title: e.target.value})}
                  className="w-full bg-darkGray border border-darkGold text-light p-2 rounded"
                  required
                />
              </div>
              <div>
                <label className="block text-light/70 mb-1">Status</label>
                <select
                  value={newCaseData.status}
                  onChange={(e) => setNewCaseData({...newCaseData, status: e.target.value})}
                  className="w-full bg-darkGray border border-darkGold text-light p-2 rounded"
                >
                  <option value="Active">Active</option>
                  <option value="Pending">Pending</option>
                  <option value="On Hold">On Hold</option>
                  <option value="Completed">Completed</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-light/70 mb-1">Assigned To</label>
                <select
                  value={newCaseData.assignedTo}
                  onChange={(e) => setNewCaseData({...newCaseData, assignedTo: e.target.value})}
                  className="w-full bg-darkGray border border-darkGold text-light p-2 rounded"
                >
                  <option value="">Select Investigator</option>
                  {users.filter(user => user.role === 'investigator').map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name || user.email}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-light/70 mb-1">Client</label>
                <select
                  value={newCaseData.clientId}
                  onChange={(e) => setNewCaseData({...newCaseData, clientId: e.target.value})}
                  className="w-full bg-darkGray border border-darkGold text-light p-2 rounded"
                >
                  <option value="">Select Client</option>
                  {users.filter(user => user.role === 'client').map(user => (
                    <option key={user._id} value={user._id}>
                      {user.name || user.email}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-light/70 mb-1">Priority</label>
                <select
                  value={newCaseData.priority}
                  onChange={(e) => setNewCaseData({...newCaseData, priority: e.target.value})}
                  className="w-full bg-darkGray border border-darkGold text-light p-2 rounded"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-light/70 mb-1">Update Method</label>
                <select
                  value={newCaseData.updateMethod}
                  onChange={(e) => setNewCaseData({...newCaseData, updateMethod: e.target.value})}
                  className="w-full bg-darkGray border border-darkGold text-light p-2 rounded"
                >
                  <option value="Encrypted Email">Encrypted Email</option>
                  <option value="Secure Phone Call">Secure Phone Call</option>
                  <option value="In-Person Meeting">In-Person Meeting</option>
                  <option value="Client Portal">Client Portal Only</option>
                </select>
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-light/70 mb-1">Description</label>
              <textarea
                value={newCaseData.description}
                onChange={(e) => setNewCaseData({...newCaseData, description: e.target.value})}
                className="w-full bg-darkGray border border-darkGold text-light p-2 rounded"
                rows="4"
              ></textarea>
            </div>
            
            <div className="flex justify-end space-x-3">
              {editCase && (
                <button
                  type="button"
                  onClick={() => handleDeleteCase(editCase._id)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete Case
                </button>
              )}
              <button
                type="button"
                onClick={() => setShowCaseModal(false)}
                className="px-4 py-2 bg-darkGray text-light rounded hover:bg-darkGray/70"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-white rounded hover:bg-darkGold"
              >
                {editCase ? 'Update Case' : 'Create Case'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

  // Show case modal if needed
  if (showCaseModal) {
    return (
      <>
        <div className="min-h-screen bg-primary flex">
          {/* Main content here */}
        </div>
        <CaseModal />
      </>
    );
  }

  if (!user?.isAdmin) {
    return null;
  }

  // Rest of your component remains the same...
  
  // Include the CaseManagement component
  const CaseManagement = () => (
    <div className="bg-secondary p-6 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-light">Case Management</h3>
        <button 
          onClick={handleNewCase}
          className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded"
        >
          Create New Case
        </button>
      </div>
      
      <div className="mb-6 flex flex-wrap gap-3">
        <select
          className="bg-darkGray border border-darkGray/50 text-light px-3 py-2 rounded"
          onChange={(e) => {
            // Filter cases by status
          }}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Pending">Pending</option>
          <option value="On Hold">On Hold</option>
          <option value="Completed">Completed</option>
          <option value="Archived">Archived</option>
        </select>
        
        <select
          className="bg-darkGray border border-darkGray/50 text-light px-3 py-2 rounded"
          onChange={(e) => {
            // Filter cases by priority
          }}
        >
          <option value="all">All Priorities</option>
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
          <option value="Urgent">Urgent</option>
        </select>
        
        <div className="relative flex-grow">
          <input 
            type="text"
            placeholder="Search cases..."
            className="w-full bg-darkGray border border-darkGray/50 text-light px-3 py-2 rounded"
            onChange={(e) => {
              // Search cases
            }}
          />
        </div>
      </div>
      
      {dataLoading ? (
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent mx-auto"></div>
          <p className="mt-2 text-light/70">Loading cases...</p>
        </div>
      ) : apiError ? (
        <div className="bg-red-900/30 border border-red-500 text-red-200 p-4 rounded">
          <p>{apiError}</p>
          <button 
            className="mt-2 text-accent hover:text-darkGold underline"
            onClick={() => {
              setApiError(null);
              // Retry loading cases
            }}
          >
            Retry
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-darkGray">
                <th className="text-left pb-2 text-light/70">ID</th>
                <th className="text-left pb-2 text-light/70">Title</th>
                <th className="text-left pb-2 text-light/70">Client</th>
                <th className="text-left pb-2 text-light/70">Investigator</th>
                <th className="text-left pb-2 text-light/70">Status</th>
                <th className="text-left pb-2 text-light/70">Progress</th>
                <th className="text-right pb-2 text-light/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {activeCases.map(caseItem => (
                <tr key={caseItem._id} className="border-b border-darkGray hover:bg-darkGray/20">
                  <td className="py-3 text-light">{caseItem.caseId || caseItem._id.substring(0, 8)}</td>
                  <td className="py-3 text-light">{caseItem.title}</td>
                  <td className="py-3 text-light/70">
                    {caseItem.clientName || 'Not assigned'}
                  </td>
                  <td className="py-3 text-light/70">
                    {caseItem.investigatorName || 'Not assigned'}
                  </td>
                  <td className="py-3">
                    <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                      ${caseItem.status === 'Active' ? 'bg-green-500/20 text-green-500' : 
                        caseItem.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-500' :
                        caseItem.status === 'On Hold' ? 'bg-orange-500/20 text-orange-500' :
                        caseItem.status === 'Completed' ? 'bg-blue-500/20 text-blue-500' :
                        'bg-gray-500/20 text-gray-500'}`}
                    >
                      {caseItem.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="w-full bg-darkGray rounded-full h-2">
                      <div 
                        className="bg-accent h-2 rounded-full"
                        style={{ width: `${caseItem.progress || 0}%` }}
                      ></div>
                    </div>
                  </td>
                  <td className="py-3 text-right">
                    <button 
                      onClick={() => handleEditCase(caseItem)}
                      className="text-accent hover:text-darkGold"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {activeCases.length === 0 && (
            <div className="text-center py-8 text-light/50">
              <p>No cases found matching your criteria</p>
            </div>
          )}
          
          {activeCases.length > 0 && (
            <div className="mt-4 text-center">
              <button 
                onClick={() => {
                  // Load more cases
                }}
                className="text-accent hover:text-darkGold"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-primary flex">
      {/* Sidebar navigation */}
      <div className="w-64 bg-secondary border-r border-darkGray hidden lg:block">
        <div className="p-4 border-b border-darkGray">
          <h2 className="text-xl font-bold text-accent">Admin Panel</h2>
          <p className="text-light text-sm mt-1">Wedding Detective</p>
        </div>
        
        <div className="p-4">
          <div className="mb-6">
            <h3 className="text-light text-xs uppercase tracking-wider mb-3">Main</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection('dashboard')}
                  className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                    activeSection === 'dashboard'
                      ? 'bg-accent/10 text-accent'
                      : 'text-light hover:bg-darkGray'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" />
                    <path d="M3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6z" />
                    <path d="M13 10a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                  Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('users')}
                  className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                    activeSection === 'users'
                      ? 'bg-accent/10 text-accent'
                      : 'text-light hover:bg-darkGray'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.660.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                  </svg>
                  User Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('consultations')}
                  className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                    activeSection === 'consultations'
                      ? 'bg-accent/10 text-accent'
                      : 'text-light hover:bg-darkGray'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z" clipRule="evenodd" />
                  </svg>
                  Consultations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('services')}
                  className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                    activeSection === 'services'
                      ? 'bg-accent/10 text-accent'
                      : 'text-light hover:bg-darkGray'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('cases')}
                  className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                    activeSection === 'cases'
                      ? 'bg-accent/10 text-accent'
                      : 'text-light hover:bg-darkGray'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z" clipRule="evenodd" />
                    <path d="M6 12a2 2 0 012-2h8a2 2 0 012 2v2a2 2 0 01-2 2H2h2a2 2 0 002-2v-2z" />
                  </svg>
                  Cases
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('payments')}
                  className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                    activeSection === 'payments'
                      ? 'bg-accent/10 text-accent'
                      : 'text-light hover:bg-darkGray'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  Payments
                </button>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-light text-xs uppercase tracking-wider mb-3">Settings</h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setShowProfileEdit(true)}
                  className="w-full flex items-center px-2 py-2 text-sm rounded-md text-light hover:bg-darkGray"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  Account Settings
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-2 py-2 text-sm rounded-md text-red-500 hover:bg-darkGray"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 102 0V4a1 1 0 00-1-1zm10.293 9.293a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3a1 1 0 10-1.414 1.414L14.586 9H7a1 1 0 100 2h7.586l-1.293 1.293z" clipRule="evenodd" />
                  </svg>
                  Log Out
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex-1 overflow-x-hidden">
        <div className="bg-secondary p-4 border-b border-darkGray flex justify-between items-center">
          <div className="flex items-center">
            <button className="lg:hidden text-light mr-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-xl text-light font-bold">
              {activeSection === 'dashboard' && 'Dashboard Overview'}
              {activeSection === 'users' && 'User Management'}
              {activeSection === 'consultations' && 'Consultation Requests'}
              {activeSection === 'services' && 'Service Management'}
              {activeSection === 'cases' && 'Case Management'}
              {activeSection === 'payments' && 'Payment Management'}
            </h1>
          </div>
          
          <div className="relative">
            <button 
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center text-light"
            >
              <div className="bg-darkGold h-8 w-8 rounded-full flex items-center justify-center mr-2">
                <span className="font-bold text-white">{user?.name?.charAt(0) || 'A'}</span>
              </div>
              <span className="mr-2 hidden sm:inline-block">{user?.name || 'Admin'}</span>
              <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 transition-transform ${showUserMenu ? 'transform rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 py-2 bg-secondary rounded-md shadow-lg z-10 border border-darkGray">
                <button
                  onClick={() => {
                    setShowProfileEdit(true);
                    setShowUserMenu(false);
                  }}
                  className="w-full text-left px-4 py-2 text-light hover:bg-darkGray"
                >
                  Account Settings
                </button>
                <div className="border-t border-darkGray my-1"></div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-darkGray"
                >
                  Log Out
                </button>
              </div>
            )}
          </div>
        </div>
        
        {showProfileEdit && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-secondary rounded-lg shadow-xl max-w-2xl w-full">
              <div className="flex justify-between items-center border-b border-darkGray p-4">
                <h2 className="text-xl font-bold text-light">Account Settings</h2>
                <button 
                  onClick={() => setShowProfileEdit(false)}
                  className="text-light/50 hover:text-light"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                <ProfileEdit onClose={() => setShowProfileEdit(false)} />
              </div>
            </div>
          </div>
        )}
        
        <div className="p-6">
          {activeSection === 'dashboard' && <AdminOverview />}
          {activeSection === 'users' && <UserManagement />}
          {activeSection === 'consultations' && <ConsultationManagement />}
          {activeSection === 'services' && (
            <>
              <UserManagement />
              <ServiceManagement />
            </>
          )}
          {activeSection === 'payments' && <PaymentManagement />}
          {activeSection === 'cases' && <CaseManagement />}
        </div>
      </div>
      
      {showProfileEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-secondary rounded-lg shadow-xl max-w-2xl w-full">
            <div className="flex justify-between items-center border-b border-darkGray p-4">
              <h2 className="text-xl font-bold text-light">Account Settings</h2>
              <button 
                onClick={() => setShowProfileEdit(false)}
                className="text-light/50 hover:text-light"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <ProfileEdit onClose={() => setShowProfileEdit(false)} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;