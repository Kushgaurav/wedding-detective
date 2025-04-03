import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <>
      {/* Header Section */}
      <section className="py-16 sm:py-20 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold mb-4 sm:mb-6 text-light">Privacy <span className="text-accent">Policy</span></h2>
          <p className="text-lg sm:text-xl mb-8 sm:mb-10 max-w-3xl mx-auto text-light/80">
            How we collect, use, and protect your personal information
          </p>
          <div className="flex justify-center">
            <p className="text-light/60 text-sm">Last Updated: March 31, 2025</p>
          </div>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-12 sm:py-16 bg-primary">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="max-w-4xl mx-auto bg-secondary p-6 sm:p-8 rounded shadow-md border border-darkGray">
            
            {/* Introduction */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">1. <span className="text-accent">Introduction</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  At Wedding Detective ("Company", "we", "our", "us"), we understand the importance of your personal information and are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and investigation services.
                </p>
                <p>
                  Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please do not access our website or use our services.
                </p>
                <p>
                  We reserve the right to make changes to this Privacy Policy at any time and for any reason. We will alert you about any changes by updating the "Last Updated" date of this Privacy Policy. You are encouraged to periodically review this Privacy Policy to stay informed of updates.
                </p>
              </div>
            </div>
            
            {/* Collection of Information */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">2. <span className="text-accent">Collection of Information</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  We may collect information about you in a variety of ways. The information we may collect includes:
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">Personal Data</h4>
                <p>
                  Personally identifiable information, such as your name, email address, telephone number, date of birth, and home address that you voluntarily give to us when you register with us or when you choose to participate in various activities related to our services. You are under no obligation to provide us with personal information, but your refusal to do so may prevent you from using certain features of our website and services.
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">Investigation Data</h4>
                <p>
                  Information about the subject of investigation that you provide to us, including photographs, social media handles, known addresses, occupation details, and any other data required to perform our investigation services.
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">Financial Data</h4>
                <p>
                  We may collect financial information such as data related to your payment method (e.g., credit card number, bank account details) when you purchase our services. All financial information is stored by our payment processor, and we only retain limited information for transaction verification.
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">Device Data</h4>
                <p>
                  Information about your browsing device, including your web browser, IP address, time zone, and some of the cookies installed on your device. Additionally, we may collect data about the individual web pages that you view, what websites or search terms referred you to our site, and information about how you interact with the site.
                </p>
              </div>
            </div>
            
            {/* Use of Information */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">3. <span className="text-accent">Use of Information</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  Having accurate information about you allows us to provide a smooth, efficient, and customized experience. We may use information collected about you via the website and our services to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Create and manage your account;</li>
                  <li>Perform the investigation services you request;</li>
                  <li>Process payments and refunds;</li>
                  <li>Send you service updates and administrative emails;</li>
                  <li>Respond to customer service requests;</li>
                  <li>Improve our website and marketing efforts;</li>
                  <li>Conduct research and analysis to improve our services;</li>
                  <li>Prevent fraudulent transactions, monitor against theft, and protect against criminal activity;</li>
                  <li>Resolve disputes and troubleshoot problems.</li>
                </ul>
              </div>
            </div>
            
            {/* Security of Information */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">4. <span className="text-accent">Security of Information</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  We take the security of your personal information seriously and use administrative, technical, and physical security measures to protect your personal information from unauthorized access, disclosure, alteration, and destruction. These measures include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>256-bit encryption for all data transfers;</li>
                  <li>Secure storage of all client information;</li>
                  <li>Regular security audits and updates;</li>
                  <li>Strict access controls for staff members;</li>
                  <li>Physical security measures at our offices;</li>
                  <li>Regular employee training on security protocols.</li>
                </ul>
                <p>
                  Despite our best efforts, no security measure is perfect or impenetrable. We cannot guarantee absolute security of your personal information.
                </p>
              </div>
            </div>
            
            {/* Disclosure of Information */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">5. <span className="text-accent">Disclosure of Information</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  We may share information we have collected about you in certain situations. Your information may be disclosed as follows:
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">By Law or to Protect Rights</h4>
                <p>
                  If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">Third-Party Service Providers</h4>
                <p>
                  We may share your information with third-party service providers who perform services on our behalf, such as payment processing, data analysis, email delivery, hosting services, and customer service.
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">Investigators</h4>
                <p>
                  We work with a network of professional investigators who may need access to certain information to perform the requested services. All investigators are bound by strict confidentiality agreements.
                </p>
                
                <h4 className="text-lg font-bold text-accent mt-6 mb-2">Business Transfers</h4>
                <p>
                  If we are involved in a merger, acquisition, or sale of all or a portion of our assets, you will be notified via email and/or a prominent notice on our website of any change in ownership or uses of your personal information, as well as any choices you may have regarding your personal information.
                </p>
              </div>
            </div>
            
            {/* Your Rights */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">6. <span className="text-accent">Your Rights</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  You have certain rights regarding your personal information. These include:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><span className="text-accent font-bold">Right to Access</span> - You have the right to request copies of your personal information.</li>
                  <li><span className="text-accent font-bold">Right to Rectification</span> - You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
                  <li><span className="text-accent font-bold">Right to Deletion</span> - You have the right to request that we delete your personal information, subject to certain exceptions.</li>
                  <li><span className="text-accent font-bold">Right to Restrict Processing</span> - You have the right to request that we restrict the processing of your personal information.</li>
                  <li><span className="text-accent font-bold">Right to Object</span> - You have the right to object to our processing of your personal information.</li>
                  <li><span className="text-accent font-bold">Right to Data Portability</span> - You have the right to request that we transfer the data we have collected to another organization or directly to you.</li>
                </ul>
                <p>
                  To exercise any of these rights, please contact us using the contact information provided below.
                </p>
              </div>
            </div>
            
            {/* Cookies and Tracking */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">7. <span className="text-accent">Cookies and Tracking Technologies</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  We may use cookies, web beacons, tracking pixels, and other tracking technologies on our website to help customize the website and improve your experience. When you access our website, your personal information is not collected through the use of tracking technology.
                </p>
                <p>
                  You can choose to disable cookies through your browser options, but doing so may affect the functionality of our website.
                </p>
              </div>
            </div>
            
            {/* Children's Privacy */}
            <div className="mb-10">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">8. <span className="text-accent">Children's Privacy</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  Our website and services are not directed to children under the age of 18. We do not knowingly collect personal information from children under 18. If you believe we have collected information from a child under 18, please contact us immediately, and we will take steps to remove such information.
                </p>
              </div>
            </div>
            
            {/* Contact Information */}
            <div className="mb-6">
              <h3 className="text-2xl font-serif font-bold mb-4 text-light">9. <span className="text-accent">Contact Information</span></h3>
              <div className="text-light/80 space-y-4">
                <p>
                  If you have questions or comments about this Privacy Policy, please contact us at:
                </p>
                <p className="text-accent">privacy@weddingdetective.com</p>
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
              <p className="text-light text-sm sm:text-base">Have questions about your privacy?</p>
              <p className="text-light/70 text-xs sm:text-sm">Our data protection team is available to assist you.</p>
            </div>
            <div className="flex space-x-4">
              <Link to="/contact" className="btn-outline text-sm sm:text-base py-2 px-4">Contact Us</Link>
              <Link to="/terms-of-service" className="btn-primary text-sm sm:text-base py-2 px-4">Terms of Service</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PrivacyPolicy;