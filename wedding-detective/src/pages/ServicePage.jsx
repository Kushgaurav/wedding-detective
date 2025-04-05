import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';

const ServicePage = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

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

  const basicService = findServiceByName('Basic Verification Package');
  const comprehensiveService = findServiceByName('Comprehensive Background Check');
  const premiumService = findServiceByName('Premium Surveillance');
  const internationalService = findServiceByName('International Background Check');
  const familyService = findServiceByName('Family Due Diligence');

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
              <button className="btn-primary w-full text-sm sm:text-base py-2 sm:py-3">Select Package</button>
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
              <button className="btn-primary w-full text-sm sm:text-base py-2 sm:py-3">Select Package</button>
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
              <button className="btn-primary w-full text-sm sm:text-base py-2 sm:py-3">Select Package</button>
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
              <button className="btn-outline w-full text-sm sm:text-base py-2 sm:py-3">Add to Package</button>
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
              <button className="btn-outline w-full text-sm sm:text-base py-2 sm:py-3">Add to Package</button>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Service Selector */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 sm:mb-8 text-light text-center">Customize Your <span className="text-accent">Investigation</span></h3>
            <div className="card p-5 sm:p-8">
              <div className="mb-6 sm:mb-8">
                <h4 className="text-accent font-bold mb-3 sm:mb-4 text-base sm:text-lg">Select Your Base Package</h4>
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-3 sm:gap-4">
                  <div className="border border-darkGray hover:border-accent p-3 sm:p-4 rounded cursor-pointer transition-all">
                    <h5 className="text-light font-bold text-sm sm:text-base">Basic</h5>
                    <p className="text-accent font-bold">{basicService.currency}{basicService.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="border border-accent bg-accent/10 p-3 sm:p-4 rounded cursor-pointer transition-all">
                    <h5 className="text-light font-bold text-sm sm:text-base">Comprehensive</h5>
                    <p className="text-accent font-bold">{comprehensiveService.currency}{comprehensiveService.price.toLocaleString('en-IN')}</p>
                  </div>
                  <div className="border border-darkGray hover:border-accent p-3 sm:p-4 rounded cursor-pointer transition-all">
                    <h5 className="text-light font-bold text-sm sm:text-base">Premium</h5>
                    <p className="text-accent font-bold">{premiumService.currency}{premiumService.price.toLocaleString('en-IN')}+</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h4 className="text-accent font-bold mb-3 sm:mb-4 text-base sm:text-lg">Add Specialized Services</h4>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <input type="checkbox" id="international" className="mr-3 h-4 w-4 sm:h-5 sm:w-5 accent-accent" />
                    <label htmlFor="international" className="text-light text-sm sm:text-base cursor-pointer">International Background Check (+{internationalService.currency}{internationalService.price.toLocaleString('en-IN')})</label>
                  </div>
                  <div className="flex items-center">
                    <input type="checkbox" id="family" className="mr-3 h-4 w-4 sm:h-5 sm:w-5 accent-accent" />
                    <label htmlFor="family" className="text-light text-sm sm:text-base cursor-pointer">Family Due Diligence (+{familyService.currency}{familyService.price.toLocaleString('en-IN')})</label>
                  </div>
                </div>
              </div>
              
              <div className="mb-6 sm:mb-8">
                <h4 className="text-accent font-bold mb-3 sm:mb-4 text-base sm:text-lg">Consultation Preferences</h4>
                <div className="space-y-4">
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Preferred Contact Method</label>
                    <select className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base">
                      <option>Encrypted Email</option>
                      <option>Secure Phone Call</option>
                      <option>In-Person Meeting</option>
                      <option>Burner Email (Anonymous)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Investigation Urgency</label>
                    <select className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base">
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
                  <p className="text-xl sm:text-2xl font-bold text-accent">{comprehensiveService.currency}{comprehensiveService.price.toLocaleString('en-IN')}</p>
                </div>
                <button className="btn-primary w-full sm:w-auto text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6">Request Consultation</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Confidential Consultation Form */}
      <section className="py-12 sm:py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-6 sm:mb-8 text-light text-center">Confidential <span className="text-accent">Consultation</span></h3>
            <div className="card p-5 sm:p-8">
              <form>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">First Name (or Alias)</label>
                    <input type="text" className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base" />
                  </div>
                  <div>
                    <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Last Name (or Alias)</label>
                    <input type="text" className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base" />
                  </div>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Secure Email</label>
                  <input type="email" className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base" />
                  <div className="flex items-center mt-2">
                    <input type="checkbox" id="burner" className="mr-2 h-4 w-4 accent-accent" />
                    <label htmlFor="burner" className="text-light/70 text-xs sm:text-sm">Generate a burner email for me</label>
                  </div>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Service Interest</label>
                  <select className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base">
                    <option>Basic Verification Package</option>
                    <option>Comprehensive Background Check</option>
                    <option>Premium Surveillance</option>
                    <option>International Background Check</option>
                    <option>Family Due Diligence</option>
                    <option>Custom Package</option>
                  </select>
                </div>
                
                <div className="mb-4 sm:mb-6">
                  <label className="block text-light mb-1 sm:mb-2 text-sm sm:text-base">Additional Information</label>
                  <textarea rows="4" className="w-full bg-darkGray border border-darkGold text-light p-2 rounded text-sm sm:text-base"></textarea>
                </div>
                
                <div className="flex items-start sm:items-center mb-4 sm:mb-6">
                  <input type="checkbox" id="privacy" className="mr-2 sm:mr-3 mt-1 sm:mt-0 h-4 w-4 sm:h-5 sm:w-5 accent-accent" />
                  <label htmlFor="privacy" className="text-light/70 text-xs sm:text-sm">I understand that all information will be handled with strict confidentiality</label>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center">
                  <div className="text-light/70 text-xs sm:text-sm mb-4 sm:mb-0">
                    <div className="flex items-center">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                      <span>256-bit Encrypted</span>
                    </div>
                    <div className="flex items-center mt-1">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                      </svg>
                      <span>Session expires in 10:00</span>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full sm:w-auto text-sm py-2 px-4 sm:py-3 sm:px-6">Submit Securely</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServicePage;