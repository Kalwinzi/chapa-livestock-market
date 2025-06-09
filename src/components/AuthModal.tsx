
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/hooks/use-toast'
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin } from 'lucide-react'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [socialLoading, setSocialLoading] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
    location: ''
  })
  
  const { signIn, signUp, signInWithProvider } = useAuth()
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password)
        if (error) throw error
        
        // Check if this is the admin user
        if (formData.email === 'kalwinzic@gmail.com') {
          toast({ 
            title: "Admin Access Granted!", 
            description: "Welcome back, Administrator. Redirecting to admin dashboard..." 
          })
          // Close modal and let the Header component handle admin panel opening
          onClose()
        } else {
          toast({ 
            title: "Welcome back!", 
            description: "You have successfully signed in." 
          })
          onClose()
        }
      } else {
        const { error } = await signUp(formData.email, formData.password, {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          location: formData.location
        })
        if (error) throw error
        toast({ 
          title: "Account created!", 
          description: "Please check your email to verify your account before accessing the full site." 
        })
        setIsLogin(true) // Switch to login mode
      }
    } catch (error: any) {
      console.error('Auth error:', error)
      
      // Provide user-friendly error messages
      let errorMessage = error.message
      if (error.message.includes('Invalid login credentials')) {
        errorMessage = 'Invalid email or password. Please check your credentials and try again.'
      } else if (error.message.includes('User already registered')) {
        errorMessage = 'This email is already registered. Please try logging in instead.'
      } else if (error.message.includes('Password should be at least')) {
        errorMessage = 'Password must be at least 6 characters long.'
      } else if (error.message.includes('Invalid email')) {
        errorMessage = 'Please enter a valid email address.'
      }
      
      toast({
        title: "Authentication Error",
        description: errorMessage,
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSocialLogin = async (provider: 'google' | 'facebook') => {
    try {
      setSocialLoading(provider)
      const { error } = await signInWithProvider(provider)
      if (error) throw error
      
      toast({
        title: "Success!",
        description: `Signing in with ${provider}...`
      })
    } catch (error: any) {
      console.error(`${provider} login error:`, error)
      toast({
        title: "Social Login Error",
        description: `Failed to sign in with ${provider}. Please try again or use email/password.`,
        variant: "destructive"
      })
    } finally {
      setSocialLoading(null)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            {isLogin ? 'Welcome to ChapaMarket' : 'Join ChapaMarket'}
          </CardTitle>
          <p className="text-center text-sm text-muted-foreground">
            {isLogin 
              ? 'Sign in to access your account and start trading livestock' 
              : 'Create your account to join Tanzania\'s premier livestock marketplace'
            }
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="First name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                      className="pl-10"
                      required
                    />
                  </div>
                </div>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Phone number"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="pl-10"
                  />
                </div>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Location (City, Region)"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="pl-10"
                  />
                </div>
              </>
            )}
            
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="pl-10"
                required
              />
            </div>
            
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="pl-10 pr-10"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>

          <div className="space-y-3">
            <div className="text-center text-sm text-muted-foreground">Or continue with</div>
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('google')}
                disabled={socialLoading !== null}
                className="w-full"
              >
                {socialLoading === 'google' ? 'Connecting...' : (
                  <>
                    <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Google
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => handleSocialLogin('facebook')}
                disabled={socialLoading !== null}
                className="w-full"
              >
                {socialLoading === 'facebook' ? 'Connecting...' : (
                  <>
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Facebook
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
          
          {!isLogin && (
            <p className="text-xs text-muted-foreground text-center">
              By creating an account, you agree to our Terms of Service and Privacy Policy. 
              Email verification is required to access all features.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export default AuthModal
