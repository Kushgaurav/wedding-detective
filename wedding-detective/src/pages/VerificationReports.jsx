import React from 'react';
import { Link } from 'react-router-dom';

const VerificationReports = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-light">Verification <span className="text-accent">Reports</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-light/80">Understanding our detailed investigation documentation</p>
        </div>
      </section>

      {/* Sample Report Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Sample Redacted Report</h3>
          
          <div className="card p-8 mb-12">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h4 className="text-xl font-bold text-accent">Verification Report</h4>
                <p className="text-light/70">Case #WD-29384 (Redacted)</p>
              </div>
              <div className="flex items-center">
                <div className="w-16 h-16 relative">
                  <svg className="w-full h-full text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-primary font-bold text-xs">VERIFIED</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-secondary rounded-lg border border-darkGray">
                <h5 className="font-bold text-light mb-3">Subject Information</h5>
                <div className="grid md:grid-cols-2 gap-4 text-light/70">
                  <div>
                    <p className="text-sm">Name: <span className="text-accent">████████ ████</span></p>
                    <p className="text-sm">Age: <span className="text-accent">3█</span></p>
                    <p className="text-sm">Location: <span className="text-accent">███████, CA</span></p>
                  </div>
                  <div>
                    <p className="text-sm">Investigation Date: <span className="text-accent">██/██/2023</span></p>
                    <p className="text-sm">Package: <span className="text-accent">Comprehensive Background</span></p>
                    <p className="text-sm">Investigator: <span className="text-accent">Agent #WD-117</span></p>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-bold text-light mb-3">Executive Summary</h5>
                <p className="text-light/70">Subject verification completed with <span className="text-accent font-bold">97% confidence rating</span>. All core identity claims have been independently verified through multiple sources. Financial stability confirmed with minor concerns noted in section 3.2. No significant relationship history red flags detected.</p>
              </div>
              
              <div className="p-4 bg-secondary rounded-lg border border-darkGray">
                <h5 className="font-bold text-light mb-3">Identity Verification</h5>
                <ul className="space-y-2 text-light/70">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Legal name confirmed via ████████ records</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Date of birth verified through ████ and ████████ sources</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Employment history confirmed with ██ ████████</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Educational credentials verified with ████████ University</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Document Authentication Guide */}
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Document Authentication Guide</h4>
              <div className="space-y-4 text-light/80">
                <p>All Wedding Detective reports include multiple security features to ensure authenticity and prevent tampering.</p>
                
                <div className="space-y-3">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-darkGray flex items-center justify-center text-accent mr-4 flex-shrink-0">1</div>
                    <div>
                      <h5 className="font-bold text-light mb-1">Digital Watermarking</h5>
                      <p className="text-light/70 text-sm">Invisible watermarks embedded throughout the document that can be verified with our proprietary scanner.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-darkGray flex items-center justify-center text-accent mr-4 flex-shrink-0">2</div>
                    <div>
                      <h5 className="font-bold text-light mb-1">QR Verification</h5>
                      <p className="text-light/70 text-sm">Each report contains a unique QR code that links to our secure verification portal.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-darkGray flex items-center justify-center text-accent mr-4 flex-shrink-0">3</div>
                    <div>
                      <h5 className="font-bold text-light mb-1">Cryptographic Signature</h5>
                      <p className="text-light/70 text-sm">Reports are digitally signed with a unique cryptographic key that changes with any alteration.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tamper-Evident Seal */}
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Tamper-Evident Seal</h4>
              <div className="flex flex-col items-center justify-center h-full">
                <div className="w-32 h-32 relative mb-6">
                  <svg className="w-full h-full text-accent" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-4 border-accent rounded-full flex items-center justify-center">
                      <span className="text-accent font-bold text-xs">SECURED</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-light/80 text-center mb-4">Our tamper-evident seal changes color and displays "VOID" if the document has been altered in any way.</p>
                
                <button className="btn-outline">Verify This Report</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VerificationReports;