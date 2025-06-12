
-- Create table for homepage banners
CREATE TABLE public.homepage_banners (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  image_url TEXT NOT NULL,
  title TEXT,
  description TEXT,
  is_active BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for homepage banners
ALTER TABLE public.homepage_banners ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage banners
CREATE POLICY "Admins can manage homepage banners" 
  ON public.homepage_banners 
  FOR ALL 
  USING (public.is_admin());

-- Create policy for public to view active banners
CREATE POLICY "Public can view active banners" 
  ON public.homepage_banners 
  FOR SELECT 
  USING (is_active = true);

-- Create table for admin settings
CREATE TABLE public.admin_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  setting_key TEXT UNIQUE NOT NULL,
  setting_value JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for admin settings
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Create policy for admins to manage settings
CREATE POLICY "Admins can manage settings" 
  ON public.admin_settings 
  FOR ALL 
  USING (public.is_admin());

-- Add premium status to profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS premium_status BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS premium_expires_at TIMESTAMP WITH TIME ZONE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS last_login TIMESTAMP WITH TIME ZONE;

-- Insert default admin settings
INSERT INTO public.admin_settings (setting_key, setting_value) VALUES
('payment_instructions', '{"mobile_number": "+255 763 953 480", "method": "Mobile Money (M-PESA/TIGO-PESA)", "account_name": "Chapa"}'),
('premium_config', '{"monthly_price": 50000, "features": ["AI Assistant", "Early Access", "Premium Support", "Advanced Analytics"]}'),
('social_login', '{"google_enabled": true, "facebook_enabled": true}'),
('session_timeout', '{"hours": 24}')
ON CONFLICT (setting_key) DO NOTHING;

-- Create a default admin user if not exists
INSERT INTO public.profiles (id, first_name, last_name, email, user_type)
SELECT 
  gen_random_uuid(),
  'Admin',
  'User',
  'kalwinzic@gmail.com',
  'admin'
WHERE NOT EXISTS (
  SELECT 1 FROM public.profiles WHERE email = 'kalwinzic@gmail.com'
);

-- Add image upload functionality to stories
ALTER TABLE public.stories ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE public.stories ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'general';

-- Add session tracking
CREATE TABLE IF NOT EXISTS public.user_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  session_token TEXT UNIQUE NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS for sessions
ALTER TABLE public.user_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy for users to manage their own sessions
CREATE POLICY "Users can manage their own sessions" 
  ON public.user_sessions 
  FOR ALL 
  USING (auth.uid() = user_id);
