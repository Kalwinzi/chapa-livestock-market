
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SearchSection from '../components/SearchSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturesSection from '../components/FeaturesSection';
import FeaturedListings from '../components/FeaturedListings';
import HowItWorks from '../components/HowItWorks';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToActionSection from '../components/CallToActionSection';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <HeroSection />
      <AboutSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturesSection />
      <FeaturedListings />
      <HowItWorks />
      <TestimonialsSection />
      <CallToActionSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
