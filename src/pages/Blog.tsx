import { motion } from 'motion/react';
import { useSiteData } from '../hooks/useSiteData';
import { Crown, Calendar, ArrowRight, ArrowLeft } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';
import { useState } from 'react';

export default function Blog() {
  const { data } = useSiteData();
  const { blog } = data;
  const [selectedPost, setSelectedPost] = useState<string | null>(null);

  const activePost = blog.find(p => p.id === selectedPost);

  if (activePost) {
    return (
      <div className="bg-royal-silk min-h-screen pb-24">
        {/* Header */}
        <div className="bg-royal-green text-royal-silk py-24 text-center px-4 relative overflow-hidden">
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 max-w-4xl mx-auto"
          >
            <button 
              onClick={() => setSelectedPost(null)}
              className="absolute left-0 top-0 flex items-center text-royal-gold hover:text-white transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Retour
            </button>
            <Crown className="h-12 w-12 text-royal-gold mx-auto mb-6 mt-8 md:mt-0" />
            <h1 className="text-4xl md:text-5xl font-cinzel mb-4">{activePost.title}</h1>
            <div className="flex items-center justify-center text-royal-gold text-sm mb-6 font-medium">
              <Calendar className="h-4 w-4 mr-2" />
              {format(parseISO(activePost.date), 'dd MMMM yyyy', { locale: fr })}
            </div>
            <div className="w-24 h-1 bg-royal-gold mx-auto" />
          </motion.div>
        </div>

        {/* Post Content */}
        <div className="max-w-4xl mx-auto px-4 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-sm shadow-xl overflow-hidden"
          >
            <div className="relative h-96 overflow-hidden">
              <img 
                src={activePost.image} 
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-8 md:p-12">
              <div className="prose prose-lg prose-royal-green max-w-none font-montserrat leading-relaxed whitespace-pre-wrap">
                {activePost.content}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

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
          <h1 className="text-5xl font-cinzel mb-4">Actualités & Découvertes</h1>
          <div className="w-24 h-1 bg-royal-gold mx-auto" />
        </motion.div>
      </div>

      {/* Blog Grid */}
      <div className="max-w-7xl mx-auto px-4 mt-16">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } },
            hidden: {}
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
        >
          {blog.map((post, index) => (
            <motion.div
              key={post.id}
              variants={{
                hidden: { opacity: 0, scale: 0.95, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
              }}
              whileHover={{ y: -10 }}
              className="bg-white rounded-sm shadow-lg overflow-hidden flex flex-col group cursor-pointer"
              onClick={() => setSelectedPost(post.id)}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              
              <div className="p-8 flex-grow flex flex-col">
                <div className="flex items-center text-royal-gold text-sm mb-4 font-medium">
                  <Calendar className="h-4 w-4 mr-2" />
                  {format(parseISO(post.date), 'dd MMMM yyyy', { locale: fr })}
                </div>
                
                <h2 className="text-2xl font-cinzel text-royal-green mb-4 line-clamp-2 group-hover:text-royal-gold transition-colors">
                  {post.title}
                </h2>
                
                <p className="text-royal-green/70 mb-8 line-clamp-3 text-sm leading-relaxed flex-grow">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center text-royal-gold font-cinzel font-bold tracking-wider hover:text-royal-green transition-colors mt-auto">
                  LIRE LA SUITE
                  <ArrowRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
