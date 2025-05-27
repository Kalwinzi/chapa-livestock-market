
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Download, Users } from 'lucide-react';

const CallToActionSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-sage-600 via-sage-700 to-earth-600 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 bg-gold-400 rounded-full"></div>
        <div className="absolute bottom-10 right-10 w-24 h-24 bg-gold-400 rounded-full"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-cream-200 rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-cream-50 animate-fade-in">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-6">
            Join Africa's Largest<br />
            <span className="text-gold-400">Livestock Community</span>
          </h2>
          <div className="w-24 h-1 bg-gold-400 mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90 leading-relaxed">
            Start your journey today and connect with thousands of verified farmers and traders across 20+ African countries.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="bg-cream-50/10 backdrop-blur-sm rounded-2xl p-6 border border-cream-50/20">
              <Users className="h-12 w-12 text-gold-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold font-serif mb-2">30,000+</h3>
              <p className="opacity-90">Active Members</p>
            </div>
            <div className="bg-cream-50/10 backdrop-blur-sm rounded-2xl p-6 border border-cream-50/20">
              <div className="text-4xl font-bold text-gold-400 mx-auto mb-4">π</div>
              <h3 className="text-2xl font-bold font-serif mb-2">Pi Network</h3>
              <p className="opacity-90">Integrated Payments</p>
            </div>
            <div className="bg-cream-50/10 backdrop-blur-sm rounded-2xl p-6 border border-cream-50/20">
              <div className="w-12 h-12 bg-gold-400 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-sage-800 font-bold text-xl">24/7</span>
              </div>
              <h3 className="text-2xl font-bold font-serif mb-2">Support</h3>
              <p className="opacity-90">Always Available</p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Button size="lg" className="bg-gold-500 hover:bg-gold-600 text-sage-800 font-semibold px-10 py-4 text-lg rounded-xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105">
              <Users className="h-5 w-5 mr-2" />
              Sign Up Now
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-2 border-cream-50 text-cream-50 hover:bg-cream-50 hover:text-sage-700 px-10 py-4 text-lg font-semibold rounded-xl transition-all duration-300">
              <Download className="h-5 w-5 mr-2" />
              Download App
            </Button>
          </div>
          
          <p className="text-sm opacity-75 mt-8">
            Available on iOS, Android, and Web • Free to join • Secure & Verified
          </p>
        </div>
      </div>
    </section>
  );
};

export default CallToActionSection;
