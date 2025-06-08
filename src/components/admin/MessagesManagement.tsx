
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { useAdminData } from '@/hooks/useAdminData';

const MessagesManagement: React.FC = () => {
  const { messages, fetchMessages } = useAdminData();

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Messages & Conversations</h3>
      <Card>
        <CardContent className="space-y-4 p-6">
          {messages.map((message: any) => (
            <div key={message.id} className="p-4 border border-border rounded-lg">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <p className="font-medium text-sm">
                    From: {message.sender?.first_name} {message.sender?.last_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    To: {message.receiver?.first_name} {message.receiver?.last_name}
                  </p>
                  {message.livestock && (
                    <p className="text-xs text-muted-foreground">
                      Re: {message.livestock.name}
                    </p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(message.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm">{message.content}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default MessagesManagement;
