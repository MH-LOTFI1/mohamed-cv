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

  // Show a simple placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section 
        id="about" 
        className="w-full bg-[#fdf8f2] dark:bg-gray-800 py-20 px-6 md:px-16"
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100">
            {t("about.title")}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="about" 
      className="w-full bg-[#fdf8f2] dark:bg-gray-800 py-20 px-6 md:px-16"
    >
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.h2 
          className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-100"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {t("about.title")}
        </motion.h2>
        
        <motion.p 
          className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {t("about.text")}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default About; 