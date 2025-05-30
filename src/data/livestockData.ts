
export interface LivestockItem {
  id: number;
  name: string;
  category: string;
  location: string;
  country: string;
  price: string;
  image: string;
  seller: {
    name: string;
    phone: string;
    whatsapp: string;
    description: string;
    verified: boolean;
    rating: number;
  };
  details: {
    breed: string;
    age: string;
    gender: 'Male' | 'Female';
    type: 'Kienyeji' | 'Kisasa' | 'Mixed';
    weight?: string;
    health: string;
  };
  verified: boolean;
  featured: boolean;
}

export const livestockCategories = [
  { name: 'Cattle', count: '5,240', icon: '🐄' },
  { name: 'Goats', count: '3,120', icon: '🐐' },
  { name: 'Sheep', count: '2,890', icon: '🐑' },
  { name: 'Poultry', count: '8,760', icon: '🐔' },
  { name: 'Pigs', count: '1,240', icon: '🐷' },
  { name: 'Other', count: '890', icon: '🐰' }
];

// Generate comprehensive livestock data
export const generateLivestockData = (): LivestockItem[] => {
  const baseAnimals = [
    // Goats (30+ listings)
    ...Array.from({ length: 35 }, (_, i) => ({
      id: i + 1,
      name: `${['Boer', 'Saanen', 'Toggenburg', 'Alpine', 'Nubian', 'Local'][i % 6]} Goat`,
      category: 'Goats',
      location: ['Arusha', 'Dodoma', 'Mwanza', 'Kilimanjaro', 'Morogoro', 'Mbeya'][i % 6] + ', Tanzania',
      country: 'Tanzania',
      price: `${(Math.random() * 500000 + 200000).toFixed(0)} TSH`,
      image: `https://images.unsplash.com/photo-${[
        '1583337130417-3346a1be7dee', '1551916042-8cfde52c26de', 
        '1438565434616-3ef039228b15', '1469041797191-50ace28483c3'
      ][i % 4]}?w=400&h=300&fit=crop`,
      seller: {
        name: ['Mwalimu Hassan', 'Mama Grace', 'Baba John', 'Sister Mary', 'Uncle Peter'][i % 5],
        phone: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        whatsapp: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        description: `Experienced goat farmer with ${Math.floor(Math.random() * 10 + 5)} years in livestock business.`,
        verified: true,
        rating: Number((Math.random() * 1 + 4).toFixed(1))
      },
      details: {
        breed: ['Boer', 'Saanen', 'Toggenburg', 'Alpine', 'Nubian', 'Local'][i % 6],
        age: `${Math.floor(Math.random() * 3 + 1)} years`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        type: i % 3 === 0 ? 'Kienyeji' : i % 3 === 1 ? 'Kisasa' : 'Mixed',
        weight: `${Math.floor(Math.random() * 30 + 20)}kg`,
        health: 'Excellent'
      },
      verified: true,
      featured: i < 6
    })),

    // Cattle (50+ listings)
    ...Array.from({ length: 55 }, (_, i) => ({
      id: i + 100,
      name: `${['Holstein', 'Friesian', 'Zebu', 'Ankole', 'Boran', 'Sahiwal'][i % 6]} Cattle`,
      category: 'Cattle',
      location: ['Arusha', 'Dodoma', 'Mwanza', 'Kilimanjaro', 'Morogoro', 'Mbeya'][i % 6] + ', Tanzania',
      country: 'Tanzania',
      price: `${(Math.random() * 2000000 + 1000000).toFixed(0)} TSH`,
      image: `https://images.unsplash.com/photo-${[
        '1560114928-40f1f1eb26a0', '1596464716127-f2a82984de30',
        '1465379944081-7f47de8d74ac', '1493962853295-0fd70327578a'
      ][i % 4]}?w=400&h=300&fit=crop`,
      seller: {
        name: ['Farmer Joseph', 'Mama Elizabeth', 'Mzee William', 'Dada Sarah'][i % 4],
        phone: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        whatsapp: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        description: `Professional cattle farmer specializing in dairy and beef cattle.`,
        verified: true,
        rating: Number((Math.random() * 1 + 4).toFixed(1))
      },
      details: {
        breed: ['Holstein', 'Friesian', 'Zebu', 'Ankole', 'Boran', 'Sahiwal'][i % 6],
        age: `${Math.floor(Math.random() * 4 + 2)} years`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        type: i % 3 === 0 ? 'Kienyeji' : i % 3 === 1 ? 'Kisasa' : 'Mixed',
        weight: `${Math.floor(Math.random() * 200 + 300)}kg`,
        health: 'Excellent'
      },
      verified: true,
      featured: i < 3
    })),

    // Sheep (50+ listings)
    ...Array.from({ length: 52 }, (_, i) => ({
      id: i + 200,
      name: `${['Dorper', 'Black Head Persian', 'Red Maasai', 'Merino'][i % 4]} Sheep`,
      category: 'Sheep',
      location: ['Arusha', 'Dodoma', 'Mwanza', 'Kilimanjaro', 'Morogoro', 'Mbeya'][i % 6] + ', Tanzania',
      country: 'Tanzania',
      price: `${(Math.random() * 400000 + 150000).toFixed(0)} TSH`,
      image: `https://images.unsplash.com/photo-${[
        '1583212292454-1fe6229603b7', '1452960962994-acf4fd70b632'
      ][i % 2]}?w=400&h=300&fit=crop`,
      seller: {
        name: ['Mama Fatuma', 'Baba Ahmed', 'Sister Anna', 'Uncle David'][i % 4],
        phone: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        whatsapp: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        description: `Sheep farming specialist with quality breeds.`,
        verified: true,
        rating: Number((Math.random() * 1 + 4).toFixed(1))
      },
      details: {
        breed: ['Dorper', 'Black Head Persian', 'Red Maasai', 'Merino'][i % 4],
        age: `${Math.floor(Math.random() * 2 + 1)} years`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        type: i % 3 === 0 ? 'Kienyeji' : i % 3 === 1 ? 'Kisasa' : 'Mixed',
        weight: `${Math.floor(Math.random() * 20 + 25)}kg`,
        health: 'Excellent'
      },
      verified: true,
      featured: i < 2
    })),

    // Poultry (50+ listings)
    ...Array.from({ length: 60 }, (_, i) => ({
      id: i + 300,
      name: `${['Kuroiler', 'Layers', 'Broilers', 'Local Chicken', 'Ducks'][i % 5]}`,
      category: 'Poultry',
      location: ['Arusha', 'Dodoma', 'Mwanza', 'Kilimanjaro', 'Morogoro', 'Mbeya'][i % 6] + ', Tanzania',
      country: 'Tanzania',
      price: `${(Math.random() * 50000 + 15000).toFixed(0)} TSH`,
      image: `https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&h=300&fit=crop`,
      seller: {
        name: ['Mama Joyce', 'Baba Francis', 'Sister Rose', 'Uncle Mark'][i % 4],
        phone: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        whatsapp: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        description: `Poultry specialist with healthy birds.`,
        verified: true,
        rating: Number((Math.random() * 1 + 4).toFixed(1))
      },
      details: {
        breed: ['Kuroiler', 'Layers', 'Broilers', 'Local Chicken', 'Ducks'][i % 5],
        age: `${Math.floor(Math.random() * 12 + 3)} months`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        type: i % 3 === 0 ? 'Kienyeji' : i % 3 === 1 ? 'Kisasa' : 'Mixed',
        health: 'Excellent'
      },
      verified: true,
      featured: i < 2
    })),

    // Pigs (50+ listings)
    ...Array.from({ length: 50 }, (_, i) => ({
      id: i + 400,
      name: `${['Large White', 'Landrace', 'Duroc', 'Hampshire'][i % 4]} Pig`,
      category: 'Pigs',
      location: ['Arusha', 'Dodoma', 'Mwanza', 'Kilimanjaro', 'Morogoro', 'Mbeya'][i % 6] + ', Tanzania',
      country: 'Tanzania',
      price: `${(Math.random() * 800000 + 300000).toFixed(0)} TSH`,
      image: `https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop`,
      seller: {
        name: ['Farmer Paul', 'Mama Lucy', 'Baba Thomas', 'Sister Ruth'][i % 4],
        phone: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        whatsapp: `+255${Math.floor(Math.random() * 900000000 + 700000000)}`,
        description: `Pig farming expert with quality breeds.`,
        verified: true,
        rating: Number((Math.random() * 1 + 4).toFixed(1))
      },
      details: {
        breed: ['Large White', 'Landrace', 'Duroc', 'Hampshire'][i % 4],
        age: `${Math.floor(Math.random() * 2 + 1)} years`,
        gender: i % 2 === 0 ? 'Male' : 'Female',
        type: i % 3 === 0 ? 'Kienyeji' : i % 3 === 1 ? 'Kisasa' : 'Mixed',
        weight: `${Math.floor(Math.random() * 50 + 50)}kg`,
        health: 'Excellent'
      },
      verified: true,
      featured: i < 1
    }))
  ];

  return baseAnimals;
};

export const allLivestockData = generateLivestockData();

// Helper functions
export const searchLivestock = (query: string, country?: string): LivestockItem[] => {
  const searchTerm = query.toLowerCase();
  let results = allLivestockData.filter(item => 
    item.name.toLowerCase().includes(searchTerm) ||
    item.category.toLowerCase().includes(searchTerm) ||
    item.details.breed.toLowerCase().includes(searchTerm)
  );

  if (country && country !== 'All Countries') {
    results = results.filter(item => item.country === country);
  }

  return results;
};

export const getLivestockByCategory = (category: string): LivestockItem[] => {
  return allLivestockData.filter(item => item.category === category);
};

export const getFeaturedLivestock = (): LivestockItem[] => {
  return allLivestockData.filter(item => item.featured);
};
