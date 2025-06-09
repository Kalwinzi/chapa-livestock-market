
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can send messages" ON public.messages;
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can view their own orders" ON public.orders;
DROP POLICY IF EXISTS "Users can view their own messages" ON public.messages;
DROP POLICY IF EXISTS "Anyone can view published stories" ON public.stories;
DROP POLICY IF EXISTS "Users can view their own transactions" ON public.transactions;
DROP POLICY IF EXISTS "Users can view their own notifications" ON public.notifications;
DROP POLICY IF EXISTS "Users can manage their own favorites" ON public.favorites;

-- Create admin role and security functions
CREATE OR REPLACE FUNCTION public.is_admin(user_id uuid DEFAULT auth.uid())
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = user_id AND user_type = 'admin'
  );
$$;

-- Update the specific user to be admin
UPDATE public.profiles 
SET user_type = 'admin' 
WHERE email = 'kalwinzic@gmail.com';

-- Admin policies for profiles table
CREATE POLICY "Admins can view all profiles" 
  ON public.profiles FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Admins can update all profiles" 
  ON public.profiles FOR UPDATE 
  USING (public.is_admin());

CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Admin policies for livestock table
CREATE POLICY "Admins can manage all livestock" 
  ON public.livestock FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Sellers can manage their own livestock" 
  ON public.livestock FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Anyone can view verified livestock" 
  ON public.livestock FOR SELECT 
  USING (verified = true OR public.is_admin() OR auth.uid() = user_id);

-- Admin policies for orders table
CREATE POLICY "Admins can view all orders" 
  ON public.orders FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Users can view their own orders" 
  ON public.orders FOR SELECT 
  USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Admin policies for messages table
CREATE POLICY "Admins can view all messages" 
  ON public.messages FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Users can view their own messages" 
  ON public.messages FOR SELECT 
  USING (auth.uid() = sender_id OR auth.uid() = receiver_id);

CREATE POLICY "Users can send messages" 
  ON public.messages FOR INSERT 
  WITH CHECK (auth.uid() = sender_id);

-- Admin policies for stories table
CREATE POLICY "Admins can manage all stories" 
  ON public.stories FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Anyone can view published stories" 
  ON public.stories FOR SELECT 
  USING (status = 'published' OR public.is_admin() OR auth.uid() = author_id);

-- Admin policies for transactions table
CREATE POLICY "Admins can view all transactions" 
  ON public.transactions FOR SELECT 
  USING (public.is_admin());

CREATE POLICY "Users can view their own transactions" 
  ON public.transactions FOR SELECT 
  USING (auth.uid() = user_id);

-- Admin policies for analytics table
CREATE POLICY "Admins can view all analytics" 
  ON public.analytics FOR SELECT 
  USING (public.is_admin());

-- Admin policies for notifications table
CREATE POLICY "Admins can manage all notifications" 
  ON public.notifications FOR ALL 
  USING (public.is_admin());

CREATE POLICY "Users can view their own notifications" 
  ON public.notifications FOR SELECT 
  USING (auth.uid() = user_id);

-- Admin policies for favorites table
CREATE POLICY "Users can manage their own favorites" 
  ON public.favorites FOR ALL 
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all favorites" 
  ON public.favorites FOR SELECT 
  USING (public.is_admin());
