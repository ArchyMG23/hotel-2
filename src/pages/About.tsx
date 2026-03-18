import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, MapPin, Phone, Mail } from 'lucide-react';

export default function About() {
  const { data } = useSiteData();
  const { about, settings } = data;

  return (
    <div className="bg-royal-silk min-h-screen pb-24 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ y: [0, -30, 0], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/3 right-1/4 w-96 h-96 bg-royal-gold rounded-full blur-[100px]"
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
          <h1 className="text-5xl font-cinzel mb-4">Notre Histoire</h1>
          <div className="w-24 h-1 bg-royal-gold mx-auto" />
        </motion.div>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-4 mt-24 space-y-32 relative z-10">
        {/* Founder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-16"
        >
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl relative z-10">
              <img 
                src={about.founderImage} 
                alt={about.founderName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 border-2 border-royal-gold/30 z-0 translate-x-4 translate-y-4" />
          </div>
          
          <div className="w-full md:w-1/2 space-y-6">
            <h2 className="text-4xl font-cinzel text-royal-green">{about.founderName}</h2>
            <h3 className="text-xl font-cinzel text-royal-gold tracking-widest uppercase">Fondateur</h3>
            <div className="w-16 h-0.5 bg-royal-green/20" />
            <p className="text-royal-green/80 leading-relaxed text-lg italic">
              "{about.founderBio}"
            </p>
          </div>
        </motion.div>

        {/* Director */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row-reverse items-center gap-16"
        >
          <div className="w-full md:w-1/2 relative">
            <div className="aspect-[3/4] overflow-hidden rounded-sm shadow-2xl relative z-10">
              <img 
                src={about.directorImage} 
                alt={about.directorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -inset-4 border-2 border-royal-gold/30 z-0 -translate-x-4 translate-y-4" />
          </div>
          
          <div className="w-full md:w-1/2 space-y-6 text-right">
            <h2 className="text-4xl font-cinzel text-royal-green">{about.directorName}</h2>
            <h3 className="text-xl font-cinzel text-royal-gold tracking-widest uppercase">Directrice Générale</h3>
            <div className="w-16 h-0.5 bg-royal-green/20 ml-auto" />
            <p className="text-royal-green/80 leading-relaxed text-lg italic">
              "{about.directorBio}"
            </p>
          </div>
        </motion.div>

        {/* Hotel Description */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-white p-12 md:p-16 rounded-sm shadow-xl border-t-4 border-royal-gold text-center"
        >
          <Crown className="h-10 w-10 text-royal-gold mx-auto mb-6" />
          <h2 className="text-3xl font-cinzel text-royal-green mb-8">L'Établissement</h2>
          <p className="text-royal-green/80 leading-relaxed text-lg max-w-3xl mx-auto">
            {about.hotelDescription}
          </p>
        </motion.div>

        {/* Contact & Map */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div className="space-y-8">
            <h2 className="text-3xl font-cinzel text-royal-green mb-8">Nous Trouver</h2>
            <motion.ul 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                visible: { transition: { staggerChildren: 0.2 } },
                hidden: {}
              }}
              className="space-y-6"
            >
              <motion.li 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="flex items-start group"
              >
                <div className="bg-royal-gold/10 p-4 rounded-full mr-6 group-hover:bg-royal-gold/20 transition-colors">
                  <MapPin className="h-6 w-6 text-royal-gold" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-royal-green mb-1 group-hover:text-royal-gold transition-colors">Adresse</h3>
                  <p className="text-royal-green/70">{settings.address}</p>
                </div>
              </motion.li>
              <motion.li 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="flex items-start group"
              >
                <div className="bg-royal-gold/10 p-4 rounded-full mr-6 group-hover:bg-royal-gold/20 transition-colors">
                  <Phone className="h-6 w-6 text-royal-gold" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-royal-green mb-1 group-hover:text-royal-gold transition-colors">Téléphone / WhatsApp</h3>
                  <p className="text-royal-green/70">+{settings.whatsappNumber}</p>
                </div>
              </motion.li>
              <motion.li 
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                }}
                className="flex items-start group"
              >
                <div className="bg-royal-gold/10 p-4 rounded-full mr-6 group-hover:bg-royal-gold/20 transition-colors">
                  <Mail className="h-6 w-6 text-royal-gold" />
                </div>
                <div>
                  <h3 className="font-cinzel font-bold text-royal-green mb-1 group-hover:text-royal-gold transition-colors">Email</h3>
                  <p className="text-royal-green/70">{settings.email}</p>
                </div>
              </motion.li>
            </motion.ul>
          </div>

          <div className="h-96 w-full rounded-sm overflow-hidden shadow-2xl border-2 border-royal-gold/20">
            <iframe
              src={settings.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map About"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
