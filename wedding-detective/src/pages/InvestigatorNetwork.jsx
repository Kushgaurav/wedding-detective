import React from 'react';
import { Link } from 'react-router-dom';

const InvestigatorNetwork = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-light">Investigator <span className="text-accent">Network</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-light/80">Our elite team of professional investigators</p>
        </div>
      </section>

      {/* Team Credentials */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Team Credentials</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Investigator 1 */}
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="aspect-square bg-darkGray rounded-lg flex items-center justify-center mb-6">
                <svg className="w-24 h-24 text-accent/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-2">Agent #WD-117</h4>
              <p className="text-light/70 mb-4">Lead Investigator, Financial Specialist</p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-light font-bold mb-2">Expertise</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Financial Analysis</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Asset Tracing</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Digital Forensics</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Background Verification</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-light font-bold mb-2">Credentials</h5>
                  <ul className="space-y-1 text-light/70">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Certified Fraud Examiner</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Licensed Private Investigator</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Digital Forensics Specialist</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-light font-bold mb-2">Experience</h5>
                  <p className="text-light/70">15+ years in financial investigation and fraud detection with specialized training in matrimonial investigations.</p>
                </div>
              </div>
            </div>
            
            {/* Investigator 2 */}
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="aspect-square bg-darkGray rounded-lg flex items-center justify-center mb-6">
                <svg className="w-24 h-24 text-accent/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-2">Agent #WD-235</h4>
              <p className="text-light/70 mb-4">Surveillance Specialist</p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-light font-bold mb-2">Expertise</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Physical Surveillance</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Covert Operations</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Social Engineering</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Evidence Collection</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-light font-bold mb-2">Credentials</h5>
                  <ul className="space-y-1 text-light/70">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Advanced Surveillance Certification</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Licensed Private Investigator</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Evidence Handling Specialist</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-light font-bold mb-2">Experience</h5>
                  <p className="text-light/70">12+ years in surveillance operations with background in law enforcement and specialized training in matrimonial investigations.</p>
                </div>
              </div>
            </div>
            
            {/* Investigator 3 */}
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="aspect-square bg-darkGray rounded-lg flex items-center justify-center mb-6">
                <svg className="w-24 h-24 text-accent/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-2">Agent #WD-342</h4>
              <p className="text-light/70 mb-4">Cyber Intelligence Specialist</p>
              
              <div className="space-y-4">
                <div>
                  <h5 className="text-light font-bold mb-2">Expertise</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Digital Intelligence</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Social Media Analysis</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Online Behavior Profiling</span>
                    <span className="bg-darkGray text-light/70 text-xs py-1 px-2 rounded">Data Recovery</span>
                  </div>
                </div>
                
                <div>
                  <h5 className="text-light font-bold mb-2">Credentials</h5>
                  <ul className="space-y-1 text-light/70">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Certified Information Systems Security Professional</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Digital Forensics Examiner</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Open Source Intelligence Specialist</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="text-light font-bold mb-2">Experience</h5>
                  <p className="text-light/70">10+ years in cyber intelligence with specialized training in social media investigations and digital behavior analysis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Training & Certification */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Training & Certification</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Investigator Requirements</h4>
              <p className="text-light/70 mb-6">All Wedding Detective Service investigators must meet our rigorous standards:</p>
              
              <ul className="space-y-4 text-light/80">
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-light mb-1">Professional Licensing</h5>
                    <p>All investigators hold current private investigator licenses in their operating jurisdictions with clean professional records.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-light mb-1">Minimum Experience</h5>
                    <p>A minimum of 5 years professional investigation experience with verifiable references and case history.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-light mb-1">Specialized Training</h5>
                    <p>Completion of our proprietary matrimonial investigation training program covering legal, ethical, and technical aspects.</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-accent/20 p-2 rounded-full mr-4 mt-1">
                    <svg className="h-5 w-5 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div>
                    <h5 className="font-bold text-light mb-1">Background Verification</h5>
                    <p>Comprehensive background checks including criminal history, financial stability, and professional conduct.</p>
                  </div>
                </li>
              </ul>
            </div>
            
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Certification Badges</h4>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-darkGray rounded-full flex items-center justify-center mb-3 border-2 border-accent">
                    <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h5 className="font-bold text-light mb-1">Certified Investigator</h5>
                  <p className="text-light/70 text-sm">Core certification for all team members</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-darkGray rounded-full flex items-center justify-center mb-3 border-2 border-accent">
                    <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 12v3c0 1.657 3.134 3 7 3s7-1.343 7-3v-3c0 1.657-3.134 3-7 3s-7-1.343-7-3z"></path>
                      <path d="M3 7v3c0 1.657 3.134 3 7 3s7-1.343 7-3V7c0 1.657-3.134 3-7 3S3 8.657 3 7z"></path>
                      <path d="M17 5c0 1.657-3.134 3-7 3S3 6.657 3 5s3.134-3 7-3 7 1.343 7 3z"></path>
                    </svg>
                  </div>
                  <h5 className="font-bold text-light mb-1">Data Specialist</h5>
                  <p className="text-light/70 text-sm">Advanced data analysis certification</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-darkGray rounded-full flex items-center justify-center mb-3 border-2 border-accent">
                    <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <h5 className="font-bold text-light mb-1">Security Expert</h5>
                  <p className="text-light/70 text-sm">Specialized in secure operations</p>
                </div>
                
                <div className="text-center">
                  <div className="w-24 h-24 mx-auto bg-darkGray rounded-full flex items-center justify-center mb-3 border-2 border-accent">
                    <svg className="w-12 h-12 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                    </svg>
                  </div>
                  <h5 className="font-bold text-light mb-1">Field Operative</h5>
                  <p className="text-light/70 text-sm">Surveillance and field operations</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-darkGray">
                <h5 className="font-bold text-light mb-3">Continuing Education</h5>
                <p className="text-light/70">All investigators complete 40+ hours of annual continuing education to maintain certifications and stay current with investigation techniques, legal requirements, and technology advancements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Area Map */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Coverage Area</h3>
          
          <div className="card p-6">
            <div className="aspect-video bg-darkGray rounded-lg flex items-center justify-center mb-6 relative overflow-hidden">
              {/* World Map Outline (SVG) - simplified for stability */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full text-accent/20" viewBox="0 0 1000 500" xmlns="http://www.w3.org/2000/svg">
                  <path fill="currentColor" d="M473,171.1c11.9,1,23.8,1.9,35.7,2.9c-0.5,12.7-1,25.4-1.5,38.1c-10.8,0.5-21.7,1-32.5,1.4 C474.1,199.8,473.5,185.5,473,171.1z"></path>
                </svg>
              </div>
              
              {/* Location Markers */}
              <div className="relative z-10 w-full h-full">
                {/* North America Marker */}
                <div className="absolute left-[20%] top-[35%] group">
                  <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-accent text-primary text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                    North America
                  </div>
                </div>

                {/* Europe Marker */}
                <div className="absolute left-[48%] top-[30%] group">
                  <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-accent text-primary text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                    Europe
                  </div>
                </div>

                {/* Asia Marker */}
                <div className="absolute left-[65%] top-[40%] group">
                  <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-accent text-primary text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                    Asia
                  </div>
                </div>

                {/* Australia Marker */}
                <div className="absolute left-[80%] top-[70%] group">
                  <div className="w-4 h-4 bg-accent rounded-full animate-pulse"></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-accent text-primary text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity">
                    Australia
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-8">
              <h4 className="text-xl font-bold text-accent mb-4">Global Investigation Network</h4>
              <p className="text-light/80 mb-6">Our network extends across major cities worldwide, allowing us to conduct comprehensive investigations regardless of geographical boundaries. With local operatives in over 45 countries, we can provide discreet services with cultural understanding and legal compliance in each jurisdiction.</p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h5 className="font-bold text-light mb-2">North America</h5>
                  <ul className="space-y-1 text-light/70">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>15 major metro areas</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>24 partner agencies</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>Full cross-border capability</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-bold text-light mb-2">Europe & Asia</h5>
                  <ul className="space-y-1 text-light/70">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>22 countries covered</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>31 partner agencies</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>Language & cultural expertise</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-bold text-light mb-2">Other Regions</h5>
                  <ul className="space-y-1 text-light/70">
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>Australia & New Zealand</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>South America (8 countries)</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="h-4 w-4 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                      <span>Middle East (select regions)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="pt-6 border-t border-darkGray">
              <div className="flex items-center">
                <div className="bg-accent/20 p-3 rounded-full mr-4">
                  <svg className="h-6 w-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                  </svg>
                </div>
                <div>
                  <h5 className="font-bold text-light">International Case Management</h5>
                  <p className="text-light/70">For cases requiring international investigation, we assign a dedicated case coordinator to manage all aspects of cross-border operations, ensuring seamless communication and consistent methodology.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary border-t border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-serif font-bold mb-6 text-light">Work with Our <span className="text-accent">Elite Team</span></h3>
          <p className="text-light/80 mb-8 max-w-2xl mx-auto">Our professionally trained investigators are ready to provide the verification services you need, anywhere in the world.</p>
          <Link to="/consultation" className="btn-primary">Schedule Confidential Consultation</Link>
        </div>
      </section>
    </>
  );
};

export default InvestigatorNetwork;