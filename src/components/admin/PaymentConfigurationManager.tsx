
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, CreditCard, Phone } from 'lucide-react';

const PaymentConfigurationManager: React.FC = () => {
  const [paymentSettings, setPaymentSettings] = useState({
    mobile_number: '+255 763 953 480',
    method: 'Mobile Money (M-PESA/TIGO-PESA)',
    account_name: 'Chapa',
    instructions: 'Send payment to the mobile number above and contact us with transaction details.'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentSettings();
  }, []);

  const fetchPaymentSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'payment_instructions')
        .single();

      if (!error && data) {
        const settings = data.setting_value as any;
        setPaymentSettings({
          mobile_number: settings.mobile_number || '+255 763 953 480',
          method: settings.method || 'Mobile Money (M-PESA/TIGO-PESA)',
          account_name: settings.account_name || 'Chapa',
          instructions: settings.instructions || 'Send payment to the mobile number above and contact us with transaction details.'
        });
      }
    } catch (error) {
      console.error('Error fetching payment settings:', error);
    }
  };

  const handleSaveSettings = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'payment_instructions',
          setting_value: paymentSettings
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Payment settings updated successfully",
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

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Payment Configuration</h3>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Mobile Money Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mobile Number</label>
              <Input
                placeholder="e.g., +255 763 953 480"
                value={paymentSettings.mobile_number}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, mobile_number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Payment Method</label>
              <Input
                placeholder="e.g., Mobile Money (M-PESA/TIGO-PESA)"
                value={paymentSettings.method}
                onChange={(e) => setPaymentSettings({ ...paymentSettings, method: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Account Name</label>
            <Input
              placeholder="e.g., Chapa"
              value={paymentSettings.account_name}
              onChange={(e) => setPaymentSettings({ ...paymentSettings, account_name: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Instructions</label>
            <Textarea
              placeholder="Additional instructions for users..."
              value={paymentSettings.instructions}
              onChange={(e) => setPaymentSettings({ ...paymentSettings, instructions: e.target.value })}
              rows={4}
            />
          </div>

          <Button onClick={handleSaveSettings} disabled={loading}>
            <Save className="h-4 w-4 mr-2" />
            Save Payment Settings
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Instructions Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-3">
              <Phone className="h-5 w-5 text-blue-600 mr-2" />
              <h4 className="font-semibold text-blue-900">Payment Information</h4>
            </div>
            <div className="space-y-2 text-sm">
              <p><strong>Method:</strong> {paymentSettings.method}</p>
              <p><strong>Mobile Number:</strong> {paymentSettings.mobile_number}</p>
              <p><strong>Account Name:</strong> {paymentSettings.account_name}</p>
              <p><strong>Instructions:</strong> {paymentSettings.instructions}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentConfigurationManager;
