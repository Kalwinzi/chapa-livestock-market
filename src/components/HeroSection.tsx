
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-br from-cream-100 via-cream-200 to-cream-300 py-20 overflow-hidden min-h-screen flex items-center">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%232D5016%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%224%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-left animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-serif font-bold mb-6 leading-tight">
                <span className="gradient-text">ChapaMarket</span>
                <br />
                <span className="text-sage-700">Africa's Premier</span>
                <br />
                <span className="text-earth-600">Livestock Platform</span>
              </h1>
              
              <p className="text-xl md:text-2xl mb-8 text-sage-600 leading-relaxed animate-fade-in" style={{ animationDelay: '0.2s' }}>
                Empowering livestock farmers and traders across Africa with secure transactions, verified sellers, and seamless connectivity.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <Button size="lg" className="bg-sage-600 hover:bg-sage-700 text-cream-50 font-semibold px-8 py-4 text-lg shadow-xl hover:shadow-2xl transition-all duration-300">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-2 border-earth-600 text-earth-600 hover:bg-earth-600 hover:text-cream-50 px-8 py-4 text-lg font-semibold transition-all duration-300">
                  List Your Livestock
                </Button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 font-serif">15,000+</div>
                  <div className="text-sage-600 text-sm">Active Listings</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 font-serif">30,000+</div>
                  <div className="text-sage-600 text-sm">Farmers Connected</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 font-serif">800+</div>
                  <div className="text-sage-600 text-sm">Cities Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-600 font-serif">20</div>
                  <div className="text-sage-600 text-sm">Countries</div>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <div className="relative z-10">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=500&fit=crop"
                  alt="African livestock farming"
                  className="rounded-2xl shadow-2xl w-full h-96 object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-gold-500 text-sage-800 p-6 rounded-2xl shadow-xl">
                  <div className="text-2xl font-bold font-serif">Trusted</div>
                  <div className="text-sm">Verified Platform</div>
                </div>
              </div>
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-sage-600 rounded-full opacity-20"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-earth-600 rounded-full opacity-10"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-sage-600 opacity-70" />
      </div>
    </section>
  );
};

export default HeroSection;
