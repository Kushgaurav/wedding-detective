import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ConfidentialConsultation = () => {
  const [timer, setTimer] = useState(600); // 10 minutes in seconds
  const [email, setEmail] = useState('');
  const [burnerEmail, setBurnerEmail] = useState('');
  const [useBurner, setUseBurner] = useState(false);

  useEffect(() => {
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateBurnerEmail = () => {
    const random = Math.random().toString(36).substring(2, 10);
    const burner = `secure-${random}@burner.detactive.com`;
    setBurnerEmail(burner);
    setUseBurner(true);
  };

  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-light">Confidential <span className="text-accent">Consultation</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-light/80 single-line-text">Secure and discreet communication with our investigation team</p>
        </div>
      </section>

      {/* Session Security Notice */}
      <section className="py-8 bg-primary">
        <div className="container mx-auto px-6">
          <div className="bg-secondary p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <svg className="w-6 h-6 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
                <span className="text-light font-bold">Secure Session</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 text-accent mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
                <span className="text-light">Session expires in <span className="text-accent font-bold">{formatTime(timer)}</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Consultation Form */}
      <section className="py-12 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8">
              <div className="mb-8">
                <h3 className="text-2xl font-serif font-bold mb-4 text-accent">Contact Form</h3>
                <p className="text-light/70">All information submitted through this form is encrypted and handled with the strictest confidentiality. Your privacy is our priority.</p>
              </div>
              
              <form>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-light mb-2">First Name (or Alias)</label>
                    <input type="text" className="w-full bg-darkGray border border-darkGold text-light p-3 rounded" />
                  </div>
                  <div>
                    <label className="block text-light mb-2">Last Name (or Alias)</label>
                    <input type="text" className="w-full bg-darkGray border border-darkGold text-light p-3 rounded" />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label className="block text-light mb-2">Contact Email</label>
                  {useBurner ? (
                    <input 
                      type="email" 
                      className="w-full bg-darkGray border border-darkGold text-light p-3 rounded" 
                      value={burnerEmail}
                      readOnly
                    />
                  ) : (
                    <input 
                      type="email" 
                      className="w-full bg-darkGray border border-darkGold text-light p-3 rounded" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  )}
                  <div className="flex items-center mt-2">
                    <button 
                      type="button" 
                      className="text-accent text-sm hover:text-darkGold transition-colors flex items-center"
                      onClick={generateBurnerEmail}
                    >
                      <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"></path>
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"></path>
                      </svg>
                      Generate a secure burner email
                    </button>
                  </div>
                  {useBurner && (
                    <div className="mt-2 text-light/70 text-sm">
                      <p>Your burner email has been generated. This email will forward all communications to our secure system and will expire after 30 days.</p>
                    </div>
                  )}
                </div>
                
                <div className="mb-6">
                  <label className="block text-light mb-2">Preferred Contact Method</label>
                  <select className="w-full bg-darkGray border border-darkGold text-light p-3 rounded">
                    <option>Encrypted Email</option>
                    <option>Secure Phone Call</option>
                    <option>In-Person Meeting</option>
                    <option>Secure Video Conference</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-light mb-2">Service Interest</label>
                  <select className="w-full bg-darkGray border border-darkGold text-light p-3 rounded">
                    <option>Basic Verification Package</option>
                    <option>Comprehensive Background Check</option>
                    <option>Premium Surveillance</option>
                    <option>International Background Check</option>
                    <option>Family Due Diligence</option>
                    <option>Custom Package</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-light mb-2">Message</label>
                  <textarea rows="5" className="w-full bg-darkGray border border-darkGold text-light p-3 rounded" placeholder="Please provide details about your situation. Do not include sensitive personal information in this initial contact."></textarea>
                </div>
                
                <div className="mb-8">
                  <label className="block text-light mb-2">Security Verification</label>
                  <div className="bg-darkGray border border-darkGold p-4 rounded">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-light/70">Please verify you are human</span>
                      <button type="button" className="text-accent hover:text-darkGold transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd"></path>
                        </svg>
                      </button>
                    </div>
                    <div className="bg-primary/50 p-3 rounded flex items-center justify-center">
                      <div className="text-accent font-bold text-xl tracking-widest">DETACTIVE</div>
                    </div>
                    <input type="text" className="w-full bg-darkGray border border-darkGold text-light p-2 rounded mt-3" placeholder="Enter the text above" />
                  </div>
                </div>
                
                <div className="flex items-center mb-8">
                  <input type="checkbox" id="privacy" className="mr-3 h-5 w-5 accent-accent" />
                  <label htmlFor="privacy" className="text-light/70">I understand and agree that all information will be handled with strict confidentiality according to the <Link to="/compliance" className="text-accent hover:text-darkGold transition-colors">Privacy Policy</Link></label>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="text-light/70 text-sm">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                      </svg>
                      <span>256-bit Encrypted</span>
                    </div>
                  </div>
                  <button type="submit" className="btn-primary">Submit Securely</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Security Features */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light text-center">Security <span className="text-accent">Features</span></h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Encrypted Communication</h4>
              <p className="text-light/70 mb-4 text-center">All communications are protected with military-grade 256-bit encryption to ensure your information remains confidential.</p>
            </div>
            
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 2a5 5 0 00-5 5v2a2 2 0 00-2 2v5a2 2 0 002 2h10a2 2 0 002-2v-5a2 2 0 00-2-2H7V7a3 3 0 015.905-.75 1 1 0 001.937-.5A5.002 5.002 0 0010 2z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Anonymous Case Handling</h4>
              <p className="text-light/70 mb-4 text-center">Your case will be assigned a unique identifier code, ensuring your identity remains protected throughout the investigation process.</p>
            </div>
            
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Session Expiration</h4>
              <p className="text-light/70 mb-4 text-center">For your protection, all consultation sessions automatically expire after 10 minutes of inactivity to prevent unauthorized access.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Burner Email Generator */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="card p-8">
              <div className="flex items-start mb-6">
                <svg className="w-10 h-10 text-accent mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <div>
                  <h3 className="text-2xl font-serif font-bold mb-2 text-accent">Burner Email Generator</h3>
                  <p className="text-light/70">For maximum privacy, our burner email service allows you to communicate with us without using your personal email address.</p>
                </div>
              </div>
              
              <div className="bg-secondary p-6 rounded-lg mb-6">
                <h4 className="text-light font-bold mb-4">How It Works</h4>
                <ol className="space-y-3 text-light/70 list-decimal pl-5">
                  <li>Click the "Generate a secure burner email" button in the form above</li>
                  <li>A temporary email address will be created that forwards to our secure system</li>
                  <li>Use this email for all communications related to your case</li>
                  <li>The email address automatically expires after 30 days</li>
                  <li>No connection to your personal email is ever created or stored</li>
                </ol>
              </div>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                  </svg>
                  <span className="text-accent font-bold">Privacy Note</span>
                </div>
                <p className="text-light/80 mt-2">Our burner email system is designed for maximum privacy and leaves no digital trail. All metadata is stripped from communications, and no IP addresses are logged.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light text-center">Alternative <span className="text-accent">Contact Methods</span></h3>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <h4 className="text-xl font-bold text-accent">Secure Phone Line</h4>
              </div>
              <p className="text-light/70 mb-4">For clients who prefer verbal communication, our secure phone line is available during business hours.</p>
              <div className="bg-primary p-3 rounded text-center">
                <span className="text-accent font-bold tracking-wider">+1 (555) 123-4567</span>
              </div>
              <p className="text-light/70 text-sm mt-3">Call hours: Monday-Friday, 9am-5pm EST</p>
            </div>
            
            <div className="card p-6">
              <div className="flex items-center mb-4">
                <svg className="w-8 h-8 text-accent mr-3" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <h4 className="text-xl font-bold text-accent">In-Person Consultation</h4>
              </div>
              <p className="text-light/70 mb-4">For maximum discretion, we offer private in-person consultations at secure locations.</p>
              <ul className="text-light/70 space-y-2">
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Private meeting rooms</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Flexible scheduling</span>
                </li>
                <li className="flex items-center">
                  <svg className="w-5 h-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Discreet locations available</span>
                </li>
              </ul>
              <button className="btn-outline w-full mt-4">Schedule Meeting</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ConfidentialConsultation;