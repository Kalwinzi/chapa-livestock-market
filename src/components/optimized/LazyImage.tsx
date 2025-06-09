
import React from 'react';
import { cn } from '@/lib/utils';
import { useImageLazyLoading } from '@/hooks/useImageLazyLoading';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className,
  placeholder = '/placeholder.svg',
  width,
  height,
  loading = 'lazy'
}) => {
  const { imageSrc, isLoaded, imgRef } = useImageLazyLoading({
    src,
    placeholder,
    threshold: 0.1
  });

  return (
    <div className={cn("relative overflow-hidden", className)}>
      <img
        ref={imgRef}
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        className={cn(
          "transition-opacity duration-300",
          isLoaded ? "opacity-100" : "opacity-50",
          className
        )}
        style={{
          aspectRatio: width && height ? `${width}/${height}` : undefined
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
};

export default LazyImage;
