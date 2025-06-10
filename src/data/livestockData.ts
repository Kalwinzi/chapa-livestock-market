
export interface LivestockItem {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  location: string;
  verified: boolean;
  featured?: boolean;
  details: {
    breed: string;
    age: string;
    gender: string;
    type: string;
    weight: string;
  };
  seller: {
    name: string;
    phone: string;
    rating: number;
    description: string;
  };
}

export const allLivestockData: LivestockItem[] = [
  {
    id: 1,
    name: "Premium Holstein Dairy Cow",
    category: "Cattle",
    price: "TSH 2,800,000",
    image: "/lovable-uploads/c233bd9c-f4df-4d2d-b08e-8aa6c2173fb8.png",
    location: "Arusha, Tanzania",
    verified: true,
    details: {
      breed: "Holstein",
      age: "3 years",
      gender: "Female",
      type: "Dairy",
      weight: "450kg"
    },
    seller: {
      name: "John Mwangi",
      phone: "+255 741 234 567",
      rating: 4.8,
      description: "Experienced dairy farmer with 15+ years in cattle breeding"
    }
  },
  {
    id: 2,
    name: "High-Quality Goat Family",
    category: "Goats",
    price: "TSH 850,000",
    image: "/lovable-uploads/e8241cbe-38bc-4ee0-8a58-0eca13eda429.png",
    location: "Mwanza, Tanzania",
    verified: true,
    details: {
      breed: "Mixed Breed",
      age: "1-3 years",
      gender: "Mixed",
      type: "Dairy/Meat",
      weight: "25-35kg"
    },
    seller: {
      name: "Mary Kileo",
      phone: "+255 754 567 890",
      rating: 4.9,
      description: "Specializes in goat farming and breeding"
    }
  },
  {
    id: 3,
    name: "Premium Suffolk Sheep",
    category: "Sheep",
    price: "TSH 650,000",
    image: "/lovable-uploads/5db4a005-dd41-4019-b5c0-c321e41dd2e9.png",
    location: "Dodoma, Tanzania",
    verified: true,
    details: {
      breed: "Suffolk",
      age: "2 years",
      gender: "Mixed",
      type: "Wool/Meat",
      weight: "45-55kg"
    },
    seller: {
      name: "Peter Masanja",
      phone: "+255 765 432 109",
      rating: 4.7,
      description: "Sheep breeder focusing on wool and meat production"
    }
  },
  {
    id: 4,
    name: "Healthy Berkshire Pig",
    category: "Pigs",
    price: "TSH 950,000",
    image: "/lovable-uploads/3bf2bed0-b9a5-4ed5-8a0f-6115400148e3.png",
    location: "Iringa, Tanzania",
    verified: true,
    details: {
      breed: "Berkshire",
      age: "1.5 years",
      gender: "Female",
      type: "Breeding/Meat",
      weight: "80kg"
    },
    seller: {
      name: "Grace Ngowi",
      phone: "+255 787 654 321",
      rating: 4.6,
      description: "Pig farming specialist with organic feeding practices"
    }
  },
  {
    id: 5,
    name: "Free-Range Chickens",
    category: "Poultry",
    price: "TSH 25,000",
    image: "/lovable-uploads/7417f889-5896-4430-90f2-cebc9914a8e3.png",
    location: "Dar es Salaam, Tanzania",
    verified: true,
    details: {
      breed: "Rhode Island Red",
      age: "6 months",
      gender: "Mixed",
      type: "Egg/Meat",
      weight: "1.5-2kg"
    },
    seller: {
      name: "Emmanuel Mushi",
      phone: "+255 712 345 678",
      rating: 4.8,
      description: "Poultry farmer specializing in free-range chickens"
    }
  },
  {
    id: 6,
    name: "Mountain Goats",
    category: "Goats", 
    price: "TSH 1,200,000",
    image: "/lovable-uploads/f7445da8-fa3b-4320-8d7f-fab9d78570ef.png",
    location: "Kilimanjaro, Tanzania",
    verified: true,
    details: {
      breed: "Mountain Goat",
      age: "2-4 years",
      gender: "Mixed",
      type: "Breeding",
      weight: "30-45kg"
    },
    seller: {
      name: "Daniel Mollel",
      phone: "+255 743 876 543",
      rating: 4.9,
      description: "Mountain goat breeder in Kilimanjaro region"
    }
  },
  {
    id: 7,
    name: "Boer Goat",
    category: "Goats",
    price: "TSH 750,000", 
    image: "/lovable-uploads/246f72df-8aa4-41bb-ae14-3bee36b02baf.png",
    location: "Mbeya, Tanzania",
    verified: true,
    details: {
      breed: "Boer",
      age: "1.5 years",
      gender: "Male",
      type: "Meat",
      weight: "40kg"
    },
    seller: {
      name: "Sarah Lyimo",
      phone: "+255 756 234 567",
      rating: 4.7,
      description: "Boer goat specialist for meat production"
    }
  },
  {
    id: 8,
    name: "Heritage Chickens",
    category: "Poultry",
    price: "TSH 35,000",
    image: "/lovable-uploads/d2f812f1-7da2-45c8-a32e-0e5735703daf.png", 
    location: "Morogoro, Tanzania",
    verified: true,
    details: {
      breed: "Heritage Mixed",
      age: "8 months",
      gender: "Mixed",
      type: "Egg/Meat",
      weight: "2-2.5kg"
    },
    seller: {
      name: "Jackson Mbwambo",
      phone: "+255 768 901 234",
      rating: 4.6,
      description: "Heritage chicken breeder preserving local varieties"
    }
  },
  {
    id: 9,
    name: "Pasture-Fed Cattle",
    category: "Cattle",
    price: "TSH 3,200,000",
    image: "/lovable-uploads/3c56169f-0372-418f-823a-8d738d0d35b2.png",
    location: "Singida, Tanzania", 
    verified: true,
    details: {
      breed: "Holstein-Friesian",
      age: "4 years",
      gender: "Female",
      type: "Dairy",
      weight: "500kg"
    },
    seller: {
      name: "Robert Shayo",
      phone: "+255 734 567 890",
      rating: 4.8,
      description: "Pasture-based dairy farming expert"
    }
  },
  {
    id: 10,
    name: "Alpaca Goat",
    category: "Goats",
    price: "TSH 900,000",
    image: "/lovable-uploads/ae97b370-5403-41aa-9b1f-617a9b2c5a83.png",
    location: "Tanga, Tanzania",
    verified: true,
    details: {
      breed: "Angora",
      age: "2 years",
      gender: "Female", 
      type: "Fiber/Meat",
      weight: "35kg"
    },
    seller: {
      name: "Fatuma Said",
      phone: "+255 745 123 456",
      rating: 4.9,
      description: "Angora goat breeder specializing in fiber production"
    }
  }
];

export const livestockCategories = [
  { name: "Cattle", icon: "🐄", count: "2,450+" },
  { name: "Goats", icon: "🐐", count: "1,800+" },
  { name: "Sheep", icon: "🐑", count: "1,200+" },
  { name: "Pigs", icon: "🐷", count: "850+" },
  { name: "Poultry", icon: "🐔", count: "3,200+" },
  { name: "Others", icon: "🦙", count: "400+" }
];

export const getFeaturedLivestock = () => {
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
