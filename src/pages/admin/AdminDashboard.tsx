import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSiteData } from '../../hooks/useSiteData';
import { Crown, LogOut, Settings, Home, Bed, Utensils, Calendar, FileText, Info, Plus, Trash2, Save } from 'lucide-react';
import { format, parseISO, isSameDay } from 'date-fns';
import { fr } from 'date-fns/locale';
import ImageUpload from '../../components/admin/ImageUpload';

type Tab = 'settings' | 'home' | 'rooms' | 'restaurant' | 'events' | 'blog' | 'about';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { data, updateData } = useSiteData();
  const [activeTab, setActiveTab] = useState<Tab>('settings');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const isAuth = sessionStorage.getItem('admin_auth');
    if (!isAuth) {
      navigate('/admin');
    }
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    navigate('/');
  };

  const saveChanges = () => {
    setIsSaving(true);
    setTimeout(() => setIsSaving(false), 800);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'settings':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-cinzel text-royal-green mb-6 border-b border-royal-gold/30 pb-2">Paramètres Généraux</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Numéro WhatsApp</label>
                <input
                  type="text"
                  value={data.settings.whatsappNumber}
                  onChange={(e) => updateData({ settings: { ...data.settings, whatsappNumber: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Email de Contact</label>
                <input
                  type="email"
                  value={data.settings.email}
                  onChange={(e) => updateData({ settings: { ...data.settings, email: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Code Secret Admin</label>
                <input
                  type="text"
                  value={data.settings.secretCode}
                  onChange={(e) => updateData({ settings: { ...data.settings, secretCode: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Adresse Physique</label>
                <input
                  type="text"
                  value={data.settings.address}
                  onChange={(e) => updateData({ settings: { ...data.settings, address: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-royal-green/80 mb-2">URL Google Maps (Embed src)</label>
                <input
                  type="text"
                  value={data.settings.mapUrl}
                  onChange={(e) => updateData({ settings: { ...data.settings, mapUrl: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold font-mono text-sm"
                />
              </div>
            </div>
          </div>
        );
      case 'home':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-cinzel text-royal-green mb-6 border-b border-royal-gold/30 pb-2">Page d'Accueil</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Image Hero (Fond d'écran)</label>
                <div className="flex flex-col gap-2">
                  <input
                    type="text"
                    value={data.home.heroImageUrl || ''}
                    onChange={(e) => updateData({ home: { ...data.home, heroImageUrl: e.target.value } })}
                    placeholder="URL de l'image ou uploadez un fichier"
                    className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                  />
                  <div className="flex items-center gap-4">
                    <label className="cursor-pointer bg-royal-green text-royal-silk px-4 py-2 rounded hover:bg-royal-green/90 transition-colors text-sm">
                      Uploader une image (Max 50MB)
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            if (file.size > 50 * 1024 * 1024) {
                              alert("L'image dépasse la taille maximale de 50MB.");
                              return;
                            }
                            const reader = new FileReader();
                            reader.onloadend = () => {
                              updateData({ home: { ...data.home, heroImageUrl: reader.result as string } });
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </label>
                    {data.home.heroImageUrl && data.home.heroImageUrl.startsWith('data:image') && (
                      <span className="text-xs text-green-600">Image locale chargée</span>
                    )}
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Titre Principal</label>
                <input
                  type="text"
                  value={data.home.heroTitle}
                  onChange={(e) => updateData({ home: { ...data.home, heroTitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold font-cinzel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Sous-titre</label>
                <input
                  type="text"
                  value={data.home.heroSubtitle}
                  onChange={(e) => updateData({ home: { ...data.home, heroSubtitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Titre Bienvenue</label>
                <input
                  type="text"
                  value={data.home.welcomeTitle}
                  onChange={(e) => updateData({ home: { ...data.home, welcomeTitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold font-cinzel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Texte Bienvenue</label>
                <textarea
                  value={data.home.welcomeText}
                  onChange={(e) => updateData({ home: { ...data.home, welcomeText: e.target.value } })}
                  rows={2}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Description Bienvenue</label>
                <textarea
                  value={data.home.welcomeDescription}
                  onChange={(e) => updateData({ home: { ...data.home, welcomeDescription: e.target.value } })}
                  rows={4}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
            </div>
          </div>
        );
      case 'events':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-cinzel text-royal-green mb-6 border-b border-royal-gold/30 pb-2">Gestion Salle de Banquet</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <h3 className="text-lg font-cinzel text-royal-gold">Informations</h3>
                <div>
                  <label className="block text-sm font-medium text-royal-green/80 mb-2">Titre</label>
                  <input
                    type="text"
                    value={data.events.title}
                    onChange={(e) => updateData({ events: { ...data.events, title: e.target.value } })}
                    className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold font-cinzel"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-royal-green/80 mb-2">Description</label>
                  <textarea
                    value={data.events.description}
                    onChange={(e) => updateData({ events: { ...data.events, description: e.target.value } })}
                    rows={4}
                    className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="URL Image Principale"
                    value={data.events.images[0] || ''}
                    onChange={(val) => {
                      const newImages = [...data.events.images];
                      newImages[0] = val;
                      updateData({ events: { ...data.events, images: newImages } });
                    }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-lg font-cinzel text-royal-gold">Dates Réservées</h3>
                <p className="text-sm text-royal-green/60 mb-4">
                  Ajoutez les dates (format AAAA-MM-JJ) pour les bloquer sur le calendrier public.
                </p>
                
                <div className="flex space-x-2">
                  <input
                    type="date"
                    id="newDate"
                    className="flex-grow px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                  />
                  <button
                    onClick={() => {
                      const input = document.getElementById('newDate') as HTMLInputElement;
                      if (input.value && !data.events.bookedDates.includes(input.value)) {
                        updateData({
                          events: {
                            ...data.events,
                            bookedDates: [...data.events.bookedDates, input.value].sort()
                          }
                        });
                        input.value = '';
                      }
                    }}
                    className="bg-royal-green text-royal-gold px-4 py-2 rounded hover:bg-royal-gold hover:text-royal-green transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>

                <div className="bg-royal-silk/50 border border-royal-green/10 rounded max-h-64 overflow-y-auto">
                  {data.events.bookedDates.length === 0 ? (
                    <p className="p-4 text-center text-royal-green/50 text-sm">Aucune date réservée.</p>
                  ) : (
                    <ul className="divide-y divide-royal-green/10">
                      {data.events.bookedDates.map(date => (
                        <li key={date} className="flex justify-between items-center p-3 hover:bg-white transition-colors">
                          <span className="font-medium text-royal-green">
                            {format(parseISO(date), 'dd MMMM yyyy', { locale: fr })}
                          </span>
                          <button
                            onClick={() => {
                              updateData({
                                events: {
                                  ...data.events,
                                  bookedDates: data.events.bookedDates.filter(d => d !== date)
                                }
                              });
                            }}
                            className="text-red-400 hover:text-red-600 p-1"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      case 'about':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-cinzel text-royal-green mb-6 border-b border-royal-gold/30 pb-2">À Propos</h2>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Description de l'Hôtel</label>
                <textarea
                  value={data.about.hotelDescription}
                  onChange={(e) => updateData({ about: { ...data.about, hotelDescription: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold h-32"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-royal-green/80 mb-2">Nom du Fondateur</label>
                  <input
                    type="text"
                    value={data.about.founderName}
                    onChange={(e) => updateData({ about: { ...data.about, founderName: e.target.value } })}
                    className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Image du Fondateur (URL)"
                    value={data.about.founderImage}
                    onChange={(val) => updateData({ about: { ...data.about, founderImage: val } })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-royal-green/80 mb-2">Bio du Fondateur</label>
                  <textarea
                    value={data.about.founderBio}
                    onChange={(e) => updateData({ about: { ...data.about, founderBio: e.target.value } })}
                    className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold h-24"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-royal-green/80 mb-2">Nom de la Directrice</label>
                  <input
                    type="text"
                    value={data.about.directorName}
                    onChange={(e) => updateData({ about: { ...data.about, directorName: e.target.value } })}
                    className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                  />
                </div>
                <div>
                  <ImageUpload
                    label="Image de la Directrice (URL)"
                    value={data.about.directorImage}
                    onChange={(val) => updateData({ about: { ...data.about, directorImage: val } })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-royal-green/80 mb-2">Bio de la Directrice</label>
                  <textarea
                    value={data.about.directorBio}
                    onChange={(e) => updateData({ about: { ...data.about, directorBio: e.target.value } })}
                    className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold h-24"
                  />
                </div>
              </div>
            </div>
          </div>
        );
      case 'rooms':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-cinzel text-royal-green mb-6 border-b border-royal-gold/30 pb-2">Gestion des Chambres</h2>
            <div className="space-y-8">
              {data.rooms.map((room, index) => (
                <div key={room.id} className="bg-royal-silk/50 p-6 rounded border border-royal-green/10 relative">
                  <button
                    onClick={() => {
                      const newRooms = [...data.rooms];
                      newRooms.splice(index, 1);
                      updateData({ rooms: newRooms });
                    }}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Nom de la chambre</label>
                      <input
                        type="text"
                        value={room.name}
                        onChange={(e) => {
                          const newRooms = [...data.rooms];
                          newRooms[index].name = e.target.value;
                          updateData({ rooms: newRooms });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Prix (FCFA)</label>
                      <input
                        type="number"
                        value={room.price}
                        onChange={(e) => {
                          const newRooms = [...data.rooms];
                          newRooms[index].price = parseInt(e.target.value) || 0;
                          updateData({ rooms: newRooms });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Description</label>
                      <textarea
                        value={room.description}
                        onChange={(e) => {
                          const newRooms = [...data.rooms];
                          newRooms[index].description = e.target.value;
                          updateData({ rooms: newRooms });
                        }}
                        rows={3}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <ImageUpload
                        label="URL de l'image"
                        value={room.images[0] || ''}
                        onChange={(val) => {
                          const newRooms = [...data.rooms];
                          newRooms[index].images[0] = val;
                          updateData({ rooms: newRooms });
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Caractéristiques (séparées par des virgules)</label>
                      <input
                        type="text"
                        value={room.features.join(', ')}
                        onChange={(e) => {
                          const newRooms = [...data.rooms];
                          newRooms[index].features = e.target.value.split(',').map(f => f.trim()).filter(f => f);
                          updateData({ rooms: newRooms });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newRoom = {
                    id: `room-${Date.now()}`,
                    name: 'Nouvelle Chambre',
                    description: 'Description de la chambre',
                    price: 0,
                    images: [''],
                    features: []
                  };
                  updateData({ rooms: [...data.rooms, newRoom] });
                }}
                className="w-full py-4 border-2 border-dashed border-royal-gold/50 text-royal-gold hover:bg-royal-gold/10 rounded flex items-center justify-center transition-colors"
              >
                <Plus className="h-6 w-6 mr-2" />
                Ajouter une chambre
              </button>
            </div>
          </div>
        );
      case 'restaurant':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-cinzel text-royal-green mb-6 border-b border-royal-gold/30 pb-2">Gestion du Restaurant</h2>
            <div className="grid grid-cols-1 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Titre du Restaurant</label>
                <input
                  type="text"
                  value={data.restaurant.title}
                  onChange={(e) => updateData({ restaurant: { ...data.restaurant, title: e.target.value } })}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold font-cinzel"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-royal-green/80 mb-2">Description</label>
                <textarea
                  value={data.restaurant.description}
                  onChange={(e) => updateData({ restaurant: { ...data.restaurant, description: e.target.value } })}
                  rows={3}
                  className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                />
              </div>
            </div>

            <h3 className="text-xl font-cinzel text-royal-gold mb-4">Menu</h3>
            <div className="space-y-6">
              {data.restaurant.menu.map((item, index) => (
                <div key={item.id} className="bg-royal-silk/50 p-6 rounded border border-royal-green/10 relative">
                  <button
                    onClick={() => {
                      const newMenu = [...data.restaurant.menu];
                      newMenu.splice(index, 1);
                      updateData({ restaurant: { ...data.restaurant, menu: newMenu } });
                    }}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Nom du plat</label>
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => {
                          const newMenu = [...data.restaurant.menu];
                          newMenu[index].name = e.target.value;
                          updateData({ restaurant: { ...data.restaurant, menu: newMenu } });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Prix (FCFA)</label>
                      <input
                        type="number"
                        value={item.price}
                        onChange={(e) => {
                          const newMenu = [...data.restaurant.menu];
                          newMenu[index].price = parseInt(e.target.value) || 0;
                          updateData({ restaurant: { ...data.restaurant, menu: newMenu } });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Catégorie</label>
                      <input
                        type="text"
                        value={item.category}
                        onChange={(e) => {
                          const newMenu = [...data.restaurant.menu];
                          newMenu[index].category = e.target.value;
                          updateData({ restaurant: { ...data.restaurant, menu: newMenu } });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Description</label>
                      <textarea
                        value={item.description}
                        onChange={(e) => {
                          const newMenu = [...data.restaurant.menu];
                          newMenu[index].description = e.target.value;
                          updateData({ restaurant: { ...data.restaurant, menu: newMenu } });
                        }}
                        rows={2}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newItem = {
                    id: `menu-${Date.now()}`,
                    name: 'Nouveau Plat',
                    description: 'Description du plat',
                    price: 0,
                    category: 'Plats'
                  };
                  updateData({ restaurant: { ...data.restaurant, menu: [...data.restaurant.menu, newItem] } });
                }}
                className="w-full py-4 border-2 border-dashed border-royal-gold/50 text-royal-gold hover:bg-royal-gold/10 rounded flex items-center justify-center transition-colors"
              >
                <Plus className="h-6 w-6 mr-2" />
                Ajouter un plat
              </button>
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-cinzel text-royal-green mb-6 border-b border-royal-gold/30 pb-2">Gestion du Blog</h2>
            <div className="space-y-8">
              {data.blog.map((post, index) => (
                <div key={post.id} className="bg-royal-silk/50 p-6 rounded border border-royal-green/10 relative">
                  <button
                    onClick={() => {
                      const newBlog = [...data.blog];
                      newBlog.splice(index, 1);
                      updateData({ blog: newBlog });
                    }}
                    className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Titre de l'article</label>
                      <input
                        type="text"
                        value={post.title}
                        onChange={(e) => {
                          const newBlog = [...data.blog];
                          newBlog[index].title = e.target.value;
                          updateData({ blog: newBlog });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold font-cinzel"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Date (AAAA-MM-JJ)</label>
                      <input
                        type="date"
                        value={post.date}
                        onChange={(e) => {
                          const newBlog = [...data.blog];
                          newBlog[index].date = e.target.value;
                          updateData({ blog: newBlog });
                        }}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div>
                      <ImageUpload
                        label="URL de l'image"
                        value={post.image}
                        onChange={(val) => {
                          const newBlog = [...data.blog];
                          newBlog[index].image = val;
                          updateData({ blog: newBlog });
                        }}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Extrait (affiché sur la page liste)</label>
                      <textarea
                        value={post.excerpt}
                        onChange={(e) => {
                          const newBlog = [...data.blog];
                          newBlog[index].excerpt = e.target.value;
                          updateData({ blog: newBlog });
                        }}
                        rows={2}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-royal-green/80 mb-2">Contenu complet</label>
                      <textarea
                        value={post.content}
                        onChange={(e) => {
                          const newBlog = [...data.blog];
                          newBlog[index].content = e.target.value;
                          updateData({ blog: newBlog });
                        }}
                        rows={6}
                        className="w-full px-4 py-2 border border-royal-green/20 rounded focus:ring-2 focus:ring-royal-gold"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <button
                onClick={() => {
                  const newPost = {
                    id: `blog-${Date.now()}`,
                    title: 'Nouvel Article',
                    excerpt: 'Extrait de l\'article...',
                    content: 'Contenu complet de l\'article...',
                    date: new Date().toISOString().split('T')[0],
                    image: ''
                  };
                  updateData({ blog: [...data.blog, newPost] });
                }}
                className="w-full py-4 border-2 border-dashed border-royal-gold/50 text-royal-gold hover:bg-royal-gold/10 rounded flex items-center justify-center transition-colors"
              >
                <Plus className="h-6 w-6 mr-2" />
                Ajouter un article
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-royal-silk flex flex-col md:flex-row font-montserrat">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-royal-green text-royal-silk flex flex-col shadow-2xl z-20">
        <div className="p-6 text-center border-b border-royal-gold/20">
          <Crown className="h-10 w-10 text-royal-gold mx-auto mb-2" />
          <h1 className="font-cinzel font-bold text-lg text-royal-gold tracking-widest">LE TRÔNE</h1>
          <p className="text-[10px] tracking-[0.2em] uppercase text-royal-silk/60">Administration</p>
        </div>

        <nav className="flex-grow py-6 px-4 space-y-2">
          {[
            { id: 'settings', icon: Settings, label: 'Paramètres' },
            { id: 'home', icon: Home, label: 'Accueil' },
            { id: 'rooms', icon: Bed, label: 'Chambres' },
            { id: 'restaurant', icon: Utensils, label: 'Restaurant' },
            { id: 'events', icon: Calendar, label: 'Banquet' },
            { id: 'blog', icon: FileText, label: 'Blog' },
            { id: 'about', icon: Info, label: 'À Propos' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded transition-colors ${
                activeTab === item.id 
                  ? 'bg-royal-gold text-royal-green font-bold' 
                  : 'text-royal-silk/70 hover:bg-royal-green/80 hover:text-royal-gold'
              }`}
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-royal-gold/20">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center space-x-2 text-royal-silk/50 hover:text-red-400 transition-colors py-2"
          >
            <LogOut className="h-5 w-5" />
            <span>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow flex flex-col h-screen overflow-hidden">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-8 py-4 flex justify-between items-center z-10">
          <h2 className="text-xl font-cinzel text-royal-green font-bold capitalize">
            {activeTab === 'events' ? 'Banquet' : activeTab}
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.open('/', '_blank')}
              className="text-sm text-royal-green/60 hover:text-royal-gold transition-colors font-medium"
            >
              Voir le site
            </button>
            <button
              onClick={saveChanges}
              disabled={isSaving}
              className={`flex items-center space-x-2 px-6 py-2 rounded font-bold transition-all ${
                isSaving 
                  ? 'bg-green-500 text-white' 
                  : 'bg-royal-gold text-royal-green hover:bg-royal-green hover:text-royal-gold'
              }`}
            >
              <Save className="h-4 w-4" />
              <span>{isSaving ? 'Enregistré !' : 'Enregistrer'}</span>
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-grow p-8 overflow-y-auto bg-royal-silk/50">
          <div className="bg-white rounded shadow-sm p-8 border-t-4 border-royal-gold max-w-5xl mx-auto">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
}
