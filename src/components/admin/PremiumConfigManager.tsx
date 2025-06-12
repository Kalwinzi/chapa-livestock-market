
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Crown, Save, Settings } from 'lucide-react';

const PremiumConfigManager: React.FC = () => {
  const [premiumSettings, setPremiumSettings] = useState({
    livestock_education_enabled: true,
    ai_assistant_enabled: true,
    premium_search_enabled: true,
    featured_listings_enabled: true,
    priority_support_enabled: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPremiumSettings();
  }, []);

  const fetchPremiumSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'premium_features')
        .single();

      if (!error && data) {
        setPremiumSettings({ ...premiumSettings, ...data.setting_value });
      }
    } catch (error) {
      console.error('Error fetching premium settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'premium_features',
          setting_value: premiumSettings
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Premium settings updated successfully",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const premiumFeatures = [
    {
      key: 'livestock_education_enabled',
      title: 'Livestock Education',
      description: 'Access to educational content and guides'
    },
    {
      key: 'ai_assistant_enabled',
      title: 'AI Assistant',
      description: 'AI-powered livestock advice and recommendations'
    },
    {
      key: 'premium_search_enabled',
      title: 'Advanced Search',
      description: 'Enhanced search filters and options'
    },
    {
      key: 'featured_listings_enabled',
      title: 'Featured Listings',
      description: 'Premium users can feature their livestock'
    },
    {
      key: 'priority_support_enabled',
      title: 'Priority Support',
      description: 'Faster customer support response'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Crown className="h-6 w-6 text-yellow-500" />
        <h3 className="text-2xl font-bold">Premium Zone Configuration</h3>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Premium Features Control
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {premiumFeatures.map((feature) => (
            <div key={feature.key} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-1">
                <h4 className="font-medium">{feature.title}</h4>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
              <Switch
                checked={premiumSettings[feature.key as keyof typeof premiumSettings]}
                onCheckedChange={(checked) => 
                  setPremiumSettings({ ...premiumSettings, [feature.key]: checked })
                }
              />
            </div>
          ))}

          <Button onClick={handleSaveSettings} disabled={loading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Premium Settings
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Premium Payment Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
            <h4 className="font-semibold text-yellow-800 mb-2">Payment Process</h4>
            <div className="text-sm text-yellow-700 space-y-2">
              <p><strong>Step 1:</strong> Users send payment via M-PESA/TIGO-PESA</p>
              <p><strong>Step 2:</strong> Users contact admin with payment confirmation</p>
              <p><strong>Step 3:</strong> Admin manually activates premium status</p>
              <p><strong>Step 4:</strong> Premium features become available instantly</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PremiumConfigManager;
