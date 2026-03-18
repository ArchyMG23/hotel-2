import { useState } from 'react';
import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, Calendar as CalendarIcon, Users, MapPin } from 'lucide-react';
import { format, addMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, parseISO, isBefore, startOfDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useNavigate } from 'react-router-dom';

export default function Events() {
  const { data } = useSiteData();
  const { events } = data;
  const [currentDate, setCurrentDate] = useState(new Date());
  const navigate = useNavigate();

  const handleBookEvent = () => {
    navigate('/reservation', { state: { type: 'Événement', message: "Je souhaite avoir des informations pour réserver la salle de banquet." } });
  };

  // Calendar Logic
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(monthStart);
  const startDate = monthStart;
  const endDate = monthEnd;
  const dateFormat = "MMMM yyyy";
  const days = eachDayOfInterval({ start: startDate, end: endDate });

  const bookedDates = events.bookedDates.map(d => parseISO(d));
  const today = startOfDay(new Date());

  const isDateBooked = (day: Date) => {
    return bookedDates.some(bookedDate => isSameDay(bookedDate, day));
  };

  const isPast = (day: Date) => {
    return isBefore(day, today);
  };

  return (
    <div className="bg-royal-silk min-h-screen pb-24">
      {/* Header */}
      <div className="bg-royal-green text-royal-silk py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <img src={events.images[0]} alt="Banquet" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-royal-green/80" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <Crown className="h-16 w-16 text-royal-gold mx-auto mb-6" />
          <h1 className="text-5xl md:text-6xl font-cinzel mb-6">{events.title}</h1>
          <p className="text-xl text-royal-silk/90 font-light leading-relaxed">
            {events.description}
          </p>
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-12"
          >
            <div>
              <h2 className="text-4xl font-cinzel text-royal-green mb-8">Un Cadre Majestueux</h2>
              <p className="text-royal-green/80 leading-relaxed text-lg mb-8">
                Notre salle de banquet offre un espace modulable et élégant, parfait pour vos réceptions de mariage, conférences d'entreprise, ou galas de prestige. Équipée des dernières technologies audiovisuelles, elle s'adapte à toutes vos exigences.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded shadow-sm border border-royal-gold/20 flex flex-col items-center text-center">
                  <Users className="h-8 w-8 text-royal-gold mb-4" />
                  <h3 className="font-cinzel font-bold text-royal-green mb-2">Capacité</h3>
                  <p className="text-royal-green/70 text-sm">Jusqu'à 500 personnes</p>
                </div>
                <div className="bg-white p-6 rounded shadow-sm border border-royal-gold/20 flex flex-col items-center text-center">
                  <MapPin className="h-8 w-8 text-royal-gold mb-4" />
                  <h3 className="font-cinzel font-bold text-royal-green mb-2">Surface</h3>
                  <p className="text-royal-green/70 text-sm">800 m² modulables</p>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleBookEvent}
              className="bg-royal-green text-royal-gold px-8 py-4 font-cinzel font-bold tracking-widest hover:bg-royal-gold hover:text-royal-green transition-colors w-full text-center shadow-lg"
            >
              DEMANDER UN DEVIS
            </motion.button>
          </motion.div>

          {/* Interactive Calendar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-white p-8 rounded shadow-xl border-t-4 border-royal-gold"
          >
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-2xl font-cinzel text-royal-green flex items-center">
                <CalendarIcon className="h-6 w-6 mr-3 text-royal-gold" />
                Disponibilités
              </h3>
              <div className="flex space-x-4">
                <button onClick={() => setCurrentDate(addMonths(currentDate, -1))} className="text-royal-green hover:text-royal-gold transition-colors font-bold">&lt;</button>
                <span className="font-montserrat font-semibold text-royal-green capitalize w-32 text-center">
                  {format(currentDate, dateFormat, { locale: fr })}
                </span>
                <button onClick={() => setCurrentDate(addMonths(currentDate, 1))} className="text-royal-green hover:text-royal-gold transition-colors font-bold">&gt;</button>
              </div>
            </div>

            <div className="grid grid-cols-7 gap-2 mb-4 text-center">
              {['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(day => (
                <div key={day} className="font-cinzel font-bold text-royal-green/60 text-sm">
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2">
              {/* Empty slots for days before start of month */}
              {Array.from({ length: (monthStart.getDay() + 6) % 7 }).map((_, i) => (
                <div key={`empty-${i}`} className="h-12" />
              ))}
              
              {days.map((day, i) => {
                const booked = isDateBooked(day);
                const past = isPast(day);
                
                return (
                  <div
                    key={i}
                    className={`h-12 flex items-center justify-center rounded text-sm font-medium transition-colors
                      ${past ? 'text-gray-300 bg-gray-50 cursor-not-allowed' : 
                        booked ? 'bg-red-50 text-red-400 cursor-not-allowed line-through' : 
                        'bg-royal-silk text-royal-green hover:bg-royal-gold hover:text-white cursor-pointer shadow-sm'
                      }
                    `}
                    title={booked ? "Indisponible" : past ? "Passé" : "Disponible"}
                  >
                    {format(day, 'd')}
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex justify-center space-x-6 text-sm">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-royal-silk border border-gray-200 rounded mr-2" />
                <span className="text-royal-green/70">Disponible</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-50 border border-red-100 rounded mr-2" />
                <span className="text-royal-green/70">Réservé</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
