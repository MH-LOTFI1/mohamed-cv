"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import frTranslations from "../locales/fr.json";
import enTranslations from "../locales/en.json";

type Translations = {
  [key: string]: any;
};

type TranslationOptions = {
  returnObjects?: boolean;
};

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string, options?: TranslationOptions) => string | any;
};

const translations: { [key: string]: Translations } = {
  fr: frTranslations,
  en: enTranslations,
};

const DEFAULT_LANGUAGE = "fr";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState(DEFAULT_LANGUAGE);
  const [mounted, setMounted] = useState(false);

  // Set mounted to true after first render
  useEffect(() => {
    setMounted(true);
    
    // Get language from localStorage if available
    const storedLanguage = localStorage.getItem("language");
    if (storedLanguage && (storedLanguage === "fr" || storedLanguage === "en")) {
      setLanguageState(storedLanguage);
    }
  }, []);

  // Update localStorage when language changes
  const setLanguage = (lang: string) => {
    setLanguageState(lang);
    if (mounted) {
      localStorage.setItem("language", lang);
    }
  };

  // Translation function
  const t = (key: string, options?: TranslationOptions): string | any => {
    // Split the key by dots to navigate through the nested objects
    const keys = key.split(".");
    let value: any = translations[language];
    
    for (const k of keys) {
      if (typeof value === 'object' && value !== null && k in value) {
        value = value[k];
      } else {
        // Fallback to the key if translation not found
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    
    // Return objects directly if returnObjects is true
    if (options?.returnObjects && typeof value === 'object') {
      return value;
    }
    
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
} 