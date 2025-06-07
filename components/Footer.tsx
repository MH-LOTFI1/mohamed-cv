"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Sun, Moon, Info } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import { useLanguage } from "@/app/context/LanguageContext";
import { Popover } from "@headlessui/react";

type ToolButtonProps = {
  label: string;
  icon: string;
  tooltip: string;
};

const ToolButton = ({ label, icon, tooltip }: ToolButtonProps) => (
  <Popover className="relative">
    <Popover.Button className="flex items-center gap-1.5 rounded-full px-3 py-1 bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 focus:outline-none text-xs font-medium">
      <span role="img" aria-hidden="true" className="text-sm">
        {icon}
      </span>
      <span>{label}</span>
    </Popover.Button>
    <Popover.Panel className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 z-10 w-48 bg-black border border-neutral-700 rounded-md p-2 text-xs text-neutral-300">
      {tooltip}
      <div className="absolute h-2 w-2 bg-black border-r border-b border-neutral-700 transform rotate-45 left-1/2 -translate-x-1/2 -bottom-1"></div>
    </Popover.Panel>
  </Popover>
);

const Footer = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  // After mounting, we can access localStorage and render theme-dependent elements
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <footer className="w-full bg-black text-neutral-400 px-6 py-10">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left - Creator & Year */}
        <motion.div 
          className="text-center md:text-left text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          © {currentYear} Mohamed Lotfi. {t("footer.allRights")}
        </motion.div>
        
        {/* Center - Built with */}
        <motion.div 
          className="flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <span className="text-xs text-neutral-500 mb-1">{t("footer.builtWith")}</span>
          <div className="flex items-center gap-3">
            <ToolButton 
              label="ChatGPT" 
              icon="🤖" 
              tooltip="Used for development assistance, content generation, and problem-solving throughout the project."
            />
            <ToolButton 
              label="Cursor AI" 
              icon="⚡" 
              tooltip="Used to code the site, implement features, and improve code quality."
            />
          </div>
        </motion.div>
        
        {/* Right - Controls */}
        <motion.div 
          className="flex items-center gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {/* Language switcher */}
          <LanguageSwitcher />
          
          {/* Dark mode toggle */}
          <motion.button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle dark mode"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {theme === "dark" ? (
              <Sun className="w-4 h-4 text-yellow-300" />
            ) : (
              <Moon className="w-4 h-4 text-blue-300" />
            )}
          </motion.button>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer; 