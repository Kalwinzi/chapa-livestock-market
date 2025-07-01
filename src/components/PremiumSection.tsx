
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, MessageCircle, Mail, Copy, Sparkles, Bot, BarChart3, Eye } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const PremiumSection = () => {
  const { toast } = useToast();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: "Phone number copied to clipboard",
    });
  };

  const openWhatsApp = () => {
    window.open('https://wa.me/255763953480?text=Hi, I want to upgrade to Premium on ChapaMarket', '_blank');
  };

  const openEmail = () => {
    window.open('mailto:support@chapamarket.com?subject=Premium Upgrade Request', '_blank');
  };

  const premiumFeatures = [
    {
      icon: <Crown className="h-6 w-6 text-yellow-500" />,
      title: "Featured Listings",
      description: "Your livestock appears at the top of search results"
    },
    {
      icon: <Bot className="h-6 w-6 text-blue-500" />,
      title: "AI Assistant",
      description: "Get livestock advice, disease identification, and market predictions"
    },
    {
      icon: <Eye className="h-6 w-6 text-green-500" />,
      title: "Early Access",
      description: "See new listings 24 hours before regular users"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-purple-500" />,
      title: "Market Analytics",
      description: "Advanced insights on pricing trends and market demand"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-pink-500" />,
      title: "Premium Support",
      description: "Priority customer service and dedicated account manager"
    }
  ];

  return (
    <section id="premium" className="py-16 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-950/20 dark:to-amber-950/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 rounded-full text-sm font-medium border border-yellow-200 dark:border-yellow-700 mb-4">
            <Crown className="w-4 h-4 mr-2" />
            Premium Membership
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Upgrade to Premium
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get access to livestock education, AI-based assistance, early listings, and personalized market insights
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Features Grid */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Premium Features</h3>
            <div className="grid gap-4">
              {premiumFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-white dark:bg-gray-800 rounded-lg border border-border">
                  <div className="flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Information */}
          <div className="space-y-6">
            <Card className="border-yellow-200 dark:border-yellow-700">
              <CardHeader className="bg-yellow-50 dark:bg-yellow-900/20">
                <CardTitle className="flex items-center gap-2 text-yellow-800 dark:text-yellow-200">
                  <Crown className="h-5 w-5" />
                  Premium Upgrade Payment
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-950/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                  <h4 className="font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                    Payment Instructions
                  </h4>
                  <p className="text-sm text-yellow-700 dark:text-yellow-300 mb-3">
                    Pay via mobile money to this Tanzania number:
                  </p>
                  <div className="flex items-center gap-2 p-3 bg-white dark:bg-gray-900 rounded border">
                    <span className="font-mono font-bold text-lg">+255 763 953 480</span>
                    <span className="text-sm text-muted-foreground">(Chapa)</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('+255763953480')}
                      className="ml-auto"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  <h5 className="font-medium text-foreground">Contact for Premium Access:</h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700 text-white">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      WhatsApp
                    </Button>
                    <Button onClick={openEmail} variant="outline" className="border-gray-300">
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support
                    </Button>
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <h6 className="font-medium mb-2">Quick Steps:</h6>
                  <ol className="text-sm text-muted-foreground space-y-1">
                    <li>1. Send payment to +255 763 953 480</li>
                    <li>2. Include your ChapaMarket username in reference</li>
                    <li>3. Contact us with payment confirmation</li>
                    <li>4. Get upgraded within 24 hours!</li>
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* AI Assistant Preview */}
            <Card className="border-blue-200 dark:border-blue-700">
              <CardHeader className="bg-blue-50 dark:bg-blue-900/20">
                <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <Bot className="h-5 w-5" />
                  AI Assistant Preview
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Premium users get access to our AI Assistant for:
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Livestock health diagnostics
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Market price predictions
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Breeding advice
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Feed recommendations
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PremiumSection;
