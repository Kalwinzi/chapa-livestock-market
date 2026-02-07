import React from 'react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

type AnimationType = 
  | 'fade-in' 
  | 'fade-in-up' 
  | 'fade-in-down' 
  | 'fade-in-left' 
  | 'fade-in-right' 
  | 'slide-up' 
  | 'slide-in-bottom' 
  | 'scale-in' 
  | 'scale-in-bounce' 
  | 'bounce-in';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  className?: string;
  threshold?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({
  children,
  animation = 'fade-in-up',
  delay = 0,
  className = '',
  threshold = 0.1
}) => {
  const { elementRef, isVisible } = useScrollAnimation<HTMLDivElement>(threshold);

  const animationClasses: Record<AnimationType, string> = {
    'fade-in': 'animate-fade-in',
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'fade-in-left': 'animate-fade-in-left',
    'fade-in-right': 'animate-fade-in-right',
    'slide-up': 'animate-slide-up',
    'slide-in-bottom': 'animate-slide-in-bottom',
    'scale-in': 'animate-scale-in',
    'scale-in-bounce': 'animate-scale-in-bounce',
    'bounce-in': 'animate-bounce-in'
  };

  return (
    <div
      ref={elementRef}
      className={cn(
        'opacity-0',
        isVisible && animationClasses[animation],
        className
      )}
      style={{
        animationDelay: isVisible ? `${delay}ms` : '0ms',
        animationFillMode: 'forwards'
      }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
