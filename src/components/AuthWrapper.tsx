
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { Skeleton } from '@/components/ui/skeleton'
import AuthModal from './AuthModal'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 max-w-md mx-auto p-6">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <h3 className="text-lg font-semibold">Loading ChapaMarket...</h3>
          <p className="text-muted-foreground">Please wait while we prepare your experience</p>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4 mx-auto" />
            <Skeleton className="h-4 w-1/2 mx-auto" />
          </div>
        </div>
      </div>
    )
  }

  if (!user) {
    return <AuthModal isOpen={true} onClose={() => {}} />
  }

  return <>{children}</>
}

export default AuthWrapper
