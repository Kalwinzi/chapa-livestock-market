
import React, { useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BarChart3, Users } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';

const AnalyticsManagement: React.FC = () => {
  const { stats, analytics, fetchAnalytics } = useAdminData();

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold">Analytics & Reports</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Revenue Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-accent/50 rounded-lg flex flex-col items-center justify-center">
              <BarChart3 className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">Revenue chart visualization</p>
              <p className="text-sm text-muted-foreground">Total: ${stats.monthlyRevenue}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-48 bg-accent/50 rounded-lg flex flex-col items-center justify-center">
              <Users className="h-12 w-12 text-muted-foreground mb-2" />
              <p className="text-muted-foreground">User growth analytics</p>
              <p className="text-sm text-muted-foreground">Total: {stats.totalUsers} users</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Data Table */}
      <Card>
        <CardHeader>
          <CardTitle>Analytics Events</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Event Type</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Livestock</TableHead>
                <TableHead>Session</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {analytics.map((event: any) => (
                <TableRow key={event.id}>
                  <TableCell className="text-sm">{event.event_type}</TableCell>
                  <TableCell className="text-sm">{event.user_id?.slice(0, 8) || 'Anonymous'}</TableCell>
                  <TableCell className="text-sm">{event.livestock_id?.slice(0, 8) || 'N/A'}</TableCell>
                  <TableCell className="text-sm">{event.session_id?.slice(0, 8) || 'N/A'}</TableCell>
                  <TableCell className="text-sm">
                    {new Date(event.created_at).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsManagement;
