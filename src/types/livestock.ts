
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
