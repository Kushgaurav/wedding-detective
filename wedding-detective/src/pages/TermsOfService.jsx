import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <>
      {/* Header Section */}
      <section className="py-16 sm:py-20 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-light">Terms of <span className="text-accent">Service</span></h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto text-light/80">
            Please read these terms carefully before using our investigation services
          </p>
          <div className="flex justify-center">
            <p className="text-light/60 text-sm">Last Updated: March 31, 2025</p>
          </div>
        </div>
      </section>

      {/* Terms Content */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-secondary p-6 sm:p-8 rounded shadow-md border border-darkGray">
            
            {/* Introduction */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">1. <span className="text-accent">Introduction</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  Welcome to Wedding Detective ("Company", "we", "our", "us"). These Terms of Service ("Terms", "Terms of Service") govern your use of our website located at www.weddingdetective.com and our investigation services (together or individually "Service") operated by Wedding Detective.
                </p>
                <p>
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the Service.
                </p>
              </div>
            </div>
            
            {/* Service Usage */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">2. <span className="text-accent">Service Usage</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  Our Service provides pre-marital investigation services. The usage of our Service is permitted for legal purposes only. All information obtained through our Service may not be used for harassment, stalking, blackmail, or any other illegal activities.
                </p>
                <p>
                  By using our Service, you warrant that:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>You are legally capable of entering into binding contracts;</li>
                  <li>You are at least 18 years of age;</li>
                  <li>You will use our services for lawful purposes only;</li>
                  <li>The information you provide to us is true, accurate, current, and complete;</li>
                  <li>You will not use the information obtained for illegal activities.</li>
                </ul>
              </div>
            </div>
            
            {/* Confidentiality */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">3. <span className="text-accent">Confidentiality</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  We understand the sensitive nature of our services. Therefore, we pledge to maintain strict confidentiality regarding all client information and investigation details. All communications between clients and investigators are encrypted and secure.
                </p>
                <p>
                  However, we reserve the right to disclose information if required by law or if we believe that such action is necessary to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Comply with a legal obligation;</li>
                  <li>Protect and defend the rights or property of Wedding Detective;</li>
                  <li>Prevent or investigate possible wrongdoing in connection with the Service;</li>
                  <li>Protect the personal safety of users of the Service or the public;</li>
                  <li>Protect against legal liability.</li>
                </ul>
              </div>
            </div>
            
            {/* Payment Terms */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">4. <span className="text-accent">Payment Terms</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  We offer various investigation packages at different price points. Full payment is required before we commence any investigation services. Pricing is clearly displayed on our Services page, and any additional costs will be communicated and approved before they are incurred.
                </p>
                <p>
                  Refund Policy:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Full refund if canceled within 24 hours of purchase and before any investigation work has commenced;</li>
                  <li>50% refund if canceled after 24 hours but before investigation work begins;</li>
                  <li>No refund once investigation work has commenced;</li>
                  <li>In special circumstances, partial refunds may be considered at our sole discretion.</li>
                </ul>
              </div>
            </div>
            
            {/* Intellectual Property */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">5. <span className="text-accent">Intellectual Property</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  The Service and its original content (excluding content provided by users), features, and functionality are and will remain the exclusive property of Wedding Detective and its licensors. The Service is protected by copyright, trademark, and other laws of both India and foreign countries. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of Wedding Detective.
                </p>
                <p>
                  Investigation reports and materials provided to clients are for their personal use only and may not be distributed, published, or shared without our express permission.
                </p>
              </div>
            </div>
            
            {/* Limitation of Liability */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">6. <span className="text-accent">Limitation of Liability</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  In no event shall Wedding Detective, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Your access to or use of or inability to access or use the Service;</li>
                  <li>Any conduct or content of any third party on the Service;</li>
                  <li>Any content obtained from the Service;</li>
                  <li>Unauthorized access, use or alteration of your transmissions or content;</li>
                  <li>The outcome of the investigation and any subsequent decisions made based on our findings.</li>
                </ul>
                <p>
                  We provide our findings based on thorough investigation, but we cannot guarantee that all relevant information will be discovered.
                </p>
              </div>
            </div>
            
            {/* Governing Law */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">7. <span className="text-accent">Governing Law</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  These Terms shall be governed and construed in accordance with the laws of India, without regard to its conflict of law provisions.
                </p>
                <p>
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions of these Terms will remain in effect.
                </p>
              </div>
            </div>
            
            {/* Changes to Terms */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">8. <span className="text-accent">Changes to Terms</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion.
                </p>
                <p>
                  By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms. If you do not agree to the new terms, please stop using the Service.
                </p>
              </div>
            </div>
            
            {/* Contact Us */}
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">9. <span className="text-accent">Contact Us</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  If you have any questions about these Terms, please contact us at:
                </p>
                <p className="text-accent">legal@weddingdetective.com</p>
                <p>Wedding Detective Services Private Limited</p>
                <p>507 Business Square, Mumbai - 400076, India</p>
                <p>Phone: +91-22-6547-8900</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <section className="py-10 sm:py-12 bg-secondary border-t border-darkGray">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-center sm:text-left">
              <p className="text-light text-sm sm:text-base">Have questions about our terms?</p>
              <p className="text-light/70 text-xs sm:text-sm">Our legal team is here to assist you.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/contact" className="btn-outline text-sm sm:text-base py-2 px-4">Contact Us</Link>
              <Link to="/privacy-policy" className="btn-primary text-sm sm:text-base py-2 px-4">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TermsOfService;