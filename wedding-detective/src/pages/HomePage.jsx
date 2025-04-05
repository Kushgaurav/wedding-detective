import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getServices } from '../services/api';

const HomePage = () => {
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
      'Premium Surveillance': { price: 125250, currency: '₹' }
    };
    
    return fallbackServices[name] || { price: 0, currency: '₹' };
  };

  const basicService = findServiceByName('Basic Verification Package');
  const comprehensiveService = findServiceByName('Comprehensive Background Check');
  const premiumService = findServiceByName('Premium Surveillance');

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 sm:py-20 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="mb-6 sm:mb-8">
            <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 10H3" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 6H3" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 14H3" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M21 18H3" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-light">Trust <span className="text-accent">But</span> Verify</h2>
          <p className="text-lg  sm:text-xl mb-12 sm:mb-10 max-w-1xl mx-auto text-light/80 text-center whitespace-normal ">Professional pre-marital investigation services to ensure your peace of mind before saying "I do"</p>
          <div className="  flex flex-col xs:flex-row justify-center space-y-3 xs:space-y-0 xs:space-x-4">
            <Link to="/services" className="btn-primary text-sm sm:text-base py-3 px-6">Explore Services</Link>
            <Link to="/consultation" className="btn-outline text-sm sm:text-base py-3 px-6">Confidential Consultation</Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-8 sm:py-12 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-wrap justify-center items-center gap-6 sm:gap-8">
            <div className="flex items-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h3 className="text-accent font-bold text-sm sm:text-base">256-bit Encryption</h3>
                <p className="text-light/70 text-xs sm:text-sm">Military-grade security</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
              </svg>
              <div>
                <h3 className="text-accent font-bold text-sm sm:text-base">Discreet Investigators</h3>
                <p className="text-light/70 text-xs sm:text-sm">Trained professionals</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h3 className="text-accent font-bold text-sm sm:text-base">Triple Verification</h3>
                <p className="text-light/70 text-xs sm:text-sm">Confirmed findings</p>
              </div>
            </div>
            <div className="flex items-center">
              <svg className="w-8 h-8 sm:w-10 sm:h-10 mr-3 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h3 className="text-accent font-bold text-sm sm:text-base">Confidential Service</h3>
                <p className="text-light/70 text-xs sm:text-sm">Anonymous case handling</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-12 sm:py-16 bg-secondary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-3 sm:mb-4 text-light">Our <span className="text-accent">Services</span></h2>
            <p className="text-light/70 text-sm sm:text-base max-w-2xl mx-auto text-center single-line-text">Comprehensive investigation packages tailored to your specific needs</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="card p-5 sm:p-6 border-t-2 border-t-accent transition-all duration-300 hover:shadow-gold">
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">Basic Verification</h3>
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
                  <span>Employment verification</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Basic criminal record check</span>
                </li>
              </ul>
              <Link to="/services" className="btn-outline w-full text-center block text-sm sm:text-base py-2 sm:py-3">Learn More</Link>
            </div>

            <div className="card p-5 sm:p-6 border-t-2 border-t-accent transition-all duration-300 hover:shadow-gold relative sm:transform sm:scale-105 sm:z-10 mt-3">
              <div className="absolute top-1 right-4 bg-accent text-primary text-xs font-bold py-1 px-3 rounded-md shadow-md" style={{ zIndex: 50 }}>POPULAR</div>
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-accent">Comprehensive Check</h3>
              <p className="text-light/70 mb-3 sm:mb-4 text-sm sm:text-base">Detailed investigation for serious relationships</p>
              <p className="text-xl sm:text-2xl font-bold text-accent mb-4 sm:mb-6">{comprehensiveService.currency}{comprehensiveService.price.toLocaleString('en-IN')}</p>
              <ul className="space-y-2 mb-6 sm:mb-8 text-light/80 text-sm sm:text-base">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>All Basic package features</span>
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
              <Link to="/services" className="btn-primary w-full text-center block text-sm sm:text-base py-2 sm:py-3">Learn More</Link>
            </div>

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
              <Link to="/services" className="btn-outline w-full text-center block text-sm sm:text-base py-2 sm:py-3">Learn More</Link>
            </div>
          </div>

          <div className="text-center mt-8 sm:mt-12">
            <Link to="/services" className="btn-primary inline-flex items-center text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6">
              View All Services
              <svg className="w-3 h-3 sm:w-4 sm:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path fill="#d4af37" d="M11.1,-15.9C14.2,-12.7,16.5,-9.1,18.4,-5.1C20.3,-1.1,21.8,3.3,20.9,7.2C20,11.1,16.7,14.5,12.8,16.8C8.9,19.1,4.5,20.3,0.2,20.1C-4.1,19.8,-8.2,18.1,-12.3,15.8C-16.4,13.5,-20.5,10.6,-22.3,6.5C-24.1,2.4,-23.6,-2.9,-21.5,-7.2C-19.4,-11.5,-15.7,-14.8,-11.7,-17.6C-7.7,-20.4,-3.8,-22.7,0,-22.7C3.8,-22.7,7.7,-19,11.1,-15.9Z" transform="translate(50 50)" />
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold mb-4 sm:mb-6 text-light">Ready to <span className="text-accent">Uncover</span> the Truth?</h2>
            <p className="text-lg sm:text-xl mb-8 sm:mb-10 text-light/80">Schedule a confidential consultation with our expert investigators today.</p>
            <div className="flex flex-col xs:flex-row justify-center space-y-3 xs:space-y-0 xs:space-x-4">
              <Link to="/consultation" className="btn-primary text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6">Start Consultation</Link>
              <Link to="/verification-process" className="btn-outline text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6">Learn How It Works</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-10 sm:py-12 bg-secondary border-t border-darkGray">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center">
            <h3 className="text-xl sm:text-2xl font-serif font-bold mb-3 sm:mb-4 text-light">Protect Your Future</h3>
            <p className="text-light/70 mb-5 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">Truth and transparency are the foundation of every successful marriage. Get the peace of mind you deserve.</p>
            <Link to="/services" className="btn-accent text-sm sm:text-base py-2 px-4 sm:py-3 sm:px-6">View Investigation Packages</Link>
          </div>
        </div>
      </section>

      {/* Contact Details */}
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

export default HomePage;