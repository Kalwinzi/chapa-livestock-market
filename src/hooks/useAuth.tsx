
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

    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      console.log('Auth state changed:', event, session?.user?.email)
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Check if user is admin - specifically for kalwinzic@gmail.com
        const isAdminUser = session.user.email === 'kalwinzic@gmail.com';
        setIsAdmin(isAdminUser);
        
        if (isAdminUser) {
          // Ensure admin profile exists in database
          try {
            const { error } = await supabase
              .from('profiles')
              .upsert({
                id: session.user.id,
                email: session.user.email,
                user_type: 'admin',
                first_name: 'Admin',
                last_name: 'User'
              }, {
                onConflict: 'id'
              })
            
            if (error) {
              console.error('Error updating admin profile:', error)
            }
          } catch (error) {
            console.error('Error ensuring admin profile:', error)
          }
        }
      } else {
        setIsAdmin(false)
      }
      
      // Quick loading resolution - max 500ms
      if (mounted) {
        setTimeout(() => {
          if (mounted) setLoading(false)
        }, Math.min(500, 200))
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
        
        // Quick admin check
        if (session?.user?.email === 'kalwinzic@gmail.com') {
          setIsAdmin(true)
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        if (mounted) {
          // Ensure loading stops quickly - max 500ms
          setTimeout(() => {
            if (mounted) setLoading(false)
          }, 500)
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
    setLoading(true)
    
    const result = await supabase.auth.signInWithPassword({ email, password })
    
    // If this is the admin email, ensure they're marked as admin in the database
    if (!result.error && email === 'kalwinzic@gmail.com') {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: result.data.user?.id,
            email: email,
            user_type: 'admin',
            first_name: 'Admin',
            last_name: 'User'
          }, {
            onConflict: 'id'
          })
        setIsAdmin(true)
      } catch (error) {
        console.error('Error updating admin profile:', error)
      }
    }
    
    setLoading(false)
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
