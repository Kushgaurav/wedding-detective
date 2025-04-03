import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProfileEdit from '../components/ProfileEdit';
import { useAuth } from '../context/AuthContext';
import { getUserCases, createCase, getDocumentsByCase } from '../services/api';

const ClientPortal = () => {
  const { user, token, logout, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Reset scroll position on page load/refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Case management state
  const [cases, setCases] = useState([]);
  const [selectedCase, setSelectedCase] = useState(null);
  const [showNewCaseModal, setShowNewCaseModal] = useState(false);
  const [newCase, setNewCase] = useState({ title: '', description: '' });
  const [showCasesDropdown, setShowCasesDropdown] = useState(false);

  // Mock data - would come from API in real application
  const [caseDetails, setCaseDetails] = useState({
    status: 'Active - In Progress',
    statusColor: 'green-500',
    investigator: 'Agent #WD-117',
    specialization: 'Financial Analysis',
    nextUpdate: 'Thursday, 2:00 PM',
    updateMethod: 'Encrypted Email',
    lastUpdated: 'Today, 9:30 AM',
    progress: 65
  });

  const [evidenceItems, setEvidenceItems] = useState([
    {
      id: 1,
      title: 'Employment Verification',
      status: 'VERIFIED',
      statusClass: 'bg-accent/20 text-accent',
      description: 'Position confirmed at stated company for 4+ years',
      added: '3 days ago'
    },
    {
      id: 2,
      title: 'Financial Assessment',
      status: 'PENDING',
      statusClass: 'bg-yellow-500/20 text-yellow-500',
      description: 'Credit report analysis in progress',
      added: '1 day ago'
    },
    {
      id: 3,
      title: 'Social Media Analysis',
      status: 'VERIFIED',
      statusClass: 'bg-accent/20 text-accent',
      description: 'Profiles consistent with provided information',
      added: '2 days ago'
    }
  ]);

  const [timelineEvents, setTimelineEvents] = useState([
    {
      id: 1,
      title: 'Case Initiated',
      description: 'Initial consultation completed and service package selected',
      date: '5 days ago',
      completed: true
    },
    {
      id: 2,
      title: 'Employment Verification Complete',
      description: 'Subject\'s employment history verified with current employer',
      date: '3 days ago',
      completed: true
    },
    {
      id: 3,
      title: 'Social Media Analysis Complete',
      description: 'Analysis of 3 platforms shows consistent information',
      date: '2 days ago',
      completed: true
    },
    {
      id: 4,
      title: 'Financial Assessment In Progress',
      description: 'Credit report and financial history being analyzed',
      date: '1 day ago',
      completed: false
    },
    {
      id: 5,
      title: 'Scheduled: Relationship History Check',
      description: 'Investigation of previous relationships to begin',
      date: 'Upcoming',
      completed: false
    }
  ]);

  const [messages, setMessages] = useState([
    {
      id: 1,
      title: 'Case Update: Initial Findings',
      date: '2 days ago',
      content: 'We\'ve completed the first phase of your investigation with promising results. All employment details have been verified as accurate...'
    },
    {
      id: 2,
      title: 'Document Request: Financial Records',
      date: '1 day ago',
      content: 'To proceed with the financial assessment, we require additional documentation. Please upload any relevant financial records...'
    },
    {
      id: 3,
      title: 'Next Steps: Relationship History',
      date: 'Today',
      content: 'We\'re preparing to begin the relationship history verification. This process will be handled with the utmost discretion...'
    }
  ]);

  const [payments, setPayments] = useState([
    { 
      id: 'INV-2023-001', 
      service: 'Comprehensive Background Check', 
      amount: 799, 
      date: '2025-03-29', 
      status: 'paid',
      method: 'Credit Card'
    },
    { 
      id: 'INV-2023-002', 
      service: 'International Background Check', 
      amount: 400, 
      date: '2025-03-30', 
      status: 'pending',
      method: 'Bank Transfer'
    }
  ]);

  // Fetch user cases on component mount
  useEffect(() => {
    const fetchCases = async () => {
      try {
        setIsLoading(true);
        
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        const userCases = await getUserCases(token);
        setCases(userCases || []);
        
        if (userCases && userCases.length > 0) {
          setSelectedCase(userCases[0]);
        }
        
      } catch (err) {
        console.error('Error fetching cases:', err);
        setError('Failed to load your cases. Please try again later.');
      } finally {
        // Ensure loading state is turned off even if there's an error or no cases
        setIsLoading(false);
      }
    };

    fetchCases();
  }, [token]);

  // Handle case creation
  const handleCreateCase = async (e) => {
    e.preventDefault();
    
    if (!newCase.title) {
      setError('Case title is required');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null); // Clear any previous errors
      
      // Make sure we use the correct enum values accepted by the server
      const caseDataWithDefaults = {
        ...newCase,
        // Status must match the enum values in the Case model: 'Pending', 'Active', 'On Hold', 'Completed', 'Archived'
        status: newCase.status || 'Active',
        progress: newCase.progress || 0,
        updateMethod: newCase.updateMethod || 'Encrypted Email',
        // Add investigatorId if not provided
        investigatorId: newCase.investigatorId || 'Agent #WD-117',
        // Add default nextUpdateDate (3 days from now)
        nextUpdateDate: newCase.nextUpdateDate || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
      };
      
      const createdCase = await createCase(caseDataWithDefaults, token);
      
      // Make sure we have a valid response
      if (!createdCase || !createdCase._id) {
        throw new Error('Invalid response from server');
      }
      
      // Successfully created the case, update the UI
      setCases([createdCase, ...cases]);
      setSelectedCase(createdCase);
      setShowNewCaseModal(false);
      setNewCase({ title: '', description: '' });
    } catch (err) {
      console.error('Error creating case:', err);
      
      // Set appropriate error message based on the error received
      if (err.message.includes('invalid')) {
        setError('The case data is invalid. Please check all required fields.');
      } else if (err.message.includes('conflict')) {
        setError('There was a case ID conflict. Please try again.');
      } else {
        // Display the specific error message from the API if available
        setError(err.message || 'Failed to create new case. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle case selection
  const handleCaseSelection = (caseItem) => {
    setSelectedCase(caseItem);
    setShowCasesDropdown(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return renderDashboard();
      case 'evidence':
        return renderEvidenceBoard();
      case 'documents':
        return renderDocumentVault();
      case 'messages':
        return renderSecureMessages();
      case 'timeline':
        return renderTimeline();
      case 'payment':
        return renderPaymentCenter();
      default:
        return renderDashboard();
    }
  };

  const renderDashboard = () => (
    <div>
      {/* Case Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-secondary p-6 rounded shadow">
          <h4 className="text-accent font-bold mb-2">Case Status</h4>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full bg-${caseDetails.statusColor} mr-2`}></div>
            <p className="text-light">{caseDetails.status}</p>
          </div>
          <p className="text-light/70 text-sm mt-2">Updated: {caseDetails.lastUpdated}</p>
          
          {/* Case Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-light/70">Case Progress</span>
              <span className="text-light">{caseDetails.progress}%</span>
            </div>
            <div className="w-full bg-darkGray rounded-full h-2">
              <div 
                className="bg-accent h-2 rounded-full"
                style={{ width: `${caseDetails.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        <div className="bg-secondary p-6 rounded shadow">
          <h4 className="text-accent font-bold mb-2">Assigned Investigator</h4>
          <p className="text-light">{caseDetails.investigator}</p>
          <p className="text-light/70 text-sm mt-2">Specialization: {caseDetails.specialization}</p>
          <button className="mt-4 text-accent text-sm hover:text-darkGold transition-colors">
            Request Contact
          </button>
        </div>
        
        <div className="bg-secondary p-6 rounded shadow">
          <h4 className="text-accent font-bold mb-2">Next Update</h4>
          <p className="text-light">{caseDetails.nextUpdate}</p>
          <p className="text-light/70 text-sm mt-2">Via: {caseDetails.updateMethod}</p>
          <button className="mt-4 text-accent text-sm hover:text-darkGold transition-colors">
            Change Preferences
          </button>
        </div>
      </div>

      {/* Evidence Summary */}
      <div className="bg-secondary p-6 rounded shadow mb-8">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-light">Recent Evidence</h3>
          <button 
            onClick={() => setActiveSection('evidence')}
            className="text-accent hover:text-darkGold"
          >
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {evidenceItems.map(item => (
            <div key={item.id} className="border border-darkGray rounded p-4 hover:border-accent transition-all cursor-pointer">
              <div className="flex justify-between items-start mb-3">
                <div className={`${item.statusClass} text-xs font-bold py-1 px-2 rounded`}>
                  {item.status}
                </div>
                <p className="text-light/70 text-xs">Added: {item.added}</p>
              </div>
              <h4 className="text-light font-bold mb-2">{item.title}</h4>
              <p className="text-light/70 text-sm mb-3">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-accent text-sm">View Details</span>
                <svg className="w-5 h-5 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Messages & Timeline */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages */}
        <div className="bg-secondary p-6 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-light">Recent Messages</h3>
            <button 
              onClick={() => setActiveSection('messages')}
              className="text-accent hover:text-darkGold"
            >
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {messages.slice(0, 2).map(message => (
              <div key={message.id} className="border-b border-darkGray pb-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-light font-bold">{message.title}</h4>
                  <p className="text-accent text-sm">{message.date}</p>
                </div>
                <p className="text-light/70 mb-3">{message.content}</p>
                <button className="text-accent text-sm hover:text-darkGold transition-colors">
                  Read Full Message
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4">
            <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded-md w-full">
              Send New Message
            </button>
          </div>
        </div>
        
        {/* Timeline */}
        <div className="bg-secondary p-6 rounded shadow">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-light">Recent Timeline Updates</h3>
            <button 
              onClick={() => setActiveSection('timeline')}
              className="text-accent hover:text-darkGold"
            >
              View All
            </button>
          </div>
          
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-darkGray"></div>
            
            {/* Timeline Events */}
            <div className="space-y-6">
              {timelineEvents.slice(0, 3).map(event => (
                <div key={event.id} className="relative pl-10">
                  <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${
                    event.completed ? 'bg-accent' : 'bg-darkGray'
                  } flex items-center justify-center`}>
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-light font-bold">{event.title}</h4>
                      <p className="text-light/70 text-sm">{event.description}</p>
                    </div>
                    <p className="text-accent text-sm">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderEvidenceBoard = () => (
    <div>
      <h3 className="text-2xl font-bold text-light mb-6">Evidence <span className="text-accent">Board</span></h3>
      
      {/* Filter Controls */}
      <div className="bg-secondary p-4 rounded shadow mb-6 flex flex-wrap gap-4 items-center">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search evidence..."
            className="w-full bg-primary border border-darkGray text-light p-2 rounded"
          />
        </div>
        <div className="flex gap-2">
          <button className="px-3 py-1 bg-accent/20 text-accent rounded hover:bg-accent/30">
            All
          </button>
          <button className="px-3 py-1 bg-darkGray hover:bg-darkGray/70 text-light rounded">
            Verified
          </button>
          <button className="px-3 py-1 bg-darkGray hover:bg-darkGray/70 text-light rounded">
            Pending
          </button>
        </div>
      </div>
      
      {/* Evidence Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {evidenceItems.map(item => (
          <div key={item.id} className="bg-secondary rounded shadow overflow-hidden">
            <div className="p-4 border-b border-darkGray">
              <div className="flex justify-between items-start">
                <div className={`${item.statusClass} text-xs font-bold py-1 px-2 rounded`}>
                  {item.status}
                </div>
                <p className="text-light/70 text-xs">Added: {item.added}</p>
              </div>
              <h4 className="text-light font-bold mt-3 mb-1">{item.title}</h4>
              <p className="text-light/70 text-sm">{item.description}</p>
            </div>
            
            {/* Document Preview */}
            <div className="h-40 bg-primary/50 flex items-center justify-center">
              <svg className="w-16 h-16 text-darkGray/50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
              </svg>
            </div>
            
            <div className="p-3 flex justify-between items-center">
              <p className="text-light text-sm">Document {item.id}</p>
              <button className="text-accent hover:text-darkGold text-sm font-medium">
                View Full Report
              </button>
            </div>
          </div>
        ))}

        {/* Additional Evidence Cards */}
        <div className="bg-secondary rounded shadow overflow-hidden">
          <div className="p-4 border-b border-darkGray">
            <div className="flex justify-between items-start">
              <div className="bg-accent/20 text-accent text-xs font-bold py-1 px-2 rounded">
                VERIFIED
              </div>
              <p className="text-light/70 text-xs">Added: 4 days ago</p>
            </div>
            <h4 className="text-light font-bold mt-3 mb-1">Education Verification</h4>
            <p className="text-light/70 text-sm">Degree and academic history confirmed</p>
          </div>
          
          <div className="h-40 bg-primary/50 flex items-center justify-center">
            <svg className="w-16 h-16 text-darkGray/50" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
            </svg>
          </div>
          
          <div className="p-3 flex justify-between items-center">
            <p className="text-light text-sm">Document 4</p>
            <button className="text-accent hover:text-darkGold text-sm font-medium">
              View Full Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentVault = () => (
    <div>
      <h3 className="text-2xl font-bold text-light mb-6">Document <span className="text-accent">Vault</span></h3>
      
      <div className="bg-secondary p-6 rounded shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-light">Secure File Storage</h4>
          <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded-md">
            Upload Document
          </button>
        </div>
        
        <p className="text-light/70 mb-6">
          All files are encrypted with 256-bit encryption and will be automatically purged 30 days after case completion.
        </p>
        
        <div className="space-y-3">
          <div className="border border-darkGray rounded p-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h5 className="text-light font-medium">Financial_Documents.pdf</h5>
                <p className="text-light/70 text-xs">Uploaded 2 days ago • 2.4 MB</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="text-accent hover:text-darkGold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="border border-darkGray rounded p-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h5 className="text-light font-medium">ID_Documentation.zip</h5>
                <p className="text-light/70 text-xs">Uploaded 3 days ago • 5.7 MB</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="text-accent hover:text-darkGold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="border border-darkGray rounded p-4 flex items-center justify-between">
            <div className="flex items-center">
              <svg className="w-8 h-8 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h5 className="text-light font-medium">Photos.jpg</h5>
                <p className="text-light/70 text-xs">Uploaded 4 days ago • 1.2 MB</p>
              </div>
            </div>
            <div className="flex gap-3">
              <button className="text-accent hover:text-darkGold">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </button>
              <button className="text-red-500 hover:text-red-700">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary p-6 rounded shadow">
        <h4 className="text-lg font-bold text-light mb-4">Security Settings</h4>
        
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h5 className="font-medium text-light">Document Expiry</h5>
              <p className="text-light/70 text-sm">Control when your documents are automatically deleted</p>
            </div>
            <div className="flex items-center">
              <select className="bg-primary border border-darkGray text-light p-2 rounded">
                <option>30 days after case</option>
                <option>60 days after case</option>
                <option>90 days after case</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h5 className="font-medium text-light">Two-Factor Authentication</h5>
              <p className="text-light/70 text-sm">Require 2FA for document access</p>
            </div>
            <div className="flex items-center">
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-darkGray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-darkGray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <h5 className="font-medium text-light">Watermarking</h5>
              <p className="text-light/70 text-sm">Apply watermarks to downloaded documents</p>
            </div>
            <div className="flex items-center">
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" value="" className="sr-only peer" checked />
                <div className="w-11 h-6 bg-darkGray peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-darkGray after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent"></div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecureMessages = () => (
    <div>
      <h3 className="text-2xl font-bold text-light mb-6">Secure <span className="text-accent">Messages</span></h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Message List */}
        <div className="lg:col-span-1">
          <div className="bg-secondary p-4 rounded shadow mb-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search messages..."
                className="w-full bg-primary border border-darkGray text-light p-2 pl-10 rounded"
              />
              <svg className="w-5 h-5 text-light/50 absolute left-3 top-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path>
              </svg>
            </div>
          </div>
          
          <div className="bg-secondary rounded shadow overflow-hidden">
            <div className="border-b border-darkGray">
              <button className="w-full text-left p-4 bg-accent/10 border-l-4 border-accent">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-bold text-light">Case Update: Initial Findings</h4>
                  <span className="bg-accent/20 text-accent text-xs py-1 px-2 rounded-full">New</span>
                </div>
                <p className="text-light/70 text-sm">2 days ago</p>
              </button>
            </div>
            
            <div className="border-b border-darkGray">
              <button className="w-full text-left p-4 hover:bg-darkGray/30">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-light">Document Request: Financial Records</h4>
                </div>
                <p className="text-light/70 text-sm">1 day ago</p>
              </button>
            </div>
            
            <div className="border-b border-darkGray">
              <button className="w-full text-left p-4 hover:bg-darkGray/30">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-light">Next Steps: Relationship History</h4>
                </div>
                <p className="text-light/70 text-sm">Today</p>
              </button>
            </div>
            
            <div className="border-b border-darkGray">
              <button className="w-full text-left p-4 hover:bg-darkGray/30">
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-medium text-light">Case Initiated</h4>
                </div>
                <p className="text-light/70 text-sm">5 days ago</p>
              </button>
            </div>
          </div>
        </div>
        
        {/* Message Content */}
        <div className="lg:col-span-2 bg-secondary rounded shadow flex flex-col">
          <div className="p-4 border-b border-darkGray">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold text-light">Case Update: Initial Findings</h3>
              <p className="text-accent">2 days ago</p>
            </div>
            <p className="text-light/70 text-sm">From: Agent #WD-117</p>
          </div>
          
          <div className="flex-grow p-6 overflow-y-auto">
            <p className="text-light mb-4">
              We've completed the first phase of your investigation with promising results. All employment details have been verified as accurate.
            </p>
            <p className="text-light mb-4">
              The subject's employment at TechCorp has been confirmed for the stated period of 4+ years, with the title of Senior Software Engineer. Their LinkedIn profile information matches their resume and company records.
            </p>
            <p className="text-light mb-4">
              Additionally, we've completed a thorough analysis of their social media profiles across Facebook, Instagram, and Twitter. The information provided by the subject is consistent across platforms and matches with their stated background.
            </p>
            <p className="text-light mb-4">
              We're currently working on the financial assessment and expect to have results within the next 2-3 days. Once that's complete, we'll move on to the relationship history verification.
            </p>
            <p className="text-light">
              Please don't hesitate to reach out if you have any questions or need additional information.
            </p>
          </div>
          
          <div className="p-4 border-t border-darkGray">
            <div className="mb-3">
              <textarea 
                rows="3" 
                className="w-full bg-darkGray border border-darkGold text-light p-3 rounded" 
                placeholder="Type your reply here..."
              ></textarea>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center text-light/70 text-sm">
                <svg className="w-4 h-4 mr-1 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                <span>End-to-end encrypted</span>
              </div>
              <button className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded-md">
                Reply Securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTimeline = () => (
    <div>
      <h3 className="text-2xl font-bold text-light mb-6">Investigation <span className="text-accent">Timeline</span></h3>
      
      <div className="bg-secondary p-6 rounded shadow mb-6">
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-lg font-bold text-light">Case Progress</h4>
          <div className="flex items-center">
            <div className="w-32 bg-darkGray rounded-full h-2.5 mr-2">
              <div 
                className="bg-accent h-2.5 rounded-full"
                style={{ width: `${caseDetails.progress}%` }}
              ></div>
            </div>
            <span className="text-light">{caseDetails.progress}%</span>
          </div>
        </div>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-darkGray"></div>
          
          {/* Timeline Events */}
          <div className="space-y-8">
            {timelineEvents.map(event => (
              <div key={event.id} className="relative pl-10">
                <div className={`absolute left-0 top-1 w-6 h-6 rounded-full ${
                  event.completed ? 'bg-accent' : 'bg-darkGray'
                } flex items-center justify-center`}>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </div>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-light font-bold">{event.title}</h4>
                    <p className="text-light/70 text-sm">{event.description}</p>
                  </div>
                  <p className="text-accent text-sm">{event.date}</p>
                </div>
              </div>
            ))}
            
            {/* Future Events */}
            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-darkGray/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-light/70 font-bold">Criminal Record Check</h4>
                  <p className="text-light/50 text-sm">Comprehensive background check including domestic records</p>
                </div>
                <p className="text-accent/70 text-sm">Upcoming</p>
              </div>
            </div>
            
            <div className="relative pl-10">
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-darkGray/50 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-light/70 font-bold">Final Report Preparation</h4>
                  <p className="text-light/50 text-sm">Compilation of all findings and preparation of final report</p>
                </div>
                <p className="text-accent/70 text-sm">Upcoming</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-secondary p-6 rounded shadow">
        <h4 className="text-lg font-bold text-light mb-4">Investigation Milestones</h4>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="border border-darkGray rounded p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
              <h5 className="text-light font-medium">Phase 1: Initial Research</h5>
            </div>
            <p className="text-light/70 text-sm">Identity verification and preliminary background check</p>
            <p className="text-accent text-sm mt-2">Completed</p>
          </div>
          
          <div className="border border-darkGray rounded p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
              <h5 className="text-light font-medium">Phase 2: Deep Investigation</h5>
            </div>
            <p className="text-light/70 text-sm">Financial analysis and relationship history</p>
            <p className="text-accent text-sm mt-2">In Progress</p>
          </div>
          
          <div className="border border-darkGray rounded p-4">
            <div className="flex items-center mb-2">
              <div className="w-3 h-3 rounded-full bg-gray-500 mr-2"></div>
              <h5 className="text-light font-medium">Phase 3: Final Verification</h5>
            </div>
            <p className="text-light/70 text-sm">Cross-verification and report compilation</p>
            <p className="text-accent text-sm mt-2">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPaymentCenter = () => (
    <div>
      <h3 className="text-2xl font-bold text-light mb-6">Payment <span className="text-accent">Center</span></h3>
      
      <div className="bg-secondary p-6 rounded shadow mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-bold text-light">Payment History</h4>
          <button className="bg-transparent border border-accent hover:border-darkGold text-accent hover:text-darkGold px-4 py-2 rounded">
            Download Receipts
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-darkGray">
                <th className="text-left pb-2 text-light/70">Invoice ID</th>
                <th className="text-left pb-2 text-light/70">Service</th>
                <th className="text-left pb-2 text-light/70">Date</th>
                <th className="text-left pb-2 text-light/70">Amount</th>
                <th className="text-left pb-2 text-light/70">Method</th>
                <th className="text-left pb-2 text-light/70">Status</th>
                <th className="text-right pb-2 text-light/70">Actions</th>
              </tr>
            </thead>
            <tbody>
              {payments.map(payment => (
                <tr key={payment.id} className="border-b border-darkGray">
                  <td className="py-3 text-light">{payment.id}</td>
                  <td className="py-3 text-light">{payment.service}</td>
                  <td className="py-3 text-light">{new Date(payment.date).toLocaleDateString()}</td>
                  <td className="py-3 text-light">${payment.amount}</td>
                  <td className="py-3 text-light">{payment.method}</td>
                  <td className="py-3">
                    <span className={`inline-block py-1 px-2 rounded text-xs font-bold uppercase
                      ${payment.status === 'paid' ? 'bg-green-500/20 text-green-500' : 
                        payment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-500' : 
                        'bg-red-500/20 text-red-500'}`}>
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <button className="text-accent hover:text-darkGold mr-3">View</button>
                    {payment.status === 'pending' && (
                      <button className="text-green-500 hover:text-green-700">Pay Now</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-secondary p-6 rounded shadow">
          <h4 className="text-lg font-bold text-light mb-4">Payment Methods</h4>
          
          <div className="space-y-4">
            <div className="border border-darkGray rounded p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-blue-500/20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path>
                    <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="text-light font-medium">VISA ending in 4242</h5>
                  <p className="text-light/70 text-xs">Expires 12/2026</p>
                </div>
              </div>
              <div>
                <span className="px-2 py-1 bg-green-500/20 text-green-500 text-xs rounded-full">Default</span>
              </div>
            </div>
            
            <div className="border border-darkGray rounded p-4 flex justify-between items-center">
              <div className="flex items-center">
                <div className="bg-green-500/20 rounded-full p-2 mr-3">
                  <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="text-light font-medium">PayPal Account</h5>
                  <p className="text-light/70 text-xs">client@example.com</p>
                </div>
              </div>
              <div>
                <button className="text-accent hover:text-darkGold text-sm">Make Default</button>
              </div>
            </div>
          </div>
          
          <button className="mt-4 bg-accent hover:bg-darkGold text-white px-4 py-2 rounded-md w-full">
            Add Payment Method
          </button>
        </div>
        
        <div className="bg-secondary p-6 rounded shadow">
          <h4 className="text-lg font-bold text-light mb-4">Billing Address</h4>
          
          <div className="space-y-2 text-light mb-6">
            <p>Jane Smith</p>
            <p>123 Investigation Ave</p>
            <p>New York, NY 10001</p>
            <p>United States</p>
            <p className="text-light/70">+1 (555) 123-4567</p>
          </div>
          
          <div className="flex space-x-3">
            <button className="bg-transparent border border-accent hover:border-darkGold text-accent hover:text-darkGold px-4 py-2 rounded">
              Edit Address
            </button>
            <button className="bg-transparent border border-darkGray hover:border-light text-light hover:text-white px-4 py-2 rounded">
              Update Email Preferences
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Case selector dropdown
  const renderCaseSelector = () => (
    <div className="relative inline-block">
      <button 
        onClick={() => setShowCasesDropdown(!showCasesDropdown)}
        className="flex items-center bg-secondary border border-darkGray rounded px-3 py-1.5 text-accent hover:bg-secondary/80"
      >
        {selectedCase ? (
          <span>Case: {selectedCase.caseId || selectedCase.title}</span>
        ) : (
          <span>Select Case</span>
        )}
        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
      
      {showCasesDropdown && (
        <div className="absolute right-0 mt-2 w-60 bg-secondary border border-darkGray rounded shadow-lg z-10">
          <div className="p-2 border-b border-darkGray">
            <h4 className="font-bold text-light">Your Cases</h4>
          </div>
          <div className="max-h-64 overflow-y-auto">
            {cases.length > 0 ? (
              cases.map(caseItem => (
                <button
                  key={caseItem._id}
                  onClick={() => handleCaseSelection(caseItem)}
                  className={`w-full text-left px-4 py-2 hover:bg-primary/30 ${
                    selectedCase && selectedCase._id === caseItem._id ? 'bg-primary/20 text-accent' : 'text-light'
                  }`}
                >
                  <div className="font-medium">{caseItem.title}</div>
                  <div className="text-sm text-light/70">{caseItem.caseId}</div>
                </button>
              ))
            ) : (
              <div className="p-4 text-light/70 text-center">No cases found</div>
            )}
          </div>
          <button
            onClick={() => {
              setShowCasesDropdown(false);
              setShowNewCaseModal(true);
            }}
            className="w-full text-center p-2 border-t border-darkGray text-accent hover:bg-primary/20"
          >
            + New Case
          </button>
        </div>
      )}
    </div>
  );

  // New case modal
  const renderNewCaseModal = () => (
    showNewCaseModal && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-secondary rounded-lg shadow-lg w-full max-w-md p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-light">Create New Case</h3>
            <button 
              onClick={() => setShowNewCaseModal(false)}
              className="text-light/70 hover:text-light"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-3 py-2 rounded mb-4">
              {error}
            </div>
          )}
          
          <form onSubmit={handleCreateCase}>
            <div className="mb-4">
              <label className="block text-light mb-2">Case Title*</label>
              <input
                type="text"
                value={newCase.title}
                onChange={(e) => setNewCase({...newCase, title: e.target.value})}
                className="w-full bg-primary border border-darkGray text-light p-2 rounded"
                placeholder="e.g., Background Check for John Smith"
                required
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-light mb-2">Description (Optional)</label>
              <textarea
                value={newCase.description}
                onChange={(e) => setNewCase({...newCase, description: e.target.value})}
                className="w-full bg-primary border border-darkGray text-light p-2 rounded"
                rows="3"
                placeholder="Provide additional details about this case..."
              ></textarea>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowNewCaseModal(false)}
                className="text-light/70 hover:text-light px-4 py-2 mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-accent hover:bg-darkGold text-white px-4 py-2 rounded-md"
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Case'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-primary text-light flex items-center justify-center pt-[72px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent mx-auto"></div>
          <p className="mt-3">Loading your case information...</p>
        </div>
      </div>
    );
  }
  
  // No cases yet state
  if (!isLoading && cases.length === 0) {
    return (
      <div className="min-h-screen bg-primary text-light pt-[72px]">
        <div className="max-w-2xl mx-auto bg-secondary rounded-lg shadow p-8 text-center mt-10">
          <h2 className="text-2xl font-bold text-light mb-4">Welcome to your client portal</h2>
          <p className="text-light/70 mb-6">You don't have any active cases yet. Start by creating your first case.</p>
          
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-3 rounded mb-6">
              {error}
            </div>
          )}
          
          <button
            onClick={() => setShowNewCaseModal(true)}
            className="bg-accent hover:bg-darkGold text-white px-6 py-3 rounded-md font-medium"
          >
            Create Your First Case
          </button>
        </div>
        
        {renderNewCaseModal()}
        {showProfileEdit && <ProfileEdit onClose={() => setShowProfileEdit(false)} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary text-light">
      {renderNewCaseModal()}
      
      {/* Header with proper spacing for NavBar */}
      <div className="pt-[72px]">
        <header className="bg-secondary py-4 px-6 shadow-md">
          <div className="container mx-auto flex justify-between items-center">
            {/* Left - Page Title */}
            <h1 className="text-xl font-bold text-accent">
              Client Portal
            </h1>
            
            {/* Right - Case Selector */}
            <div>
              {renderCaseSelector()}
            </div>
          </div>
        </header>
        
        {/* Navigation */}
        <nav className="bg-secondary/50 border-y border-darkGray sticky top-[72px] z-10">
          <div className="container mx-auto px-6">
            <div className="flex items-center space-x-6 overflow-x-auto scrollbar-hide">
              <button 
                onClick={() => setActiveSection('dashboard')}
                className={`py-3 border-b-2 ${
                  activeSection === 'dashboard' ? 'border-accent text-accent' : 'border-transparent hover:text-accent'
                } transition-colors whitespace-nowrap`}
              >
                Dashboard
              </button>
              <button 
                onClick={() => setActiveSection('evidence')}
                className={`py-3 border-b-2 ${
                  activeSection === 'evidence' ? 'border-accent text-accent' : 'border-transparent hover:text-accent'
                } transition-colors whitespace-nowrap`}
              >
                Evidence Board
              </button>
              <button 
                onClick={() => setActiveSection('documents')}
                className={`py-3 border-b-2 ${
                  activeSection === 'documents' ? 'border-accent text-accent' : 'border-transparent hover:text-accent'
                } transition-colors whitespace-nowrap`}
              >
                Document Vault
              </button>
              <button 
                onClick={() => setActiveSection('messages')}
                className={`py-3 border-b-2 ${
                  activeSection === 'messages' ? 'border-accent text-accent' : 'border-transparent hover:text-accent'
                } transition-colors whitespace-nowrap`}
              >
                Secure Messages
              </button>
              <button 
                onClick={() => setActiveSection('timeline')}
                className={`py-3 border-b-2 ${
                  activeSection === 'timeline' ? 'border-accent text-accent' : 'border-transparent hover:text-accent'
                } transition-colors whitespace-nowrap`}
              >
                Case Timeline
              </button>
              <button 
                onClick={() => setActiveSection('payment')}
                className={`py-3 border-b-2 ${
                  activeSection === 'payment' ? 'border-accent text-accent' : 'border-transparent hover:text-accent'
                } transition-colors whitespace-nowrap`}
              >
                Payment Center
              </button>
            </div>
          </div>
        </nav>
      </div>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {selectedCase ? (
          renderContent()
        ) : (
          <div className="text-center py-12 bg-secondary rounded-lg shadow-md">
            <h3 className="text-2xl font-bold mb-4">No Active Cases</h3>
            <p className="text-light/70 mb-6">You don't have any active cases. Create a new case to get started.</p>
            <button
              onClick={() => setShowNewCaseModal(true)}
              className="bg-accent hover:bg-darkGold text-white px-6 py-2 rounded-md"
            >
              Create New Case
            </button>
          </div>
        )}
      </main>
      
      {/* Profile Edit Modal */}
      {showProfileEdit && (
        <ProfileEdit onClose={() => setShowProfileEdit(false)} />
      )}
    </div>
  );
};

export default ClientPortal;