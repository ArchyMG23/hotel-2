import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, defaultSiteData } from '../data/siteData';
import localforage from 'localforage';

const STORAGE_KEY = 'nlonako_site_data_v2';

interface SiteDataContextType {
  data: SiteData;
  updateData: (newData: Partial<SiteData> | ((prev: SiteData) => SiteData)) => void;
  isLoading: boolean;
}

const SiteDataContext = createContext<SiteDataContextType | undefined>(undefined);

export function SiteDataProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<SiteData>(defaultSiteData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localforage.getItem<string>(STORAGE_KEY).then((stored) => {
      if (stored) {
        try {
          setData({ ...defaultSiteData, ...JSON.parse(stored) });
        } catch (e) {
          console.error("Failed to parse stored site data", e);
        }
      }
      setIsLoading(false);
    }).catch((err) => {
      console.error("Error loading data from localforage", err);
      setIsLoading(false);
    });
  }, []);

  const updateData = (newData: Partial<SiteData> | ((prev: SiteData) => SiteData)) => {
    setData(prev => {
      const updated = typeof newData === 'function' ? newData(prev) : { ...prev, ...newData };
      localforage.setItem(STORAGE_KEY, JSON.stringify(updated)).catch(err => {
        console.error("Failed to save site data", err);
      });
      return updated;
    });
  };

  return (
    <SiteDataContext.Provider value={{ data, updateData, isLoading }}>
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
