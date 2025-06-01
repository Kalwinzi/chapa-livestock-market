
import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { africanCountries } from '@/data/africanCountries';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

const SearchSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const { toast } = useToast();

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      toast({
        title: "Utafutaji Unahitajika",
        description: "Tafadhali ingiza kile unachokitafuta",
        variant: "destructive"
      });
      return;
    }

    try {
      let query = supabase
        .from('livestock')
        .select('*')
        .ilike('name', `%${searchQuery}%`);

      if (selectedCountry) {
        query = query.ilike('location', `%${selectedCountry}%`);
      }

      const { data, error } = await query;

      if (error) {
        toast({
          title: "Hitilafu ya Utafutaji",
          description: "Kuna tatizo limetokea wakati wa kutafuta. Jaribu tena.",
          variant: "destructive"
        });
        return;
      }

      setSearchResults(data || []);
      
      toast({
        title: "Matokeo ya Utafutaji",
        description: `Mifugo ${data?.length || 0} imepatikana kwa "${searchQuery}"`,
      });
    } catch (error) {
      toast({
        title: "Hitilafu",
        description: "Kuna tatizo limetokea. Jaribu tena.",
        variant: "destructive"
      });
    }
  };

  return (
    <section className="py-16 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-gray-900 dark:to-primary-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h2 className="text-4xl font-bold text-foreground mb-6">Tafuta Mifugo Karibu Nawe</h2>
            <div className="w-24 h-1 bg-primary-500 mx-auto mb-6"></div>
            <p className="text-xl text-muted-foreground">Tafuta maelfu ya orodha zilizothibitishwa kote Afrika Mashariki</p>
          </div>
          
          <div className="bg-card rounded-3xl shadow-2xl p-8 md:p-12 border border-border animate-slide-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Unatafuta nini?"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 border-2 focus:border-primary-500 focus:ring-primary-500 bg-background text-foreground rounded-xl"
                />
              </div>
              
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="pl-12 h-14 w-full border-2 border-input focus:border-primary-500 focus:ring-primary-500 bg-background text-foreground rounded-xl appearance-none"
                >
                  <option value="">Chagua Nchi</option>
                  {africanCountries.map((country) => (
                    <option key={country.code} value={country.name}>
                      {country.name} {!country.supported && '(Inakuja Hivi Karibuni)'}
                    </option>
                  ))}
                </select>
              </div>
              
              <Button 
                onClick={handleSearch}
                className="h-14 bg-primary-500 hover:bg-primary-600 text-white font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Search className="h-5 w-5 mr-2" />
                Tafuta Mifugo
              </Button>
            </div>
            
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <span className="text-muted-foreground font-medium mr-3">Maarufu:</span>
              {['Ng\'ombe wa Maziwa', 'Ng\'ombe wa Nyama', 'Mbuzi', 'Kondoo', 'Kuku'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setSearchQuery(filter)}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm hover:bg-primary-200 dark:hover:bg-primary-900/50 transition-all duration-300 border border-primary-300 dark:border-primary-700 font-medium"
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
