"use client";

import Image from "next/image";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useLanguage } from "@/app/context/LanguageContext";
import { FaFileDownload, FaEnvelope } from "react-icons/fa";

// Image dimensions - fixed to prevent CLS
const IMAGE_DIMENSIONS = {
  sm: 160, // w-40 h-40 equivalent
  md: 192, // w-48 h-48 equivalent
  lg: 224  // w-56 h-56 equivalent
};

const Hero = () => {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const { t } = useLanguage();
  const [imageDimension, setImageDimension] = useState(IMAGE_DIMENSIONS.sm);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set image dimensions based on screen size
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setImageDimension(IMAGE_DIMENSIONS.lg);
      } else if (window.innerWidth >= 768) {
        setImageDimension(IMAGE_DIMENSIONS.md);
      } else {
        setImageDimension(IMAGE_DIMENSIONS.sm);
      }
    };
    
    // Set initial dimension
    handleResize();
    
    // Add resize listener
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const scrollToContact = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle image load error
  const handleImageError = () => {
    console.error("Error loading profile image");
    setImageError(true);
  };

  // Show a simple placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section className="relative min-h-screen w-full flex items-center justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="text-center">
            {/* Static placeholder to reduce CLS */}
            <div className="mx-auto w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg ring-4 ring-blue-50 dark:ring-gray-800 mb-6"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4">
              Mohamed Lotfi
            </h1>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 z-0"></div>
      
      {/* Decorative blurred shapes - constrained to prevent overflow */}
      <div className="absolute top-[10%] left-[10%] max-w-[80%] w-64 h-64 md:w-80 md:h-80 bg-blue-200 dark:bg-blue-700 rounded-full filter blur-3xl opacity-20 z-0"></div>
      <div className="absolute bottom-[10%] right-[10%] max-w-[80%] w-64 h-64 md:w-80 md:h-80 bg-purple-200 dark:bg-purple-700 rounded-full filter blur-3xl opacity-20 z-0"></div>
      
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 z-10 py-8">
        <div className="flex flex-col items-center justify-center text-center gap-6">
          {/* Profile Image - Optimized for LCP */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg ring-4 ring-blue-50 dark:ring-gray-800"
          >
            {imageError ? (
              <div className="w-full h-full flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-3xl font-bold">
                ML
              </div>
            ) : (
              <picture>
                {/* Try webp image with simplified path */}
                <source srcSet="/profile.webp" type="image/webp" />
                {/* Try webp image with normal path */}
                <source srcSet="/pictures/mohamedlotfi.webp" type="image/webp" />
                {/* Fallback to SVG */}
                <source srcSet="/pictures/ml-fallback.svg" type="image/svg+xml" />
                {/* Final fallback to img */}
                <img 
                  src="/pictures/ml-fallback.svg"
                  alt="Mohamed Lotfi"
                  className="object-cover w-full h-full"
                  onError={handleImageError}
                />
              </picture>
            )}
          </motion.div>
          
          {/* Text Content */}
          <motion.div 
            className="max-w-3xl mx-auto px-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Mohamed Lotfi
            </motion.h1>
            
            <motion.h2 
              className="text-xl md:text-2xl font-medium text-gray-700 dark:text-gray-300 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              {t("hero.title")} – {t("hero.subtitle")}
            </motion.h2>
            
            <motion.p 
              className="text-lg text-gray-600 dark:text-gray-400 mb-10 mx-auto max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              {t("hero.tagline")}
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-5 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Link 
                href="/Mohamed_Lotfi_CV.pdf"
                className="inline-flex items-center justify-center bg-blue-600 text-white font-medium py-3 px-8 rounded-full shadow-md hover:bg-blue-700 hover:scale-105 transition duration-300 text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFileDownload className="mr-2" />
                {t("hero.downloadCV")}
              </Link>
              
              <a 
                href="#contact"
                onClick={scrollToContact}
                className="inline-flex items-center justify-center bg-transparent border border-gray-300 dark:border-gray-600 text-gray-800 dark:text-white font-medium py-3 px-8 rounded-full shadow-md hover:bg-gray-100 dark:hover:bg-gray-700 hover:scale-105 transition duration-300 text-center"
              >
                <FaEnvelope className="mr-2" />
                {t("hero.contactMe")}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero; 