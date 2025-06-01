
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Heart, Eye, MessageCircle, Wallet } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { allLivestockData } from '@/data/livestockData';
import BuyerContactForm from './BuyerContactForm';
import ChatSystem from './ChatSystem';
import PiCoinPayment from './PiCoinPayment';

interface CategoryPageProps {
  category: string;
  onBack: () => void;
}

const CategoryPage: React.FC<CategoryPageProps> = ({ category, onBack }) => {
  const [selectedLivestock, setSelectedLivestock] = useState<any>(null);
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isPiPaymentOpen, setIsPiPaymentOpen] = useState(false);
  const [chatLivestock, setChatLivestock] = useState<any>(null);
  const [paymentLivestock, setPaymentLivestock] = useState<any>(null);
  const { toast } = useToast();

  // Filter livestock by category
  const filteredLivestock = allLivestockData.filter(item => 
    item.details.type.toLowerCase().includes(category.toLowerCase()) ||
    item.name.toLowerCase().includes(category.toLowerCase())
  );

  const handleContactSeller = (item: any) => {
    setSelectedLivestock(item);
    setIsContactFormOpen(true);
  };

  const handleStartChat = (item: any) => {
    setChatLivestock(item);
    setIsChatOpen(true);
  };

  const handlePiPayment = (item: any) => {
    setPaymentLivestock(item);
    setIsPiPaymentOpen(true);
  };

  const handleViewDetails = (item: any) => {
    toast({
      title: "Livestock Details",
      description: `${item.name} - Breed: ${item.details.breed}, Age: ${item.details.age}, Gender: ${item.details.gender}. Seller: ${item.seller.name}`,
    });
  };

  const handleFavorite = (item: any) => {
    toast({
      title: "Added to Favorites",
      description: `${item.name} saved to your favorites`,
    });
  };

  return (
    <>
      <div className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button 
              variant="outline" 
              onClick={onBack}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">{category} Livestock</h1>
              <p className="text-muted-foreground">
                Found {filteredLivestock.length} {category.toLowerCase()} listings
              </p>
            </div>
          </div>

          {/* Livestock Grid */}
          {filteredLivestock.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredLivestock.map((listing) => (
                <div key={listing.id} className="bg-card rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group border border-border">
                  <div className="relative">
                    <img
                      src={listing.image}
                      alt={listing.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-4 right-4 flex space-x-2">
                      {listing.verified && (
                        <div className="bg-green-600 text-white px-2 py-1 rounded-full text-xs font-semibold">
                          ✓ Verified
                        </div>
                      )}
                      <button 
                        onClick={() => handleFavorite(listing)}
                        className="bg-white/90 hover:bg-white p-2 rounded-full shadow-md transition-colors"
                      >
                        <Heart className="h-4 w-4 text-red-500" />
                      </button>
                    </div>
                    <div className="absolute bottom-4 left-4">
                      <button 
                        onClick={() => handleViewDetails(listing)}
                        className="bg-black/70 text-white px-3 py-1 rounded-full text-sm hover:bg-black/90 transition-colors flex items-center space-x-1"
                      >
                        <Eye className="h-3 w-3" />
                        <span>View Details</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-foreground mb-2">{listing.name}</h3>
                    
                    <button 
                      onClick={() => toast({ title: "Location", description: `Near ${listing.location}` })}
                      className="flex items-center text-muted-foreground mb-2 hover:text-primary-500 transition-colors"
                    >
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{listing.location}</span>
                    </button>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Breed: </span>
                        <span className="font-medium text-foreground">{listing.details.breed}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Age: </span>
                        <span className="font-medium text-foreground">{listing.details.age}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Gender: </span>
                        <span className="font-medium text-foreground">{listing.details.gender}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type: </span>
                        <span className="font-medium text-foreground">{listing.details.type}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <span className="text-muted-foreground text-sm">Seller: </span>
                        <span className="font-medium text-foreground text-sm">{listing.seller.name}</span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm font-medium ml-1 text-foreground">{listing.seller.rating}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-4">
                      <div className="text-2xl font-bold text-primary-500">{listing.price}</div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={() => handleContactSeller(listing)}
                        variant="outline"
                        className="text-sm"
                      >
                        Contact Seller
                      </Button>
                      <Button 
                        onClick={() => handleStartChat(listing)}
                        variant="outline"
                        className="text-sm flex items-center space-x-1"
                      >
                        <MessageCircle className="h-3 w-3" />
                        <span>Chat</span>
                      </Button>
                      <Button 
                        onClick={() => handlePiPayment(listing)}
                        className="bg-primary-500 hover:bg-primary-600 text-white text-sm flex items-center space-x-1 col-span-2"
                      >
                        <Wallet className="h-3 w-3" />
                        <span>Pay with Pi Coin</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🐄</div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No {category} Found
              </h3>
              <p className="text-muted-foreground mb-6">
                We don't have any {category.toLowerCase()} listings at the moment.
              </p>
              <Button onClick={onBack} variant="outline">
                Browse All Categories
              </Button>
            </div>
          )}
        </div>
      </div>

      <BuyerContactForm 
        isOpen={isContactFormOpen}
        onClose={() => setIsContactFormOpen(false)}
        livestock={selectedLivestock}
      />

      <ChatSystem 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        sellerName={chatLivestock?.seller?.name || 'Seller'}
        livestock={chatLivestock}
      />

      <PiCoinPayment 
        isOpen={isPiPaymentOpen}
        onClose={() => setIsPiPaymentOpen(false)}
        livestock={paymentLivestock}
        amount={paymentLivestock?.price || ''}
      />
    </>
  );
};

export default CategoryPage;
