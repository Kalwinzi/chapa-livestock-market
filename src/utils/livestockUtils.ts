
import { LivestockItem } from '@/types/livestock';
import { allLivestockData } from '@/data/livestockItems';

export const getFeaturedLivestock = (): LivestockItem[] => {
  return allLivestockData.filter(item => item.verified).slice(0, 6);
};

export const getLivestockByCategory = (category: string): LivestockItem[] => {
  return allLivestockData.filter(item => item.category === category);
};

export const searchLivestock = (query: string, location?: string): LivestockItem[] => {
  const searchTerm = query.toLowerCase();
  
  return allLivestockData.filter(item => {
    const matchesQuery = 
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.details.breed.toLowerCase().includes(searchTerm) ||
      item.details.type.toLowerCase().includes(searchTerm);
    
    const matchesLocation = !location || item.location.toLowerCase().includes(location.toLowerCase());
    
    return matchesQuery && matchesLocation;
  });
};
