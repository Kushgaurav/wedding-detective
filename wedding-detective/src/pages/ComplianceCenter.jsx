import React from 'react';
import { Link } from 'react-router-dom';

const ComplianceCenter = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-light">Compliance <span className="text-accent">Center</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-light/80">Legal information and data handling policies</p>
        </div>
      </section>

      {/* Legal Disclaimers */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Legal Disclaimers</h3>
          
          <div className="card p-8 mb-8">
            <h4 className="text-xl font-bold text-accent mb-6">Service Limitations</h4>
            <div className="space-y-4 text-light/80">
              <p>Wedding Detective Service operates within the strict boundaries of applicable laws and regulations. Our investigations are conducted using legal methods and publicly available information. We do not engage in any activities that violate privacy laws, wiretapping regulations, or other legal restrictions.</p>
              
              <div className="bg-secondary p-4 rounded-lg border-l-4 border-accent">
                <h5 className="font-bold text-light mb-2">We Do Not:</h5>
                <ul className="list-disc pl-5 space-y-1 text-light/70">
                  <li>Hack into private accounts or devices</li>
                  <li>Intercept private communications</li>
                  <li>Trespass on private property</li>
                  <li>Impersonate law enforcement officials</li>
                  <li>Access sealed or protected records illegally</li>
                  <li>Engage in blackmail or coercion</li>
                </ul>
              </div>
              
              <p>Our services are intended for informational purposes only. Clients are responsible for how they use the information provided. Wedding Detective Service is not liable for actions taken by clients based on our findings.</p>
            </div>
          </div>
          
          <div className="card p-8">
            <h4 className="text-xl font-bold text-accent mb-6">Legal Compliance Statement</h4>
            <div className="space-y-4 text-light/80">
              <p>Wedding Detective Service complies with all applicable federal, state, and local laws governing private investigation services. Our investigators are properly licensed and insured as required by jurisdictional regulations.</p>
              
              <div className="bg-secondary p-4 rounded-lg">
                <h5 className="font-bold text-light mb-2">Licensing & Credentials</h5>
                <p className="text-light/70">All Wedding Detective Service investigators hold appropriate private investigator licenses in their operating jurisdictions. Copies of licenses and credentials are available for verification upon request during the initial consultation.</p>
              </div>
              
              <p>We adhere to the ethical standards established by professional investigation associations, including confidentiality requirements, conflict of interest provisions, and truth in reporting obligations.</p>
              
              <div className="bg-accent/10 p-4 rounded-lg">
                <h5 className="font-bold text-accent mb-2">Important Notice</h5>
                <p className="text-light/80">The information provided through our services is not intended as a substitute for legal advice. If you have specific legal concerns, we recommend consulting with a qualified attorney. Wedding Detective Service can work in conjunction with your legal counsel to provide supporting information as needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Data Handling Policies */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Data Handling Policies</h3>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Client Information Protection</h4>
              <div className="space-y-4 text-light/80">
                <p>We implement stringent measures to protect client identities and case information:</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Anonymous Case Numbers</span>
                      <p className="text-light/70 text-sm">All cases are assigned unique identifier codes rather than using client names in our systems.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Encrypted Communications</span>
                      <p className="text-light/70 text-sm">All client communications are conducted through end-to-end encrypted channels with optional ephemeral messaging.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Secure Payment Processing</span>
                      <p className="text-light/70 text-sm">Financial transactions are processed through PCI-compliant systems with cryptocurrency options for enhanced privacy.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Data Minimization</span>
                      <p className="text-light/70 text-sm">We collect only the information necessary to conduct the investigation, avoiding excessive data gathering.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="bg-accent/10 p-4 rounded-lg mt-6">
                  <h5 className="font-bold text-accent mb-2">Client Confidentiality Agreement</h5>
                  <p className="text-light/80">All clients are protected by our comprehensive confidentiality agreement, which prohibits disclosure of client identity or case details to any third party without explicit written consent or legal requirement.</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6">Evidence Handling & Retention</h4>
              <div className="space-y-4 text-light/80">
                <p>All evidence collected during investigations is subject to strict handling and retention protocols:</p>
                
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Secure Storage</span>
                      <p className="text-light/70 text-sm">All digital evidence is stored in 256-bit encrypted cloud storage with multi-factor authentication access controls.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Digital Watermarking</span>
                      <p className="text-light/70 text-sm">All documents and images are digitally watermarked to prevent unauthorized distribution and enable source tracking.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Automatic Purging</span>
                      <p className="text-light/70 text-sm">All case data is automatically purged 30 days after case completion unless client requests extended retention.</p>
                    </div>
                  </li>
                  
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <div>
                      <span className="font-bold text-light">Physical Evidence Destruction</span>
                      <p className="text-light/70 text-sm">Clients may request witnessed destruction of physical evidence with certificate of destruction provided.</p>
                    </div>
                  </li>
                </ul>
                
                <div className="bg-secondary p-4 rounded-lg mt-6">
                  <h5 className="font-bold text-light mb-2">Chain of Custody</h5>
                  <p className="text-light/70">All evidence is documented with comprehensive chain-of-custody records to maintain integrity and admissibility. Each transfer or access of evidence is logged with timestamp, personnel information, and purpose.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="card p-6 mt-8">
            <h4 className="text-xl font-bold text-accent mb-6">Data Subject Rights</h4>
            <div className="space-y-4 text-light/80">
              <p>Wedding Detective Service respects the privacy rights of all individuals. While our primary obligation is to our clients, we recognize that investigations involve data collection about other individuals ("data subjects"). We adhere to the following principles regarding data subject rights:</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-secondary p-4 rounded-lg">
                  <h5 className="font-bold text-light mb-2">Legal Compliance</h5>
                  <p className="text-light/70">We comply with all applicable data protection and privacy laws in the jurisdictions where we operate, including GDPR, CCPA, and other relevant regulations.</p>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h5 className="font-bold text-light mb-2">Legitimate Interest</h5>
                  <p className="text-light/70">Our investigations are conducted under the legitimate interest basis, balancing the client's need for information against the data subject's privacy rights.</p>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h5 className="font-bold text-light mb-2">Data Accuracy</h5>
                  <p className="text-light/70">We take all reasonable steps to ensure the accuracy of information collected and provide verification processes for all findings.</p>
                </div>
                
                <div className="bg-secondary p-4 rounded-lg">
                  <h5 className="font-bold text-light mb-2">Transparency</h5>
                  <p className="text-light/70">While maintaining client confidentiality, we provide clear information about our data practices through this policy and respond to legitimate inquiries.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Jurisdiction-Specific Regulations */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Jurisdiction-Specific Regulations</h3>
          
          <div className="card p-6 mb-8">
            <h4 className="text-xl font-bold text-accent mb-6">Regional Compliance</h4>
            <p className="text-light/80 mb-6">Wedding Detective Service tailors its operations to comply with the specific legal requirements of each jurisdiction where we conduct investigations. The following information outlines key regulatory considerations by region:</p>
            
            <div className="space-y-6">
              <div className="border-b border-darkGray pb-6">
                <h5 className="font-bold text-light mb-3">United States</h5>
                <ul className="space-y-2 text-light/70">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>State-specific PI licensing requirements</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Federal and state privacy laws (CCPA, BIPA, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Electronic Communications Privacy Act compliance</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-b border-darkGray pb-6">
                <h5 className="font-bold text-light mb-3">European Union</h5>
                <ul className="space-y-2 text-light/70">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>GDPR compliance for all data processing</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Country-specific investigation regulations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Cross-border data transfer restrictions</span>
                  </li>
                </ul>
              </div>
              
              <div className="border-b border-darkGray pb-6">
                <h5 className="font-bold text-light mb-3">Asia-Pacific</h5>
                <ul className="space-y-2 text-light/70">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Country-specific privacy laws (PDPA, PIPL, etc.)</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Varying surveillance and investigation regulations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Data localization requirements</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h5 className="font-bold text-light mb-3">International Investigations</h5>
                <ul className="space-y-2 text-light/70">
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Partner network of licensed investigators in each jurisdiction</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Compliance with international data transfer regulations</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Adherence to Hague Convention protocols where applicable</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="bg-secondary p-6 rounded-lg">
            <div className="flex items-start">
              <svg className="h-6 w-6 text-accent mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
              </svg>
              <div>
                <h4 className="text-light font-bold mb-2">Jurisdictional Limitations</h4>
                <p className="text-light/70">Please note that Wedding Detective Service may be unable to provide certain services in jurisdictions where private investigation is heavily restricted or prohibited. During your initial consultation, we will advise you of any limitations that may apply to your specific case based on jurisdictional requirements.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-2xl font-serif font-bold mb-6 text-light">Have <span className="text-accent">Questions</span>?</h3>
            <p className="text-light/80 mb-8">Our compliance team is available to address any specific legal or regulatory concerns regarding our services.</p>
            <Link to="/consultation" className="btn-primary">Contact Compliance Team</Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ComplianceCenter;