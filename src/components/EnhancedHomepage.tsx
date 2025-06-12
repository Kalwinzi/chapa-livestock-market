
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSearch } from '@/contexts/SearchContext';
import { supabase } from '@/integrations/supabase/client';
import { Star, MapPin, Eye, Phone } from 'lucide-react';

const EnhancedHomepage = () => {
  const { t } = useLanguage();
  const { searchQuery } = useSearch();
  const [bannerImage, setBannerImage] = useState('');
  const [featuredLivestock, setFeaturedLivestock] = useState([]);
  const [featuredStories, setFeaturedStories] = useState([]);
  const [filteredLivestock, setFilteredLivestock] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterLivestock();
  }, [searchQuery, featuredLivestock]);

  const fetchData = async () => {
    try {
      // Fetch banner
      const { data: bannerData } = await supabase
        .from('homepage_banners')
        .select('image_url')
        .eq('is_active', true)
        .limit(1)
        .single();
      
      if (bannerData) {
        setBannerImage(bannerData.image_url);
      }

      // Fetch featured livestock
      const { data: livestockData } = await supabase
        .from('livestock')
        .select(`
          *,
          profiles!livestock_user_id_fkey(first_name, last_name, phone)
        `)
        .eq('featured', true)
        .eq('verified', true)
        .limit(6);
      
      if (livestockData) {
        setFeaturedLivestock(livestockData);
        setFilteredLivestock(livestockData);
      }

      // Fetch featured stories
      const { data: storiesData } = await supabase
        .from('stories')
        .select('*')
        .eq('featured', true)
        .eq('status', 'published')
        .limit(4);
      
      if (storiesData) {
        setFeaturedStories(storiesData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterLivestock = () => {
    if (!searchQuery.trim()) {
      setFilteredLivestock(featuredLivestock);
      return;
    }

    const filtered = featuredLivestock.filter((animal: any) =>
      animal.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.breed?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      animal.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredLivestock(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] bg-cover bg-center bg-no-repeat flex items-center justify-center text-center"
        style={{ 
          backgroundImage: bannerImage 
            ? `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bannerImage})`
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
        }}
      >
        <div className="max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            {t('welcome')}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8">
            {t('description')}
          </p>
          <Button size="lg" className="text-lg px-8 py-3">
            {t('livestock')}
          </Button>
        </div>
      </section>

      {/* Featured Livestock Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('featured')}
            </h2>
            {searchQuery && (
              <p className="text-muted-foreground">
                {filteredLivestock.length} results for "{searchQuery}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredLivestock.map((animal: any) => (
              <Card key={animal.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="relative">
                  <img
                    src={animal.image_url || '/api/placeholder/400/250'}
                    alt={animal.name}
                    className="w-full h-48 object-cover"
                  />
                  <Badge className="absolute top-3 right-3 bg-green-600">
                    {t('available')}
                  </Badge>
                  {animal.featured && (
                    <Star className="absolute top-3 left-3 h-5 w-5 text-yellow-400 fill-current" />
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-bold text-lg mb-2">{animal.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{animal.breed}</p>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {animal.location}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-green-600">
                      TSH {animal.price}
                    </span>
                    <Button size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      {t('contact')}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stories Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t('community')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredStories.map((story: any) => (
              <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={story.image_url || story.author_image || '/api/placeholder/300/200'}
                    alt={story.title}
                    className="w-full h-40 object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{story.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{story.author_name}</p>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {story.content.substring(0, 100)}...
                  </p>
                  <Button variant="ghost" size="sm" className="mt-2 p-0">
                    {t('readMore')}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHomepage;
