"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useLanguage } from "@/app/context/LanguageContext";
import { useState, useEffect, useRef, useMemo } from "react";
import { BookOpen, Briefcase, GraduationCap, Code, Brain } from "lucide-react";
import { Popover } from "@headlessui/react";

// Define enhanced type for education items
type EducationItem = {
  year: string;
  title: string;
  description: string;
};

// Helper to determine icon based on title content
const getIconForTitle = (title: string) => {
  if (title.includes("ENSA")) return <GraduationCap className="w-5 h-5" />;
  if (title.includes("Baccalauréat") || title.includes("Baccalaureate")) return <BookOpen className="w-5 h-5" />;
  if (title.includes("Cybersecurity") || title.includes("Cybersécurité")) return <Briefcase className="w-5 h-5" />;
  if (title.includes("Development") || title.includes("Développement")) return <Code className="w-5 h-5" />;
  return <Brain className="w-5 h-5" />;
};

// Helper to determine if an item is the most recent (current education)
const isCurrentEducation = (item: EducationItem): boolean => {
  return item.year.includes("2024–2025") || item.title.includes("ENSA");
};

// Helper to get color based on year (gradient from older to newer)
const getColorForYear = (year: string): string => {
  const extractedYear = parseInt(year.split(/[–-]/)[0]);
  
  switch(extractedYear) {
    case 2021: return "from-blue-300 to-blue-400";
    case 2022: return "from-blue-400 to-blue-500";
    case 2023: return "from-blue-500 to-blue-600";
    case 2024: return "from-blue-600 to-indigo-700";
    default: return "from-blue-500 to-indigo-600";
  }
};

// Helper function to extract the last year from a year string
const extractYear = (year: string) => parseInt(year.split(/[–-]/).pop() || year);

// Create tooltips based on education milestones
const getTooltip = (item: EducationItem, tooltips: Record<string, string>): string => {
  if (isCurrentEducation(item)) return tooltips.current || "Current education";
  if (item.year.includes("2021")) return tooltips.started || "Starting point";
  if (item.description.includes("discontinued")) return tooltips.discontinued || "Path change";
  return tooltips.milestone || "Educational milestone";
};

const Education = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });
  
  // Smooth out the scroll progress animation
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Pre-calculate timeline data to avoid layout shifts
  const timelineData = useMemo(() => {
    try {
      // Get education items from translations
      const items = t("education.items", { returnObjects: true }) as EducationItem[];
      
      // Sort the timeline data from oldest to most recent
      return [...items].sort((a, b) => {
        const yearA = extractYear(a.year);
        const yearB = extractYear(b.year);
        return yearA - yearB; // Sort in ascending order (oldest first)
      });
    } catch (error) {
      return [];
    }
  }, [t]);
  
  // Pre-load tooltips
  const tooltips = useMemo(() => {
    return {
      current: t("education.tooltips.current") || "Current education",
      started: t("education.tooltips.started") || "Starting point",
      discontinued: t("education.tooltips.discontinued") || "Path change",
      milestone: t("education.tooltips.milestone") || "Educational milestone"
    };
  }, [t]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show a detailed placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section id="education" className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-16 text-center text-gray-800 dark:text-white">
            {t("education.title")}
          </h2>
          
          {/* Timeline placeholder */}
          <div className="relative">
            {/* Timeline vertical line */}
            <div className="absolute left-[43px] sm:left-[67px] top-0 bottom-0 w-[2px] sm:w-[3px] bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            
            {/* Timeline placeholder items */}
            <div className="relative z-10 space-y-12">
              {[...Array(timelineData.length || 4)].map((_, index) => (
                <div 
                  key={index}
                  className="grid grid-cols-[auto_1px_1fr] sm:grid-cols-[auto_2px_1fr] gap-x-4 sm:gap-x-6 items-start"
                >
                  {/* Year placeholder */}
                  <div className="w-20 sm:w-32 text-right pr-2">
                    <div className="inline-block h-8 w-16 bg-blue-200 dark:bg-blue-700 rounded"></div>
                  </div>
                  
                  {/* Timeline dot placeholder */}
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 transform -translate-x-3"></div>
                  </div>
                  
                  {/* Content placeholder */}
                  <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 -ml-2 min-h-[100px]">
                    <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
                    <div className="h-4 w-full bg-gray-100 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 w-2/3 bg-gray-100 dark:bg-gray-700 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="education" className="w-full bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.h2 
          className="text-3xl font-bold mb-16 text-center text-gray-800 dark:text-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {t("education.title")}
        </motion.h2>
        
        <div className="relative" ref={containerRef}>
          {/* Timeline vertical line container with animated fill */}
          <div className="absolute left-[43px] sm:left-[67px] top-0 bottom-0 w-[2px] sm:w-[3px] bg-gray-200 dark:bg-gray-700 rounded-full">
            <motion.div 
              className="absolute top-0 w-full bg-gradient-to-b from-blue-300 via-blue-500 to-indigo-700 rounded-full"
              style={{ 
                originY: 0,
                scaleY,
                height: "100%" 
              }}
            />
          </div>
          
          {/* Timeline items */}
          <div className="relative z-10 space-y-12">
            {timelineData.map((item, index) => {
              const isCurrent = isCurrentEducation(item);
              const yearColor = getColorForYear(item.year);
              
              return (
                <motion.div 
                  key={index}
                  className="grid grid-cols-[auto_1px_1fr] sm:grid-cols-[auto_2px_1fr] gap-x-4 sm:gap-x-6 items-start"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {/* Year - Left column */}
                  <div className="w-20 sm:w-32 text-right pr-2">
                    <motion.span 
                      className={`inline-block font-semibold text-sm sm:text-base rounded px-2 py-1 bg-gradient-to-r ${yearColor} text-white`}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                    >
                      {item.year}
                    </motion.span>
                  </div>
                  
                  {/* Timeline dot - Center column */}
                  <Popover className="relative">
                    <Popover.Button className="focus:outline-none">
                      <motion.div 
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-r ${yearColor} shadow-md 
                        transform -translate-x-3 hover:scale-110 transition-transform duration-300
                        ${isCurrent ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-gray-800 scale-105' : ''}`}
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ type: "spring", stiffness: 300, delay: 0.2 + index * 0.1 }}
                      >
                        <span className="text-white">
                          {getIconForTitle(item.title)}
                        </span>
                      </motion.div>
                    </Popover.Button>
                    <Popover.Panel className="absolute z-20 px-3 py-2 mt-1 text-sm font-medium text-white bg-gray-900 rounded-md shadow-lg">
                      {getTooltip(item, tooltips)}
                    </Popover.Panel>
                  </Popover>
                  
                  {/* Content - Right column */}
                  <motion.div 
                    className={`bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 sm:p-5 -ml-2 hover:shadow-lg hover:scale-[1.02] transition-all duration-300
                    ${isCurrent ? 'border-l-4 border-blue-500' : ''}`}
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  >
                    <h3 className="font-bold text-base sm:text-lg text-gray-800 dark:text-white mb-1">
                      {item.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education; 