import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, defaultSiteData } from '../data/siteData';
import { db, auth } from '../firebase';
import { doc, onSnapshot, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged } from 'firebase/auth';

interface SiteDataContextType {
  data: SiteData;
  updateData: (newData: Partial<SiteData> | ((prev: SiteData) => SiteData)) => void;
  isLoading: boolean;
  isAuthReady: boolean;
  user: any;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthReady, setIsAuthReady] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthReady(true);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthReady) return;

    const docRef = doc(db, 'site_data', 'main');
    
    // First check if document exists and initialize if not (admin only)
    if (user && user.email === 'yombivictor@gmail.com') {
      getDoc(docRef).then(docSnap => {
        if (!docSnap.exists()) {
          setDoc(docRef, defaultSiteData).catch(err => console.error("Failed to initialize Firestore data", err));
        }
      }).catch(err => console.error("Error checking doc", err));
    }

    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        setData({ ...defaultSiteData, ...(docSnap.data() as SiteData) });
      }
      setIsLoading(false);
    }, (error) => {
      console.error("Firestore Error: ", error);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [isAuthReady, user]);

  const updateData = (newData: Partial<SiteData> | ((prev: SiteData) => SiteData)) => {
    setData(prev => {
      const updated = typeof newData === 'function' ? newData(prev) : { ...prev, ...newData };
      
      if (user && user.email === 'yombivictor@gmail.com') {
        const docRef = doc(db, 'site_data', 'main');
        setDoc(docRef, updated).catch(err => {
          console.error("Failed to save site data to Firestore", err);
        });
      }
      
      return updated;
    });
  };

  return (
    <SiteDataContext.Provider value={{ data, updateData, isLoading, isAuthReady, user }}>
      {children}
    </SiteDataContext.Provider>
  );
}

export function useSiteData() {
  const context = useContext(SiteDataContext);
  if (context === undefined) {
    throw new Error('useSiteData must be used within a SiteDataProvider');
  }
  return context;
}
