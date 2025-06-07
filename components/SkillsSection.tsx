"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect, useMemo } from "react";
import { Code, Globe, Brain } from "lucide-react";

// Define types for language items
type LanguageItem = {
  language: string;
  level: string;
  percent: number;
};

const SkillsSection = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  // Pre-compute data to avoid layout shifts during hydration
  const skillsData = useMemo(() => {
    try {
      return {
        technical: (t("skills.technical.items") as unknown as string[]) || [],
        languages: (t("skills.languages.items", { returnObjects: true }) as LanguageItem[]) || [],
        soft: (t("skills.soft.items") as unknown as string[]) || []
      };
    } catch (error) {
      return { technical: [], languages: [], soft: [] };
    }
  }, [t]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a placeholder with matching height/structure while waiting for client-side hydration
  if (!mounted) {
    return (
      <section id="skills" className="w-full py-20 px-4 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            {t("skills.title")}
          </h2>
          
          {/* Placeholder grid with the same structure to prevent layout shifts */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {[...Array(3)].map((_, idx) => (
              <div 
                key={idx} 
                className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 min-h-[320px]"
                aria-hidden="true"
              >
                <div className="flex items-center mb-4">
                  <div className="bg-gray-100 dark:bg-gray-700 p-3 rounded-lg mr-4 h-12 w-12"></div>
                  <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32"></div>
                </div>
                <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full mb-5"></div>
                <div className="space-y-3">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="flex items-start">
                      <div className="h-4 w-4 bg-gray-200 dark:bg-gray-700 rounded-full mr-2 mt-1"></div>
                      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="w-full py-20 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("skills.title")}
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Technical Skills */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg mr-4">
                <Code className="text-blue-500 dark:text-blue-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("skills.technical.title")}
              </h3>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-blue-300 rounded-full mb-5"></div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {skillsData.technical.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  <span className="text-blue-500 mr-2 text-lg">•</span>
                  <span className="text-sm md:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Languages */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-green-50 dark:bg-green-900/30 p-3 rounded-lg mr-4">
                <Globe className="text-green-500 dark:text-green-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("skills.languages.title")}
              </h3>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-green-500 to-green-300 rounded-full mb-5"></div>
            <ul className="space-y-5 text-gray-700 dark:text-gray-300">
              {skillsData.languages.map((item, index) => {
                return (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{item.language}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{item.level}</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <motion.div 
                        className="h-2.5 bg-gradient-to-r from-green-600 to-green-400 rounded-full"
                        initial={{ width: 0 }}
                        whileInView={{ width: `${item.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1), ease: "easeOut" }}
                        style={{ width: `${item.percent}%` }}
                      ></motion.div>
                    </div>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
          
          {/* Soft Skills */}
          <motion.div 
            className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 hover:scale-[1.02] hover:shadow-xl transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
          >
            <div className="flex items-center mb-4">
              <div className="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg mr-4">
                <Brain className="text-purple-500 dark:text-purple-400 h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                {t("skills.soft.title")}
              </h3>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full mb-5"></div>
            <ul className="space-y-3 text-gray-700 dark:text-gray-300">
              {skillsData.soft.map((item, index) => (
                <motion.li 
                  key={index} 
                  className="flex items-start"
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + (index * 0.05) }}
                >
                  <span className="text-purple-500 mr-2 text-lg">•</span>
                  <span className="text-sm md:text-base">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SkillsSection; 