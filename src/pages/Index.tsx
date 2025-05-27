
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SearchSection from '../components/SearchSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedListings from '../components/FeaturedListings';
import HowItWorks from '../components/HowItWorks';
import AboutUs from '../components/AboutUs';
import ContactUs from '../components/ContactUs';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <SearchSection />
      <CategoriesSection />
      <FeaturedListings />
      <HowItWorks />
      <AboutUs />
      <ContactUs />
      <Footer />
    </div>
  );
};

export default Index;
