"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect } from "react";

// Define type for education items
type EducationItem = {
  year: string;
  title: string;
  description: string;
};

const Education = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a simple placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section id="education" className="w-full bg-[#fdf8f2] dark:bg-gray-800 py-20 px-6 md:px-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            {t("education.title")}
          </h2>
        </div>
      </section>
    );
  }

  // Get education items from translations - convert through unknown first to avoid type errors
  const timelineData = t("education.items", { returnObjects: true }) as EducationItem[];

  // Helper function to extract the last year from a year string
  const extractYear = (year: string) => parseInt(year.split(/[–-]/).pop() || year);

  // Sort the timeline data from oldest to most recent
  const sortedTimelineData = [...timelineData].sort((a, b) => {
    // Extract years, ensuring we get the last number in ranges like "2024–2025"
    const yearA = extractYear(a.year);
    const yearB = extractYear(b.year);
    return yearA - yearB; // Sort in ascending order (oldest first)
  });

  return (
    <section id="education" className="w-full bg-[#fdf8f2] dark:bg-gray-800 py-20 px-6 md:px-16">
      <div className="max-w-4xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-12 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("education.title")}
        </motion.h2>
        
        <div className="relative">
          {/* Timeline vertical line */}
          <div className="absolute left-0 md:left-1/4 top-0 bottom-0 w-0 border-l-2 border-blue-400 dark:border-blue-600 transform md:translate-x-1/2"></div>
          
          {/* Timeline items */}
          {sortedTimelineData.map((item, index) => (
            <motion.div 
              key={index}
              className="mb-10 relative flex flex-col md:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Year - Left side on desktop, top on mobile */}
              <div className="md:w-1/4 mb-4 md:mb-0 md:text-right md:pr-10 flex md:block items-center">
                <div className="absolute left-0 md:left-1/4 w-4 h-4 bg-white dark:bg-gray-900 border-2 border-blue-500 rounded-full transform md:translate-x-1/2 z-10"></div>
                <span className="ml-6 md:ml-0 font-semibold text-blue-600 dark:text-blue-400">
                  {item.year}
                </span>
              </div>
              
              {/* Content - Right side on desktop, bottom on mobile */}
              <div className="md:w-3/4 pl-6 md:pl-10">
                <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education; 