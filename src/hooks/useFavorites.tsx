
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from './useAuth'
import { useToast } from './use-toast'

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  useEffect(() => {
    if (user) {
      fetchFavorites()
    }
  }, [user])

  const fetchFavorites = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('livestock_id')
        .eq('user_id', user.id)

      if (error) throw error
      setFavorites(data?.map(fav => fav.livestock_id) || [])
    } catch (error) {
      console.error('Error fetching favorites:', error)
    }
  }

  const toggleFavorite = async (livestockId: string) => {
    if (!user) return

    try {
      const isFavorited = favorites.includes(livestockId)

      if (isFavorited) {
        const { error } = await supabase
          .from('favorites')
          .delete()
          .eq('user_id', user.id)
          .eq('livestock_id', livestockId)

        if (error) throw error
        setFavorites(prev => prev.filter(id => id !== livestockId))
        toast({ title: 'Removed from favorites' })
      } else {
        const { error } = await supabase
          .from('favorites')
          .insert({ user_id: user.id, livestock_id: livestockId })

        if (error) throw error
        setFavorites(prev => [...prev, livestockId])
        toast({ title: 'Added to favorites' })
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message,
        variant: 'destructive'
      })
    }
  }

  return { favorites, toggleFavorite }
}
