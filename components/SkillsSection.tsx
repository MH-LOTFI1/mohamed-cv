"use client";

import { motion } from "framer-motion";
import { FaCode, FaLanguage, FaUserCheck } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";

// Define types for language items
type LanguageItem = {
  language: string;
  level: string;
  percent: number;
};

const SkillsSection = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a simple placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section id="skills" className="w-full py-20 px-6 md:px-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white">
            {t("skills.title")}
          </h2>
        </div>
      </section>
    );
  }

  // Get arrays from translations - convert through unknown first to avoid type errors
  const technicalItems = t("skills.technical.items") as unknown as string[];
  const languageItems = t("skills.languages.items", { returnObjects: true }) as LanguageItem[];
  const softItems = t("skills.soft.items") as unknown as string[];

  return (
    <section id="skills" className="w-full py-20 px-6 md:px-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-10 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("skills.title")}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Technical Skills */}
          <motion.div 
            className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <FaCode className="text-blue-500 text-xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("skills.technical.title")}
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {technicalItems.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          
          {/* Languages */}
          <motion.div 
            className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <FaLanguage className="text-green-500 text-xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("skills.languages.title")}
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <ul className="space-y-4 text-gray-700 dark:text-gray-300">
                {languageItems.map((item, index: number) => {
                  // Use percent directly from translation file
                  const width = `${item.percent}%`;
                  
                  return (
                    <li key={index}>
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">{item.language}</span>
                        <span>{item.level}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width }}></div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div 
            className="bg-neutral-100 dark:bg-neutral-800 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <FaUserCheck className="text-purple-500 text-xl mr-3" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("skills.soft.title")}
              </h3>
            </div>
            <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                {softItems.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="text-purple-500 mr-2">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 