
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Phone, MessageCircle, Mail, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PremiumManagement: React.FC = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/255763953480', '_blank');
  };

  const openEmail = () => {
    window.open('mailto:support@chapamarket.com', '_blank');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Crown className="h-6 w-6 text-yellow-500" />
        <h3 className="text-2xl font-bold">Premium Management</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-500" />
              Premium Upgrade Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                Upgrade to Premium
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                To upgrade to Premium, please pay via mobile money to Tanzania number:
              </p>
              <div className="flex items-center gap-2 p-2 bg-white dark:bg-gray-900 rounded border">
                <Phone className="h-4 w-4" />
                <span className="font-mono font-bold">+255 763 953 480</span>
                <span className="text-sm text-muted-foreground">(Chapa)</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard('+255763953480')}
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Contact for Support:</h5>
              <div className="flex gap-2">
                <Button onClick={openWhatsApp} className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>
                <Button onClick={openEmail} variant="outline" className="flex-1">
                  <Mail className="h-4 w-4 mr-2" />
                  Email
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Premium Features</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Crown className="h-3 w-3 text-yellow-500" />
                Featured livestock listings
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-3 w-3 text-yellow-500" />
                Priority customer support
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-3 w-3 text-yellow-500" />
                Advanced analytics dashboard
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-3 w-3 text-yellow-500" />
                Unlimited livestock uploads
              </li>
              <li className="flex items-center gap-2">
                <Crown className="h-3 w-3 text-yellow-500" />
                Custom profile verification
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 text-sm">
            <div>
              <h6 className="font-medium">Step 1:</h6>
              <p>Send mobile money payment to <strong>+255 763 953 480</strong></p>
            </div>
            <div>
              <h6 className="font-medium">Step 2:</h6>
              <p>Include your ChapaMarket username in the payment reference</p>
            </div>
            <div>
              <h6 className="font-medium">Step 3:</h6>
              <p>Contact us via WhatsApp or email with payment confirmation</p>
            </div>
            <div>
              <h6 className="font-medium">Step 4:</h6>
              <p>Your account will be upgraded to Premium within 24 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumManagement;
