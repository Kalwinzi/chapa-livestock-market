
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
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event, session)
      setSession(session)
      setUser(session?.user ?? null)
      
      if (session?.user) {
        // Check if user is admin - direct check for the specific admin email
        if (session.user.email === 'kalwinzic@gmail.com') {
          // Verify the user exists in profiles table with admin role
          try {
            const { data: profile } = await supabase
              .from('profiles')
              .select('user_type')
              .eq('id', session.user.id)
              .single()
            
            setIsAdmin(profile?.user_type === 'admin' && session.user.email === 'kalwinzic@gmail.com')
          } catch (error) {
            console.error('Error checking admin status:', error)
            setIsAdmin(false)
          }
        } else {
          setIsAdmin(false)
        }
      } else {
        setIsAdmin(false)
      }
      
      setLoading(false)
    })

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
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
