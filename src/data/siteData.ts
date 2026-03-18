export interface Room {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  features: string[];
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
}

export interface SiteData {
  settings: {
    whatsappNumber: string;
    email: string;
    secretCode: string;
    address: string;
    mapUrl: string;
  };
  home: {
    heroVideoUrl: string;
    heroImageUrl: string;
    heroTitle: string;
    heroSubtitle: string;
    welcomeTitle: string;
    welcomeText: string;
    welcomeDescription: string;
  };
  rooms: Room[];
  restaurant: {
    title: string;
    description: string;
    menu: MenuItem[];
  };
  events: {
    title: string;
    description: string;
    images: string[];
    bookedDates: string[]; // YYYY-MM-DD
  };
  blog: BlogPost[];
  about: {
    founderName: string;
    founderBio: string;
    founderImage: string;
    directorName: string;
    directorBio: string;
    directorImage: string;
    hotelDescription: string;
  };
}

export const defaultSiteData: SiteData = {
  settings: {
    whatsappNumber: "237600000000",
    email: "contact@letronedunlonako.com",
    secretCode: "ROYAL2026",
    address: "Mont Nlonako, Nkongsamba, Cameroun",
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3978.508097561845!2d9.9324!3d4.9542!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNTcnMTUuMSJOIDnCsDU1JzU2LjYiRQ!5e0!3m2!1sfr!2sfr!4v1620000000000!5m2!1sfr!2sfr"
  },
  home: {
    heroVideoUrl: "",
    heroImageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80&w=1920",
    heroTitle: "Le Trône du Nlonako",
    heroSubtitle: "Prestige Royal, Cosi, Africain Moderne",
    welcomeTitle: "Bienvenue au Sommet du Luxe",
    welcomeText: "Découvrez une expérience hôtelière unique au pied du Mont Nlonako. L'élégance africaine rencontre le prestige royal.",
    welcomeDescription: "Niché au cœur des montagnes verdoyantes, notre établissement est une invitation à l'évasion. Laissez-vous séduire par une architecture qui célèbre l'héritage africain tout en offrant un confort moderne absolu. Chaque espace a été pensé pour vous offrir une expérience sensorielle unique, où le luxe se conjugue avec la nature."
  },
  rooms: [
    {
      id: "suite-royale",
      name: "Suite Royale",
      description: "Le summum du luxe avec vue panoramique sur le Mont Nlonako.",
      price: 150000,
      images: ["https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&q=80&w=1000"],
      features: ["Lit King Size", "Jacuzzi Privé", "Service de Majordome", "Vue Montagne"]
    },
    {
      id: "chambre-prestige",
      name: "Chambre Prestige",
      description: "Confort absolu et design moderne africain.",
      price: 80000,
      images: ["https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1000"],
      features: ["Lit Queen Size", "Douche à l'italienne", "Balcon Privé", "Wi-Fi Haut Débit"]
    }
  ],
  restaurant: {
    title: "La Table du Roi",
    description: "Une gastronomie raffinée mêlant saveurs locales et cuisine internationale.",
    menu: [
      { id: "m1", name: "Ndole Royal aux Crevettes", description: "Plat traditionnel revisité avec des crevettes géantes.", price: 15000, category: "Plats" },
      { id: "m2", name: "Filet de Bœuf au Poivre de Penja", description: "Viande tendre, sauce au poivre local.", price: 18000, category: "Plats" },
      { id: "m3", name: "Cocktail Nlonako", description: "Mélange de fruits exotiques et liqueur locale.", price: 5000, category: "Boissons" }
    ]
  },
  events: {
    title: "Salle de Banquet Majesté",
    description: "L'écrin parfait pour vos mariages, conférences et événements de prestige.",
    images: ["https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1000"],
    bookedDates: []
  },
  blog: [
    {
      id: "b1",
      title: "L'Histoire du Mont Nlonako",
      excerpt: "Découvrez les mythes et légendes qui entourent cette montagne sacrée.",
      content: "Le Mont Nlonako est bien plus qu'une simple élévation géographique...",
      date: "2026-03-01",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1000"
    }
  ],
  about: {
    hotelDescription: "Niché au cœur des montagnes verdoyantes du Cameroun, Le Trône du Nlonako est bien plus qu'un hôtel : c'est un sanctuaire de paix et de luxe. Alliant l'authenticité de l'architecture africaine moderne au confort des standards internationaux les plus exigeants, notre établissement vous promet une évasion inoubliable. Que vous soyez en quête de repos, d'aventure ou d'un cadre prestigieux pour vos événements, chaque détail a été pensé pour vous offrir une expérience royale.",
    founderName: "S.M. Le Fondateur",
    founderBio: "Visionnaire passionné par l'hospitalité et la culture africaine, il a conçu Le Trône du Nlonako comme un pont entre tradition et modernité.",
    founderImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=500",
    directorName: "Mme. La Directrice",
    directorBio: "Forte de 20 ans d'expérience dans l'hôtellerie de luxe internationale, elle veille à l'excellence de chaque détail.",
    directorImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=500"
  }
};
