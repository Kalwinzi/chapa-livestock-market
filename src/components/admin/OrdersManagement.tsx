
import React, { useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { Download } from 'lucide-react';
import { useAdminData } from '@/hooks/useAdminData';

const OrdersManagement: React.FC = () => {
  const { toast } = useToast();
  const { orders, fetchOrders } = useAdminData();

  useEffect(() => {
    fetchOrders();
  }, []);

  const exportData = async () => {
    try {
      if (orders.length === 0) {
        toast({
          title: "No Data",
          description: "No orders available to export",
          variant: "destructive"
        });
        return;
      }
      
      const headers = Object.keys(orders[0]).join(',');
      const rows = orders.map(item => Object.values(item).join(',')).join('\n');
      const csv = `${headers}\n${rows}`;
      
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'orders_export.csv';
      a.click();
      window.URL.revokeObjectURL(url);
      
      toast({
        title: "Export Successful",
        description: "Orders data exported successfully",
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
        <h3 className="text-lg font-semibold">Orders Management</h3>
        <Button onClick={exportData} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export Orders
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Buyer</TableHead>
                <TableHead>Livestock</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order: any) => (
                <TableRow key={order.id}>
                  <TableCell className="text-sm font-mono">
                    {order.id.slice(0, 8)}...
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.buyer?.first_name} {order.buyer?.last_name}
                  </TableCell>
                  <TableCell className="text-sm">
                    {order.livestock?.name}
                  </TableCell>
                  <TableCell className="text-sm font-medium">
                    ${order.total_amount}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      order.order_status === 'completed' ? 'bg-green-100 text-green-800' :
                      order.order_status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {order.order_status}
                    </span>
                  </TableCell>
                  <TableCell className="text-sm">
                    {new Date(order.created_at).toLocaleDateString()}
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

export default OrdersManagement;
