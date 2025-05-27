
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Play, MapPin, Users, Shield } from 'lucide-react';

const HeroSection = () => {
  const [animatedCounts, setAnimatedCounts] = useState({
    farmers: 0,
    livestock: 0,
    countries: 0
  });

  useEffect(() => {
    const targets = { farmers: 25000, livestock: 150000, countries: 28 };
    const duration = 2000;
    const steps = 60;
    const stepTime = duration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedCounts({
        farmers: Math.floor(targets.farmers * progress),
        livestock: Math.floor(targets.livestock * progress),
        countries: Math.floor(targets.countries * progress)
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-white via-gray-50 to-primary-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%233B7C2A" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="4"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
      </div>
      
      <div className="container-custom relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-50 text-primary rounded-full text-sm font-medium border border-primary-200">
                <Shield className="w-4 h-4 mr-2" />
                Africa's Most Trusted Livestock Platform
              </div>
              
              <h1 className="text-h1 md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight">
                Buy & Sell
                <span className="text-gradient block">Premium Livestock</span>
                Across Africa
              </h1>
              
              <p className="text-body-lg md:text-xl text-text-secondary leading-relaxed max-w-xl">
                Connect with verified farmers and traders. Find quality cattle, goats, sheep, and poultry 
                with secure payments, location tracking, and expert verification.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary text-lg px-8 py-4 group">
                Browse Livestock
                <MapPin className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
              <Button className="btn-secondary text-lg px-8 py-4 group">
                <Play className="mr-2 h-5 w-5" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex items-center space-x-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary animate-count-up">
                  {animatedCounts.farmers.toLocaleString()}+
                </div>
                <div className="text-sm text-text-secondary">Farmers Connected</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary animate-count-up">
                  {animatedCounts.livestock.toLocaleString()}+
                </div>
                <div className="text-sm text-text-secondary">Livestock Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary animate-count-up">
                  {animatedCounts.countries}
                </div>
                <div className="text-sm text-text-secondary">Countries</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-up lg:animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="relative">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-hover">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=500&fit=crop"
                  alt="African livestock farming"
                  className="w-full h-96 lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-4 -left-4 bg-white p-4 rounded-xl shadow-soft animate-float">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-primary">Verified Sellers</div>
                    <div className="text-xs text-text-secondary">100% Background Checked</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-accent p-4 rounded-xl shadow-soft animate-float" style={{ animationDelay: '1s' }}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">₦2.5M</div>
                  <div className="text-sm text-white/90">Avg. Monthly Sales</div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-8 -right-8 w-24 h-24 bg-primary-200 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-accent-200 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-text-secondary">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-primary" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
