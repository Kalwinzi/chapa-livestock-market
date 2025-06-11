
import React from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SearchSection from '../components/SearchSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedListings from '../components/FeaturedListings';
import HowItWorksSimple from '../components/HowItWorksSimple';
import PremiumSection from '../components/PremiumSection';
import StoriesSection from '../components/StoriesSection';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToActionSection from '../components/CallToActionSection';
import PrivacyTermsSection from '../components/PrivacyTermsSection';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Index = () => {
  usePerformanceMonitor('HomePage');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">
        <HeroSection />
        <AboutSection />
        <SearchSection />
        <CategoriesSection />
        <FeaturesSection />
        <FeaturedListings />
        <HowItWorksSimple />
        <PremiumSection />
        <StoriesSection />
        <TestimonialsSection />
        <CallToActionSection />
        <PrivacyTermsSection />
        <ContactUs />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
