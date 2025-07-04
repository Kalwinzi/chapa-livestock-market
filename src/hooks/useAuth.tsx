
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
  const [loading, setLoading] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    let mounted = true;

    const initializeAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          setSession(session)
          setUser(session?.user ?? null)
          setIsAdmin(session?.user?.email === 'kalwinzic@gmail.com')
        }
      } catch (error) {
        console.error('Auth initialization error:', error)
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (!mounted) return;
      
      setSession(session)
      setUser(session?.user ?? null)
      setIsAdmin(session?.user?.email === 'kalwinzic@gmail.com')
      setLoading(false)

      // Update last login for users
      if (event === 'SIGNED_IN' && session?.user) {
        await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', session.user.id)
      }

      // Clear session data on sign out
      if (event === 'SIGNED_OUT') {
        localStorage.clear()
        sessionStorage.clear()
      }
    })

    initializeAuth()

    return () => {
      mounted = false;
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    setLoading(true)
    try {
      const result = await supabase.auth.signInWithPassword({ email, password })
      return result
    } finally {
      setLoading(false)
    }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    const result = await supabase.auth.signUp({
      email,
      password,
      options: { data: userData }
    })
    return result
  }

  const signOut = async () => {
    setIsAdmin(false)
    
    // Clear all session data
    localStorage.clear()
    sessionStorage.clear()
    
    // Sign out from Supabase
    const result = await supabase.auth.signOut()
    
    // Clear state
    setUser(null)
    setSession(null)
    
    return result
  }

  const signInWithProvider = async (provider: 'google' | 'facebook') => {
    return await supabase.auth.signInWithOAuth({ 
      provider,
      options: {
        redirectTo: window.location.origin
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
