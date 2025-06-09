
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

      // Fetch comprehensive stats with timeout protection
      const fetchWithTimeout = (promise: Promise<any>, timeout = 5000) => {
        return Promise.race([
          promise,
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Request timeout')), timeout)
          )
        ]);
      };

      const [
        { count: usersCount },
        { count: livestockCount },
        { count: ordersCount },
        { data: ordersData },
        { count: pendingCount },
        { count: messagesCount },
        { count: activeUsersCount },
        { count: completedOrdersCount }
      ] = await Promise.allSettled([
        fetchWithTimeout(supabase.from('profiles').select('*', { count: 'exact', head: true })),
        fetchWithTimeout(supabase.from('livestock').select('*', { count: 'exact', head: true })),
        fetchWithTimeout(supabase.from('orders').select('*', { count: 'exact', head: true })),
        fetchWithTimeout(supabase.from('orders').select('total_amount')),
        fetchWithTimeout(supabase.from('livestock').select('*', { count: 'exact', head: true }).eq('verified', false)),
        fetchWithTimeout(supabase.from('messages').select('*', { count: 'exact', head: true })),
        fetchWithTimeout(supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('user_type', 'seller')),
        fetchWithTimeout(supabase.from('orders').select('*', { count: 'exact', head: true }).eq('order_status', 'completed'))
      ]).then(results => results.map(result => 
        result.status === 'fulfilled' ? result.value : { count: 0, data: [] }
      )) as any[];

      const totalRevenue = ordersData?.reduce((sum: number, order: any) => sum + parseFloat(order.total_amount || '0'), 0) || 0;

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

      // Fetch detailed data in parallel but don't block main stats
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
      
      if (!error) setUsers(data || []);
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
      
      if (!error) setLivestock(data || []);
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
      
      if (!error) setOrders(data || []);
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
      
      if (!error) setMessages(data || []);
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
      
      if (!error) setStories(data || []);
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
      
      if (!error) setTransactions(data || []);
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
      
      if (!error) setAnalytics(data || []);
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
