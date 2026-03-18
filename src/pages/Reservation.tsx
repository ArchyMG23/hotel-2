import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, Send, Calendar, User, Mail, MessageSquare, Bed, Users, Clock } from 'lucide-react';
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
      <div className="max-w-3xl mx-auto px-4 mt-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-10 md:p-16 rounded-sm shadow-2xl border-t-4 border-royal-gold"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-cinzel text-royal-green mb-4">Réservez votre Expérience</h2>
            <p className="text-royal-green/70">Remplissez le formulaire ci-dessous. Notre équipe vous contactera via WhatsApp pour confirmer votre réservation.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <label htmlFor="name" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                  <User className="h-4 w-4 mr-2 text-royal-gold" /> Nom Complet
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                  placeholder="Votre nom"
                />
              </motion.div>
              
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <label htmlFor="email" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-royal-gold" /> Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                  placeholder="votre@email.com"
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <label htmlFor="type" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                  <Crown className="h-4 w-4 mr-2 text-royal-gold" /> Type de Réservation
                </label>
                <select
                  id="type"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                >
                  <option value="Chambre">Chambre & Suite</option>
                  <option value="Restaurant">Table au Restaurant</option>
                  <option value="Événement">Salle de Banquet / Événement</option>
                </select>
              </motion.div>

              <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
                <label htmlFor="date" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-royal-gold" /> {formData.type === 'Chambre' ? "Date d'arrivée" : "Date Souhaitée"}
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                />
              </motion.div>
            </div>

            {/* Conditional Fields based on Reservation Type */}
            {formData.type === 'Chambre' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
              >
                <div>
                  <label htmlFor="roomType" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                    <Bed className="h-4 w-4 mr-2 text-royal-gold" /> Type de chambre
                  </label>
                  <select
                    id="roomType"
                    name="roomType"
                    value={formData.roomType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                  >
                    {data.rooms.map((room, idx) => (
                      <option key={idx} value={room.name}>{room.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="roomCount" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                    <Crown className="h-4 w-4 mr-2 text-royal-gold" /> Nombre
                  </label>
                  <input
                    type="number"
                    id="roomCount"
                    name="roomCount"
                    min="1"
                    required
                    value={formData.roomCount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                  />
                </div>
                <div>
                  <label htmlFor="duration" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                    <Clock className="h-4 w-4 mr-2 text-royal-gold" /> Jours
                  </label>
                  <input
                    type="number"
                    id="duration"
                    name="duration"
                    min="1"
                    required
                    value={formData.duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                  />
                </div>
              </motion.div>
            )}

            {formData.type === 'Restaurant' && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <label htmlFor="restaurantSeats" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                    <Users className="h-4 w-4 mr-2 text-royal-gold" /> Nombre de places
                  </label>
                  <input
                    type="number"
                    id="restaurantSeats"
                    name="restaurantSeats"
                    min="1"
                    required
                    value={formData.restaurantSeats}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50"
                  />
                </div>
              </motion.div>
            )}
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <label htmlFor="message" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-royal-gold" /> Détails supplémentaires
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50 resize-none"
                placeholder="Demandes spéciales, allergies..."
              ></textarea>
            </motion.div>
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full flex justify-center items-center space-x-2 bg-royal-green text-royal-gold px-8 py-4 font-cinzel font-bold tracking-widest hover:bg-royal-gold hover:text-royal-green transition-all duration-300 shadow-xl hover:shadow-2xl"
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
