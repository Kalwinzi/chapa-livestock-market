
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Star, Edit, Trash2, Download } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';

const LivestockManagement: React.FC = () => {
  const { toast } = useToast();
  const { loading, setLoading, livestock, fetchLivestock } = useAdminData();

  useEffect(() => {
    fetchLivestock();
  }, []);

  const handleLivestockAction = async (action: string, livestockId: string) => {
    try {
      setLoading(true);
      
      switch (action) {
        case 'approve':
          await supabase
            .from('livestock')
            .update({ verified: true })
            .eq('id', livestockId);
          break;
        case 'reject':
          await supabase
            .from('livestock')
            .update({ verified: false })
            .eq('id', livestockId);
          break;
        case 'feature':
          await supabase
            .from('livestock')
            .update({ featured: true })
            .eq('id', livestockId);
          break;
        case 'unfeature':
          await supabase
            .from('livestock')
            .update({ featured: false })
            .eq('id', livestockId);
          break;
        case 'delete':
          await supabase
            .from('livestock')
            .delete()
            .eq('id', livestockId);
          break;
      }
      
      toast({
        title: "Livestock Updated",
        description: `Livestock ${action} successful`,
      });
      
      await fetchLivestock();
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

  const exportData = async () => {
    try {
      if (livestock.length === 0) {
        toast({
          title: "No Data",
          description: "No livestock available to export",
          variant: "destructive"
        });
        return;
      }
      
      const headers = Object.keys(livestock[0]).join(',');
      const rows = livestock.map(item => Object.values(item).join(',')).join('\n');
      const csv = `${headers}\n${rows}`;
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'livestock_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Livestock data exported successfully",
      });
    } catch (error: any) {
      toast({
        title: "Export Failed",
        description: error.message,
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold">Livestock Management</h3>
        <div className="flex gap-2">
          <Button onClick={exportData} variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Animal</TableHead>
                <TableHead className="hidden sm:table-cell">Seller</TableHead>
                <TableHead className="hidden md:table-cell">Price</TableHead>
                <TableHead className="hidden lg:table-cell">Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {livestock.map((animal: any) => (
                <TableRow key={animal.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      {animal.image_url && (
                        <img 
                          src={animal.image_url} 
                          alt={animal.name}
                          className="w-10 h-10 rounded-lg object-cover"
                        />
                      )}
                      <div>
                        <p className="font-medium text-sm">{animal.name}</p>
                        <p className="text-xs text-muted-foreground">{animal.breed}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-sm hidden sm:table-cell">
                    {animal.profiles?.first_name} {animal.profiles?.last_name}
                  </TableCell>
                  <TableCell className="text-sm font-medium hidden md:table-cell">
                    ${animal.price}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      animal.verified ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                    }`}>
                      {animal.verified ? 'Approved' : 'Pending'}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      {!animal.verified && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleLivestockAction('approve', animal.id)}
                          title="Approve livestock"
                          disabled={loading}
                        >
                          <CheckCircle className="h-3 w-3" />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLivestockAction(animal.featured ? 'unfeature' : 'feature', animal.id)}
                        title={animal.featured ? 'Remove from featured' : 'Add to featured'}
                        disabled={loading}
                      >
                        <Star className={`h-3 w-3 ${animal.featured ? 'fill-current' : ''}`} />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        title="Edit livestock"
                      >
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleLivestockAction('delete', animal.id)}
                        title="Delete livestock"
                        disabled={loading}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
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

export default LivestockManagement;
