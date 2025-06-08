
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Globe, Lock, History, Activity, Save } from 'lucide-react';

const SettingsManagement: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">System Settings</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">General Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Name</label>
              <Input defaultValue="ChapaMarket" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Admin Email</label>
              <Input defaultValue="admin@chapamarket.com" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Language Management</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({ title: "Languages", description: "Managing supported languages" })}
              >
                <Globe className="h-4 w-4 mr-2" />
                Manage
              </Button>
            </div>
            <Button 
              className="w-full"
              onClick={() => toast({ title: "Settings Saved", description: "System settings updated successfully" })}
            >
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Security Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Two-Factor Authentication</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({ title: "2FA Setup", description: "Two-factor authentication setup coming soon" })}
              >
                <Lock className="h-4 w-4 mr-2" />
                Setup 2FA
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Login History</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({ title: "Login History", description: "Viewing admin login history" })}
              >
                <History className="h-4 w-4 mr-2" />
                View History
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Activity Logs</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => toast({ title: "Activity Logs", description: "Viewing admin activity logs" })}
              >
                <Activity className="h-4 w-4 mr-2" />
                View Logs
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SettingsManagement;
