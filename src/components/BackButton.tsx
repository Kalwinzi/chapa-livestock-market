
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface BackButtonProps {
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
}

const BackButton: React.FC<BackButtonProps> = ({ 
  onClick, 
  className = "",
  children = "Back"
}) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else {
      // Default behavior: go back in browser history
      window.history.back();
    }
  };

  return (
    <Button 
      variant="outline" 
      onClick={handleClick}
      className={`flex items-center gap-2 ${className}`}
    >
      <ArrowLeft className="h-4 w-4" />
      {children}
    </Button>
  );
};

export default BackButton;
