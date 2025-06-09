
import { useState, useEffect, createContext, useContext } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<any>
  signUp: (email: string, password: string, userData: any) => Promise<any>
  signOut: () => Promise<any>
  signInWithProvider: (provider: 'google' | 'facebook') => Promise<any>
  isAdmin: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let mounted = true;

    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('Auth state changed:', event, session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Check if user is admin - optimized check
        const isAdminUser = session.user.email === 'kalwinzic@gmail.com';
        if (isAdminUser) {
          // Quick admin verification without blocking
          setTimeout(async () => {
            try {
              const { data: profile } = await supabase
                .from('profiles')
                .select('user_type')
                .eq('id', session.user.id)
                .single()
              
              if (mounted) {
                setIsAdmin(profile?.user_type === 'admin' && session.user.email === 'kalwinzic@gmail.com')
              }
            } catch (error) {
              console.error('Error checking admin status:', error)
              if (mounted) setIsAdmin(false)
            }
          }, 100)
        } else {
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
      
      // Quick loading resolution
      if (mounted) {
        setLoading(false)
      }
    })

    // Check for existing session immediately
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        if (!mounted) return;
        
        if (error) {
          console.error('Session error:', error)
        }
        
        setSession(session)
        setUser(session?.user ?? null)
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        if (mounted) {
          // Ensure loading stops quickly
          setTimeout(() => {
            if (mounted) setLoading(false)
          }, 500) // Maximum 500ms loading
        }
      }
    }

    initializeAuth()

    return () => {
      mounted = false;
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    const result = await supabase.auth.signInWithPassword({ email, password })
    
    // If this is the admin email, ensure they're marked as admin in the database
    if (!result.error && email === 'kalwinzic@gmail.com') {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: result.data.user?.id,
            email: email,
            user_type: 'admin'
          }, {
            onConflict: 'id'
          })
      } catch (error) {
        console.error('Error updating admin profile:', error)
      }
    }
    
    return result
  }

  const signUp = async (email: string, password: string, userData: any) => {
    const redirectUrl = `${window.location.origin}/`
    
    return await supabase.auth.signUp({
      email,
      password,
      options: {
        data: userData,
        emailRedirectTo: redirectUrl
      }
    })
  }

  const signOut = async () => {
    setIsAdmin(false) // Clear admin status immediately
    return await supabase.auth.signOut()
  }

  const signInWithProvider = async (provider: 'google' | 'facebook') => {
    const redirectUrl = `${window.location.origin}/`
    
    return await supabase.auth.signInWithOAuth({ 
      provider,
      options: {
        redirectTo: redirectUrl
      }
    })
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      session, 
      loading, 
      signIn, 
      signUp, 
      signOut, 
      signInWithProvider,
      isAdmin 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
