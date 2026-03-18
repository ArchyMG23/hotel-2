import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, Send, Calendar, User, Mail, MessageSquare } from 'lucide-react';
import { useLocation } from 'react-router-dom';

export default function Reservation() {
  const { data } = useSiteData();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: 'Chambre',
    date: '',
    message: ''
  });

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
    const text = `👑 *Nouvelle demande de réservation*\n\n*Nom:* ${formData.name}\n*Email:* ${formData.email}\n*Type:* ${formData.type}\n*Date souhaitée:* ${formData.date}\n\n*Message:*\n${formData.message}`;
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
                  <Calendar className="h-4 w-4 mr-2 text-royal-gold" /> Date Souhaitée
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
            
            <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}>
              <label htmlFor="message" className="block text-sm font-medium text-royal-green/80 mb-2 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2 text-royal-gold" /> Détails supplémentaires
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-royal-green/20 rounded-sm focus:outline-none focus:ring-2 focus:ring-royal-gold focus:border-transparent transition-shadow bg-royal-silk/50 resize-none"
                placeholder="Nombre de personnes, demandes spéciales..."
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
