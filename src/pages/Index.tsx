
import React, { Suspense } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';

// Lazy load other components to improve initial load time
const AboutSection = React.lazy(() => import('../components/AboutSection'));
const SearchSection = React.lazy(() => import('../components/SearchSection'));
const CategoriesSection = React.lazy(() => import('../components/CategoriesSection'));
const FeaturesSection = React.lazy(() => import('../components/FeaturesSection'));
const FeaturedListings = React.lazy(() => import('../components/FeaturedListings'));
const HowItWorksSimple = React.lazy(() => import('../components/HowItWorksSimple'));
const PremiumSection = React.lazy(() => import('../components/PremiumSection'));
const StoriesSection = React.lazy(() => import('../components/StoriesSection'));
const TestimonialsSection = React.lazy(() => import('../components/TestimonialsSection'));
const CallToActionSection = React.lazy(() => import('../components/CallToActionSection'));
const PrivacyTermsSection = React.lazy(() => import('../components/PrivacyTermsSection'));
const ContactUs = React.lazy(() => import('../components/ContactUs'));
const Footer = React.lazy(() => import('../components/Footer'));

// Loading component
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
  </div>
);

const Index = () => {
  usePerformanceMonitor('HomePage');

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="relative">
        <HeroSection />
        <Suspense fallback={<SectionLoader />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <SearchSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CategoriesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FeaturesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FeaturedListings />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <HowItWorksSimple />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PremiumSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <StoriesSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <TestimonialsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <CallToActionSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PrivacyTermsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactUs />
        </Suspense>
      </main>
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Index;
