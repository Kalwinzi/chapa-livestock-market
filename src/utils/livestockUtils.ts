
import { LivestockItem } from '@/types/livestock';
import { allLivestockData } from '@/data/livestockItems';

export const getFeaturedLivestock = (): LivestockItem[] => {
  return allLivestockData.filter(item => item.verified).slice(0, 6);
};

export const getLivestockByCategory = (category: string): LivestockItem[] => {
  return allLivestockData.filter(item => item.category === category);
};

export const searchLivestock = (query: string, country?: string): LivestockItem[] => {
  const searchTerm = query.toLowerCase();
  
  return allLivestockData.filter(item => {
    const matchesQuery = 
      item.name.toLowerCase().includes(searchTerm) ||
      item.category.toLowerCase().includes(searchTerm) ||
      item.details.breed.toLowerCase().includes(searchTerm) ||
      item.details.type.toLowerCase().includes(searchTerm);
    
    const matchesCountry = !country || item.location.toLowerCase().includes(country.toLowerCase());
    
    return matchesQuery && matchesCountry;
  });
};
