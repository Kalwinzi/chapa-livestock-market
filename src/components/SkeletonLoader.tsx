
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export const LivestockCardSkeleton = () => {
  return (
    <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
      <Skeleton className="w-full h-48" />
      <div className="p-6 space-y-4">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <div className="grid grid-cols-2 gap-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-20" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export const CategorySkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-6 text-center">
      <Skeleton className="w-12 h-12 rounded-full mx-auto mb-4" />
      <Skeleton className="h-6 w-20 mx-auto mb-2" />
      <Skeleton className="h-8 w-16 mx-auto mb-1" />
      <Skeleton className="h-4 w-16 mx-auto" />
    </div>
  );
};

export const ListingSkeleton = () => {
  return (
    <div className="min-h-screen bg-background py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Skeleton className="h-10 w-64 mx-auto mb-4" />
          <Skeleton className="h-6 w-96 mx-auto" />
        </div>
        
        <div className="bg-card rounded-2xl shadow-lg p-6 mb-8 border border-border">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <LivestockCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

// Default export component that can be used when importing SkeletonLoader
const SkeletonLoader = {
  LivestockCard: LivestockCardSkeleton,
  Category: CategorySkeleton,
  Listing: ListingSkeleton
};

export default SkeletonLoader;
