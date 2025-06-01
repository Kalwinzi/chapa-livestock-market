
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { X, Phone, Mail, MessageCircle, CreditCard } from 'lucide-react';
import PiCoinPayment from './PiCoinPayment';
import ChatSystem from './ChatSystem';
import { useAuth } from '@/contexts/AuthContext';

interface BuyerContactFormProps {
  isOpen: boolean;
  onClose: () => void;
  livestock: any;
}

const BuyerContactForm: React.FC<BuyerContactFormProps> = ({ isOpen, onClose, livestock }) => {
  const [contactMethod, setContactMethod] = useState<'call' | 'email' | 'chat' | 'buy'>('call');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isPiPaymentOpen, setIsPiPaymentOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (contactMethod === 'chat') {
      if (!user) {
        toast({
          title: "Ingia kwanza",
          description: "Unahitaji kuingia ili kuweza kuzungumza na muuzaji",
          variant: "destructive"
        });
        return;
      }
      setIsChatOpen(true);
      return;
    }

    if (contactMethod === 'buy') {
      setIsPiPaymentOpen(true);
      return;
    }
    
    toast({
      title: "Ujumbe Umetumwa!",
      description: `Ujumbe wako umetumwa kwa ${livestock?.seller?.name || 'muuzaji'}. Utapokea jibu hivi karibuni.`,
    });
    
    setFormData({ name: '', email: '', phone: '', message: '' });
    onClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xl">Wasiliana na Muuzaji</CardTitle>
            <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>
          </CardHeader>
          <CardContent className="space-y-6">
            {livestock && (
              <div className="bg-accent-50 dark:bg-accent-900/30 p-4 rounded-lg">
                <h3 className="font-semibold text-foreground">{livestock.name}</h3>
                <p className="text-muted-foreground text-sm">Bei: {livestock.price}</p>
                <p className="text-muted-foreground text-sm">Mahali: {livestock.location}</p>
              </div>
            )}

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={contactMethod === 'call' ? 'default' : 'outline'}
                  onClick={() => setContactMethod('call')}
                  className="flex items-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Piga Simu</span>
                </Button>
                <Button
                  variant={contactMethod === 'email' ? 'default' : 'outline'}
                  onClick={() => setContactMethod('email')}
                  className="flex items-center space-x-2"
                >
                  <Mail className="h-4 w-4" />
                  <span>Barua Pepe</span>
                </Button>
                <Button
                  variant={contactMethod === 'chat' ? 'default' : 'outline'}
                  onClick={() => setContactMethod('chat')}
                  className="flex items-center space-x-2"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Zungumza</span>
                </Button>
                <Button
                  variant={contactMethod === 'buy' ? 'default' : 'outline'}
                  onClick={() => setContactMethod('buy')}
                  className="flex items-center space-x-2"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Nunua Sasa</span>
                </Button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {contactMethod !== 'chat' && contactMethod !== 'buy' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium mb-2">Jina Lako</label>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jina lako kamili"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Barua Pepe</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="barua@mfano.com"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Nambari ya Simu</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+255 XXX XXX XXX"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Ujumbe</label>
                      <Textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Ninapenda kujua zaidi kuhusu mfugo huu..."
                        rows={4}
                        required
                      />
                    </div>
                  </>
                )}

                <Button type="submit" className="w-full bg-primary-500 hover:bg-primary-600 text-white">
                  {contactMethod === 'call' && 'Piga Simu Muuzaji'}
                  {contactMethod === 'email' && 'Tuma Barua Pepe'}
                  {contactMethod === 'chat' && 'Anza Mazungumzo'}
                  {contactMethod === 'buy' && 'Nunua kwa Pi Coin'}
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      <PiCoinPayment 
        isOpen={isPiPaymentOpen}
        onClose={() => setIsPiPaymentOpen(false)}
        livestock={livestock}
        amount={livestock?.price || ''}
      />

      <ChatSystem
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        receiverId={livestock?.user_id}
        receiverName={livestock?.seller?.name || 'Muuzaji'}
      />
    </>
  );
};

export default BuyerContactForm;
