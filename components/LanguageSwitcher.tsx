"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const LanguageSwitcher = () => {
  const { language, setLanguage, t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Wait for client-side hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center bg-neutral-800 rounded-full p-0.5">
      <motion.button
        onClick={() => setLanguage("fr")}
        className={`px-3 py-1 flex items-center gap-1 rounded-full text-xs transition-all duration-200 ${
          language === "fr" 
            ? "bg-neutral-700 text-white" 
            : "hover:bg-neutral-700/50 text-neutral-300"
        }`}
        whileHover={{ scale: language === "fr" ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch to French"
      >
        <span role="img" aria-hidden="true">
          🇫🇷
        </span>
        <span>{t("languageSwitcher.fr")}</span>
      </motion.button>

      <motion.button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 flex items-center gap-1 rounded-full text-xs transition-all duration-200 ${
          language === "en" 
            ? "bg-neutral-700 text-white" 
            : "hover:bg-neutral-700/50 text-neutral-300"
        }`}
        whileHover={{ scale: language === "en" ? 1 : 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Switch to English"
      >
        <span role="img" aria-hidden="true">
          🇺🇸
        </span>
        <span>{t("languageSwitcher.en")}</span>
      </motion.button>
    </div>
  );
};

export default LanguageSwitcher; 