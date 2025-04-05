import React from 'react';
import { Link } from 'react-router-dom';

const CaseStudies = () => {
  return (
    <>
      {/* Hero Section */}
      <section className="py-16 bg-secondary border-b border-darkGray">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif font-bold mb-6 text-light">Case <span className="text-accent">Studies</span></h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-light/80 single-line-text">Anonymized success stories and threat prevention examples</p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Success Stories</h3>
          
          <div className="space-y-12">
            {/* Case Study 1 */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-accent text-primary text-xs font-bold py-1 px-6 right-[-24px] top-[32px]">VERIFIED</div>
              </div>
              
              <div className="md:flex">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="aspect-square bg-darkGray rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-accent/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 5 0 0010 11z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-accent font-bold">Case Details</h4>
                    <ul className="mt-2 space-y-2 text-light/70 text-sm">
                      <li className="flex items-center">
                        <span className="w-24">Client:</span>
                        <span>Female, 27</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Subject:</span>
                        <span>Male, 33</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Relationship:</span>
                        <span>Arranged Marriage Process</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Package:</span>
                        <span>Cultural Background Check</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-accent mb-4">The Biodata Deception</h4>
                  <div className="space-y-4 text-light/80">
                    <p>Priya's parents contacted our agency in December 2024 after their daughter expressed subtle concerns about her potential match. At 27, Priya had completed her MBA from a prestigious institute and was working with a multinational corporation in Mumbai. Her family had received a marriage proposal from Vikram, a 33-year-old software engineer reportedly working for a well-known tech company in Bangalore. His biodata, shared through a respected family matchmaker, presented an impressive profile – an IIT Delhi graduate with a master's from a foreign university, stable employment history with a substantial salary, and significant family property in Delhi's upscale neighborhoods.</p>
                    
                    <p>"During our first family meeting at Taj West End, everything seemed perfect," Priya's father told our consultant. "But when my daughter spoke with him privately about technical matters related to his claimed specialization, his answers seemed rehearsed and superficial." The family had already progressed to the pre-engagement discussion stage when Priya noticed Vikram's reluctance to introduce certain family members and inconsistencies in stories about his educational experiences.</p>
                    
                    <div className="bg-secondary p-4 rounded-lg border-l-4 border-accent">
                      <h5 className="font-bold text-light mb-2">Investigation Findings</h5>
                      <ul className="list-disc pl-5 space-y-1 text-light/70">
                        <li>Verification with IIT Delhi alumni network confirmed Vikram had attended only a three-month certificate course, not the four-year degree program claimed</li>
                        <li>LinkedIn profile analysis revealed six job changes in four years, with tenures averaging only 7 months per position</li>
                        <li>Professional contacts confirmed actual salary was approximately 40% less than represented</li>
                        <li>Property documents provided for verification showed manipulation with digital alterations to ownership percentages</li>
                        <li>Discreet inquiries with local associates uncovered significant gambling debts at several establishments in Bangalore and Goa</li>
                        <li>Background check revealed a previously broken engagement with another family from Chennai that was concealed during discussions</li>
                      </ul>
                    </div>
                    
                    <p>Our Delhi and Bangalore teams worked meticulously through a network of local contacts to verify Vikram's credentials. Our education verification specialist discovered he had been dismissed from a postgraduate program abroad due to academic violations but continued to use the university's name in his resume. More concerning was our financial analyst's discovery that Vikram had borrowed substantial sums from relatives to maintain appearances during the marriage discussions.</p>
                    
                    <p>"What was particularly troubling," noted our lead investigator, "was finding evidence of similar patterns with three other marriage proposals simultaneously in progress with families in Chennai, Hyderabad, and Delhi. In each case, he had adjusted his biodata to match the specific expectations of each family, creating essentially different personas."</p>
                    
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <h5 className="font-bold text-accent mb-2">Client Outcome</h5>
                      <p className="text-light/80">We presented our findings confidentially to Priya's parents in a private meeting with detailed documentation. Following cultural sensitivity protocols, we developed a face-saving exit strategy that allowed the family to withdraw from proceedings citing an unexpected family commitment that would delay marriage plans indefinitely. "In arranged marriage contexts, preserving family reputation is paramount," explained Priya's father afterward. "Your team's cultural understanding allowed us to exit this situation without embarrassment to either family." The matchmaker was privately informed of the situation to prevent similar matches being proposed to other families. Three months later, Priya's family contacted us again – this time with a new match they wished to verify before proceeding, which our investigation confirmed as genuine.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Case Study 2 */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-accent text-primary text-xs font-bold py-1 px-6 right-[-24px] top-[32px]">VERIFIED</div>
              </div>
              
              <div className="md:flex">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="aspect-square bg-darkGray rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-accent/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 5 0 0010 11z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-accent font-bold">Case Details</h4>
                    <ul className="mt-2 space-y-2 text-light/70 text-sm">
                      <li className="flex items-center">
                        <span className="w-24">Client:</span>
                        <span>Male, 41</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Subject:</span>
                        <span>Female, 38</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Relationship:</span>
                        <span>Dating, 8 months</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Package:</span>
                        <span>International + Family</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-accent mb-4">The International Identity Mystery</h4>
                  <div className="space-y-4 text-light/80">
                    <p>Our client met his partner during a business trip abroad. After a whirlwind romance, they began discussing marriage and her permanent relocation to his country. The subject claimed to come from a prestigious family with international business connections, but the client noticed inconsistencies in her stories about her background.</p>
                    
                    <div className="bg-secondary p-4 rounded-lg border-l-4 border-accent">
                      <h5 className="font-bold text-light mb-2">Investigation Findings</h5>
                      <ul className="list-disc pl-5 space-y-1 text-light/70">
                        <li>Subject was using a false identity with fabricated educational credentials</li>
                        <li>Previous marriage in another country that was never disclosed</li>
                        <li>Ongoing immigration issues including a denied visa application</li>
                        <li>Family connections were fabricated with hired actors for video calls</li>
                        <li>Pattern of similar relationships with other wealthy individuals</li>
                      </ul>
                    </div>
                    
                    <p>Our international investigation team uncovered the subject's true identity and a pattern of targeting wealthy individuals for immigration and financial benefits. The elaborate scheme included creating false family connections and a fictional background designed to appeal to the client.</p>
                    
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <h5 className="font-bold text-accent mb-2">Client Outcome</h5>
                      <p className="text-light/80">The client was able to end the relationship before marriage or any significant financial commitments. Our discreet approach ensured the subject never discovered the investigation, allowing the client to exit the relationship safely and without confrontation.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Case Study 3 */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-accent text-primary text-xs font-bold py-1 px-6 right-[-24px] top-[32px]">VERIFIED</div>
              </div>
              
              <div className="md:flex">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="aspect-square bg-darkGray rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-accent/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 5 0 0010 11z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-accent font-bold">Case Details</h4>
                    <ul className="mt-2 space-y-2 text-light/70 text-sm">
                      <li className="flex items-center">
                        <span className="w-24">Client:</span>
                        <span>Female, 29</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Subject:</span>
                        <span>Male, 31</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Relationship:</span>
                        <span>Engaged, 2 years</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Package:</span>
                        <span>Premium Surveillance</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-accent mb-4">The Double Life Revelation</h4>
                  <div className="space-y-4 text-light/80">
                    <p>Our client had been in a seemingly perfect relationship for two years and was planning a wedding. However, the subject's frequent "business trips" and unexplained absences began to raise concerns. Despite a strong relationship, the client noticed the subject becoming increasingly protective of their phone and computer.</p>
                    
                    <div className="bg-secondary p-4 rounded-lg border-l-4 border-accent">
                      <h5 className="font-bold text-light mb-2">Investigation Findings</h5>
                      <ul className="list-disc pl-5 space-y-1 text-light/70">
                        <li>Subject maintained a separate residence in another city</li>
                        <li>Evidence of a concurrent long-term relationship with another partner</li>
                        <li>Second partner was also unaware of the deception</li>
                        <li>Elaborate system of fake business trips and work schedules</li>
                        <li>Financial resources being divided between both relationships</li>
                      </ul>
                    </div>
                    
                    <p>Our surveillance team documented the subject's double life, including the maintenance of two separate residences and relationships. The subject had created an elaborate schedule and excuse system to maintain both relationships simultaneously for over three years.</p>
                    
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <h5 className="font-bold text-accent mb-2">Client Outcome</h5>
                      <p className="text-light/80">The client was able to confront the subject with irrefutable evidence, ending the relationship before the wedding. Our team provided emotional support resources and helped secure the return of shared assets. The client later reported this intervention saved them from what would have been a devastating discovery after marriage.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Indian Case Study */}
            <div className="card p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24">
                <div className="absolute transform rotate-45 bg-accent text-primary text-xs font-bold py-1 px-6 right-[-24px] top-[32px]">VERIFIED</div>
              </div>
              
              <div className="md:flex">
                <div className="md:w-1/3 mb-6 md:mb-0 md:pr-8">
                  <div className="aspect-square bg-darkGray rounded-lg flex items-center justify-center">
                    <svg className="w-24 h-24 text-accent/30" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 5 0 0010 11z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-accent font-bold">Case Details</h4>
                    <ul className="mt-2 space-y-2 text-light/70 text-sm">
                      <li className="flex items-center">
                        <span className="w-24">Client:</span>
                        <span>Female, 27</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Subject:</span>
                        <span>Male, 33</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Relationship:</span>
                        <span>Arranged Marriage Process</span>
                      </li>
                      <li className="flex items-center">
                        <span className="w-24">Package:</span>
                        <span>Cultural Background Check</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="md:w-2/3">
                  <h4 className="text-xl font-bold text-accent mb-4">The Biodata Deception</h4>
                  <div className="space-y-4 text-light/80">
                    <p>Priya's parents contacted our agency in December 2024 after their daughter expressed subtle concerns about her potential match. At 27, Priya had completed her MBA from a prestigious institute and was working with a multinational corporation in Mumbai. Her family had received a marriage proposal from Vikram, a 33-year-old software engineer reportedly working for a well-known tech company in Bangalore. His biodata, shared through a respected family matchmaker, presented an impressive profile – an IIT Delhi graduate with a master's from a foreign university, stable employment history with a substantial salary, and significant family property in Delhi's upscale neighborhoods.</p>
                    
                    <p>"During our first family meeting at Taj West End, everything seemed perfect," Priya's father told our consultant. "But when my daughter spoke with him privately about technical matters related to his claimed specialization, his answers seemed rehearsed and superficial." The family had already progressed to the pre-engagement discussion stage when Priya noticed Vikram's reluctance to introduce certain family members and inconsistencies in stories about his educational experiences.</p>
                    
                    <div className="bg-secondary p-4 rounded-lg border-l-4 border-accent">
                      <h5 className="font-bold text-light mb-2">Investigation Findings</h5>
                      <ul className="list-disc pl-5 space-y-1 text-light/70">
                        <li>Verification with IIT Delhi alumni network confirmed Vikram had attended only a three-month certificate course, not the four-year degree program claimed</li>
                        <li>LinkedIn profile analysis revealed six job changes in four years, with tenures averaging only 7 months per position</li>
                        <li>Professional contacts confirmed actual salary was approximately 40% less than represented</li>
                        <li>Property documents provided for verification showed manipulation with digital alterations to ownership percentages</li>
                        <li>Discreet inquiries with local associates uncovered significant gambling debts at several establishments in Bangalore and Goa</li>
                        <li>Background check revealed a previously broken engagement with another family from Chennai that was concealed during discussions</li>
                      </ul>
                    </div>
                    
                    <p>Our Delhi and Bangalore teams worked meticulously through a network of local contacts to verify Vikram's credentials. Our education verification specialist discovered he had been dismissed from a postgraduate program abroad due to academic violations but continued to use the university's name in his resume. More concerning was our financial analyst's discovery that Vikram had borrowed substantial sums from relatives to maintain appearances during the marriage discussions.</p>
                    
                    <p>"What was particularly troubling," noted our lead investigator, "was finding evidence of similar patterns with three other marriage proposals simultaneously in progress with families in Chennai, Hyderabad, and Delhi. In each case, he had adjusted his biodata to match the specific expectations of each family, creating essentially different personas."</p>
                    
                    <div className="bg-accent/10 p-4 rounded-lg">
                      <h5 className="font-bold text-accent mb-2">Client Outcome</h5>
                      <p className="text-light/80">We presented our findings confidentially to Priya's parents in a private meeting with detailed documentation. Following cultural sensitivity protocols, we developed a face-saving exit strategy that allowed the family to withdraw from proceedings citing an unexpected family commitment that would delay marriage plans indefinitely. "In arranged marriage contexts, preserving family reputation is paramount," explained Priya's father afterward. "Your team's cultural understanding allowed us to exit this situation without embarrassment to either family." The matchmaker was privately informed of the situation to prevent similar matches being proposed to other families. Three months later, Priya's family contacted us again – this time with a new match they wished to verify before proceeding, which our investigation confirmed as genuine.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistical Reliability */}
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Statistical Reliability</h3>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6 text-center">Investigation Outcomes</h4>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-light">Significant Findings Rate</span>
                    <span className="text-accent font-bold">68%</span>
                  </div>
                  <div className="w-full bg-darkGray rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{width: '68%'}}></div>
                  </div>
                  <p className="text-light/70 text-sm mt-2">Percentage of cases where investigation revealed significant undisclosed information</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-light">Relationship-Changing Discoveries</span>
                    <span className="text-accent font-bold">42%</span>
                  </div>
                  <div className="w-full bg-darkGray rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{width: '42%'}}></div>
                  </div>
                  <p className="text-light/70 text-sm mt-2">Cases where findings led to relationship termination or major reconsideration</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-light">Verification Confirmation</span>
                    <span className="text-accent font-bold">32%</span>
                  </div>
                  <div className="w-full bg-darkGray rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{width: '32%'}}></div>
                  </div>
                  <p className="text-light/70 text-sm mt-2">Cases where investigation confirmed subject's claims and background</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-light">Financial Deception Uncovered</span>
                    <span className="text-accent font-bold">47%</span>
                  </div>
                  <div className="w-full bg-darkGray rounded-full h-2.5">
                    <div className="bg-accent h-2.5 rounded-full" style={{width: '47%'}}></div>
                  </div>
                  <p className="text-light/70 text-sm mt-2">Cases involving significant financial misrepresentation</p>
                </div>
              </div>
            </div>
            
            <div className="card p-6">
              <h4 className="text-xl font-bold text-accent mb-6 text-center">Service Reliability</h4>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
                    <span className="text-2xl font-bold text-accent">99.7%</span>
                  </div>
                  <h5 className="text-light font-bold mb-2">Verification Accuracy</h5>
                  <p className="text-light/70 text-sm">Triple-verified findings confirmed by multiple sources</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
                    <span className="text-2xl font-bold text-accent">100%</span>
                  </div>
                  <h5 className="text-light font-bold mb-2">Client Confidentiality</h5>
                  <p className="text-light/70 text-sm">Perfect record of maintaining client anonymity</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
                    <span className="text-2xl font-bold text-accent">94%</span>
                  </div>
                  <h5 className="text-light font-bold mb-2">Client Satisfaction</h5>
                  <p className="text-light/70 text-sm">Based on anonymous post-service surveys</p>
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent/20 mb-4">
                    <span className="text-2xl font-bold text-accent">0</span>
                  </div>
                  <h5 className="text-light font-bold mb-2">Security Breaches</h5>
                  <p className="text-light/70 text-sm">No data or identity compromises in our history</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-darkGray">
                <h5 className="text-light font-bold mb-4">Investigation Completion Time</h5>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-light/70">Basic Package</span>
                      <span className="text-accent">7-10 days</span>
                    </div>
                    <div className="w-full bg-darkGray rounded-full h-1.5">
                      <div className="bg-accent h-1.5 rounded-full" style={{width: '30%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-light/70">Comprehensive Package</span>
                      <span className="text-accent">14-21 days</span>
                    </div>
                    <div className="w-full bg-darkGray rounded-full h-1.5">
                      <div className="bg-accent h-1.5 rounded-full" style={{width: '60%'}}></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-light/70">Premium Surveillance</span>
                      <span className="text-accent">21-30 days</span>
                    </div>
                    <div className="w-full bg-darkGray rounded-full h-1.5">
                      <div className="bg-accent h-1.5 rounded-full" style={{width: '90%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Threat Prevention */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-6">
          <h3 className="text-2xl font-serif font-bold mb-10 text-light border-l-4 border-accent pl-4">Threat Prevention Examples</h3>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Financial Fraud</h4>
              <p className="text-light/70 mb-6">Our investigations have prevented clients from entering marriages with partners who had:</p>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hidden bankruptcy filings</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Undisclosed massive debt</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>History of financial scams</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Falsified income and assets</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a1 1 0 00-1 1v1a1 1 0 002 0V3a1 1 0 00-1-1zM4 4h3a3 3 0 006 0h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2V6a2 2 0 012-2zm2.5 7a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm2.45 4a2.5 2.5 0 10-4.9 0h4.9zM12 9a1 1 0 100 2h3a1 1 0 100-2h-3zm-1 4a1 1 0 011-1h2a1 1 0 110 2h-2a1 1 0 01-1-1z" clipRule="evenodd"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Identity Deception</h4>
              <p className="text-light/70 mb-6">We've uncovered numerous cases of identity deception, including:</p>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>False educational credentials</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hidden criminal records</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Undisclosed marriages/children</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Fabricated family backgrounds</span>
                </li>
              </ul>
            </div>
            
            <div className="card p-6 border-t-2 border-t-accent hover:shadow-gold transition-all">
              <div className="flex justify-center mb-6">
                <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"></path>
                </svg>
              </div>
              <h4 className="text-xl font-bold text-accent mb-4 text-center">Relationship Deception</h4>
              <p className="text-light/70 mb-6">Our surveillance has exposed concerning patterns including:</p>
              <ul className="space-y-3 text-light/80">
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Concurrent relationships</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Secret second families</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Pattern of fraudulent marriages</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-5 w-5 text-accent mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>Hidden addictions or behaviors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-secondary border-t border-darkGray">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <div className="max-w-4xl mx-auto bg-primary/30 p-8 md:p-12 rounded-lg shadow-lg border border-darkGray/40">
            <h3 className="text-3xl md:text-4xl font-serif font-bold mb-6 text-light">
              Protect Your <span className="text-accent">Future</span>
            </h3>
            
            <div className="w-24 h-1 bg-accent mx-auto mb-8"></div>
            
            <p className="text-light/90 text-lg mb-10 max-w-2xl mx-auto">
              Don't risk your emotional and financial well-being. Our discreet investigation services provide the peace of mind you deserve before making a lifelong commitment.
            </p>
            
            <div className="flex flex-col md:flex-row justify-center items-center gap-6">
              <Link to="/consultation" className="btn-primary px-8 py-3 text-base font-medium tracking-wider transition-transform hover:scale-105">
                Request Consultation
              </Link>
              <Link to="/services" className="btn-outline px-8 py-3 text-base font-medium tracking-wider transition-transform hover:scale-105">
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CaseStudies;