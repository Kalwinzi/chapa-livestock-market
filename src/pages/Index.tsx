
import React, { Suspense, lazy } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import SkeletonLoader from '../components/SkeletonLoader';

// Lazy load components for better performance
const AboutSection = lazy(() => import('../components/AboutSection'));
const SearchSection = lazy(() => import('../components/SearchSection'));
const CategoriesSection = lazy(() => import('../components/CategoriesSection'));
const FeaturesSection = lazy(() => import('../components/FeaturesSection'));
const FeaturedListings = lazy(() => import('../components/FeaturedListings'));
const HowItWorksSimple = lazy(() => import('../components/HowItWorksSimple'));
const StoriesSection = lazy(() => import('../components/StoriesSection'));
const TestimonialsSection = lazy(() => import('../components/TestimonialsSection'));
const CallToActionSection = lazy(() => import('../components/CallToActionSection'));
const PrivacyTermsSection = lazy(() => import('../components/PrivacyTermsSection'));
const ContactUs = lazy(() => import('../components/ContactUs'));
const Footer = lazy(() => import('../components/Footer'));

const Index = () => {
  usePerformanceMonitor('HomePage');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">
        <HeroSection />
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <AboutSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <SearchSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <CategoriesSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <FeaturesSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Listing />}>
          <FeaturedListings />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <HowItWorksSimple />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <StoriesSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <TestimonialsSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <CallToActionSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <PrivacyTermsSection />
        </Suspense>
        
        <Suspense fallback={<SkeletonLoader.Category />}>
          <ContactUs />
        </Suspense>
      </main>
      
      <Suspense fallback={<div className="h-32 bg-muted animate-pulse" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
