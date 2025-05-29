
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, MapPin, Users, Shield, Play } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const HeroSection = () => {
  const { t } = useTheme();
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

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-background via-accent-50 to-primary-50 dark:from-background dark:via-gray-900 dark:to-primary-900/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 dark:opacity-10">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233B7C2A' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>
      
      <div className="container-custom relative z-10 pt-8 lg:pt-12">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-8 text-center lg:text-left">
            <div className="space-y-4 lg:space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-primary-50 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-medium border border-primary-200 dark:border-primary-800 animate-fade-in">
                <Shield className="w-4 h-4 mr-2" />
                {t('hero.trusted')}
              </div>
              
              <h1 className="text-h1 font-bold text-foreground leading-tight animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <span className="gradient-text">{t('hero.title')}</span>
              </h1>
              
              <p className="text-body-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0 animate-slide-up" style={{ animationDelay: '0.4s' }}>
                {t('hero.subtitle')}
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Button className="btn-primary text-lg px-6 lg:px-8 py-3 lg:py-4 group transition-all duration-300 hover:scale-105 hover:shadow-xl">
                {t('hero.browse')}
                <MapPin className="ml-2 h-5 w-5 group-hover:animate-pulse" />
              </Button>
              <Button className="btn-secondary text-lg px-6 lg:px-8 py-3 lg:py-4 group transition-all duration-300 hover:scale-105">
                <Play className="mr-2 h-5 w-5" />
                {t('hero.demo')}
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 lg:gap-8 pt-6 lg:pt-8 border-t border-border animate-fade-in" style={{ animationDelay: '0.8s' }}>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl lg:text-3xl font-bold text-primary-500 animate-pulse-soft">
                  {animatedCounts.farmers.toLocaleString()}+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">{t('hero.farmers')}</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl lg:text-3xl font-bold text-primary-500 animate-pulse-soft">
                  {animatedCounts.livestock.toLocaleString()}+
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">{t('hero.livestock')}</div>
              </div>
              <div className="text-center transform hover:scale-105 transition-transform duration-300">
                <div className="text-2xl lg:text-3xl font-bold text-primary-500 animate-pulse-soft">
                  {animatedCounts.countries}
                </div>
                <div className="text-xs lg:text-sm text-muted-foreground">{t('hero.countries')}</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Hero Image */}
          <div className="relative mt-8 lg:mt-0" style={{ animationDelay: '0.3s' }}>
            <div className="relative animate-float">
              {/* Main Image */}
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&h=500&fit=crop"
                  alt="African livestock farming"
                  className="w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>
              
              {/* Floating Cards */}
              <div className="absolute -top-2 -left-2 lg:-top-4 lg:-left-4 bg-card p-3 lg:p-4 rounded-xl shadow-lg border border-border transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{ animationDelay: '1s' }}>
                <div className="flex items-center space-x-2 lg:space-x-3">
                  <div className="w-8 h-8 lg:w-12 lg:h-12 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 lg:w-6 lg:h-6 text-primary-500" />
                  </div>
                  <div>
                    <div className="text-xs lg:text-sm font-semibold text-foreground">Verified Sellers</div>
                    <div className="text-xs text-muted-foreground">100% Checked</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-2 lg:-bottom-6 lg:-right-6 bg-accent-500 p-3 lg:p-4 rounded-xl shadow-lg transform hover:scale-110 transition-all duration-300 animate-fade-in" style={{ animationDelay: '1.2s' }}>
                <div className="text-center">
                  <div className="text-lg lg:text-2xl font-bold text-white">₦2.5M</div>
                  <div className="text-xs lg:text-sm text-white/90">Monthly Sales</div>
                </div>
              </div>
              
              {/* Background Decorations */}
              <div className="absolute -top-4 -right-4 lg:-top-8 lg:-right-8 w-16 h-16 lg:w-24 lg:h-24 bg-primary-200 dark:bg-primary-800 rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-8 -left-8 lg:-bottom-12 lg:-left-12 w-20 h-20 lg:w-32 lg:h-32 bg-accent-200 dark:bg-accent-800 rounded-full opacity-15 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-4 lg:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce-soft hidden sm:block">
        <div className="flex flex-col items-center space-y-2">
          <span className="text-sm text-muted-foreground">Scroll to explore</span>
          <ArrowDown className="h-5 w-5 text-primary-500" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
