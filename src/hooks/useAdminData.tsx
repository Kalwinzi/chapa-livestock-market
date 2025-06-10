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

      // Create proper promises by executing the queries
      const results = await Promise.allSettled([
        supabase.from('profiles').select('*', { count: 'exact', head: true }),
        supabase.from('livestock').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('*', { count: 'exact', head: true }),
        supabase.from('orders').select('total_amount'),
        supabase.from('livestock').select('*', { count: 'exact', head: true }).eq('verified', false),
        supabase.from('messages').select('*', { count: 'exact', head: true }),
        supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('user_type', 'seller'),
        supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'completed')
      ]);

      // Process results safely
      const processResult = (result: any) => {
        if (result.status === 'fulfilled' && result.value && !result.value.error) {
          return result.value;
        }
        return { count: 0, data: [] };
      };

      const [
        usersResult,
        livestockResult,
        ordersResult,
        ordersDataResult,
        pendingResult,
        messagesResult,
        activeUsersResult,
        completedOrdersResult
      ] = results.map(processResult);

      const totalRevenue = ordersDataResult.data?.reduce((sum: number, order: any) => {
        return sum + parseFloat(order.total_amount || '0');
      }, 0) || 0;

      setStats({
        totalUsers: usersResult.count || 0,
        totalListings: livestockResult.count || 0,
        totalOrders: ordersResult.count || 0,
        monthlyRevenue: totalRevenue,
        pendingApprovals: pendingResult.count || 0,
        activeMessages: messagesResult.count || 0,
        activeUsers: activeUsersResult.count || 0,
        completedOrders: completedOrdersResult.count || 0
      });

      // Fetch detailed data in background
      Promise.all([
        fetchUsers(),
        fetchLivestock(),
        fetchOrders(),
        fetchMessages(),
        fetchStories(),
        fetchTransactions(),
        fetchAnalytics()
      ]).catch(error => {
        console.error('Error fetching detailed data:', error);
      });

    } catch (error: any) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: "Error",
        description: "Failed to load dashboard data. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (!error && data) setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchLivestock = async () => {
    try {
      const { data, error } = await supabase
        .from('livestock')
        .select(`
          *,
          profiles!livestock_user_id_fkey(first_name, last_name, email)
        `)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (!error && data) setLivestock(data);
    } catch (error) {
      console.error('Error fetching livestock:', error);
    }
  };

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          buyer:buyer_id(first_name, last_name, email),
          seller:seller_id(first_name, last_name, email),
          livestock:livestock_id(name, category, price)
        `)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (!error && data) setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select(`
          *,
          sender:sender_id(first_name, last_name, email),
          receiver:receiver_id(first_name, last_name, email),
          livestock:livestock_id(name)
        `)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (!error && data) setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const fetchStories = async () => {
    try {
      const { data, error } = await supabase
        .from('stories')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
      
      if (!error && data) setStories(data);
    } catch (error) {
      console.error('Error fetching stories:', error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select(`
          *,
          profiles!transactions_user_id_fkey(first_name, last_name, email),
          orders!transactions_order_id_fkey(total_amount)
        `)
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (!error && data) setTransactions(data);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const { data, error } = await supabase
        .from('analytics')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);
      
      if (!error && data) setAnalytics(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
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
