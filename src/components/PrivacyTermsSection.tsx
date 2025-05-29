
import React, { useState } from 'react';
import { Shield, FileText, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PrivacyTermsSection = () => {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>();

  const toggleSection = (section: string) => {
    setActiveSection(activeSection === section ? null : section);
  };

  return (
    <section id="privacy-terms" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-serif font-bold text-gray-800 dark:text-white mb-6 transition-all duration-700 ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            Trust & Transparency
          </h2>
          <div className={`w-24 h-1 bg-green-500 mx-auto mb-6 transition-all duration-700 delay-200 ${
            titleVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-50'
          }`}></div>
          <p className={`text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-700 delay-300 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Your privacy and security are our top priorities. Learn about our commitments to you.
          </p>
        </div>

        <div 
          ref={cardsRef}
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-700 delay-400 ${
            cardsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Privacy Policy */}
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto bg-blue-100 dark:bg-blue-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => toggleSection('privacy')}
                className="w-full flex items-center justify-between text-left text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span>View Details</span>
                {activeSection === 'privacy' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeSection === 'privacy' && (
                <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300 animate-fade-in">
                  <p><strong>Data Collection:</strong> We collect only essential information needed for livestock transactions.</p>
                  <p><strong>Data Protection:</strong> All personal data is encrypted and stored securely in Tanzania.</p>
                  <p><strong>Data Sharing:</strong> We never sell your personal information to third parties.</p>
                  <p><strong>Your Rights:</strong> You can access, modify, or delete your data at any time.</p>
                  <p><strong>Contact:</strong> kalwinzic@gmail.com for privacy concerns.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Terms & Conditions */}
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto bg-green-100 dark:bg-green-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <FileText className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">Terms & Conditions</CardTitle>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => toggleSection('terms')}
                className="w-full flex items-center justify-between text-left text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 transition-colors"
              >
                <span>View Details</span>
                {activeSection === 'terms' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeSection === 'terms' && (
                <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300 animate-fade-in">
                  <p><strong>Platform Use:</strong> ChapaMarket is a marketplace connecting livestock buyers and sellers in Tanzania.</p>
                  <p><strong>User Responsibilities:</strong> All listings must be accurate and comply with Tanzanian livestock regulations.</p>
                  <p><strong>Transaction Terms:</strong> Payments and transfers are between buyers and sellers. We facilitate connections.</p>
                  <p><strong>Dispute Resolution:</strong> We provide mediation services for transaction disputes.</p>
                  <p><strong>Account Terms:</strong> Users must be 18+ and provide accurate information.</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* About ChapaMarket */}
          <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            <CardHeader className="text-center">
              <div className="mx-auto bg-yellow-100 dark:bg-yellow-900/30 p-4 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                <Info className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 dark:text-white">Our Purpose</CardTitle>
            </CardHeader>
            <CardContent>
              <button
                onClick={() => toggleSection('about')}
                className="w-full flex items-center justify-between text-left text-gray-600 dark:text-gray-300 hover:text-yellow-600 dark:hover:text-yellow-400 transition-colors"
              >
                <span>View Details</span>
                {activeSection === 'about' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
              </button>
              
              {activeSection === 'about' && (
                <div className="mt-4 space-y-3 text-sm text-gray-600 dark:text-gray-300 animate-fade-in">
                  <p><strong>Mission:</strong> Empowering Tanzanian farmers with digital tools for livestock trading.</p>
                  <p><strong>Vision:</strong> To become East Africa's leading livestock marketplace platform.</p>
                  <p><strong>Values:</strong> Transparency, trust, community support, and fair trade practices.</p>
                  <p><strong>Impact:</strong> Supporting rural communities and modernizing livestock commerce in Tanzania.</p>
                  <p><strong>Founded:</strong> Built by local entrepreneurs who understand Tanzania's livestock industry.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Additional Information */}
        <div className="mt-16 text-center">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Questions or Concerns?</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              We're committed to transparency and building trust with our community. If you have any questions about our policies, 
              practices, or how we handle your data, please don't hesitate to reach out.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:kalwinzic@gmail.com" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Email Us: kalwinzic@gmail.com
              </a>
              <a 
                href="tel:+255763953480" 
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
              >
                Call: +255 763 953 480
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyTermsSection;
