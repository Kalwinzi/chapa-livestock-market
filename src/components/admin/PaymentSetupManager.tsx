
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Save, Phone, CreditCard } from 'lucide-react';

const PaymentSetupManager: React.FC = () => {
  const [paymentConfig, setPaymentConfig] = useState({
    mpesa_number: '+255 763 953 480',
    tigo_pesa_number: '+255 763 953 480',
    account_name: 'Chapa',
    instructions: 'Send payment to the mobile number above and contact us via WhatsApp with transaction details for confirmation.',
    whatsapp_number: '+255 763 953 480',
    email: 'support@chapamarket.com'
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchPaymentConfig();
  }, []);

  const fetchPaymentConfig = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'payment_config')
        .single();

      if (!error && data) {
        setPaymentConfig({ ...paymentConfig, ...data.setting_value });
      }
    } catch (error) {
      console.error('Error fetching payment config:', error);
    }
  };

  const handleSaveConfig = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'payment_config',
          setting_value: paymentConfig
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Payment configuration updated successfully",
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
      <div className="flex items-center gap-3">
        <CreditCard className="h-6 w-6 text-blue-500" />
        <h3 className="text-2xl font-bold">Payment Setup</h3>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Mobile Money Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">M-PESA Number</label>
              <Input
                placeholder="+255 xxx xxx xxx"
                value={paymentConfig.mpesa_number}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, mpesa_number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">TIGO-PESA Number</label>
              <Input
                placeholder="+255 xxx xxx xxx"
                value={paymentConfig.tigo_pesa_number}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, tigo_pesa_number: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Account Name</label>
            <Input
              placeholder="Account holder name"
              value={paymentConfig.account_name}
              onChange={(e) => setPaymentConfig({ ...paymentConfig, account_name: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">WhatsApp Number</label>
              <Input
                placeholder="+255 xxx xxx xxx"
                value={paymentConfig.whatsapp_number}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, whatsapp_number: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Support Email</label>
              <Input
                placeholder="support@example.com"
                value={paymentConfig.email}
                onChange={(e) => setPaymentConfig({ ...paymentConfig, email: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Payment Instructions</label>
            <Textarea
              placeholder="Instructions for users on how to make payments..."
              value={paymentConfig.instructions}
              onChange={(e) => setPaymentConfig({ ...paymentConfig, instructions: e.target.value })}
              rows={4}
            />
          </div>

          <Button onClick={handleSaveConfig} disabled={loading} className="w-full">
            <Save className="h-4 w-4 mr-2" />
            Save Payment Configuration
          </Button>
        </CardContent>
      </Card>

      {/* Preview Section */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Instructions Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-900 mb-3">Payment Information</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p><strong>M-PESA:</strong> {paymentConfig.mpesa_number}</p>
              <p><strong>TIGO-PESA:</strong> {paymentConfig.tigo_pesa_number}</p>
              <p><strong>Account Name:</strong> {paymentConfig.account_name}</p>
              <p><strong>WhatsApp:</strong> {paymentConfig.whatsapp_number}</p>
              <p><strong>Email:</strong> {paymentConfig.email}</p>
              <div className="mt-3 p-2 bg-white rounded border">
                <p className="text-xs font-medium">Instructions:</p>
                <p className="text-xs">{paymentConfig.instructions}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSetupManager;
