
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Phone, MessageCircle, ShoppingCart, X, CheckCircle } from 'lucide-react';

interface BuyerContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  livestock?: {
    name: string;
    price: string;
    seller: {
      name: string;
      phone: string;
    };
  };
}

const BuyerContactForm: React.FC<BuyerContactFormProps> = ({ isOpen, onClose, livestock }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    livestockType: livestock?.name || '',
    quantity: '1',
    additionalNotes: ''
  });
  const [showSellerContact, setShowSellerContact] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate email confirmation
    setEmailSent(true);
    
    // Simulate form submission
    toast({
      title: "Contact Request Submitted!",
      description: "Confirmation email sent to your inbox. You can now contact the seller directly.",
    });
    
    // Show seller contact info after form submission
    setTimeout(() => {
      setShowSellerContact(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleClose = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      livestockType: livestock?.name || '',
      quantity: '1',
      additionalNotes: ''
    });
    setShowSellerContact(false);
    setEmailSent(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-2xl font-bold text-center text-primary-500 flex items-center justify-center">
            <ShoppingCart className="mr-2 h-6 w-6" />
            Contact Seller
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showSellerContact ? (
            <>
              {emailSent && (
                <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6 flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-green-800 dark:text-green-200">
                      Email Confirmed!
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Confirmation sent to {formData.email}
                    </p>
                  </div>
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="bg-accent-50 dark:bg-accent-900/30 p-4 rounded-lg mb-6">
                  <h3 className="font-semibold text-foreground mb-2">Livestock Details</h3>
                  <p className="text-sm text-muted-foreground">
                    {livestock?.name} - {livestock?.price}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Name *</label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Email Address *</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number *</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="+250 XXX XXX XXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type of Livestock *</label>
                  <select
                    name="livestockType"
                    value={formData.livestockType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-background"
                    required
                  >
                    <option value="">Select livestock type</option>
                    <option value="Dairy Cows">Dairy Cows</option>
                    <option value="Beef Cattle">Beef Cattle</option>
                    <option value="Goats">Goats</option>
                    <option value="Sheep">Sheep</option>
                    <option value="Chickens">Chickens</option>
                    <option value="Pigs">Pigs</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Quantity</label>
                  <Input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    min="1"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes</label>
                  <div className="relative">
                    <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleChange}
                      className="w-full pl-10 pt-3 pb-3 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 bg-background"
                      rows={4}
                      placeholder="Any specific requirements or questions..."
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white font-semibold py-3">
                  {emailSent ? 'Processing...' : 'Submit Contact Request'}
                </Button>

                <p className="text-center text-sm text-gray-600">
                  By submitting, you agree to our Terms & Privacy Policy
                </p>
              </form>
            </>
          ) : (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto">
                <Phone className="h-8 w-8 text-green-600" />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Contact Information</h3>
                <p className="text-muted-foreground mb-4">
                  Your request has been submitted successfully. Here are the seller's contact details:
                </p>
              </div>

              <div className="bg-primary-50 dark:bg-primary-900/30 p-6 rounded-lg">
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Seller Name</p>
                    <p className="font-semibold text-foreground">{livestock?.seller.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Phone Number</p>
                    <p className="font-semibold text-primary-500 text-lg">{livestock?.seller.phone}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  onClick={() => window.open(`tel:${livestock?.seller.phone}`, '_self')}
                  className="w-full bg-primary-500 hover:bg-primary-600 text-white"
                >
                  📞 Call Now
                </Button>
                <Button 
                  onClick={() => window.open(`https://wa.me/${livestock?.seller.phone?.replace(/[^0-9]/g, '')}`, '_blank')}
                  variant="outline" 
                  className="w-full border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-white"
                >
                  💬 WhatsApp
                </Button>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-blue-600 mr-2" />
                  <div className="text-left">
                    <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Email Confirmation Sent
                    </p>
                    <p className="text-xs text-blue-600 dark:text-blue-400">
                      Check your inbox at {formData.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerContactForm;
