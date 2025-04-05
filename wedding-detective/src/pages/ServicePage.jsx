import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getServices, submitConsultation } from '../services/api';

const ServicePage = () => {
  const navigate = useNavigate();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state management
  const [selectedPackage, setSelectedPackage] = useState('Comprehensive Background Check');
  const [selectedAddons, setSelectedAddons] = useState({
    international: false,
    family: false
  });
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    useBurnerEmail: false,
    burnerEmail: '',
    serviceInterest: 'Comprehensive Background Check',
    message: '',
    contactMethod: 'Encrypted Email',
    urgency: 'Standard (2-3 weeks)',
    privacyChecked: false
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [timer, setTimer] = useState(600); // 10 minutes in seconds

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesData = await getServices();
        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching services:', error);
        setLoading(false);
      }
    };

    fetchServices();
    
    // Set up session expiry timer
    const countdown = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prevTimer - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  // Find services by name (or use dummy data if API call hasn't completed)
  const findServiceByName = (name) => {
    const service = services.find(s => s.name === name);
    if (service) return service;
    
    // Fallback data if API call hasn't completed
    const fallbackServices = {
      'Basic Verification Package': { price: 24917, currency: '₹' },
      'Comprehensive Background Check': { price: 66667, currency: '₹' },
      'Premium Surveillance': { price: 125250, currency: '₹' },
      'International Background Check': { price: 33400, currency: '₹' },
      'Family Due Diligence': { price: 83417, currency: '₹' }
    };
    
    return fallbackServices[name] || { price: 0, currency: '₹' };
  };

  // Calculate total price based on selections
  useEffect(() => {
    const baseService = findServiceByName(selectedPackage);
    let price = baseService.price;
    
    if (selectedAddons.international) {
      const internationalService = findServiceByName('International Background Check');
      price += internationalService.price;
    }
    
    if (selectedAddons.family) {
      const familyService = findServiceByName('Family Due Diligence');
      price += familyService.price;
    }
    
    // Apply urgency multipliers
    if (formData.urgency.includes('Expedited')) {
      price = price * 1.2; // 20% increase
    } else if (formData.urgency.includes('Urgent')) {
      price = price * 1.5; // 50% increase
    }
    
    setTotalPrice(price);
    
    // Update service interest in form data
    let serviceInterest = selectedPackage;
    if (selectedAddons.international) serviceInterest += " + International";
    if (selectedAddons.family) serviceInterest += " + Family";
    setFormData(prev => ({
      ...prev,
      serviceInterest
    }));
  }, [selectedPackage, selectedAddons, formData.urgency, services]);

  const basicService = findServiceByName('Basic Verification Package');
  const comprehensiveService = findServiceByName('Comprehensive Background Check');
  const premiumService = findServiceByName('Premium Surveillance');
  const internationalService = findServiceByName('International Background Check');
  const familyService = findServiceByName('Family Due Diligence');

  // Format time for the session expiry timer
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Generate a burner email
  const generateBurnerEmail = () => {
    const random = Math.random().toString(36).substring(2, 10);
    const burner = `secure-${random}@burner.detactive.com`;
    setFormData(prev => ({
      ...prev,
      burnerEmail: burner,
      useBurnerEmail: true
    }));
  };
  
  // Handle base package selection
  const handlePackageSelect = (packageName) => {
    setSelectedPackage(packageName);
  };
  
  // Handle addon selection
  const handleAddonChange = (addon) => {
    setSelectedAddons(prev => ({
      ...prev,
      [addon]: !prev[addon]
    }));
  };
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (name === 'burner') {
        if (checked) {
          generateBurnerEmail();
        } else {
          setFormData(prev => ({
            ...prev,
            useBurnerEmail: false,
            burnerEmail: ''
          }));
        }
      } else {
        setFormData(prev => ({
          ...prev,
          [name]: checked
        }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.firstName || !formData.lastName) {
      setSubmitError('Please provide your name or alias');
      return;
    }
    
    if (!formData.email && !formData.useBurnerEmail) {
      setSubmitError('Please provide an email address or use a burner email');
      return;
    }
    
    if (!formData.message) {
      setSubmitError('Please provide additional information');
      return;
    }
    
    if (!formData.privacyChecked) {
      setSubmitError('Please agree to our confidentiality policy');
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // Prepare consultation data
      const consultationData = {
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.useBurnerEmail ? formData.burnerEmail : formData.email,
        message: formData.message,
        serviceInterest: formData.serviceInterest,
        contactMethod: formData.contactMethod,
        urgency: formData.urgency
      };
      
      // Submit to API
      await submitConsultation(consultationData);
      
      // Show success and reset form
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        useBurnerEmail: false,
        burnerEmail: '',
        serviceInterest: selectedPackage,
        message: '',
        contactMethod: 'Encrypted Email',
        urgency: 'Standard (2-3 weeks)',
        privacyChecked: false
      });
      
      // Navigate to confidential consultation page after a short delay
      setTimeout(() => {
        navigate('/confidential-consultation');
      }, 3000);
      
    } catch (error) {
      setSubmitError('An error occurred while submitting your request. Please try again.');
      console.error('Service request submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle package selection button clicks
  const handleSelectPackageClick = (packageName) => {
    setSelectedPackage(packageName);
    const element = document.getElementById('service-selector');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold mb-4 sm:mb-6 text-light">Our <span className="text-accent">Services</span></h2>
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 max-w-2xl mx-auto text-light/80 text-center single-line-text">Comprehensive investigation packages tailored to your specific needs</p>
        </div>
      </section>

      {/* Core Services */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-8 sm:mb-10 text-light border-l-4 border-accent pl-4">Core Services</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Basic Verification Package */}
            <div className="card p-5 sm:p-6 border-t-2 border-t-accent transition-all duration-300 hover:shadow-gold">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">Basic Verification Package</h3>
              <p className="text-light/70 mb-3 sm:mb-4 text-sm sm:text-base">Essential background verification for new relationships</p>
              <p className="text-xl sm:text-2xl font-bold text-accent mb-4 sm:mb-6">{basicService.currency}{basicService.price.toLocaleString('en-IN')}</p>
              <ul className="space-y-2 mb-6 sm:mb-8 text-light/80 text-sm sm:text-base">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Social media authenticity check</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Employment/education verification</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic criminal record check (domestic)</span>
                </li>
              </ul>
              <button 
                className="btn-primary w-full text-sm sm:text-base py-2 sm:py-3"
                onClick={() => handleSelectPackageClick('Basic Verification Package')}
              >
                Select Package
              </button>
            </div>

            {/* Comprehensive Background Check */}
            <div className="card p-5 sm:p-6 border-t-2 border-t-accent transition-all duration-300 hover:shadow-gold relative sm:transform sm:scale-105 sm:z-10 mt-3">
              <div className="absolute top-1 right-4 bg-accent text-primary text-xs font-bold py-1 px-3 rounded-md shadow-md" style={{ zIndex: 50 }}>POPULAR</div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">Comprehensive Background Check</h3>
              <p className="text-light/70 mb-3 sm:mb-4 text-sm sm:text-base">Detailed investigation for serious relationships</p>
              <p className="text-xl sm:text-2xl font-bold text-accent mb-4 sm:mb-6">{comprehensiveService.currency}{comprehensiveService.price.toLocaleString('en-IN')}</p>
              <ul className="space-y-2 mb-6 sm:mb-8 text-light/80 text-sm sm:text-base">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Includes Basic package plus:</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Financial health assessment</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Relationship history verification</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Lifestyle pattern analysis</span>
                </li>
              </ul>
              <button 
                className="btn-primary w-full text-sm sm:text-base py-2 sm:py-3"
                onClick={() => handleSelectPackageClick('Comprehensive Background Check')}
              >
                Select Package
              </button>
            </div>

            {/* Premium Surveillance */}
            <div className="card p-5 sm:p-6 border-t-2 border-t-accent transition-all duration-300 hover:shadow-gold">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">Premium Surveillance</h3>
              <p className="text-light/70 mb-3 sm:mb-4 text-sm sm:text-base">Complete monitoring for total peace of mind</p>
              <p className="text-xl sm:text-2xl font-bold text-accent mb-4 sm:mb-6">{premiumService.currency}{premiumService.price.toLocaleString('en-IN')}+</p>
              <ul className="space-y-2 mb-6 sm:mb-8 text-light/80 text-sm sm:text-base">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>7-day physical surveillance</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Undercover social engagement</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Digital behavior monitoring</span>
                </li>
              </ul>
              <button 
                className="btn-primary w-full text-sm sm:text-base py-2 sm:py-3"
                onClick={() => handleSelectPackageClick('Premium Surveillance')}
              >
                Select Package
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Services */}
      <section className="py-12 sm:py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <h3 className="text-xl sm:text-2xl font-serif font-bold mb-8 sm:mb-10 text-light border-l-4 border-accent pl-4">Specialized Services</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* International Background Check */}
            <div className="card p-5 sm:p-6 border-t-2 border-t-accent transition-all duration-300 hover:shadow-gold">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">International Background Check</h3>
              <p className="text-light/70 mb-3 sm:mb-4 text-sm sm:text-base">For partners with international connections</p>
              <p className="text-xl sm:text-2xl font-bold text-accent mb-4 sm:mb-6">+{internationalService.currency}{internationalService.price.toLocaleString('en-IN')}</p>
              <ul className="space-y-2 mb-6 sm:mb-8 text-light/80 text-sm sm:text-base">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Overseas record verification</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Immigration status check</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Cross-border asset search</span>
                </li>
              </ul>
              <button 
                className="btn-outline w-full text-sm sm:text-base py-2 sm:py-3"
                onClick={() => handleAddonChange('international')}
              >
                {selectedAddons.international ? 'Remove from Package' : 'Add to Package'}
              </button>
            </div>

            {/* Family Due Diligence */}
            <div className="card p-5 sm:p-6 border-t-2 border-t-accent transition-all duration-300 hover:shadow-gold">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">Family Due Diligence</h3>
              <p className="text-light/70 mb-3 sm:mb-4 text-sm sm:text-base">Understand the family you're marrying into</p>
              <p className="text-xl sm:text-2xl font-bold text-accent mb-4 sm:mb-6">{familyService.currency}{familyService.price.toLocaleString('en-IN')}</p>
              <ul className="space-y-2 mb-6 sm:mb-8 text-light/80 text-sm sm:text-base">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>3-generation family history</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Inheritance disputes check</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Social standing evaluation</span>
                </li>
              </ul>
              <button 
                className="btn-outline w-full text-sm sm:text-base py-2 sm:py-3"
                onClick={() => handleAddonChange('family')}
              >
                {selectedAddons.family ? 'Remove from Package' : 'Add to Package'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Service Selector */}
      <section id="service-selector" className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 sm:mb-8 text-light text-center">Customize Your <span className="text-accent">Investigation</span></h3>
            <div className="card p-5 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h4 className="text-accent font-bold mb-3 sm:mb-4 text-base sm:text-lg">Select Your Base Package</h4>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
                  <div 
                    className={`border ${selectedPackage === 'Basic Verification Package' ? 'border-accent bg-accent/10' : 'border-darkGray hover:border-accent'} p-3 sm:p-4 rounded cursor-pointer transition-all`}
                    onClick={() => handlePackageSelect('Basic Verification Package')}
                  >
                    <h5 className="text-light font-bold text-sm sm:text-base">Basic</h5>
                    <p className="text-accent font-bold">{basicService.currency}{basicService.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div 
                    className={`border ${selectedPackage === 'Comprehensive Background Check' ? 'border-accent bg-accent/10' : 'border-darkGray hover:border-accent'} p-3 sm:p-4 rounded cursor-pointer transition-all`}
                    onClick={() => handlePackageSelect('Comprehensive Background Check')}
                  >
                    <h5 className="text-light font-bold text-sm sm:text-base">Comprehensive</h5>
                    <p className="text-accent font-bold">{comprehensiveService.currency}{comprehensiveService.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div 
                    className={`border ${selectedPackage === 'Premium Surveillance' ? 'border-accent bg-accent/10' : 'border-darkGray hover:border-accent'} p-3 sm:p-4 rounded cursor-pointer transition-all`}
                    onClick={() => handlePackageSelect('Premium Surveillance')}
                  >
                    <h5 className="text-light font-bold text-sm sm:text-base">Premium</h5>
                    <p className="text-accent font-bold">{premiumService.currency}{premiumService.price.toLocaleString('en-IN')}+</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h4 className="text-accent font-bold mb-3 sm:mb-4 text-base sm:text-lg">Add Specialized Services</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="international" 
                      checked={selectedAddons.international}
                      onChange={() => handleAddonChange('international')}
                      className="mr-3 h-4 w-4 sm:h-5 sm:w-5 accent-accent" 
                    />
                    <label htmlFor="international" className="text-light text-sm sm:text-base cursor-pointer">International Background Check (+{internationalService.currency}{internationalService.price.toLocaleString('en-IN')})</label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="checkbox" 
                      id="family" 
                      checked={selectedAddons.family}
                      onChange={() => handleAddonChange('family')}
                      className="mr-3 h-4 w-4 sm:h-5 sm:w-5 accent-accent" 
                    />
                    <label htmlFor="family" className="text-light text-sm sm:text-base cursor-pointer">Family Due Diligence (+{familyService.currency}{familyService.price.toLocaleString('en-IN')})</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h4 className="text-accent font-bold mb-3 sm:mb-4 text-base sm:text-lg">Consultation Preferences</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Preferred Contact Method</label>
                    <select 
                      name="contactMethod"
                      value={formData.contactMethod}
                      onChange={handleInputChange}
                      className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base"
                    >
                      <option>Encrypted Email</option>
                      <option>Secure Phone Call</option>
                      <option>In-Person Meeting</option>
                      <option>Burner Email (Anonymous)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Investigation Urgency</label>
                    <select 
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base"
                    >
                      <option>Standard (2-3 weeks)</option>
                      <option>Expedited (7-10 days, +20%)</option>
                      <option>Urgent (3-5 days, +50%)</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-center border-t border-darkGray pt-4 sm:pt-6">
                <div className="mb-4 sm:mb-0">
                  <p className="text-light text-sm sm:text-base">Estimated Total:</p>
                  <p className="text-xl sm:text-2xl font-bold text-accent">
                    {comprehensiveService.currency}{Math.round(totalPrice).toLocaleString('en-IN')}
                  </p>
                </div>
                <button 
                  onClick={() => {
                    const element = document.getElementById('consultation-form');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth' });
                    }
                  }} 
                  className="btn-primary w-full sm:w-auto text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6"
                >
                  Request Consultation
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidential Consultation Form */}
      <section id="consultation-form" className="py-12 sm:py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 sm:mb-8 text-light text-center">Confidential <span className="text-accent">Consultation</span></h3>
            <div className="card p-5 sm:p-8">
              {submitSuccess && (
                <div className="bg-green-800/30 border border-green-700 text-light p-4 rounded mb-6 flex items-center">
                  <svg className="w-5 h-5 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Your consultation request has been submitted successfully. We will contact you shortly. Redirecting to consultation page...</span>
                </div>
              )}
              
              {submitError && (
                <div className="bg-red-800/30 border border-red-700 text-light p-4 rounded mb-6 flex items-center">
                  <svg className="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
                  </svg>
                  <span>{submitError}</span>
                </div>
              )}
            
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">First Name (or Alias)</label>
                    <input 
                      type="text" 
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base" 
                    />
                  </div>
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Last Name (or Alias)</label>
                    <input 
                      type="text" 
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base" 
                    />
                  </div>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Secure Email</label>
                  {formData.useBurnerEmail ? (
                    <input 
                      type="email" 
                      className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base" 
                      value={formData.burnerEmail}
                      readOnly
                    />
                  ) : (
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base" 
                    />
                  )}
                  <div className="flex items-center mt-2">
                    <input 
                      type="checkbox" 
                      id="burner" 
                      name="burner"
                      checked={formData.useBurnerEmail}
                      onChange={handleInputChange}
                      className="mr-2 h-4 w-4 accent-accent" 
                    />
                    <label htmlFor="burner" className="text-light/70 text-xs sm:text-sm">Generate a burner email for me</label>
                  </div>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Service Interest</label>
                  <input
                    type="text"
                    className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base"
                    value={formData.serviceInterest}
                    readOnly
                  />
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Additional Information</label>
                  <textarea 
                    rows="4"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please provide details about your situation. Do not include sensitive personal information in this initial contact."
                    className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base"
                  ></textarea>
                </div>
                
                <div className="flex items-start sm:items-center mb-4 sm:mb-6">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    name="privacyChecked"
                    checked={formData.privacyChecked}
                    onChange={handleInputChange}
                    className="mr-2 sm:mr-3 mt-1 sm:mt-0 h-4 w-4 sm:h-5 sm:w-5 accent-accent" 
                  />
                  <label htmlFor="privacy" className="text-light/70 text-xs sm:text-sm">I understand that all information will be handled with strict confidentiality</label>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-light/70 text-xs sm:text-sm mb-4 sm:mb-0">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H3a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                      <span>256-bit Encrypted</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      <span>Session expires in {formatTime(timer)}</span>
                    </div>
                  </div>
                  <button 
                    type="submit" 
                    className="btn-primary w-full sm:w-auto text-sm py-2 px-4 sm:py-3 sm:px-6"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Securely'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-10 sm:py-12 bg-primary border-t border-darkGray">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-6">
              <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 text-light">Contact <span className="text-accent">Us</span></h3>
              <div className="h-1 w-20 bg-accent mx-auto"></div>
            </div>
            
            <div className="bg-secondary p-6 rounded-lg shadow-lg border border-darkGray">
              <div className="flex flex-col sm:flex-row items-center mb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                  <svg className="w-8 h-8 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div className="text-center sm:text-left">
                  <h4 className="text-lg font-bold text-accent mb-1">Gaurav Kushwaha</h4>
                  <p className="text-light/80 text-sm">Founder</p>
                </div>
              </div>
              
              <div className="space-y-3 text-light/80">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <a href="tel:+916388850059" className="hover:text-accent transition-colors">+91 6388850059</a>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <a href="mailto:gauravkushwaha@outlook.in" className="hover:text-accent transition-colors">gauravkushwaha@outlook.in</a>
                </div>
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <a 
                    href="https://www.google.com/maps/search/?api=1&query=Gramsabha+Gate,+Chaka,+Naini,+Prayagraj,+Uttar+Pradesh,+India+-+211008" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:text-accent transition-colors"
                  >
                    Gramsabha Gate, Chaka, Naini, Prayagraj<br />Uttar Pradesh, India - 211008
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;