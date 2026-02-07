
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, MessageCircle, Mail, Copy, Sparkles, Bot, BarChart3, Eye, Zap, Star } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTheme } from '@/contexts/ThemeContext';

const PremiumSection = () => {
  const { toast } = useToast();
  const { t } = useTheme();

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
      icon: <Crown className="h-6 w-6" />,
      title: "Featured Listings",
      description: "Your livestock appears at the top of search results",
      gradient: "from-yellow-400 to-amber-500"
    },
    {
      icon: <Bot className="h-6 w-6" />,
      title: "ChapaVet AI Assistant",
      description: "Get livestock health advice, disease identification, and valuation help",
      gradient: "from-blue-400 to-indigo-500"
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Early Access",
      description: "See new listings 24 hours before regular users",
      gradient: "from-green-400 to-emerald-500"
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Market Analytics",
      description: "Advanced insights on pricing trends and market demand",
      gradient: "from-purple-400 to-violet-500"
    },
    {
      icon: <Sparkles className="h-6 w-6" />,
      title: "Premium Support",
      description: "Priority customer service and dedicated account manager",
      gradient: "from-pink-400 to-rose-500"
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Unlimited Listings",
      description: "Post as many livestock listings as you want without limits",
      gradient: "from-orange-400 to-red-500"
    }
  ];

  return (
    <section id="premium" className="py-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-primary/5 to-accent/10"></div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl animate-float-slow"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary/20 rounded-full filter blur-3xl animate-float-slow" style={{ animationDelay: '-3s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          {/* Premium Badge */}
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-accent to-primary rounded-full text-white font-semibold mb-6 shadow-lg animate-pulse-glow">
            <Crown className="w-5 h-5 mr-2 animate-bounce-soft" />
            <span>{t('premium.unlock')}</span>
            <Sparkles className="w-5 h-5 ml-2" />
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Upgrade to Premium</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unlock the full power of ChapaMarket with exclusive features designed for serious farmers and traders
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Features Grid with Staggered Animation */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-foreground flex items-center gap-3">
              <Star className="h-6 w-6 text-accent animate-spin-slow" />
              Premium Features
            </h3>
            <div className="grid gap-4 stagger-children">
              {premiumFeatures.map((feature, index) => (
                <div 
                  key={index} 
                  className="flex items-start space-x-4 p-5 bg-card rounded-xl border border-border hover-lift group cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className={`flex-shrink-0 p-3 rounded-xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Payment Card with Premium Styling */}
          <div className="space-y-6">
            <Card className="border-2 border-accent/50 premium-glow overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-accent/20 to-primary/20 border-b border-accent/20">
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <div className="p-2 bg-gradient-to-br from-accent to-primary rounded-lg">
                    <Crown className="h-6 w-6 text-white" />
                  </div>
                  <span className="gradient-text">Premium Upgrade</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="p-6 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl border border-accent/30">
                  <h4 className="font-bold text-lg text-foreground mb-3 flex items-center gap-2">
                    <Zap className="h-5 w-5 text-accent" />
                    Payment Instructions
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    Pay via mobile money to this Tanzania number:
                  </p>
                  <div className="flex items-center gap-3 p-4 bg-card rounded-lg border-2 border-accent/30 group hover:border-accent transition-colors">
                    <span className="font-mono font-bold text-xl text-foreground">+255 763 953 480</span>
                    <span className="text-sm text-accent font-medium">(Chapa)</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard('+255763953480')}
                      className="ml-auto hover:bg-accent/20"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <h5 className="font-semibold text-foreground flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-primary" />
                    Contact for Premium Access:
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Button 
                      onClick={openWhatsApp} 
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    >
                      <MessageCircle className="h-5 w-5 mr-2" />
                      WhatsApp
                    </Button>
                    <Button 
                      onClick={openEmail} 
                      variant="outline" 
                      className="border-2 border-accent/50 hover:bg-accent/10 hover:border-accent transition-all hover:scale-105"
                    >
                      <Mail className="h-5 w-5 mr-2" />
                      Email Support
                    </Button>
                  </div>
                </div>

                <div className="pt-6 border-t border-border">
                  <h6 className="font-semibold mb-4 text-foreground">Quick Steps to Premium:</h6>
                  <ol className="space-y-3">
                    {[
                      'Send payment to +255 763 953 480',
                      'Include your ChapaMarket username in reference',
                      'Contact us with payment confirmation',
                      'Get upgraded within 24 hours!'
                    ].map((step, i) => (
                      <li key={i} className="flex items-center gap-3 text-muted-foreground">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center text-white font-bold text-sm shadow-md">
                          {i + 1}
                        </div>
                        <span>{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </CardContent>
            </Card>

            {/* ChapaVet AI Preview Card */}
            <Card className="border-2 border-primary/30 hover:border-primary/50 transition-colors overflow-hidden group">
              <CardHeader className="bg-gradient-to-r from-primary/10 to-accent/10">
                <CardTitle className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-primary to-accent rounded-lg animate-float">
                    <Bot className="h-5 w-5 text-white" />
                  </div>
                  <span>ChapaVet AI Preview</span>
                  <Sparkles className="h-4 w-4 text-accent ml-auto animate-pulse" />
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-4">
                  Premium users get 24/7 access to our AI Vet Assistant:
                </p>
                <ul className="space-y-3">
                  {[
                    'Livestock health diagnostics',
                    'Market price predictions',
                    'Breeding advice',
                    'Feed recommendations',
                    'Disease prevention tips'
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 group-hover:translate-x-1 transition-transform" style={{ transitionDelay: `${i * 50}ms` }}>
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-accent"></div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
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
