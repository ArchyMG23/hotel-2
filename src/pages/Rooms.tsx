import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Rooms() {
  const { data } = useSiteData();
  const navigate = useNavigate();

  const handleBook = (roomName: string) => {
    navigate('/reservation', { state: { type: 'Chambre', message: `Je souhaite réserver la ${roomName}.` } });
  };

  return (
    <div className="bg-royal-silk min-h-screen pb-24">
      {/* Header */}
      <div className="bg-royal-green text-royal-silk py-24 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          <Crown className="h-12 w-12 text-royal-gold mx-auto mb-6" />
          <h1 className="text-5xl font-cinzel mb-4">Nos Chambres & Suites</h1>
          <div className="w-24 h-1 bg-royal-gold mx-auto" />
        </motion.div>
      </div>

      {/* Rooms List */}
      <div className="max-w-7xl mx-auto px-4 mt-16 space-y-24">
        {data.rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 items-center group`}
          >
            {/* Image */}
            <div className="w-full lg:w-1/2 h-[500px] relative overflow-hidden rounded-sm shadow-2xl">
              <motion.img 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                src={room.images[0]} 
                alt={room.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-royal-gold/20 m-4 pointer-events-none transition-all duration-500 group-hover:m-2 group-hover:border-royal-gold/40" />
            </div>

            {/* Content */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <h2 className="text-4xl font-cinzel text-royal-green mb-4">{room.name}</h2>
                <p className="text-2xl font-cinzel text-royal-gold mb-6">
                  {room.price.toLocaleString('fr-FR')} FCFA <span className="text-sm text-royal-green/60 font-montserrat">/ nuit</span>
                </p>
                <p className="text-royal-green/80 leading-relaxed">
                  {room.description}
                </p>
              </div>

              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-2 gap-4"
              >
                {room.features.map((feature, i) => (
                  <motion.div 
                    key={i} 
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                    className="flex items-center space-x-2 text-royal-green/90"
                  >
                    <Crown className="h-4 w-4 text-royal-gold shrink-0" />
                    <span className="text-sm font-medium">{feature}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleBook(room.name)}
                className="bg-royal-green text-royal-gold px-8 py-4 font-cinzel font-bold tracking-widest hover:bg-royal-gold hover:text-royal-green transition-colors w-full sm:w-auto shadow-lg"
              >
                RÉSERVER CETTE CHAMBRE
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
