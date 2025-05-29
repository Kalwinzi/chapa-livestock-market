
import React from 'react';
import { ArrowRight, Shield, Users, TrendingUp, ChevronDown, MapPin, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useTheme } from '@/contexts/ThemeContext';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();
  const { t } = useTheme();
  const { toast } = useToast();

  const handleSignUpClick = () => {
    // Scroll to sign up section or trigger sign up form
    const signUpButton = document.querySelector('[data-signup-trigger]');
    if (signUpButton) {
      (signUpButton as HTMLElement).click();
    } else {
      toast({
        title: "Sign Up",
        description: "Registration form opening...",
      });
    }
  };

  const handleBrowseListings = () => {
    const listingsSection = document.getElementById('listings');
    if (listingsSection) {
      listingsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById('about');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="home" 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-2" /* Reduced top padding */
    >
      {/* Background Image with Better Mobile Alignment */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=1080&fit=crop&crop=center')",
            backgroundPosition: 'center 40%', // Better mobile positioning
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className={`max-w-5xl mx-auto transition-all duration-1000 ${
          heroVisible 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-12'
        }`}>
          
          {/* Main Headlines */}
          <div className="mb-8 space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight">
              <span className="block animate-fade-in">Welcome to</span>
              <span className="block bg-gradient-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent animate-fade-in delay-300 font-serif">
                ChapaMarket
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl md:text-3xl text-white/90 font-medium animate-fade-in delay-500">
              {t('hero.subtitle')}
            </p>
            
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed animate-fade-in delay-700">
              Connect with trusted livestock traders across Tanzania and East Africa. 
              Buy, sell, and discover premium cattle, goats, sheep, poultry, and more with confidence.
            </p>
          </div>

          {/* Quick Stats */}
          <div className={`grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-300 ${
            heroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <Users className="h-8 w-8 text-primary-400" />
              </div>
              <div className="text-2xl font-bold text-white">15,000+</div>
              <div className="text-white/80 text-sm">Active Traders</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <TrendingUp className="h-8 w-8 text-accent-400" />
              </div>
              <div className="text-2xl font-bold text-white">50,000+</div>
              <div className="text-white/80 text-sm">Livestock Listed</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-white">99.8%</div>
              <div className="text-white/80 text-sm">Trust Rating</div>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className={`mb-10 transition-all duration-1000 delay-500 ${
            heroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="max-w-2xl mx-auto bg-white/95 backdrop-blur-sm rounded-2xl p-2 shadow-2xl border border-white/30">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1 flex items-center">
                  <Search className="h-5 w-5 text-gray-400 ml-4 mr-2" />
                  <input
                    type="text"
                    placeholder="Search for cattle, goats, sheep..."
                    className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 py-3"
                  />
                </div>
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <select className="bg-transparent border-none outline-none text-gray-700 py-3 pr-4">
                    <option>All Regions</option>
                    <option>Arusha</option>
                    <option>Dar es Salaam</option>
                    <option>Dodoma</option>
                    <option>Mwanza</option>
                  </select>
                </div>
                <Button 
                  onClick={handleBrowseListings}
                  className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                >
                  Search Now
                </Button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className={`space-y-4 sm:space-y-0 sm:space-x-6 sm:flex sm:justify-center transition-all duration-1000 delay-700 ${
            heroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <Button
              size="lg"
              onClick={handleSignUpClick}
              className="w-full sm:w-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
            >
              <UserPlus className="h-5 w-5 mr-2" />
              Sign Up Now - It's Free!
              <ArrowRight className="h-5 w-5 ml-2" />
            </Button>
            
            <Button
              size="lg"
              variant="outline"
              onClick={handleBrowseListings}
              className="w-full sm:w-auto bg-white/10 border-2 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm font-semibold px-8 py-4 rounded-xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Browse Livestock
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className={`mt-12 flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8 text-white/80 transition-all duration-1000 delay-900 ${
            heroVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5 text-green-400" />
              <span className="text-sm font-medium">Verified Sellers</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-blue-400" />
              <span className="text-sm font-medium">Secure Transactions</span>
            </div>
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-accent-400" />
              <span className="text-sm font-medium">Best Prices</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft">
        <button
          onClick={scrollToNextSection}
          className="text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
        >
          <ChevronDown className="h-8 w-8" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
