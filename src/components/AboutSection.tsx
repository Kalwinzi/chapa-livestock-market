
import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const AboutSection = () => {
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-12 lg:py-20 bg-cream-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-serif font-bold text-sage-700 dark:text-primary-400 mb-8 transition-all duration-700 ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            Empowering Africa's Livestock Community
          </h2>
          <div className={`w-24 h-1 bg-gold-500 mx-auto mb-8 transition-all duration-700 delay-200 ${
            titleVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-50'
          }`}></div>
          <div 
            ref={contentRef}
            className={`space-y-6 transition-all duration-700 delay-300 ${
              contentVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="text-lg md:text-xl text-sage-600 dark:text-gray-300 leading-relaxed">
              ChapaMarket bridges the gap between rural livestock farmers and urban markets across Africa. 
              Our platform empowers thousands of farmers and traders to connect, trade, and prosper through 
              secure transactions, verified seller profiles, and innovative payment solutions including Pi Network integration.
            </p>
            <p className="text-lg text-sage-600 dark:text-gray-300 leading-relaxed">
              We believe in transparency, trust, and economic empowerment. By providing farmers with direct 
              access to buyers and modern trading tools, we're revolutionizing how livestock commerce happens 
              across the African continent.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
