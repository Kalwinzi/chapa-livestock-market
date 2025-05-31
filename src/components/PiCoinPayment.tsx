
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { X, Wallet, CreditCard, CheckCircle } from 'lucide-react';

interface PiCoinPaymentProps {
  isOpen: boolean;
  onClose: () => void;
  livestock: any;
  amount: string;
}

const PiCoinPayment: React.FC<PiCoinPaymentProps> = ({ isOpen, onClose, livestock, amount }) => {
  const [paymentMethod, setPaymentMethod] = useState<'wallet' | 'card'>('wallet');
  const [piWalletAddress, setPiWalletAddress] = useState('');
  const [piCardNumber, setPiCardNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePayment = async () => {
    if (paymentMethod === 'wallet' && !piWalletAddress) {
      toast({
        title: "Missing Information",
        description: "Please enter your Pi Wallet address",
        variant: "destructive"
      });
      return;
    }

    if (paymentMethod === 'card' && !piCardNumber) {
      toast({
        title: "Missing Information", 
        description: "Please enter your Pi Card number",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast({
        title: "Payment Submitted",
        description: "Your Pi Coin payment has been submitted for admin approval. You'll receive confirmation soon.",
      });
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-xl">Pay with Pi Coin</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {livestock && (
            <div className="bg-accent-50 dark:bg-accent-900/30 p-4 rounded-lg">
              <h3 className="font-semibold text-foreground">{livestock.name}</h3>
              <p className="text-muted-foreground text-sm">Price: {amount}</p>
            </div>
          )}

          <div className="space-y-4">
            <div className="flex space-x-2">
              <Button
                variant={paymentMethod === 'wallet' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('wallet')}
                className="flex-1 flex items-center space-x-2"
              >
                <Wallet className="h-4 w-4" />
                <span>Pi Wallet</span>
              </Button>
              <Button
                variant={paymentMethod === 'card' ? 'default' : 'outline'}
                onClick={() => setPaymentMethod('card')}
                className="flex-1 flex items-center space-x-2"
              >
                <CreditCard className="h-4 w-4" />
                <span>Pi Card</span>
              </Button>
            </div>

            {paymentMethod === 'wallet' ? (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Pi Wallet Address</label>
                <Input
                  placeholder="Enter your Pi Wallet address"
                  value={piWalletAddress}
                  onChange={(e) => setPiWalletAddress(e.target.value)}
                />
              </div>
            ) : (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Pi Card Number</label>
                <Input
                  placeholder="Enter your Pi Card number"
                  value={piCardNumber}
                  onChange={(e) => setPiCardNumber(e.target.value)}
                />
              </div>
            )}

            <Button 
              onClick={handlePayment}
              disabled={isProcessing}
              className="w-full bg-primary-500 hover:bg-primary-600 text-white"
            >
              {isProcessing ? (
                <>Processing...</>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Submit Payment
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PiCoinPayment;
