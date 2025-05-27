
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "Thank you for contacting us. We'll get back to you within 24 hours.",
    });
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 bg-cream-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-sage-700 mb-6">Get in Touch</h2>
          <div className="w-24 h-1 bg-gold-500 mx-auto mb-6"></div>
          <p className="text-xl text-sage-600 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-cream-100 rounded-3xl p-10 shadow-xl border border-cream-300 animate-slide-up">
            <h3 className="text-3xl font-serif font-bold text-sage-700 mb-8">Send us a Message</h3>
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
          </div>
          
          {/* Contact Information */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-3xl font-serif font-bold text-sage-700 mb-8">Contact Information</h3>
            <div className="space-y-8 mb-12">
              <div className="flex items-start space-x-6">
                <div className="bg-gold-100 p-4 rounded-2xl shadow-lg">
                  <Mail className="h-8 w-8 text-sage-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sage-700 text-lg font-serif mb-2">Email</h4>
                  <p className="text-sage-600">support@chapamarket.com</p>
                  <p className="text-sage-600">business@chapamarket.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gold-100 p-4 rounded-2xl shadow-lg">
                  <Phone className="h-8 w-8 text-sage-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sage-700 text-lg font-serif mb-2">Phone</h4>
                  <p className="text-sage-600">+234 800 CHAPA MARKET</p>
                  <p className="text-sage-600">+254 700 123 456</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-6">
                <div className="bg-gold-100 p-4 rounded-2xl shadow-lg">
                  <MapPin className="h-8 w-8 text-sage-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-sage-700 text-lg font-serif mb-2">Headquarters</h4>
                  <p className="text-sage-600">
                    123 Agricultural Plaza<br />
                    Nairobi, Kenya<br />
                    00100
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
                  <span>Closed</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
