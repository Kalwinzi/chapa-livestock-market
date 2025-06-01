
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { X } from 'lucide-react';

interface Story {
  id: number;
  name: string;
  title: string;
  image: string;
  shortDescription: string;
  fullStory: string;
}

const StoriesSection = () => {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  const stories: Story[] = [
    {
      id: 1,
      name: "Mzee Masuruzu",
      title: "Mfugaji wa Jadi mwenye Uzoefu wa Miaka 30+",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      shortDescription: "Mzee mwenye hekima aliyekuwa akifuga mifugo kwa zaidi ya miongo mitatu, akiwapatia vijana maarifa ya kijadi.",
      fullStory: "Mzee Masuruzu amekuwa nguzo ya jamii ya wafugaji kwa zaidi ya miaka 30. Alianza akiwa kijana akim-saidia baba yake, akajifunza njia za kijadi za ufugaji ambazo zimepitishwa kizazi hadi kizazi. Uelewa wake wa kina wa tabia za wanyamapori, mzunguko wa majira na dawa za asili umemfanya kuwa mtu anayeheshimiwa katika jamii. Kupitia ChapaMarket, sasa anashiriki maarifa yake na wafugaji kote Afrika, akiwasaidia kuboresha mbinu zao za kufuga mifugo. Ng'ombe wake wanajulikana kwa afya yao ya ajabu na uzalishaji, ushahidi wa mbinu zake za kale zilizojaribiwa."
    },
    {
      id: 2,
      name: "Mh. Hima",
      title: "Kiongozi wa Kiuchumi wa Mazingira",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      shortDescription: "Kiongozi mwenye shauku wa kukuza mbinu za ufugaji endelevu ambazo zinanufaisha wafugaji na mazingira.",
      fullStory: "Mh. Hima amebadilisha mtazamo wa jamii yake kuhusu ufugaji wa mifugo kwa kuanzisha mbinu endelevu ambazo zinaongeza uzalishaji huku zikilinda mazingira. Kama kiongozi wa kimtaa, aliandaa mafunzo kuhusu malisho ya kuzunguka, uhifadhi wa maji na uzalishaji wa chakula cha kibiolojia. Miradi yake imewasaidia wafugaji zaidi ya 200 katika mkoa wake kuboresha mazao yao ya mifugo kwa asilimia 40 huku wakipunguza athari kwa mazingira. Kupitia ChapaMarket, anaungana na wengine wanaotangaza ufugaji endelevu na anaendelea kupanua mtandao wake wa wafugaji wanaojali mazingira kote bara la Afrika."
    },
    {
      id: 3,
      name: "Bwana Mifugo",
      title: "Daktari wa Wanyamapori na Mtaalamu wa Huduma za Mifugo",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      shortDescription: "Daktari aliyejitolea ambaye anatoa huduma muhimu za kijamii za afya kwa mifugo vijijini, akihakikisha ustawi wa wanyamapori na uzalishaji.",
      fullStory: "Dk. Mifugo amejitolea kazi yake ya kuboresha afya ya mifugo katika jamii za vijijini. Akiwa na kliniki yake ya kuwapelekea daktari maarufu, anasafiri maeneo ya mbali kutoa chanjo, matibabu na ushauri wa afya. Utaalamu wake umeokoa maelfu ya wanyamapori na kuzuia mlipuko wa magonjwa ambayo yangeweza kuharibu jamii za wafugaji. Anatumia ChapaMarket si tu kuungana na wafugaji wanaohitaji huduma zake bali pia kushiriki vidokezo vya kuzuia magonjwa na mbinu bora. Kazi yake imekuwa muhimu katika kuboresha kiwango cha kuishi kwa mifugo na afya ya makundi yote katika maeneo mengi."
    },
    {
      id: 4,
      name: "John",
      title: "Mjasiriamali Mchanga - Kutoka Mbuzi 2 hadi Wanyamapori 150+",
      image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=150&h=150&fit=crop&crop=face",
      shortDescription: "Mjasiriamali mchanga mwenye motisha ambaye alianza na mbuzi 2 tu na kujenga biashara ya mifugo yenye wanyamapori zaidi ya 150.",
      fullStory: "Safari ya John ilianza miaka mitano iliyopita alipofuga mbuzi wake wa kwanza wawili akiwa na akiba kutoka kazi yake ya muda. Kupitia mipango makini, uwekezaji wa faida na matumizi makini ya ChapaMarket kununua na kuuza mifugo, amejenga shughuli kubwa yenye wanyamapori zaidi ya 150 ikiwa ni pamoja na mbuzi, kondoo na ng'ombe. Hadithi yake ya mafanikio inaonyesha nguvu ya uamuzi na mbinu busara za kibiashara. Sasa anaongoza vijana wengine wajasiriamali na anatumia ChapaMarket kupanua mtandao wake na kupata masoko mapya ya mifugo wake. Biashara yake sio tu imempa uhuru wa kifedha bali pia imeunda fursa za ajira kwa wengine katika jamii yake."
    },
    {
      id: 5,
      name: "Fatuma Hassan",
      title: "Mfugaji wa Kuku na Mwanawake Mstahimilivu",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=150&fit=crop&crop=face",
      shortDescription: "Mama mwenye busara aliyebadilisha maisha ya familia yake kupitia ufugaji wa kuku wa kisasa na uzalishaji wa mayai.",
      fullStory: "Fatuma Hassan alianza kazi yake ya ufugaji akiwa na kuku 10 tu katika uwanja mdogo nyuma ya nyumba yake huko Morogoro. Kupitia elimu ya kujifunza na kujitolea, alibadilisha shughuli yake ndogo kuwa kampuni ya kuku yenye nguvu na kuku 2000. Mbinu zake za kisasa za chakula na mazingira yamemfanya kuwa mmoja wa wazalishaji wakuu wa mayai katika mkoa. Anatumia ChapaMarket sio tu kuuza mazao yake bali pia kuongoza wanawake wengine kupitia mafunzo ya ufugaji. Mafanikio yake yamehimiza jamii zima na kuonyesha kuwa ufugaji unaweza kuwa njia ya kutoka umasikini."
    }
  ];

  const openStory = (story: Story) => {
    setSelectedStory(story);
  };

  const closeStory = () => {
    setSelectedStory(null);
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Hadithi kutoka Jamii Yetu
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Kutana na watu wenye motisha ambao wanabadilisha ufugaji wa mifugo kote Afrika Mashariki
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {stories.map((story) => (
            <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-primary-200"
                  />
                  <h3 className="text-lg font-semibold text-foreground mb-1">{story.name}</h3>
                  <p className="text-sm text-primary-500 font-medium mb-3">{story.title}</p>
                </div>
                
                <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                  {story.shortDescription}
                </p>
                
                <Button 
                  onClick={() => openStory(story)}
                  variant="outline" 
                  className="w-full hover:bg-primary-500 hover:text-white transition-colors"
                >
                  Soma Zaidi
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {selectedStory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-background rounded-xl shadow-2xl w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b">
              <div className="flex items-center space-x-4">
                <img
                  src={selectedStory.image}
                  alt={selectedStory.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary-200"
                />
                <div>
                  <h2 className="text-xl font-bold text-foreground">{selectedStory.name}</h2>
                  <p className="text-primary-500 font-medium">{selectedStory.title}</p>
                </div>
              </div>
              <button onClick={closeStory} className="text-muted-foreground hover:text-foreground">
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-muted-foreground leading-relaxed text-base">
                {selectedStory.fullStory}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default StoriesSection;
