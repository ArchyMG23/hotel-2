import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Phone, MapPin, ChevronRight, Crown } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useSiteData } from '../hooks/useSiteData';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { data } = useSiteData();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { name: 'Accueil', path: '/' },
    { name: 'Hôtellerie', path: '/chambres' },
    { name: 'Restauration', path: '/restaurant' },
    { name: 'Banquet & Événements', path: '/evenements' },
    { name: 'Blog', path: '/blog' },
    { name: 'À Propos', path: '/a-propos' },
  ];

  const handleBookClick = () => {
    navigate('/reservation');
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-royal-silk text-royal-green font-montserrat relative">
      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-500 ${scrolled || isMenuOpen ? 'bg-royal-green/95 backdrop-blur-md text-royal-silk shadow-lg py-2 border-b border-royal-gold/20' : 'bg-transparent text-royal-silk py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 group z-50" onClick={() => setIsMenuOpen(false)}>
              <Crown className={`transition-all duration-500 text-royal-gold ${scrolled || isMenuOpen ? 'h-8 w-8' : 'h-10 w-10 group-hover:scale-110'}`} />
              <div className="flex flex-col">
                <span className={`font-cinzel font-bold tracking-wider text-royal-gold transition-all duration-500 ${scrolled || isMenuOpen ? 'text-xl' : 'text-2xl drop-shadow-md'}`}>LE TRÔNE</span>
                <span className={`tracking-[0.2em] uppercase text-royal-silk/90 transition-all duration-500 ${scrolled || isMenuOpen ? 'text-[10px]' : 'text-xs drop-shadow-md'}`}>du Nlonako</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium transition-all duration-300 hover:text-royal-gold relative group ${
                    pathname === link.path ? 'text-royal-gold' : (scrolled ? 'text-royal-silk/90' : 'text-white drop-shadow-md')
                  }`}
                >
                  {link.name}
                  <span className={`absolute -bottom-1 left-0 w-full h-0.5 bg-royal-gold transition-transform duration-300 ${pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </Link>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden md:flex">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookClick}
                className={`text-royal-green px-6 py-2 rounded-sm font-cinzel font-bold tracking-wide transition-all duration-300 shadow-lg ${scrolled ? 'bg-royal-gold hover:bg-royal-silk' : 'bg-royal-gold hover:bg-white'}`}
              >
                RÉSERVER
              </motion.button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center z-50">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-royal-gold hover:text-royal-silk p-2 transition-transform duration-300"
                aria-expanded={isMenuOpen}
                aria-label="Menu de navigation"
              >
                {isMenuOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: '-100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="md:hidden fixed inset-0 z-40 bg-royal-green/98 backdrop-blur-xl flex flex-col items-center justify-center min-h-screen pt-20"
            >
              <nav className="flex flex-col items-center space-y-8 w-full px-6">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                    className="w-full text-center"
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block text-2xl font-cinzel tracking-widest transition-colors ${
                        pathname === link.path ? 'text-royal-gold' : 'text-royal-silk hover:text-royal-gold'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                  className="w-full pt-8 border-t border-royal-gold/20 flex justify-center"
                >
                  <button 
                    onClick={handleBookClick}
                    className="bg-royal-gold text-royal-green px-10 py-4 rounded-sm font-cinzel font-bold tracking-widest text-lg hover:bg-white transition-colors shadow-lg w-full max-w-xs"
                  >
                    RÉSERVER
                  </button>
                </motion.div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-royal-green text-royal-silk pt-16 pb-8 border-t-4 border-royal-gold relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <Crown className="h-8 w-8 text-royal-gold" />
                <div className="flex flex-col">
                  <span className="font-cinzel font-bold text-xl tracking-wider text-royal-gold">LE TRÔNE</span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-royal-silk/80">du Nlonako</span>
                </div>
              </div>
              <p className="text-sm text-royal-silk/70 leading-relaxed mb-6">
                Prestige Royal, Cosi, Africain Moderne. Une expérience inoubliable au pied du Mont Nlonako.
              </p>
              <ul className="space-y-4 text-sm text-royal-silk/80">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 mr-3 text-royal-gold shrink-0" />
                  <span>{data.settings.address}</span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 mr-3 text-royal-gold shrink-0" />
                  <span>+{data.settings.whatsappNumber}</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-cinzel text-lg text-royal-gold mb-6">Liens Rapides</h3>
              <ul className="space-y-2 text-sm">
                {navLinks.slice(1, 6).map(link => (
                  <li key={link.path}>
                    <Link to={link.path} className="text-royal-silk/80 hover:text-royal-gold flex items-center transition-colors">
                      <ChevronRight className="h-4 w-4 mr-1" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-cinzel text-lg text-royal-gold mb-6">Notre Emplacement</h3>
              <div className="h-48 w-full rounded-sm overflow-hidden shadow-lg border border-royal-gold/20">
                <iframe
                  src={data.settings.mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Map Footer"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-royal-silk/10 text-center text-xs text-royal-silk/50">
            <p>
              <Link to="/admin" className="cursor-default hover:text-royal-silk/70 transition-colors">©</Link> {new Date().getFullYear()} Le Trône du Nlonako. Tous droits réservés.
            </p>
          </div>
        </div>
      </footer>

      {/* Floating CTA */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={handleBookClick}
        className="fixed bottom-8 right-8 z-50 bg-royal-gold text-royal-green p-4 rounded-full shadow-2xl transition-all duration-300 flex items-center justify-center group"
        aria-label="Réserver"
      >
        <Crown className="h-6 w-6" />
        <span className="absolute right-full mr-4 bg-royal-green text-royal-gold px-3 py-1 rounded text-xs font-cinzel font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          RÉSERVER
        </span>
      </motion.button>
    </div>
  );
}
