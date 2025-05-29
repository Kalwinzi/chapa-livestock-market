
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SearchSection from '../components/SearchSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedListings from '../components/FeaturedListings';
import GuidesSection from '../components/GuidesSection';
import HowItWorks from '../components/HowItWorks';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToActionSection from '../components/CallToActionSection';
import PrivacyTermsSection from '../components/PrivacyTermsSection';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Simulate initial load time
  useEffect(() => {
    // Pre-load critical images
    const criticalImages = [
      'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1920&h=1080&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1560114928-40f1f1eb26a0?w=500&h=350&fit=crop&crop=center'
    ];
    
    Promise.all(criticalImages.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = resolve;
        img.src = src;
      });
    }));
  }, []);

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={handleLoadingComplete} />;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <AboutSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturesSection />
      <FeaturedListings />
      <GuidesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CallToActionSection />
      <PrivacyTermsSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
