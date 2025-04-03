import React from 'react';
import { Link } from 'react-router-dom';

const VerificationProcess = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-light">Verification <span className="text-accent">Process</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-light/80">Our meticulous investigation methodology ensures accurate and reliable results</p>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-12 text-light text-center">Our <span className="text-accent">Investigation</span> Workflow</h3>
          
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-darkGray -translate-x-1/2 hidden md:block"></div>
            
            <div className="space-y-16">
              {/* Step 1 */}
              <div className="relative">
                <div className="md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold mx-auto md:mx-0 mb-6 md:mb-0 z-10">
                  1
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className="md:text-right">
                    <h4 className="text-xl font-bold text-accent mb-3">Initial Consultation</h4>
                    <p className="text-light/80 mb-6 md:mb-0">Our process begins with a confidential consultation to understand your specific concerns and requirements. We establish secure communication channels and assign an anonymous case number.</p>
                  </div>
                  <div className="card p-6 md:mt-0 mt-6">
                    <ul className="space-y-3 text-light/70">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Anonymous case assignment</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Encrypted communication setup</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Service package selection</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="relative">
                <div className="md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold mx-auto md:mx-0 mb-6 md:mb-0 z-10">
                  2
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className="order-last md:order-first">
                    <div className="card p-6 md:mt-0 mt-6">
                      <ul className="space-y-3 text-light/70">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Investigator team assignment</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Investigation strategy development</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Resource allocation</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:text-left">
                    <h4 className="text-xl font-bold text-accent mb-3">Case Planning</h4>
                    <p className="text-light/80 mb-6 md:mb-0">Our team develops a comprehensive investigation strategy tailored to your specific case. We assign specialized investigators based on the required expertise and establish a secure evidence collection protocol.</p>
                  </div>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="relative">
                <div className="md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold mx-auto md:mx-0 mb-6 md:mb-0 z-10">
                  3
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className="md:text-right">
                    <h4 className="text-xl font-bold text-accent mb-3">Evidence Collection</h4>
                    <p className="text-light/80 mb-6 md:mb-0">Our investigators meticulously gather information using advanced techniques while maintaining complete discretion. All evidence is collected legally and ethically, with strict chain-of-custody documentation.</p>
                  </div>
                  <div className="card p-6 md:mt-0 mt-6">
                    <ul className="space-y-3 text-light/70">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Digital forensics</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Background verification</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Surveillance (if applicable)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Step 4 */}
              <div className="relative">
                <div className="md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold mx-auto md:mx-0 mb-6 md:mb-0 z-10">
                  4
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className="order-last md:order-first">
                    <div className="card p-6 md:mt-0 mt-6">
                      <ul className="space-y-3 text-light/70">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Cross-reference verification</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Pattern analysis</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Fact-checking procedures</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="md:text-left">
                    <h4 className="text-xl font-bold text-accent mb-3">Analysis & Verification</h4>
                    <p className="text-light/80 mb-6 md:mb-0">All collected information undergoes our rigorous triple-verification process. Our analysts cross-reference data points from multiple sources to ensure accuracy and identify any inconsistencies or red flags.</p>
                  </div>
                </div>
              </div>
              
              {/* Step 5 */}
              <div className="relative">
                <div className="md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2 w-12 h-12 rounded-full bg-accent flex items-center justify-center text-primary font-bold mx-auto md:mx-0 mb-6 md:mb-0 z-10">
                  5
                </div>
                <div className="md:grid md:grid-cols-2 md:gap-16 items-center">
                  <div className="md:text-right">
                    <h4 className="text-xl font-bold text-accent mb-3">Reporting & Consultation</h4>
                    <p className="text-light/80 mb-6 md:mb-0">We present our findings in a comprehensive, easy-to-understand report. A personal consultation is provided to explain the results, answer questions, and discuss any concerns or next steps.</p>
                  </div>
                  <div className="card p-6 md:mt-0 mt-6">
                    <ul className="space-y-3 text-light/70">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Secure report delivery</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Private findings review</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Recommendations & next steps</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security Protocols */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-12 text-light text-center">Security <span className="text-accent">Protocols</span></h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Client Confidentiality</h4>
              <ul className="space-y-3 text-light/70">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Anonymous case numbers only</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Strict need-to-know basis for all staff</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Burner email options available</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Non-disclosure agreements for all staff</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Data Security</h4>
              <ul className="space-y-3 text-light/70">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>256-bit encryption for all data</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secure cloud storage</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Digital watermarking on all documents</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>30-day automatic purging post-case</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                  <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Evidence Handling</h4>
              <ul className="space-y-3 text-light/70">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Chain-of-custody documentation</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Triple-verification of all findings</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Tamper-evident seals</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Optional physical evidence destruction</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Investigator Credentials */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-12 text-light text-center">Investigator <span className="text-accent">Credentials</span></h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Professional Qualifications</h4>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-light font-bold mb-1">Advanced Certifications</h5>
                    <p className="text-light/70">All investigators hold professional certifications in their specialized fields, including digital forensics, financial analysis, and surveillance techniques.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd"></path>
                        <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15c-2.796 0-5.487-.46-8-1.308z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-light font-bold mb-1">Professional Experience</h5>
                    <p className="text-light/70">Our team includes former law enforcement officers, intelligence professionals, and private investigators with a minimum of 10 years of field experience.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-light font-bold mb-1">Continuous Training</h5>
                    <p className="text-light/70">Our investigators undergo regular training to stay current with the latest investigation techniques, technologies, and legal requirements.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Ethical Standards</h4>
              <div className="space-y-6">
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-light font-bold mb-1">Legal Compliance</h5>
                    <p className="text-light/70">All investigations adhere strictly to local, state, and federal laws. We never engage in illegal surveillance or evidence gathering practices.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 01-1.581.814L12 14.086l-2.419 2.728A1 1 0 018 16V4z" clipRule="evenodd"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-light font-bold mb-1">Code of Conduct</h5>
                    <p className="text-light/70">Our investigators follow a strict code of ethics that emphasizes respect, honesty, discretion, and impartiality in all client interactions.</p>
                  </div>
                </div>
                
                <div className="flex">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h5 className="text-light font-bold mb-1">Client Advocacy</h5>
                    <p className="text-light/70">We work exclusively for our clients, maintaining their interests as our primary focus while ensuring all findings are factual and objective.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-secondary border-t border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-serif font-bold mb-6 text-light">Ready to Begin Your <span className="text-accent">Investigation</span>?</h3>
          <p className="text-light/80 mb-8 max-w-2xl mx-auto">Schedule a confidential consultation with our experts today and take the first step toward peace of mind.</p>
          <Link to="/consultation" className="btn-primary">Request Confidential Consultation</Link>
        </div>
      </section>
    </>
  );
};

export default VerificationProcess;