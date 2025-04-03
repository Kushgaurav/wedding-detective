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
    { id: 'CON-2023', name: 'Sarah Johnson', date: '2025-03-29', status: 'pending' },
    { id: 'CON-2022', name: 'Michael Chen', date: '2025-03-28', status: 'pending' },
    { id: 'CON-2021', name: 'Emily Rodriguez', date: '2025-03-27', status: 'contacted' },
    { id: 'CON-2020', name: 'David Wilson', date: '2025-03-26', status: 'scheduled' }
  ]);
  const [activeCases, setActiveCases] = useState([
    { id: 'WD-29384', client: 'Rebecca Thompson', investigator: 'Agent #WD-117', progress: 75, status: 'active' },
    { id: 'WD-29382', client: 'James Miller', investigator: 'Agent #WD-205', progress: 40, status: 'active' },
    { id: 'WD-29379', client: 'Sophia Garcia', investigator: 'Agent #WD-117', progress: 90, status: 'active' },
    { id: 'WD-29376', client: 'Daniel Johnson', investigator: 'Agent #WD-303', progress: 25, status: 'active' }
  ]);
  // New state for services management
  const [services, setServices] = useState([
    { id: 1, name: 'Basic Verification Package', price: 299, active: true },
    { id: 2, name: 'Comprehensive Background Check', price: 799, active: true },
    { id: 3, name: 'Premium Surveillance', price: 1500, active: true },
    { id: 4, name: 'International Background Check', price: 400, active: true },
    { id: 5, name: 'Family Due Diligence', price: 999, active: true },
  ]);
  // New state for payment transactions
  const [recentPayments, setRecentPayments] = useState([
    { id: 'PAY-2023', client: 'Rebecca Thompson', amount: 799, date: '2025-03-29', status: 'completed', method: 'Credit Card' },
    { id: 'PAY-2022', client: 'James Miller', amount: 299, date: '2025-03-28', status: 'completed', method: 'PayPal' },
    { id: 'PAY-2021', client: 'Sophia Garcia', amount: 1500, date: '2025-03-26', status: 'pending', method: 'Bank Transfer' },
    { id: 'PAY-2020', client: 'Daniel Johnson', amount: 400, date: '2025-03-24', status: 'completed', method: 'Cryptocurrency' },
  ]);
  // New state for user management
  const [users, setUsers] = useState([
    { id: 1, name: 'Rebecca Thompson', email: 'rebecca@example.com', role: 'client', status: 'active', lastLogin: '2025-03-30' },
    { id: 2, name: 'James Miller', email: 'james@example.com', role: 'client', status: 'active', lastLogin: '2025-03-28' },
    { id: 3, name: 'Agent #WD-117', email: 'agent117@detective.com', role: 'investigator', status: 'active', lastLogin: '2025-03-31' },
    { id: 4, name: 'Agent #WD-205', email: 'agent205@detective.com', role: 'investigator', status: 'active', lastLogin: '2025-03-29' },
  ]);
  
  // Client messages state
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

  // Double check admin status - redirect if not admin
  useEffect(() => {
    // Only redirect if authentication status is actually loaded (not during initial loading)
    // This check prevents redirects during the initial loading state
    if (!loading && (!isAuthenticated || !user?.isAdmin)) {
      navigate('/login');
    }
  }, [isAuthenticated, user, navigate, loading]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // In a real app, we would fetch this data from the API
  useEffect(() => {
    // Only fetch data if we're authenticated and admin, and not during loading
    if (loading || !isAuthenticated || !user?.isAdmin) return;
    
    // Simulate API fetch - don't need to refetch on every render
    const fetchDashboardData = async () => {
      try {
        // Fetch implementation would go here
        // This is just a mock
      } catch (error) {
        console.error('Error fetching admin dashboard data:', error);
      }
    };

    fetchDashboardData();
    // Only re-run if these dependencies change
  }, [user?.isAdmin, isAuthenticated, loading]);

  // If not admin, don't render admin content
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

  // Replace existing AdminOverview component with this updated version
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

      {/* Recent Payments Widget */}
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
      {/* Sidebar */}
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
                    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v1h8v-1zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-1a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v1h-3zM4.75 12.094A5.973 5.973 0 004 15v1H1v-1a3 3 0 013.75-2.906z" />
                  </svg>
                  User Management
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
                    <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                  </svg>
                  Service Management
                </button>
              </li>
            </ul>
          </div>
          
          <div className="mb-6">
            <h3 className="text-light text-xs uppercase tracking-wider mb-3">Operations</h3>
            <ul className="space-y-2">
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
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm3.293 1.293a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 01-1.414-1.414L7.586 10 5.293 7.707a1 1 0 010-1.414zM11 12a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                  </svg>
                  Case Management
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
                  Consultation Requests
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
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
                  </svg>
                  Payment Management
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection('messages')}
                  className={`w-full flex items-center px-2 py-2 text-sm rounded-md ${
                    activeSection === 'messages'
                      ? 'bg-accent/10 text-accent'
                      : 'text-light hover:bg-darkGray'
                  }`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
                    <path fillRule="evenodd" d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" clipRule="evenodd" />
                  </svg>
                  Messages
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* User Menu - keeping this logout button */}
      {showUserMenu && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-secondary border border-darkGray shadow-lg">
          <div className="py-1" role="menu" aria-orientation="vertical">
            <button
              onClick={() => { setShowProfileEdit(true); setShowUserMenu(false); }}
              className="w-full text-left px-4 py-2 text-sm text-light hover:bg-darkGray"
              role="menuitem"
            >
              Account Settings
            </button>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-darkGray"
              role="menuitem"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Admin Overview */}
      <div className="flex-grow p-6">
        {activeSection === 'dashboard' && <AdminOverview />}
        {activeSection === 'users' && <UserManagement />}
        {activeSection === 'services' && <ServiceManagement />}
        {activeSection === 'payments' && <PaymentManagement />}
        {activeSection === 'cases' && (
          <div className="bg-secondary p-6 rounded shadow">
            <h3 className="text-xl font-bold text-light mb-6">Case Management</h3>
            <div className="space-y-4">
              {activeCases.map(activeCase => (
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
        )}
        {activeSection === 'consultations' && (
          <div className="bg-secondary p-6 rounded shadow">
            <h3 className="text-xl font-bold text-light mb-6">Consultation Requests</h3>
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
                  {recentConsultations.map(consultation => (
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
        )}
        {activeSection === 'messages' && (
          <div className="bg-secondary p-6 rounded shadow h-[calc(100vh-140px)]">
            <h3 className="text-xl font-bold text-light mb-6">Client Messages</h3>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100%-60px)]">
              {/* Message List Sidebar */}
              <div className="lg:col-span-1 border-r border-darkGray pr-4 flex flex-col h-full">
                <div className="mb-4">
                  <input 
                    type="text"
                    placeholder="Search messages..."
                    className="w-full bg-darkGray border border-darkGray/50 text-light px-3 py-2 rounded"
                  />
                </div>
                <div className="space-y-2 overflow-y-auto flex-grow pr-2">
                  {clientMessages.map((message) => (
                    <div 
                      key={message.id}
                      onClick={() => setActiveMessage(message)}
                      className={`p-3 rounded cursor-pointer transition-all ${
                        activeMessage?.id === message.id 
                          ? 'bg-accent/10 border border-accent/30' 
                          : 'bg-darkGray hover:bg-darkGray/70'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <h4 className="font-medium text-light">{message.client}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          message.status === 'unread' 
                            ? 'bg-red-500/20 text-red-400' 
                            : message.status === 'replied'
                              ? 'bg-green-500/20 text-green-500'
                              : 'bg-blue-500/20 text-blue-400'
                        }`}>
                          {message.status}
                        </span>
                      </div>
                      <p className="text-sm text-light/70 truncate">{message.title}</p>
                      <div className="flex justify-between items-center mt-2 text-xs text-light/50">
                        <span>Case: {message.caseId}</span>
                        <span>{new Date(message.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Chat Message Area */}
              <div className="lg:col-span-2 flex flex-col h-full">
                {activeMessage ? (
                  <>
                    <div className="flex justify-between items-start mb-4 sticky top-0 bg-secondary z-10 pb-3 border-b border-darkGray">
                      <div>
                        <h3 className="text-xl font-bold text-light">{activeMessage.title}</h3>
                        <p className="text-light/70">From: {activeMessage.client} • {new Date(activeMessage.date).toLocaleDateString()}</p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        activeMessage.priority === 'high' 
                          ? 'bg-red-500/20 text-red-400' 
                          : 'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {activeMessage.priority} priority
                      </span>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto mb-4">
                      {/* Client Message */}
                      <div className="flex mb-4">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 text-purple-500 flex items-center justify-center mr-2 flex-shrink-0 uppercase font-bold">
                          {activeMessage.client.charAt(0)}
                        </div>
                        <div className="bg-darkGray p-4 rounded-lg rounded-tl-none max-w-[80%]">
                          <p className="text-light">{activeMessage.content}</p>
                          <p className="text-xs text-light/50 text-right mt-1">{new Date(activeMessage.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                        </div>
                      </div>
                      
                      {/* Example previous replies if status is 'replied' */}
                      {activeMessage.status === 'replied' && (
                        <div className="flex justify-end mb-4">
                          <div className="bg-accent/20 p-4 rounded-lg rounded-tr-none max-w-[80%]">
                            <p className="text-light">Thank you for your message. We will look into this and get back to you shortly.</p>
                            <p className="text-xs text-light/50 text-right mt-1">Yesterday, 2:30 PM</p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center ml-2 flex-shrink-0 uppercase font-bold">
                            A
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="border-t border-darkGray pt-4 mt-auto">
                      <textarea
                        className="w-full bg-darkGray border border-darkGray/50 text-light p-3 rounded min-h-[100px] mb-3"
                        placeholder="Type your reply here..."
                        value={messageReply}
                        onChange={(e) => setMessageReply(e.target.value)}
                      ></textarea>
                      <div className="flex justify-end">
                        <button className="bg-transparent border border-accent text-accent hover:bg-accent/10 px-4 py-2 rounded mr-2">
                          Save Draft
                        </button>
                        <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded">
                          Send Reply
                        </button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-light/50">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-light/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                    <p className="text-xl mb-2">No message selected</p>
                    <p>Select a conversation from the list to view messages</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <ProfileEdit
          user={user}
          onClose={() => setShowProfileEdit(false)}
        />
      )}
    </div>
  );
};

export default AdminDashboard;