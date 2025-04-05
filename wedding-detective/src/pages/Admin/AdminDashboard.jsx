import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import ProfileEdit from '../../components/ProfileEdit';

const AdminDashboard = () => {
  const { user, logout, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [stats, setStats] = useState({
    activeCases: 14,
    pendingConsultations: 7,
    completedInvestigations: 22,
    totalClients: 36
  });
  const [recentConsultations, setRecentConsultations] = useState([
    { 
      id: 'CON-2023', 
      name: 'Sarah Johnson', 
      email: 'sarah.j@example.com',
      phone: '(555) 123-4567',
      serviceInterest: 'Comprehensive Background Check',
      message: 'I\'m getting married in 6 months and would like to verify my fiancé\'s background. Particularly interested in financial history verification.',
      date: '2025-03-29', 
      status: 'pending' 
    },
    { 
      id: 'CON-2022', 
      name: 'Michael Chen', 
      email: 'mchen@example.com',
      phone: '(555) 987-6543',
      serviceInterest: 'Basic Verification Package',
      message: 'Need some basic verification of employment history and education credentials. Getting engaged soon.',
      date: '2025-03-28', 
      status: 'pending' 
    },
    { 
      id: 'CON-2021', 
      name: 'Emily Rodriguez', 
      email: 'emily.r@example.com',
      phone: '(555) 234-5678',
      serviceInterest: 'Premium Surveillance',
      message: 'I have suspicions about my partner\'s activities. Would like to discuss surveillance options discreetly.',
      date: '2025-03-27', 
      status: 'contacted' 
    },
    { 
      id: 'CON-2020', 
      name: 'David Wilson', 
      email: 'dwilson@example.com',
      phone: '(555) 876-5432',
      serviceInterest: 'International Background Check',
      message: 'My fiancée is from another country. Need thorough background verification including international records.',
      date: '2025-03-26', 
      status: 'scheduled' 
    }
  ]);
  const [activeCases, setActiveCases] = useState([
    { id: 'WD-29384', client: 'Rebecca Thompson', investigator: 'Agent #WD-117', progress: 75, status: 'active' },
    { id: 'WD-29382', client: 'James Miller', investigator: 'Agent #WD-205', progress: 40, status: 'active' },
    { id: 'WD-29379', client: 'Sophia Garcia', investigator: 'Agent #WD-117', progress: 90, status: 'active' },
    { id: 'WD-29376', client: 'Daniel Johnson', investigator: 'Agent #WD-303', progress: 25, status: 'active' }
  ]);
  const [services, setServices] = useState([
    { id: 1, name: 'Basic Verification Package', price: 299, active: true },
    { id: 2, name: 'Comprehensive Background Check', price: 799, active: true },
    { id: 3, name: 'Premium Surveillance', price: 1500, active: true },
    { id: 4, name: 'International Background Check', price: 400, active: true },
    { id: 5, name: 'Family Due Diligence', price: 999, active: true },
  ]);
  const [recentPayments, setRecentPayments] = useState([
    { id: 'PAY-2023', client: 'Rebecca Thompson', amount: 799, date: '2025-03-29', status: 'completed', method: 'Credit Card' },
    { id: 'PAY-2022', client: 'James Miller', amount: 299, date: '2025-03-28', status: 'completed', method: 'PayPal' },
    { id: 'PAY-2021', client: 'Sophia Garcia', amount: 1500, date: '2025-03-26', status: 'pending', method: 'Bank Transfer' },
    { id: 'PAY-2020', client: 'Daniel Johnson', amount: 400, date: '2025-03-24', status: 'completed', method: 'Cryptocurrency' },
  ]);
  const [users, setUsers] = useState([
    { id: 1, name: 'Rebecca Thompson', email: 'rebecca@example.com', role: 'client', status: 'active', lastLogin: '2025-03-30' },
    { id: 2, name: 'James Miller', email: 'james@example.com', role: 'client', status: 'active', lastLogin: '2025-03-28' },
    { id: 3, name: 'Agent #WD-117', email: 'agent117@detective.com', role: 'investigator', status: 'active', lastLogin: '2025-03-31' },
    { id: 4, name: 'Agent #WD-205', email: 'agent205@detective.com', role: 'investigator', status: 'active', lastLogin: '2025-03-29' },
  ]);
  const [clientMessages, setClientMessages] = useState([
    {
      id: 'MSG-2025-001',
      client: 'Rebecca Thompson',
      clientId: 1,
      caseId: 'WD-29384',
      title: 'Question about verification process',
      content: 'I wanted to ask about the verification process for employment history. How thorough is this check? Will my potential spouse be notified during this process?',
      date: '2025-04-01',
      status: 'unread',
      priority: 'high'
    },
    {
      id: 'MSG-2025-002',
      client: 'James Miller',
      clientId: 2,
      caseId: 'WD-29382',
      title: 'Document upload issue',
      content: 'I\'m having trouble uploading the financial statements you requested. The system keeps showing an error. Can you provide an alternative way to share these documents?',
      date: '2025-03-31',
      status: 'read',
      priority: 'medium'
    },
    {
      id: 'MSG-2025-003',
      client: 'Sophia Garcia',
      clientId: 3,
      caseId: 'WD-29379',
      title: 'Additional information request',
      content: 'I just remembered some important details about my partner\'s previous relationship that might be relevant to the investigation. When would be a good time to discuss this?',
      date: '2025-03-30',
      status: 'replied',
      priority: 'medium'
    },
    {
      id: 'MSG-2025-004',
      client: 'Daniel Johnson',
      clientId: 4,
      caseId: 'WD-29376',
      title: 'Urgent - Privacy Concern',
      content: 'I\'m concerned about the privacy implications of the investigation. I need to ensure that my partner will not find out about this service until I\'m ready to discuss it. Can we schedule a call to discuss additional privacy measures?',
      date: '2025-03-28',
      status: 'unread',
      priority: 'high'
    }
  ]);
  const [activeMessage, setActiveMessage] = useState(null);
  const [messageReply, setMessageReply] = useState('');
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showConsultationModal, setShowConsultationModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [consultationNotes, setConsultationNotes] = useState('');

  useEffect(() => {
    if (!loading && (!isAuthenticated || !user?.isAdmin)) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate, loading]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  useEffect(() => {
    if (loading || !isAuthenticated || !user?.isAdmin) return;
    const fetchDashboardData = async () => {
      try {
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      }
    };
    fetchDashboardData();
  }, [user?.isAdmin, isAuthenticated, loading]);

  if (!user?.isAdmin) {
    return null;
  }

  const UserManagement = () => (
    <div className="bg-secondary p-6 rounded shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-light">User Management</h3>
        <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded">
          Add New User
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-darkGray">
              <th className="text-left pb-2 text-light/70">ID</th>
              <th className="text-left pb-2 text-light/70">Name</th>
              <th className="text-left pb-2 text-light/70">Email</th>
              <th className="text-left pb-2 text-light/70">Role</th>
              <th className="text-left pb-2 text-light/70">Status</th>
              <th className="text-left pb-2 text-light/70">Last Login</th>
              <th className="text-right pb-2 text-light/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-darkGray">
                <td className="py-3 text-light">{user.id}</td>
                <td className="py-3 text-light">{user.name}</td>
                <td className="py-3 text-light">{user.email}</td>
                <td className="py-3">
                  <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                    ${user.role === 'admin' ? 'bg-purple-500/20 text-purple-500' : 
                      user.role === 'investigator' ? 'bg-blue-500/20 text-blue-500' : 
                      'bg-green-500/20 text-green-500'}`}>
                    {user.role}
                  </span>
                </td>
                <td className="py-3">
                  <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                    ${user.status === 'active' ? 'bg-green-500/20 text-green-500' : 
                      user.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                      'bg-red-500/20 text-red-500'}`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 text-light">{new Date(user.lastLogin).toLocaleDateString()}</td>
                <td className="py-3 text-right">
                  <button className="text-accent hover:text-darkGold mr-3">Edit</button>
                  <button className="text-red-500 hover:text-red-700">Disable</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  const ServiceManagement = () => (
    <div className="bg-secondary p-6 rounded shadow mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-light">Service Management</h3>
        <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded">
          Add New Service
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-darkGray">
              <th className="text-left pb-2 text-light/70">ID</th>
              <th className="text-left pb-2 text-light/70">Service Name</th>
              <th className="text-left pb-2 text-light/70">Price ($)</th>
              <th className="text-left pb-2 text-light/70">Status</th>
              <th className="text-right pb-2 text-light/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id} className="border-b border-darkGray">
                <td className="py-3 text-light">{service.id}</td>
                <td className="py-3 text-light">{service.name}</td>
                <td className="py-3 text-light">${service.price}</td>
                <td className="py-3">
                  <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                    ${service.active ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                    {service.active ? 'Active' : 'Inactive'}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="text-accent hover:text-darkGold mr-3">Edit</button>
                  <button className="text-red-500 hover:text-red-700">
                    {service.active ? 'Deactivate' : 'Activate'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
  
  const PaymentManagement = () => (
    <div className="bg-secondary p-6 rounded shadow mt-8">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-light">Payment Transactions</h3>
        <div>
          <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded mr-3">
            Verify Payment
          </button>
          <button className="bg-transparent border border-accent hover:border-darkGold text-accent hover:text-darkGold px-4 py-2 rounded">
            Export Report
          </button>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-darkGray">
              <th className="text-left pb-2 text-light/70">ID</th>
              <th className="text-left pb-2 text-light/70">Client</th>
              <th className="text-left pb-2 text-light/70">Amount</th>
              <th className="text-left pb-2 text-light/70">Date</th>
              <th className="text-left pb-2 text-light/70">Method</th>
              <th className="text-left pb-2 text-light/70">Status</th>
              <th className="text-right pb-2 text-light/70">Actions</th>
            </tr>
          </thead>
          <tbody>
            {recentPayments.map(payment => (
              <tr key={payment.id} className="border-b border-darkGray">
                <td className="py-3 text-light">{payment.id}</td>
                <td className="py-3 text-light">{payment.client}</td>
                <td className="py-3 text-light">${payment.amount}</td>
                <td className="py-3 text-light">{new Date(payment.date).toLocaleDateString()}</td>
                <td className="py-3 text-light">{payment.method}</td>
                <td className="py-3">
                  <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                    ${payment.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                      payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                      'bg-red-500/20 text-red-500'}`}>
                    {payment.status}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <button className="text-accent hover:text-darkGold mr-3">Details</button>
                  {payment.status === 'pending' && (
                    <button className="text-green-500 hover:text-green-700">Approve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ConsultationManagement = () => {
    const filteredConsultations = recentConsultations.filter(consultation => {
      const matchesStatus = statusFilter === 'all' || consultation.status === statusFilter;
      const matchesSearch = 
        consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        consultation.id.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStatus && matchesSearch;
    });
    
    const updateConsultationStatus = (id, newStatus) => {
      setRecentConsultations(prevConsultations =>
        prevConsultations.map(consultation =>
          consultation.id === id ? { ...consultation, status: newStatus } : consultation
        )
      );
      if (selectedConsultation && selectedConsultation.id === id) {
        setSelectedConsultation({ ...selectedConsultation, status: newStatus });
      }
    };
    
    const handleViewConsultation = (consultation) => {
      setSelectedConsultation(consultation);
      setConsultationNotes('');
      setShowConsultationModal(true);
    };

    return (
      <div className="bg-secondary p-6 rounded shadow">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h3 className="text-xl font-bold text-light">Consultation Requests</h3>
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <input 
                type="text"
                placeholder="Search by name, email, ID..."
                className="w-full bg-darkGray border border-darkGray/50 text-light px-3 py-2 rounded"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-3 top-2.5 text-light/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select 
              className="bg-darkGray border border-darkGray/50 text-light px-3 py-2 rounded"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <button className="bg-transparent border border-accent hover:border-darkGold text-accent hover:text-darkGold px-4 py-2 rounded">
              Export Data
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-6">
          <div className="bg-primary/30 p-3 rounded text-center">
            <p className="text-light/60 text-xs">Total</p>
            <p className="text-xl text-light font-bold">{recentConsultations.length}</p>
          </div>
          <div className="bg-yellow-500/10 p-3 rounded text-center">
            <p className="text-yellow-400 text-xs">Pending</p>
            <p className="text-xl text-light font-bold">
              {recentConsultations.filter(c => c.status === 'pending').length}
            </p>
          </div>
          <div className="bg-blue-500/10 p-3 rounded text-center">
            <p className="text-blue-400 text-xs">Contacted</p>
            <p className="text-xl text-light font-bold">
              {recentConsultations.filter(c => c.status === 'contacted').length}
            </p>
          </div>
          <div className="bg-green-500/10 p-3 rounded text-center">
            <p className="text-green-400 text-xs">Scheduled</p>
            <p className="text-xl text-light font-bold">
              {recentConsultations.filter(c => c.status === 'scheduled').length}
            </p>
          </div>
          <div className="bg-purple-500/10 p-3 rounded text-center">
            <p className="text-purple-400 text-xs">Completed</p>
            <p className="text-xl text-light font-bold">
              {recentConsultations.filter(c => c.status === 'completed').length}
            </p>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          {filteredConsultations.length > 0 ? (
            <table className="w-full">
              <thead>
                <tr className="border-b border-darkGray">
                  <th className="text-left pb-2 text-light/70">ID</th>
                  <th className="text-left pb-2 text-light/70">Name</th>
                  <th className="text-left pb-2 text-light/70">Email</th>
                  <th className="text-left pb-2 text-light/70">Service Interest</th>
                  <th className="text-left pb-2 text-light/70">Date</th>
                  <th className="text-left pb-2 text-light/70">Status</th>
                  <th className="text-right pb-2 text-light/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredConsultations.map(consultation => (
                  <tr key={consultation.id} className="border-b border-darkGray hover:bg-darkGray/20">
                    <td className="py-3 text-light">{consultation.id}</td>
                    <td className="py-3 text-light">{consultation.name}</td>
                    <td className="py-3 text-light/70">{consultation.email}</td>
                    <td className="py-3 text-light/70 max-w-[200px] truncate" title={consultation.serviceInterest}>
                      {consultation.serviceInterest || 'N/A'}
                    </td>
                    <td className="py-3 text-light/70">{new Date(consultation.date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                        ${consultation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                          consultation.status === 'contacted' ? 'bg-blue-500/20 text-blue-500' : 
                          consultation.status === 'scheduled' ? 'bg-green-500/20 text-green-500' :
                          consultation.status === 'completed' ? 'bg-purple-500/20 text-purple-500' : 
                          'bg-red-500/20 text-red-500'}`}>
                        {consultation.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex justify-end gap-2">
                        {consultation.status === 'pending' && (
                          <button 
                            onClick={() => updateConsultationStatus(consultation.id, 'contacted')}
                            className="text-blue-400 hover:text-blue-600 bg-blue-500/10 px-2 py-1 rounded text-xs"
                          >
                            Mark Contacted
                          </button>
                        )}
                        {consultation.status === 'contacted' && (
                          <button 
                            onClick={() => updateConsultationStatus(consultation.id, 'scheduled')}
                            className="text-green-400 hover:text-green-600 bg-green-500/10 px-2 py-1 rounded text-xs"
                          >
                            Mark Scheduled
                          </button>
                        )}
                        <button 
                          onClick={() => handleViewConsultation(consultation)}
                          className="text-accent hover:text-darkGold px-2 py-1 rounded text-xs"
                        >
                          View
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="text-center py-8 text-light/50">
              <p>No consultation requests found matching your filters</p>
            </div>
          )}
        </div>
        
        {showConsultationModal && selectedConsultation && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
            <div className="bg-secondary rounded-lg shadow-xl max-w-3xl w-full max-h-[90vh] overflow-hidden">
              <div className="flex justify-between items-center border-b border-darkGray p-4">
                <h4 className="text-xl font-bold text-light">Consultation Request Details</h4>
                <button 
                  onClick={() => setShowConsultationModal(false)}
                  className="text-light/50 hover:text-light"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[70vh]">
                <div className="flex justify-between mb-6">
                  <span className={`inline-block py-1 px-3 rounded text-xs font-bold uppercase
                    ${selectedConsultation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                      selectedConsultation.status === 'contacted' ? 'bg-blue-500/20 text-blue-500' : 
                      selectedConsultation.status === 'scheduled' ? 'bg-green-500/20 text-green-500' : 
                      selectedConsultation.status === 'completed' ? 'bg-purple-500/20 text-purple-500' : 
                      'bg-red-500/20 text-red-500'}`}
                  >
                    Status: {selectedConsultation.status}
                  </span>
                  <span className="text-light/50 text-sm">
                    ID: {selectedConsultation.id} • Submitted: {new Date(selectedConsultation.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <h5 className="text-accent font-bold mb-2 text-sm uppercase">Client Information</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-light/50 text-sm">Full Name</label>
                        <p className="text-light">{selectedConsultation.name}</p>
                      </div>
                      <div>
                        <label className="block text-light/50 text-sm">Email Address</label>
                        <p className="text-light">{selectedConsultation.email}</p>
                      </div>
                      <div>
                        <label className="block text-light/50 text-sm">Phone Number</label>
                        <p className="text-light">{selectedConsultation.phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h5 className="text-accent font-bold mb-2 text-sm uppercase">Service Details</h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-light/50 text-sm">Service Interest</label>
                        <p className="text-light">{selectedConsultation.serviceInterest || 'Not specified'}</p>
                      </div>
                      <div>
                        <label className="block text-light/50 text-sm">Price Range</label>
                        <p className="text-light">
                          {selectedConsultation.serviceInterest === 'Basic Verification Package' && '$299'} 
                          {selectedConsultation.serviceInterest === 'Comprehensive Background Check' && '$799'}
                          {selectedConsultation.serviceInterest === 'Premium Surveillance' && '$1,500'}
                          {selectedConsultation.serviceInterest === 'International Background Check' && '$400'}
                          {selectedConsultation.serviceInterest === 'Family Due Diligence' && '$999'}
                          {!selectedConsultation.serviceInterest && 'To be determined'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-accent font-bold mb-2 text-sm uppercase">Client Message</h5>
                  <div className="bg-darkGray p-4 rounded">
                    <p className="text-light whitespace-pre-wrap">{selectedConsultation.message}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-accent font-bold mb-2 text-sm uppercase">Admin Notes</h5>
                  <textarea
                    className="w-full bg-darkGray border border-darkGray/50 text-light p-3 rounded min-h-[100px]"
                    placeholder="Add notes about this consultation request (only visible to admins)..."
                    value={consultationNotes}
                    onChange={(e) => setConsultationNotes(e.target.value)}
                  ></textarea>
                </div>
                
                <div className="mb-6">
                  <h5 className="text-accent font-bold mb-2 text-sm uppercase">Update Status</h5>
                  <div className="flex flex-wrap gap-2">
                    <button 
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'pending')}
                      className={`px-3 py-2 rounded text-sm ${
                        selectedConsultation.status === 'pending' ? 
                        'bg-yellow-500/20 text-yellow-500 border border-yellow-500' : 
                        'bg-darkGray text-yellow-500 hover:bg-yellow-500/10'
                      }`}
                    >
                      Pending
                    </button>
                    <button 
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'contacted')}
                      className={`px-3 py-2 rounded text-sm ${
                        selectedConsultation.status === 'contacted' ? 
                        'bg-blue-500/20 text-blue-500 border border-blue-500' : 
                        'bg-darkGray text-blue-500 hover:bg-blue-500/10'
                      }`}
                    >
                      Contacted
                    </button>
                    <button 
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'scheduled')}
                      className={`px-3 py-2 rounded text-sm ${
                        selectedConsultation.status === 'scheduled' ? 
                        'bg-green-500/20 text-green-500 border border-green-500' : 
                        'bg-darkGray text-green-500 hover:bg-green-500/10'
                      }`}
                    >
                      Scheduled
                    </button>
                    <button 
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'completed')}
                      className={`px-3 py-2 rounded text-sm ${
                        selectedConsultation.status === 'completed' ? 
                        'bg-purple-500/20 text-purple-500 border border-purple-500' : 
                        'bg-darkGray text-purple-500 hover:bg-purple-500/10'
                      }`}
                    >
                      Completed
                    </button>
                    <button 
                      onClick={() => updateConsultationStatus(selectedConsultation.id, 'cancelled')}
                      className={`px-3 py-2 rounded text-sm ${
                        selectedConsultation.status === 'cancelled' ? 
                        'bg-red-500/20 text-red-500 border border-red-500' : 
                        'bg-darkGray text-red-500 hover:bg-red-500/10'
                      }`}
                    >
                      Cancelled
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-darkGray p-4 flex justify-end gap-3">
                <button 
                  onClick={() => setShowConsultationModal(false)}
                  className="bg-darkGray text-light hover:bg-darkGray/70 px-4 py-2 rounded"
                >
                  Close
                </button>
                <button className="bg-transparent border border-accent text-accent hover:border-darkGold hover:text-darkGold px-4 py-2 rounded mr-2">
                  Send Email
                </button>
                <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded">
                  Save Notes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const AdminOverview = () => (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-secondary p-6 rounded shadow">
          <h3 className="text-accent font-bold mb-1">Active Cases</h3>
          <p className="text-3xl text-light font-bold">{stats.activeCases}</p>
          <p className="text-light/70 text-sm">2 new this week</p>
        </div>
        
        <div className="bg-secondary p-6 rounded shadow">
          <h3 className="text-accent font-bold mb-1">Pending Consultations</h3>
          <p className="text-3xl text-light font-bold">{stats.pendingConsultations}</p>
          <p className="text-light/70 text-sm">5 new this week</p>
        </div>
        
        <div className="bg-secondary p-6 rounded shadow">
          <h3 className="text-accent font-bold mb-1">Completed Investigations</h3>
          <p className="text-3xl text-light font-bold">{stats.completedInvestigations}</p>
          <p className="text-light/70 text-sm">3 this month</p>
        </div>
        
        <div className="bg-secondary p-6 rounded shadow">
          <h3 className="text-accent font-bold mb-1">Total Clients</h3>
          <p className="text-3xl text-light font-bold">{stats.totalClients}</p>
          <p className="text-light/70 text-sm">6 new this month</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-secondary p-6 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-light">Recent Consultation Requests</h3>
            <button 
              onClick={() => setActiveSection('consultations')}
              className="text-accent hover:text-darkGold"
            >
              View All
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-darkGray">
                  <th className="text-left pb-2 text-light/70">ID</th>
                  <th className="text-left pb-2 text-light/70">Name</th>
                  <th className="text-left pb-2 text-light/70">Date</th>
                  <th className="text-left pb-2 text-light/70">Status</th>
                  <th className="text-right pb-2 text-light/70">Action</th>
                </tr>
              </thead>
              <tbody>
                {recentConsultations.slice(0, 4).map(consultation => (
                  <tr key={consultation.id} className="border-b border-darkGray">
                    <td className="py-3 text-light">{consultation.id}</td>
                    <td className="py-3 text-light">{consultation.name}</td>
                    <td className="py-3 text-light">{new Date(consultation.date).toLocaleDateString()}</td>
                    <td className="py-3">
                      <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                        ${consultation.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                          consultation.status === 'contacted' ? 'bg-blue-500/20 text-blue-500' : 
                          'bg-green-500/20 text-green-500'}`}>
                        {consultation.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button className="text-accent hover:text-darkGold">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-secondary p-6 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-light">Active Cases</h3>
            <button 
              onClick={() => setActiveSection('cases')}
              className="text-accent hover:text-darkGold"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {activeCases.slice(0, 4).map(activeCase => (
              <div key={activeCase.id} className="border-b border-darkGray pb-4 last:border-0 last:pb-0">
                <div className="flex justify-between items-center mb-2">
                  <div>
                    <h4 className="text-light font-bold">{activeCase.client}</h4>
                    <div className="flex items-center text-light/70 text-sm">
                      <span className="mr-2">Case ID: {activeCase.id}</span>
                      <span>Investigator: {activeCase.investigator}</span>
                    </div>
                  </div>
                  <button className="text-accent hover:text-darkGold">Details</button>
                </div>
                
                <div className="w-full bg-darkGray rounded-full h-2.5 mt-2">
                  <div 
                    className="bg-accent h-2.5 rounded-full"
                    style={{ width: `${activeCase.progress}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span className="text-light/70">Progress</span>
                  <span className="text-light">{activeCase.progress}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-secondary p-6 rounded shadow mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-light">Recent Payments</h3>
          <button 
            onClick={() => setActiveSection('payments')}
            className="text-accent hover:text-darkGold"
          >
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-darkGray">
                <th className="text-left pb-2 text-light/70">ID</th>
                <th className="text-left pb-2 text-light/70">Client</th>
                <th className="text-left pb-2 text-light/70">Amount</th>
                <th className="text-left pb-2 text-light/70">Date</th>
                <th className="text-left pb-2 text-light/70">Method</th>
                <th className="text-left pb-2 text-light/70">Status</th>
                <th className="text-right pb-2 text-light/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentPayments.map(payment => (
                <tr key={payment.id} className="border-b border-darkGray">
                  <td className="py-3 text-light">{payment.id}</td>
                  <td className="py-3 text-light">{payment.client}</td>
                  <td className="py-3 text-light">${payment.amount}</td>
                  <td className="py-3 text-light">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="py-3 text-light">{payment.method}</td>
                  <td className="py-3">
                    <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                      ${payment.status === 'completed' ? 'bg-green-500/20 text-green-500' : 
                        payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                        'bg-red-500/20 text-red-500'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-accent hover:text-darkGold mr-3">Details</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-primary flex">
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
          {activeSection === 'cases' && (
            <div className="text-center py-12">
              <h3 className="text-xl text-light mb-2">Case Management</h3>
              <p className="text-light/70">This section is under development.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;