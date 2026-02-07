
import React, { Suspense } from 'react';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import ChapaVetAIChat from '../components/ChapaVetAIChat';
import AnimatedSection from '../components/AnimatedSection';

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

// Loading component with animation
const SectionLoader = () => (
  <div className="flex justify-center items-center py-16">
    <div className="relative">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary/20 border-t-primary"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-6 w-6 rounded-full bg-accent animate-pulse-soft"></div>
      </div>
    </div>
  </div>
);

const Index = () => {
  usePerformanceMonitor('HomePage');

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Header />
      <main className="relative">
        <HeroSection />
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-up">
            <AboutSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-left" delay={100}>
            <SearchSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="scale-in" delay={150}>
            <CategoriesSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-right" delay={100}>
            <FeaturesSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="slide-in-bottom">
            <FeaturedListings />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-up" delay={100}>
            <HowItWorksSimple />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="scale-in-bounce">
            <PremiumSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-left">
            <StoriesSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-right">
            <TestimonialsSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="bounce-in">
            <CallToActionSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-up">
            <PrivacyTermsSection />
          </AnimatedSection>
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <AnimatedSection animation="fade-in-up">
            <ContactUs />
          </AnimatedSection>
        </Suspense>
      </main>
      
      <Suspense fallback={<SectionLoader />}>
        <Footer />
      </Suspense>
      
      {/* ChapaVet AI Floating Chat */}
      <ChapaVetAIChat />
    </div>
  );
};

export default Index;
