import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, ChevronRight, Wifi, Coffee, Car, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const { data } = useSiteData();
  const { home } = data;

  const amenities = [
    { icon: Wifi, title: "Wi-Fi Haut Débit", desc: "Connexion gratuite dans tout l'établissement" },
    { icon: Coffee, title: "Petit-déjeuner Royal", desc: "Buffet gastronomique inclus" },
    { icon: Car, title: "Service de Voiturier", desc: "Parking privé et sécurisé 24/7" },
    { icon: Shield, title: "Sécurité Maximale", desc: "Personnel de sécurité et vidéosurveillance" }
  ];

  return (
    <div className="relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -20, 0], opacity: [0.05, 0.15, 0.05] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-royal-gold rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ y: [0, 30, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-royal-green rounded-full blur-[150px]"
        />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0 bg-royal-green">
          <img
            src={home.heroImageUrl || "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1920"}
            alt="Hotel Reception"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-royal-green/80 via-royal-green/40 to-royal-green/90" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 px-4 max-w-7xl mx-auto mt-20 h-full flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
            >
              <Crown className="h-20 w-20 text-royal-gold mx-auto mb-8 drop-shadow-2xl" />
            </motion.div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-cinzel text-royal-silk mb-6 tracking-wider drop-shadow-lg">
              {home.heroTitle}
            </h1>
            <p className="text-xl md:text-2xl text-royal-gold font-light tracking-widest uppercase mb-12 drop-shadow-md">
              {home.heroSubtitle}
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                to="/chambres"
                className="inline-flex items-center space-x-2 bg-royal-gold/10 backdrop-blur-sm border-2 border-royal-gold text-royal-gold px-10 py-4 rounded-sm font-cinzel font-bold tracking-widest hover:bg-royal-gold hover:text-royal-green transition-all duration-300"
              >
                <span>DÉCOUVRIR</span>
                <ChevronRight className="h-5 w-5" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-32 bg-royal-silk relative overflow-hidden">
        {/* Subtle Lion Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-5 pointer-events-none">
          <Crown className="w-[800px] h-[800px] text-royal-green" />
        </div>

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-cinzel text-royal-green mb-8">
              {home.welcomeTitle}
            </h2>
            <div className="w-24 h-1 bg-royal-gold mx-auto mb-8" />
            <p className="text-lg md:text-xl text-royal-green/80 leading-relaxed font-light mb-12">
              {home.welcomeText}
            </p>
            <p className="text-md text-royal-green/70 leading-relaxed font-light">
              {home.welcomeDescription}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-24 bg-white relative z-10 border-y border-royal-gold/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-cinzel text-royal-green mb-4">Nos Services Exclusifs</h2>
            <div className="w-16 h-0.5 bg-royal-gold mx-auto" />
          </div>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
          >
            {amenities.map((amenity, index) => (
              <motion.div
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                whileHover={{ y: -10 }}
                className="text-center group"
              >
                <div className="w-20 h-20 mx-auto bg-royal-silk rounded-full flex items-center justify-center mb-6 group-hover:bg-royal-gold transition-colors duration-300 shadow-lg">
                  <amenity.icon className="h-8 w-8 text-royal-green" />
                </div>
                <h3 className="text-xl font-cinzel text-royal-green font-bold mb-3">{amenity.title}</h3>
                <p className="text-royal-green/70 text-sm leading-relaxed">{amenity.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Quick Links / Highlights */}
      <section className="py-24 bg-royal-green text-royal-silk relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-cinzel text-royal-gold mb-4">Découvrez Le Trône</h2>
            <div className="w-16 h-0.5 bg-royal-silk mx-auto" />
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.2 } },
              hidden: {}
            }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              { title: "Chambres & Suites", path: "/chambres", img: data.rooms[0]?.images[0], desc: "Un confort absolu et un design moderne africain pour des nuits paisibles." },
              { title: "La Table du Roi", path: "/restaurant", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=800", desc: data.restaurant.description },
              { title: "Événements", path: "/evenements", img: data.events.images[0], desc: data.events.description },
              { title: "Blog & Actualités", path: "/blog", img: data.blog[0]?.image || "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000", desc: "Suivez nos dernières actualités et découvrez la région." },
              { title: "Notre Histoire", path: "/a-propos", img: data.about.founderImage, desc: "Découvrez l'histoire et la vision derrière Le Trône du Nlonako." }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                variants={{
                  hidden: { opacity: 0, scale: 0.9, y: 30 },
                  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
                }}
                whileHover={{ y: -10 }}
                className="group relative h-[450px] overflow-hidden cursor-pointer rounded-sm shadow-xl"
              >
                <Link to={item.path} className="block w-full h-full">
                  <img 
                    src={item.img} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-royal-green/95 via-royal-green/40 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <h3 className="text-2xl font-cinzel text-royal-gold mb-3">{item.title}</h3>
                    <p className="text-royal-silk/80 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                      {item.desc}
                    </p>
                    <div className="w-12 h-0.5 bg-royal-silk transition-all duration-300 group-hover:w-24" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
