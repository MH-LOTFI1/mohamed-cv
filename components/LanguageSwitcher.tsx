"use client";

import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";

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
    <div className="flex items-center text-sm border border-gray-700 rounded-md overflow-hidden">
      <button
        onClick={() => setLanguage("fr")}
        className={`px-3 py-1 flex items-center gap-1 ${
          language === "fr" ? "bg-gray-700 text-white" : "hover:bg-gray-800"
        }`}
        aria-label="Switch to French"
      >
        <span role="img" aria-hidden="true">
          🇫🇷
        </span>
        <span>{t("languageSwitcher.fr")}</span>
      </button>
      <div className="h-4 w-px bg-gray-700"></div>
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 flex items-center gap-1 ${
          language === "en" ? "bg-gray-700 text-white" : "hover:bg-gray-800"
        }`}
        aria-label="Switch to English"
      >
        <span role="img" aria-hidden="true">
          🇺🇸
        </span>
        <span>{t("languageSwitcher.en")}</span>
      </button>
    </div>
  );
};

export default LanguageSwitcher; 