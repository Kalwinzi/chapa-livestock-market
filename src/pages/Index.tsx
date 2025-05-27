
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import SearchSection from '../components/SearchSection';
import ProductListings from '../components/ProductListings';
import FeaturesSection from '../components/FeaturesSection';
import HowItWorks from '../components/HowItWorks';
import TestimonialsSection from '../components/TestimonialsSection';
import CallToActionSection from '../components/CallToActionSection';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection />
      <AboutSection />
      <SearchSection />
      <ProductListings />
      <FeaturesSection />
      <HowItWorks />
      <TestimonialsSection />
      <CallToActionSection />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
