"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { FaMoon, FaSun } from "react-icons/fa";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/app/context/LanguageContext";

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();

  // After mounting, we can access localStorage and render theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="w-full bg-[#2f2f2f] dark:bg-black text-gray-300 dark:text-gray-200 py-6 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Built with section */}
        <div className="flex items-center gap-2 mb-4 md:mb-0">
          <span className="text-sm">{t("footer.builtWith")}</span>
          <div className="flex items-center gap-3">
            {/* ChatGPT icon */}
            <div className="flex items-center gap-1 bg-gray-800 dark:bg-gray-900 rounded-full px-3 py-1">
              <span role="img" aria-label="robot">🤖</span>
              <span className="text-xs">ChatGPT</span>
            </div>
            
            {/* Cursor AI icon */}
            <div className="flex items-center gap-1 bg-gray-800 dark:bg-gray-900 rounded-full px-3 py-1">
              <span role="img" aria-label="cursor">🖱️</span>
              <span className="text-xs">Cursor AI</span>
            </div>
          </div>
        </div>
        
        {/* Controls - Dark mode and language */}
        <div className="flex items-center gap-6">
          {/* Language switcher */}
          <LanguageSwitcher />
          
          {/* Dark mode toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-800 dark:bg-gray-700 hover:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
            aria-label="Toggle dark mode"
          >
            {theme === "dark" ? (
              <FaSun className="text-yellow-300" />
            ) : (
              <FaMoon className="text-blue-300" />
            )}
          </button>
        </div>
      </div>
      
      {/* Copyright */}
      <div className="text-center mt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} Mohamed Lotfi. {t("footer.allRights")}
      </div>
    </footer>
  );
};

export default Footer; 