
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Megaphone } from 'lucide-react';

const NotificationsManagement: React.FC = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Push Notifications Manager</h3>
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex gap-4">
              <Input placeholder="Notification title" className="flex-1" />
              <Button 
                onClick={() => toast({ title: "Notification Sent", description: "Push notification sent successfully" })}
              >
                <Megaphone className="h-4 w-4 mr-2" />
                Send
              </Button>
            </div>
            <Textarea placeholder="Notification message..." rows={3} />
            <div className="flex gap-2">
              <Button variant="outline">Schedule</Button>
              <Button variant="outline">Send to All</Button>
              <Button variant="outline">Send to Sellers</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationsManagement;
