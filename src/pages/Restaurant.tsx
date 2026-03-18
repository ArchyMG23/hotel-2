import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, Utensils } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Restaurant() {
  const { data } = useSiteData();
  const { restaurant } = data;
  const navigate = useNavigate();

  const categories = Array.from(new Set(restaurant.menu.map(item => item.category)));

  const handleBookTable = () => {
    navigate('/reservation', { state: { type: 'Restaurant', message: "Je souhaite réserver une table au restaurant La Table du Roi." } });
  };

  return (
    <div className="bg-royal-silk min-h-screen pb-24">
      {/* Header */}
      <div className="bg-royal-green text-royal-silk py-32 text-center px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-royal-green/80" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-3xl mx-auto"
        >
          <Utensils className="h-12 w-12 text-royal-gold mx-auto mb-6" />
          <h1 className="text-5xl font-cinzel mb-6">{restaurant.title}</h1>
          <p className="text-xl text-royal-silk/80 font-light leading-relaxed">
            {restaurant.description}
          </p>
          <div className="w-24 h-1 bg-royal-gold mx-auto mt-8" />
        </motion.div>
      </div>

      {/* Menu Section */}
      <div className="max-w-5xl mx-auto px-4 mt-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-cinzel text-royal-green mb-4">Notre Carte</h2>
          <Crown className="h-8 w-8 text-royal-gold mx-auto" />
        </div>

        <div className="space-y-20">
          {categories.map((category) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl font-cinzel text-royal-gold mb-12 text-center border-b border-royal-gold/30 pb-4">
                {category}
              </h3>
              
              <motion.div 
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  visible: { transition: { staggerChildren: 0.1 } },
                  hidden: {}
                }}
                className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12"
              >
                {restaurant.menu
                  .filter(item => item.category === category)
                  .map((item) => (
                    <motion.div 
                      key={item.id} 
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
                      }}
                      className="group"
                    >
                      <div className="flex justify-between items-baseline mb-2">
                        <h4 className="text-xl font-cinzel text-royal-green font-bold group-hover:text-royal-gold transition-colors">
                          {item.name}
                        </h4>
                        <div className="flex-grow border-b-2 border-dotted border-royal-green/20 mx-4 transition-colors group-hover:border-royal-gold/50" />
                        <span className="text-lg font-montserrat font-semibold text-royal-green group-hover:text-royal-gold transition-colors">
                          {item.price.toLocaleString('fr-FR')} <span className="text-sm font-normal text-royal-green/60 group-hover:text-royal-gold/60">FCFA</span>
                        </span>
                      </div>
                      <p className="text-royal-green/70 text-sm italic">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleBookTable}
            className="bg-royal-green text-royal-gold px-12 py-4 font-cinzel font-bold tracking-widest hover:bg-royal-gold hover:text-royal-green transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            RÉSERVER UNE TABLE
          </motion.button>
        </div>
      </div>
    </div>
  );
}
