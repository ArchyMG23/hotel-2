import React, { createContext, useContext, useState, useEffect } from 'react';
import { SiteData, defaultSiteData } from '../data/siteData';

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
    fetch('/api/data')
      .then(res => res.json())
      .then(stored => {
        if (stored && Object.keys(stored).length > 0) {
          setData({ ...defaultSiteData, ...stored });
        } else {
          // Initialize server with default data if empty
          fetch('/api/data', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(defaultSiteData)
          }).catch(err => console.error("Failed to initialize server data", err));
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Error loading data from server", err);
        setIsLoading(false);
      });
  }, []);

  const updateData = (newData: Partial<SiteData> | ((prev: SiteData) => SiteData)) => {
    setData(prev => {
      const updated = typeof newData === 'function' ? newData(prev) : { ...prev, ...newData };
      
      // Save to server
      fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated)
      }).catch(err => {
        console.error("Failed to save site data to server", err);
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
