
import React from 'react'
import { useAuth } from '@/hooks/useAuth'
import { AnimatedLivestockLoader } from './AnimatedLivestockLoader'
import AuthModal from './AuthModal'

interface AuthWrapperProps {
  children: React.ReactNode
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <AnimatedLivestockLoader />
  }

  if (!user) {
    return <AuthModal isOpen={true} onClose={() => {}} />
  }

  return <>{children}</>
}

export default AuthWrapper
