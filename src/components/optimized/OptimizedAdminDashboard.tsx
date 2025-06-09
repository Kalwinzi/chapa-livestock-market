
import React, { useEffect, useMemo } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Users, ShoppingCart, DollarSign, AlertCircle, CheckCircle, 
  Download, Loader2, TrendingUp, Activity 
} from 'lucide-react';
import { useOptimizedQuery } from '@/hooks/useOptimizedQuery';
import { usePerformanceMonitor } from '@/hooks/usePerformanceMonitor';
import { supabase } from '@/integrations/supabase/client';
import PageLoader from './PageLoader';

const OptimizedAdminDashboard: React.FC = () => {
  usePerformanceMonitor('AdminDashboard');

  const { data: stats, isLoading: statsLoading } = useOptimizedQuery({
    queryKey: ['admin-stats'],
    queryFn: async () => {
      const [
        { count: usersCount },
        { count: livestockCount },
        { count: ordersCount },
        { data: ordersData },
        { count: pendingCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('livestock').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total_amount'),
        supabase.from('livestock').select('*', { count: 'exact', head: true }).eq('verified', false)
      ]);

      const totalRevenue = ordersData?.reduce((sum, order) => sum + parseFloat(order.total_amount || '0'), 0) || 0;

      return {
        totalUsers: usersCount || 0,
        totalListings: livestockCount || 0,
        totalOrders: ordersCount || 0,
        monthlyRevenue: totalRevenue,
        pendingApprovals: pendingCount || 0
      };
    },
    staleTime: 2 * 60 * 1000 // 2 minutes
  });

  const { data: recentOrders, isLoading: ordersLoading } = useOptimizedQuery({
    queryKey: ['recent-orders'],
    queryFn: async () => {
      const { data } = await supabase
        .from('orders')
        .select(`
          *,
          buyer:buyer_id(first_name, last_name),
          livestock:livestock_id(name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);
      return data || [];
    },
    staleTime: 1 * 60 * 1000 // 1 minute
  });

  const statsCards = useMemo(() => [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'blue',
      trend: '+12%'
    },
    {
      title: 'Livestock',
      value: stats?.totalListings || 0,
      icon: ShoppingCart,
      color: 'green',
      trend: '+8%'
    },
    {
      title: 'Revenue',
      value: `$${(stats?.monthlyRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: 'purple',
      trend: '+15%'
    },
    {
      title: 'Pending',
      value: stats?.pendingApprovals || 0,
      icon: AlertCircle,
      color: 'orange',
      trend: '-5%'
    }
  ], [stats]);

  const exportData = async (type: string) => {
    console.log(`Exporting ${type} data...`);
  };

  if (statsLoading) {
    return <PageLoader isLoading={true} loadingText="Loading dashboard..." />;
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 text-${stat.color}-600`} />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                  </div>
                  <div className="flex items-center text-green-600 text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {stat.trend}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Activity className="h-5 w-5 mr-2" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" className="hover:scale-105 transition-transform">
              <Users className="h-4 w-4 mr-2" />
              Manage Users
            </Button>
            <Button variant="outline" className="hover:scale-105 transition-transform">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Review Listings
            </Button>
            <Button variant="outline" className="hover:scale-105 transition-transform">
              <DollarSign className="h-4 w-4 mr-2" />
              View Orders
            </Button>
            <Button 
              onClick={() => exportData('users')} 
              variant="outline"
              className="hover:scale-105 transition-transform"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <PageLoader isLoading={ordersLoading} loadingText="Loading recent orders...">
            <div className="space-y-4">
              {recentOrders?.map((order: any) => (
                <div key={order.id} className="flex items-center space-x-3 p-3 bg-accent/50 rounded-lg hover:bg-accent/70 transition-colors">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">New order placed</p>
                    <p className="text-xs text-muted-foreground">
                      {order.livestock?.name} - ${order.total_amount}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </span>
                </div>
              ))}
            </div>
          </PageLoader>
        </CardContent>
      </Card>
    </div>
  );
};

export default OptimizedAdminDashboard;
