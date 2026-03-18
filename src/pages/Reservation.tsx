import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, Send, Calendar, User, Mail, MessageSquare, Bed, Users, Clock, ChevronDown } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Reservation() {
  const { data } = useSiteData();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Chambre',
    date: '',
    message: '',
    roomType: '',
    roomCount: 1,
    duration: 1,
    restaurantSeats: 2,
  });

  useEffect(() => {
    if (data.rooms && data.rooms.length > 0 && !formData.roomType) {
      setFormData(prev => ({ ...prev, roomType: data.rooms[0].name }));
    }
  }, [data.rooms]);

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        type: location.state.type || 'Chambre',
        message: location.state.message || ''
      }));
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    let details = '';
    if (formData.type === 'Chambre') {
      details = `*Type de chambre:* ${formData.roomType}\n*Nombre de chambres:* ${formData.roomCount}\n*Durée du séjour:* ${formData.duration} jour(s)\n`;
    } else if (formData.type === 'Restaurant') {
      details = `*Nombre de places:* ${formData.restaurantSeats} personne(s)\n`;
    }

    const text = `👑 *Nouvelle demande de réservation*\n\n*Nom:* ${formData.name}\n*Email:* ${formData.email}\n*Type:* ${formData.type}\n*Date:* ${formData.date}\n${details}\n*Message:*\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/${data.settings.whatsappNumber}?text=${encodedText}`, '_blank');
  };

  return (
    <div className="bg-royal-silk min-h-screen pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-gold rounded-full blur-[100px]"
        />
      </div>

      {/* Header */}
      <div className="bg-royal-green text-royal-silk py-24 text-center px-4 relative overflow-hidden z-10">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <Crown className="h-12 w-12 text-royal-gold mx-auto mb-6" />
          <h1 className="text-5xl font-cinzel mb-4">Réservation</h1>
          <div className="w-24 h-1 bg-royal-gold mx-auto" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 mt-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-8 md:p-12 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] border border-royal-gold/10 relative overflow-hidden"
        >
          {/* Decorative corner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-royal-gold/5 rounded-bl-full -z-10" />
          
          <div className="text-center mb-12">
            <h2 className="text-3xl font-cinzel text-royal-green mb-4">Réservez votre Expérience</h2>
            <p className="text-royal-green/60 max-w-2xl mx-auto">Remplissez le formulaire ci-dessous. Notre équipe vous contactera via WhatsApp dans les plus brefs délais pour confirmer votre réservation.</p>
          </div>
          
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {}
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green placeholder-royal-green/40 shadow-sm hover:border-royal-green/20"
                  placeholder="Nom Complet"
                />
              </motion.div>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green placeholder-royal-green/40 shadow-sm hover:border-royal-green/20"
                  placeholder="Adresse Email"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                  <Crown className="h-5 w-5" />
                </div>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full pl-12 pr-10 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green shadow-sm hover:border-royal-green/20 appearance-none cursor-pointer"
                >
                  <option value="Chambre">Chambre & Suite</option>
                  <option value="Restaurant">Table au Restaurant</option>
                  <option value="Événement">Salle de Banquet / Événement</option>
                </select>
                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-royal-green/40">
                  <ChevronDown className="h-5 w-5" />
                </div>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                  <Calendar className="h-5 w-5" />
                </div>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green shadow-sm hover:border-royal-green/20"
                />
              </motion.div>
            </div>

            {/* Conditional Fields based on Reservation Type */}
            {formData.type === 'Chambre' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                    <Bed className="h-5 w-5" />
                  </div>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full pl-12 pr-10 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green shadow-sm hover:border-royal-green/20 appearance-none cursor-pointer"
                  >
                    {data.rooms.map((room, idx) => (
                      <option key={idx} value={room.name}>{room.name}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-royal-green/40">
                    <ChevronDown className="h-5 w-5" />
                  </div>
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                    <Crown className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    id="roomCount"
                    name="roomCount"
                    min="1"
                    required
                    value={formData.roomCount}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green placeholder-royal-green/40 shadow-sm hover:border-royal-green/20"
                    placeholder="Nombre"
                  />
                </div>
                
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                    <Clock className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    min="1"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green placeholder-royal-green/40 shadow-sm hover:border-royal-green/20"
                    placeholder="Jours"
                  />
                </div>
              </motion.div>
            )}

            {formData.type === 'Restaurant' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                    <Users className="h-5 w-5" />
                  </div>
                  <input
                    type="number"
                    id="restaurantSeats"
                    name="restaurantSeats"
                    min="1"
                    required
                    value={formData.restaurantSeats}
                    onChange={handleChange}
                    className="w-full pl-12 pr-4 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green placeholder-royal-green/40 shadow-sm hover:border-royal-green/20"
                    placeholder="Nombre de places"
                  />
                </div>
              </motion.div>
            )}
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="relative group">
              <div className="absolute top-4 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-royal-gold text-royal-green/40">
                <MessageSquare className="h-5 w-5" />
              </div>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full pl-12 pr-4 py-4 bg-royal-silk/20 border-2 border-royal-green/10 rounded-xl focus:outline-none focus:ring-0 focus:border-royal-gold transition-all duration-300 text-royal-green placeholder-royal-green/40 shadow-sm hover:border-royal-green/20 resize-none"
                placeholder="Demandes spéciales, allergies, ou précisions..."
              ></textarea>
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }} className="pt-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center items-center space-x-3 bg-royal-green text-royal-gold px-8 py-5 rounded-xl font-cinzel font-bold tracking-widest hover:bg-royal-gold hover:text-royal-green transition-all duration-300 shadow-[0_10px_20px_rgba(0,0,0,0.1)] hover:shadow-[0_15px_30px_rgba(0,0,0,0.15)]"
              >
                <span>CONFIRMER SUR WHATSAPP</span>
                <Send className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
