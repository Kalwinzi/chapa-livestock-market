
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section id="home" className="relative bg-gradient-to-r from-green-800 to-green-600 text-white py-20 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Africa's Premier
            <span className="block text-yellow-400">Livestock Marketplace</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-green-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Connect buyers and sellers across Africa. Buy and sell cattle, goats, sheep, and poultry with confidence on Chapa Farm.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-8 py-3 text-lg">
              Start Buying
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-800 px-8 py-3 text-lg">
              Start Selling
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <div>
              <div className="text-3xl font-bold text-yellow-400">10,000+</div>
              <div className="text-green-100">Active Listings</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">25,000+</div>
              <div className="text-green-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">500+</div>
              <div className="text-green-100">Cities Covered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-yellow-400">15</div>
              <div className="text-green-100">Countries</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-white opacity-70" />
      </div>
    </section>
  );
};

export default HeroSection;
