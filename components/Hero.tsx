"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Show a simple placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section className="w-full bg-[#f7f7f7] dark:bg-gray-800 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Placeholder content */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
                Mohamed Lotfi
              </h1>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full bg-[#f7f7f7] dark:bg-gray-800 py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          {/* Text Content */}
          <motion.div 
            className="flex-1 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Mohamed Lotfi
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {t("hero.title")} – {t("hero.subtitle")}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {t("hero.tagline")}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Link 
                href="/Mohamed_Lotfi_CV.pdf"
                className="bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                {t("hero.downloadCV")}
              </Link>
              
              <a 
                href="#contact"
                onClick={scrollToContact}
                className="bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-medium py-3 px-6 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-300 text-center"
              >
                {t("hero.contactMe")}
              </a>
            </motion.div>
          </motion.div>
          
          {/* Profile Image - Desktop Only */}
          <motion.div 
            className="hidden md:block flex-shrink-0"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="relative w-80 h-80 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg">
              <Image 
                src="/pictures/mohamedlotfi.jpg"
                alt="Mohamed Lotfi"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 