
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();
  const { elementRef: titleRef, isVisible: titleVisible } = useScrollAnimation<HTMLHeadingElement>();
  const { elementRef: contentRef, isVisible: contentVisible } = useScrollAnimation<HTMLDivElement>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting ChapaMarket. We'll respond within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleLiveChat = () => {
    toast({
      title: "Live Chat Started",
      description: "Connecting you with our support team...",
    });
  };

  return (
    <section id="contact" className="py-20 bg-cream-50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 
            ref={titleRef}
            className={`text-4xl md:text-5xl font-serif font-bold text-sage-700 dark:text-white mb-6 transition-all duration-700 ${
              titleVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-8'
            }`}
          >
            Get in Touch
          </h2>
          <div className={`w-24 h-1 bg-gold-500 mx-auto mb-6 transition-all duration-700 delay-200 ${
            titleVisible 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-50'
          }`}></div>
          <p className={`text-xl text-sage-600 dark:text-gray-300 max-w-3xl mx-auto transition-all duration-700 delay-300 ${
            titleVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}>
            Connect with Tanzania's leading livestock marketplace. We're here to help you succeed.
          </p>
        </div>
        
        <div 
          ref={contentRef}
          className={`grid grid-cols-1 lg:grid-cols-2 gap-16 transition-all duration-700 delay-400 ${
            contentVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Contact Form */}
          <div className="bg-cream-100 dark:bg-gray-800 rounded-3xl p-10 shadow-xl border border-cream-300 dark:border-gray-700">
            <h3 className="text-3xl font-serif font-bold text-sage-700 dark:text-white mb-8">Send us a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-sage-700 mb-3">
                    Full Name
                  </label>
                  <Input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full h-12 border-2 border-cream-300 focus:border-sage-500 bg-cream-50 rounded-xl"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-sage-700 mb-3">
                    Email Address
                  </label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full h-12 border-2 border-cream-300 focus:border-sage-500 bg-cream-50 rounded-xl"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-sage-700 mb-3">
                  Subject
                </label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full h-12 border-2 border-cream-300 focus:border-sage-500 bg-cream-50 rounded-xl"
                  placeholder="What is this regarding?"
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-sage-700 mb-3">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border-2 border-cream-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-sage-500 focus:border-sage-500 bg-cream-50 text-sage-700"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              
              <Button type="submit" className="w-full h-14 bg-sage-600 hover:bg-sage-700 text-cream-50 font-semibold text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                <Send className="h-5 w-5 mr-2" />
                Send Message
              </Button>
            </form>

            {/* Live Chat Button */}
            <div className="mt-6 pt-6 border-t border-cream-300 dark:border-gray-600">
              <Button 
                onClick={handleLiveChat}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5 mr-2" />
                Start Live Chat
              </Button>
            </div>
          </div>
          
          {/* Contact Information */}
          <div>
            <h3 className="text-3xl font-serif font-bold text-sage-700 dark:text-white mb-8">Contact Information</h3>
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-6">
                <div className="bg-gold-100 dark:bg-gold-900/30 p-4 rounded-2xl shadow-lg">
                  <Mail className="h-8 w-8 text-sage-600 dark:text-sage-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sage-700 dark:text-white text-lg font-serif mb-2">Email</h4>
                  <p className="text-sage-600 dark:text-gray-300">kalwinzic@gmail.com</p>
                  <p className="text-sage-600 dark:text-gray-300">Business inquiries welcome</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gold-100 dark:bg-gold-900/30 p-4 rounded-2xl shadow-lg">
                  <Phone className="h-8 w-8 text-sage-600 dark:text-sage-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sage-700 dark:text-white text-lg font-serif mb-2">Phone</h4>
                  <p className="text-sage-600 dark:text-gray-300">+255 763 953 480</p>
                  <p className="text-sage-600 dark:text-gray-300">+255 787 224 333</p>
                  <p className="text-sm text-sage-500 dark:text-gray-400 mt-1">Available 24/7 for urgent inquiries</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gold-100 dark:bg-gold-900/30 p-4 rounded-2xl shadow-lg">
                  <MapPin className="h-8 w-8 text-sage-600 dark:text-sage-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-sage-700 dark:text-white text-lg font-serif mb-2">Location</h4>
                  <p className="text-sage-600 dark:text-gray-300">
                    Tanzania<br />
                    East Africa<br />
                    Serving all regions
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-sage-600 to-earth-600 rounded-3xl p-8 text-cream-50 shadow-xl">
              <h4 className="font-semibold text-xl font-serif mb-6">Business Hours</h4>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Monday - Friday</span>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Saturday</span>
                  <span>9:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Sunday</span>
                  <span>Emergency only</span>
                </div>
              </div>
              <p className="text-sm mt-4 opacity-90">
                Emergency livestock inquiries available 24/7 via WhatsApp
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
