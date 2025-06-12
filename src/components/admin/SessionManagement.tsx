
import React, { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { LogOut, Clock, Users, Settings } from 'lucide-react';

const SessionManagement: React.FC = () => {
  const [sessionTimeout, setSessionTimeout] = useState(24);
  const [activeSessions, setActiveSessions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { signOut } = useAuth();

  useEffect(() => {
    fetchSessionSettings();
    fetchActiveSessions();
  }, []);

  const fetchSessionSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_settings')
        .select('setting_value')
        .eq('setting_key', 'session_timeout')
        .single();

      if (!error && data) {
        const settings = data.setting_value as any;
        setSessionTimeout(settings.hours || 24);
      }
    } catch (error) {
      console.error('Error fetching session settings:', error);
    }
  };

  const fetchActiveSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('user_sessions')
        .select(`
          *,
          profiles!user_sessions_user_id_fkey(first_name, last_name, email)
        `)
        .gt('expires_at', new Date().toISOString())
        .order('created_at', { ascending: false });

      if (!error && data) {
        setActiveSessions(data);
      }
    } catch (error) {
      console.error('Error fetching sessions:', error);
    }
  };

  const updateSessionTimeout = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase
        .from('admin_settings')
        .upsert({
          setting_key: 'session_timeout',
          setting_value: { hours: sessionTimeout }
        });

      if (!error) {
        toast({
          title: "Success",
          description: "Session timeout updated successfully",
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

  const terminateSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('user_sessions')
        .delete()
        .eq('id', sessionId);

      if (!error) {
        toast({
          title: "Success",
          description: "Session terminated successfully",
        });
        await fetchActiveSessions();
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  const handleSecureLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Logged Out",
        description: "You have been securely logged out",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Session Management</h3>

      {/* Session Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="h-5 w-5 mr-2" />
            Session Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <label className="text-sm font-medium">Session Timeout (hours)</label>
              <Input
                type="number"
                min="1"
                max="168"
                value={sessionTimeout}
                onChange={(e) => setSessionTimeout(parseInt(e.target.value) || 24)}
                className="mt-1"
              />
            </div>
            <Button onClick={updateSessionTimeout} disabled={loading}>
              <Clock className="h-4 w-4 mr-2" />
              Update Timeout
            </Button>
          </div>

          <div className="flex items-center space-x-4">
            <Button onClick={handleSecureLogout} variant="outline">
              <LogOut className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
            <span className="text-sm text-muted-foreground">
              Clear all tokens and session data
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Active Sessions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Active Sessions ({activeSessions.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">
                    {session.profiles?.first_name} {session.profiles?.last_name}
                  </p>
                  <p className="text-sm text-muted-foreground">{session.profiles?.email}</p>
                  <p className="text-xs text-muted-foreground">
                    Created: {new Date(session.created_at).toLocaleString()}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Expires: {new Date(session.expires_at).toLocaleString()}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => terminateSession(session.id)}
                >
                  Terminate
                </Button>
              </div>
            ))}

            {activeSessions.length === 0 && (
              <p className="text-center text-muted-foreground py-4">
                No active sessions found
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionManagement;
