
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Lock, Phone, MapPin, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface SignUpFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignUpForm: React.FC<SignUpFormProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    location: '',
    userType: 'buyer'
  });
  const { toast } = useToast();
  const { signUp, signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast({
        title: "Hitilafu",
        description: "Manenosiri hayalingani",
        variant: "destructive",
      });
      return;
    }

    try {
      if (isLogin) {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          toast({
            title: "Hitilafu ya kuingia",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Umeingia kikamilifu!",
            description: "Karibu tena ChapaMarket",
          });
          onClose();
        }
      } else {
        const userData = {
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone: formData.phone,
          location: formData.location,
          user_type: formData.userType
        };

        const { error } = await signUp(formData.email, formData.password, userData);
        if (error) {
          toast({
            title: "Hitilafu ya usajili",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Usajili umekamilika!",
            description: "Karibu ChapaMarket! Barua ya uthibitisho imetumwa kwenye barua pepe yako.",
          });
          onClose();
        }
      }
    } catch (error) {
      toast({
        title: "Hitilafu",
        description: "Kuna tatizo limetokea. Jaribu tena.",
        variant: "destructive",
      });
    }
  };

  const handleSocialLogin = (provider: string) => {
    toast({
      title: `${provider} Login`,
      description: `Uthibitisho wa ${provider} utapatikana hivi karibuni.`,
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
          <CardTitle className="text-2xl font-bold text-center text-green-700">
            {isLogin ? 'Ingia ChapaMarket' : 'Jiunge na ChapaMarket'}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 mb-6">
            <Button 
              onClick={() => handleSocialLogin('Google')}
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2 border-gray-300 hover:bg-gray-50"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
                G
              </div>
              <span>Endelea na Google</span>
            </Button>
            
            <Button 
              onClick={() => handleSocialLogin('Facebook')}
              variant="outline" 
              className="w-full flex items-center justify-center space-x-2 border-blue-300 hover:bg-blue-50"
            >
              <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                f
              </div>
              <span>Endelea na Facebook</span>
            </Button>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Au endelea na barua pepe</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Jina la Kwanza</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Juma"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Jina la Mwisho</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="pl-10"
                        placeholder="Mwalimu"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nambari ya Simu</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="+255 XXX XXX XXX"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Mahali</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="pl-10"
                      placeholder="Dar es Salaam, Tanzania"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Nataka</label>
                  <select
                    name="userType"
                    value={formData.userType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    required
                  >
                    <option value="buyer">Kununua Mifugo</option>
                    <option value="seller">Kuuza Mifugo</option>
                    <option value="both">Kununua na Kuuza</option>
                  </select>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Barua Pepe</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="juma@mfano.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Nenosiri</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label className="block text-sm font-medium mb-2">Thibitisha Nenosiri</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="pl-10"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>
            )}

            <Button type="submit" className="w-full bg-green-700 hover:bg-green-800 text-white">
              {isLogin ? 'Ingia' : 'Unda Akaunti'}
            </Button>

            <div className="text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-green-600 hover:text-green-700"
              >
                {isLogin ? 'Je, huna akaunti? Jisajili hapa' : 'Je, una akaunti? Ingia hapa'}
              </button>
            </div>

            {!isLogin && (
              <p className="text-center text-sm text-gray-600">
                Kwa kujisajili, unakubali Masharti yetu na Sera ya Faragha
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpForm;
