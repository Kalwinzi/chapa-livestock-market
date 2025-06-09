
import React from 'react';
import { cn } from '@/lib/utils';

interface PageLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
  loadingText?: string;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  isLoading,
  children,
  className,
  loadingText = 'Loading...'
}) => {
  if (isLoading) {
    return (
      <div className={cn("flex items-center justify-center min-h-[400px]", className)}>
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground font-medium">{loadingText}</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
