
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AlertTriangle, CheckCircle, X, Eye } from 'lucide-react';

const AdminReportsManagement: React.FC = () => {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      // Since we don't have a reports table, we'll simulate with sample data
      // In a real app, you'd create a reports table
      const sampleReports = [
        {
          id: '1',
          type: 'inappropriate_content',
          status: 'pending',
          reported_by: { first_name: 'John', last_name: 'Doe', email: 'john@example.com' },
          reported_item: { name: 'Holstein Cow', type: 'livestock' },
          reason: 'Inappropriate images uploaded',
          created_at: new Date().toISOString(),
          description: 'This listing contains inappropriate content that violates our community guidelines.'
        },
        {
          id: '2',
          type: 'fake_listing',
          status: 'pending',
          reported_by: { first_name: 'Jane', last_name: 'Smith', email: 'jane@example.com' },
          reported_item: { name: 'Angus Bull', type: 'livestock' },
          reason: 'Suspected fake listing',
          created_at: new Date(Date.now() - 86400000).toISOString(),
          description: 'This listing appears to be fake with stolen images from another source.'
        }
      ];
      
      setReports(sampleReports);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch reports",
        variant: "destructive"
      });
    }
  };

  const handleReportAction = async (reportId: string, action: 'approve' | 'reject' | 'investigate') => {
    try {
      setLoading(true);
      
      // In a real app, you'd update the report status in the database
      setReports(prev => prev.map(report => 
        report.id === reportId 
          ? { ...report, status: action === 'approve' ? 'resolved' : action === 'reject' ? 'dismissed' : 'investigating' }
          : report
      ));
      
      toast({
        title: "Report Updated",
        description: `Report has been ${action}d successfully`,
      });
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

  const getStatusBadge = (status: string) => {
    const variants = {
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
      investigating: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      resolved: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      dismissed: 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[status as keyof typeof variants]}`}>
        {status}
      </span>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold">Reports Management</h3>
        <div className="flex gap-2">
          <Button onClick={fetchReports} variant="outline" size="sm">
            Refresh
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              <div>
                <p className="text-sm font-medium">Pending</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'pending').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <Eye className="h-5 w-5 text-blue-500" />
              <div>
                <p className="text-sm font-medium">Investigating</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'investigating').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <div>
                <p className="text-sm font-medium">Resolved</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'resolved').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <X className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium">Dismissed</p>
                <p className="text-2xl font-bold">{reports.filter(r => r.status === 'dismissed').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reports Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Reports</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Report Type</TableHead>
                <TableHead className="hidden sm:table-cell">Reported By</TableHead>
                <TableHead className="hidden md:table-cell">Item</TableHead>
                <TableHead className="hidden lg:table-cell">Reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reports.map((report) => (
                <TableRow key={report.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium text-sm">{report.type.replace('_', ' ')}</span>
                    </div>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell">
                    <div>
                      <p className="font-medium text-sm">
                        {report.reported_by.first_name} {report.reported_by.last_name}
                      </p>
                      <p className="text-xs text-muted-foreground">{report.reported_by.email}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>
                      <p className="font-medium text-sm">{report.reported_item.name}</p>
                      <p className="text-xs text-muted-foreground">{report.reported_item.type}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <p className="text-sm">{report.reason}</p>
                    <p className="text-xs text-muted-foreground truncate max-w-[200px]">
                      {report.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(report.status)}
                  </TableCell>
                  <TableCell>
                    {report.status === 'pending' && (
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'investigate')}
                          disabled={loading}
                          title="Investigate"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'approve')}
                          disabled={loading}
                          title="Resolve"
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReportAction(report.id, 'reject')}
                          disabled={loading}
                          title="Dismiss"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
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

export default AdminReportsManagement;
