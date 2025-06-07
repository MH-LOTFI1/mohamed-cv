"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useLanguage } from "@/app/context/LanguageContext";

const About = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle both array and string text formats
  const getAboutText = () => {
    try {
      const aboutText = t("about.text", { returnObjects: true });
      return Array.isArray(aboutText) ? aboutText : [aboutText];
    } catch (error) {
      return [""];
    }
  };

  // Pre-calculate text to avoid layout shifts
  const aboutTextArray = getAboutText();
  const hasText = aboutTextArray.length > 0 && aboutTextArray[0].length > 0;

  // Show a simple placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section 
        id="about" 
        className="w-full bg-[#fdf8f2] dark:bg-gray-800 py-20"
      >
        <div className="max-w-screen-md mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            {t("about.title")}
          </h2>
          <div className="w-24 h-1 bg-blue-500/30 dark:bg-blue-400/30 mx-auto my-6"></div>
          
          {/* Add static content placeholders to match height of actual content */}
          <div className="space-y-6">
            {hasText ? (
              aboutTextArray.map((_, index) => (
                <div key={index} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
              ))
            ) : (
              <div className="h-24 bg-gray-200 dark:bg-gray-700 rounded-md animate-pulse"></div>
            )}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="about" 
      className="w-full bg-[#fdf8f2] dark:bg-gray-800 py-20"
    >
      <motion.div 
        className="max-w-screen-md mx-auto text-center px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl font-bold text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("about.title")}
        </motion.h2>
        
        <div className="w-24 h-1 bg-blue-500/30 dark:bg-blue-400/30 mx-auto my-6"></div>
        
        <div className="space-y-6">
          {aboutTextArray.map((paragraph, index) => (
            <motion.p 
              key={index}
              className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default About; 