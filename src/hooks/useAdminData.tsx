
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useAdminData = () => {
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalOrders: 0,
    monthlyRevenue: 0,
    pendingApprovals: 0,
    activeMessages: 0,
    activeUsers: 0,
    completedOrders: 0
  });

  const [users, setUsers] = useState([]);
  const [livestock, setLivestock] = useState([]);
  const [orders, setOrders] = useState([]);
  const [messages, setMessages] = useState([]);
  const [stories, setStories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch comprehensive stats
      const [
        { count: usersCount },
        { count: livestockCount },
        { count: ordersCount },
        { data: ordersData },
        { count: pendingCount },
        { count: messagesCount },
        { count: activeUsersCount },
        { count: completedOrdersCount }
      ] = await Promise.all([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('livestock').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total_amount'),
        supabase.from('livestock').select('*', { count: 'exact', head: true }).eq('verified', false),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('user_type', 'seller'),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'completed')
      ]);

      const totalRevenue = ordersData?.reduce((sum, order) => sum + parseFloat(order.total_amount || '0'), 0) || 0;

      setStats({
        totalUsers: usersCount || 0,
        totalListings: livestockCount || 0,
        totalOrders: ordersCount || 0,
        monthlyRevenue: totalRevenue,
        pendingApprovals: pendingCount || 0,
        activeMessages: messagesCount || 0,
        activeUsers: activeUsersCount || 0,
        completedOrders: completedOrdersCount || 0
      });

      // Fetch detailed data
      await Promise.all([
        fetchUsers(),
        fetchLivestock(),
        fetchOrders(),
        fetchMessages(),
        fetchStories(),
        fetchTransactions(),
        fetchAnalytics()
      ]);

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setUsers(data || []);
  };

  const fetchLivestock = async () => {
    const { data, error } = await supabase
      .from('livestock')
      .select(`
        *,
        profiles!livestock_user_id_fkey(first_name, last_name, email)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setLivestock(data || []);
  };

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from('orders')
      .select(`
        *,
        buyer:buyer_id(first_name, last_name, email),
        seller:seller_id(first_name, last_name, email),
        livestock:livestock_id(name, category, price)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setOrders(data || []);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select(`
        *,
        sender:sender_id(first_name, last_name, email),
        receiver:receiver_id(first_name, last_name, email),
        livestock:livestock_id(name)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setMessages(data || []);
  };

  const fetchStories = async () => {
    const { data, error } = await supabase
      .from('stories')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (!error) setStories(data || []);
  };

  const fetchTransactions = async () => {
    const { data, error } = await supabase
      .from('transactions')
      .select(`
        *,
        profiles!transactions_user_id_fkey(first_name, last_name, email),
        orders!transactions_order_id_fkey(total_amount)
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setTransactions(data || []);
  };

  const fetchAnalytics = async () => {
    const { data, error } = await supabase
      .from('analytics')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);
    
    if (!error) setAnalytics(data || []);
  };

  return {
    loading,
    setLoading,
    stats,
    users,
    livestock,
    orders,
    messages,
    stories,
    transactions,
    analytics,
    fetchDashboardData,
    fetchUsers,
    fetchLivestock,
    fetchOrders,
    fetchMessages,
    fetchStories,
    fetchTransactions,
    fetchAnalytics
  };
};
