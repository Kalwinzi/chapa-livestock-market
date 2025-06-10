
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, MapPin, Users, Shield, Play, Search } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HeroSection = () => {
  const { t } = useTheme();
  const { elementRef: heroRef, isVisible: heroVisible } = useScrollAnimation<HTMLElement>();
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
      const progress = Math.min(currentStep / steps, 1);
      
      setAnimatedCounts({
        farmers: Math.floor(targets.farmers * progress),
        livestock: Math.floor(targets.livestock * progress),
        countries: Math.floor(targets.countries * progress)
      });

      if (currentStep >= steps) clearInterval(interval);
    }, stepTime);

    return () => clearInterval(interval);
  }, []);

  const handleBrowseClick = () => {
    const categoriesSection = document.querySelector('#categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleDemoClick = () => {
    const featuresSection = document.querySelector('#features');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      ref={heroRef}
      id="home" 
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-accent-50 to-primary-50 dark:from-background dark:via-gray-900 dark:to-primary-900/20 pt-16"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B7C2A' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className={`space-y-6 text-center lg:text-left transition-all duration-1000 ${
            heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            <div className="space-y-4">
              <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800 animate-fade-in hover:scale-105 transition-transform">
                <Shield className="w-4 h-4 mr-2" />
                {t('hero.trusted')}
              </div>
              
              <h1 className={`text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight transition-all duration-1000 delay-200 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                <span className="gradient-text">{t('hero.title')}</span>
              </h1>
              
              <p className={`text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 transition-all duration-1000 delay-400 ${
                heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div className={`flex flex-col sm:flex-row gap-4 justify-center lg:justify-start transition-all duration-1000 delay-600 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Button 
                onClick={handleBrowseClick}
                className="bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg px-8 py-4 group transition-all duration-300 hover:scale-105 hover:shadow-xl rounded-lg"
              >
                {t('hero.browse')}
                <MapPin className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
              <Button 
                onClick={handleDemoClick}
                className="bg-transparent border-2 border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white font-semibold text-lg px-8 py-4 group transition-all duration-300 hover:scale-105 rounded-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                {t('hero.demo')}
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className={`grid grid-cols-3 gap-6 pt-6 border-t border-border transition-all duration-1000 delay-800 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-500 animate-pulse-soft">
                  {animatedCounts.farmers.toLocaleString()}+
                </div>
                <div className="text-sm lg:text-base text-muted-foreground">{t('hero.farmers')}</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-500 animate-pulse-soft">
                  {animatedCounts.livestock.toLocaleString()}+
                </div>
                <div className="text-sm lg:text-base text-muted-foreground">{t('hero.livestock')}</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl lg:text-3xl xl:text-4xl font-bold text-primary-500 animate-pulse-soft">
                  {animatedCounts.countries}
                </div>
                <div className="text-sm lg:text-base text-muted-foreground">{t('hero.countries')}</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image with your uploaded livestock */}
          <div className={`relative transition-all duration-1200 delay-300 ${
            heroVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
          }`}>
            <div className="relative animate-float">
              {/* Main Image - Using your uploaded dairy cows image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="/lovable-uploads/3c56169f-0372-418f-823a-8d738d0d35b2.png"
                  alt="Professional dairy cattle in modern farming facility - showcasing quality livestock"
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover object-center"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className={`absolute top-4 left-4 lg:top-6 lg:left-6 bg-card p-3 lg:p-4 rounded-xl shadow-lg border border-border transform hover:scale-110 transition-all duration-300 animate-fade-in ${
                heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`} style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 lg:w-10 lg:h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 lg:w-5 lg:h-5 text-primary-500" />
                  </div>
                  <div>
                    <div className="text-sm lg:text-base font-semibold text-foreground">Verified Sellers</div>
                    <div className="text-xs lg:text-sm text-muted-foreground">100% Checked</div>
                  </div>
                </div>
              </div>
              
              <div className={`absolute bottom-4 right-4 lg:bottom-6 lg:right-6 bg-primary-500 p-3 lg:p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300 animate-fade-in ${
                heroVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
              }`} style={{ animationDelay: '1.2s' }}>
                <div className="text-center">
                  <div className="text-base lg:text-lg font-bold text-white">Open</div>
                  <div className="text-xs lg:text-sm text-white/90">Every Day</div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-20 lg:h-20 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 lg:-bottom-10 lg:-left-10 w-20 h-20 lg:w-24 lg:h-24 bg-accent-200 dark:bg-accent-800 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft hidden sm:block transition-all duration-1000 delay-1000 ${
        heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-primary-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
