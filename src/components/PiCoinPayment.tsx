
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';
import { X, Wallet, CreditCard, CheckCircle, MessageCircle } from 'lucide-react';

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
  const { t } = useTheme();

  // Convert TSH to Pi Coin (1 Pi = 314,159 TZS)
  const tshPrice = parseFloat(amount.replace(/[^\d]/g, '')) || 0;
  const piPrice = (tshPrice / 314159).toFixed(4);

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
        <CardHeader className="flex flex-row items-center justify-between bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20">
          <CardTitle className="text-xl text-yellow-800 dark:text-yellow-200">{t('payment.picoin')}</CardTitle>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          {livestock && (
            <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950/20 dark:to-orange-950/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h3 className="font-semibold text-foreground">{livestock.name}</h3>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-muted-foreground text-sm">TSH Price: {amount}</p>
                  <p className="text-yellow-700 dark:text-yellow-300 font-bold">Pi Price: {piPrice} π</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>{t('payment.rate')}</p>
                </div>
              </div>
            </div>
          )}

          {/* Contact for Payment Assistance */}
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Payment Assistance</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm mb-3">
              Need help with Pi Coin payment? Contact our support team in Tanzania:
            </p>
            <div className="flex items-center gap-3">
              <Button 
                onClick={() => window.open(`https://wa.me/255763953480?text=I need help with Pi Coin payment for ${livestock?.name}`, '_blank')}
                className="bg-green-600 hover:bg-green-700 text-white flex-1"
              >
                <MessageCircle className="h-4 w-4 mr-2" />
                {t('contact.whatsapp')}
              </Button>
              <span className="text-sm font-mono text-blue-800 dark:text-blue-200">{t('contact.phone')}</span>
            </div>
          </div>

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
