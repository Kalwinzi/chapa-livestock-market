
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  UserPlus, LogIn, Search, ShoppingBag, Camera, 
  MessageCircle, ClipboardList, Settings, Receipt, Shield,
  X, ChevronRight, ChevronLeft, Sparkles
} from 'lucide-react';

const TUTORIAL_STEPS = [
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: 'Create Your Account',
    description: 'Click "Sign Up" in the top right corner. Enter your name, email, and a secure password to get started on Chapa Market.',
  },
  {
    icon: <LogIn className="h-8 w-8" />,
    title: 'Log In to Your Account',
    description: 'Use your email and password to sign in. You can also use Google for quick access.',
  },
  {
    icon: <Search className="h-8 w-8" />,
    title: 'Browse Livestock Listings',
    description: 'Use the search bar and category filters to find cattle, goats, sheep, poultry, and more across Africa.',
  },
  {
    icon: <ShoppingBag className="h-8 w-8" />,
    title: 'Post Livestock for Sale',
    description: 'Click "Sell" to create a listing. Add the animal type, breed, age, weight, location, and your asking price.',
  },
  {
    icon: <Camera className="h-8 w-8" />,
    title: 'Upload Animal Photos',
    description: 'Add clear, high-quality photos of your livestock. Good images attract more buyers and build trust.',
  },
  {
    icon: <MessageCircle className="h-8 w-8" />,
    title: 'Contact Sellers',
    description: 'Use the built-in messaging system to negotiate prices, ask questions, and arrange pickup or delivery.',
  },
  {
    icon: <ClipboardList className="h-8 w-8" />,
    title: 'Check Animal Details',
    description: 'View complete details including health status, vaccination history, breed info, and seller verification badges.',
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: 'Manage Your Listings',
    description: 'Edit prices, update photos, mark items as sold, or remove listings from your personal dashboard.',
  },
  {
    icon: <Receipt className="h-8 w-8" />,
    title: 'Track Transactions',
    description: 'View your purchase and sale history. Keep records of all your marketplace activity in one place.',
  },
  {
    icon: <Shield className="h-8 w-8" />,
    title: 'Stay Safe on the Platform',
    description: 'Only deal with verified sellers. Use our AI fraud detection tool and never share personal financial details.',
  },
];

const OnboardingTutorial: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenTutorial = localStorage.getItem('chapa_onboarding_complete');
    if (!hasSeenTutorial) {
      const timer = setTimeout(() => setIsVisible(true), 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('chapa_onboarding_complete', 'true');
  };

  const handleNext = () => {
    if (currentStep < TUTORIAL_STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      handleClose();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  if (!isVisible) return null;

  const step = TUTORIAL_STEPS[currentStep];
  const progress = ((currentStep + 1) / TUTORIAL_STEPS.length) * 100;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 animate-fade-in">
      <Card className="w-full max-w-md bg-card border-2 border-primary/30 shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <span className="font-semibold">Welcome to Chapa Market</span>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="text-primary-foreground hover:bg-primary-foreground/20 h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2">
            <Progress value={progress} className="h-1.5 bg-primary-foreground/20" />
            <p className="text-xs mt-1 text-primary-foreground/80">Step {currentStep + 1} of {TUTORIAL_STEPS.length}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 text-center space-y-4">
          <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary animate-float">
            {step.icon}
          </div>
          <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
          <p className="text-muted-foreground leading-relaxed">{step.description}</p>
        </div>

        {/* Step dots */}
        <div className="flex justify-center gap-1.5 pb-4">
          {TUTORIAL_STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStep(i)}
              className={`h-2 rounded-full transition-all ${i === currentStep ? 'w-6 bg-primary' : 'w-2 bg-muted-foreground/30'}`}
            />
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between p-4 border-t border-border">
          <Button variant="ghost" size="sm" onClick={handleClose} className="text-muted-foreground">
            Skip Tutorial
          </Button>
          <div className="flex gap-2">
            {currentStep > 0 && (
              <Button variant="outline" size="sm" onClick={handlePrev}>
                <ChevronLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
            <Button size="sm" onClick={handleNext} className="bg-gradient-to-r from-primary to-accent text-primary-foreground">
              {currentStep === TUTORIAL_STEPS.length - 1 ? 'Get Started' : 'Next'} 
              {currentStep < TUTORIAL_STEPS.length - 1 && <ChevronRight className="h-4 w-4 ml-1" />}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default OnboardingTutorial;
