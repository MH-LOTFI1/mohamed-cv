"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp, FaUser, FaEnvelope, FaComment } from "react-icons/fa";
import { useLanguage } from "@/app/context/LanguageContext";

const FloatingLabelInput = ({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder, 
  type = "text", 
  error, 
  icon 
}: { 
  id: string; 
  name: string; 
  value: string; 
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; 
  placeholder: string; 
  type?: string;
  error?: string;
  icon: React.ReactNode;
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const isActive = isFocused || value.length > 0;

  if (name === "message") {
    return (
      <div className="relative">
        <label 
          htmlFor={id} 
          className={`absolute left-12 transition-all duration-200 ${
            isActive 
              ? 'transform -translate-y-6 text-xs text-blue-600 dark:text-blue-400' 
              : 'transform translate-y-2 text-gray-500'
          }`}
        >
          {placeholder}
        </label>
        <div className="absolute left-4 top-4 text-gray-400">
          {icon}
        </div>
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          rows={5}
          className={`w-full border rounded-lg px-4 py-3 pt-6 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
          } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }

  return (
    <div className="relative">
      <label 
        htmlFor={id} 
        className={`absolute left-12 transition-all duration-200 ${
          isActive 
            ? 'transform -translate-y-6 text-xs text-blue-600 dark:text-blue-400' 
            : 'transform translate-y-2 text-gray-500'
        }`}
      >
        {placeholder}
      </label>
      <div className="absolute left-4 top-3.5 text-gray-400">
        {icon}
      </div>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`w-full border rounded-lg px-4 py-3 pt-6 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
        } bg-white dark:bg-gray-800 text-gray-900 dark:text-white`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<{name?: string; email?: string; message?: string}>({});

  // After mounting, we can access localStorage and browser APIs
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors: {name?: string; email?: string; message?: string} = {};
    
    if (!formState.name.trim()) {
      newErrors.name = t("contact.form.name") + " " + "is required";
    }
    
    if (!formState.email.trim()) {
      newErrors.email = t("contact.form.email") + " " + "is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formState.email)) {
      newErrors.email = "Please enter a valid email";
    }
    
    if (!formState.message.trim()) {
      newErrors.message = t("contact.form.message") + " " + "is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch("https://formspree.io/f/meokeknn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formState)
      });
      
      if (response.ok) {
        setIsSubmitted(true);
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again later.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show a simple placeholder while waiting for client-side hydration
  if (!mounted) {
    return (
      <section id="contact" className="w-full bg-gradient-to-tr from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
              {t("contact.title")}
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {t("contact.subtitle") || "Get in touch"}
            </p>
          </div>
          
          {/* Form placeholder to prevent layout shift */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8">
            <div className="space-y-6">
              {/* Name field placeholder */}
              <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              
              {/* Email field placeholder */}
              <div className="h-16 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              
              {/* Message field placeholder */}
              <div className="h-40 bg-gray-100 dark:bg-gray-700 rounded-lg animate-pulse"></div>
              
              {/* Submit button placeholder */}
              <div className="h-12 w-full sm:w-40 bg-blue-500/50 dark:bg-blue-700/50 rounded-full mx-auto"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="w-full bg-gradient-to-tr from-blue-50 to-slate-50 dark:from-gray-900 dark:to-gray-800 py-20 px-4">
      <motion.div 
        className="max-w-3xl mx-auto px-4 py-16"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t("contact.subtitle")}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Contact Form */}
          <motion.div 
            className="lg:flex-1 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {isSubmitted ? (
              <div className="text-center py-10">
                <svg 
                  className="w-16 h-16 text-green-500 mx-auto mb-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">
                  {t("contact.form.success")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {t("contact.form.thanks")}
                </p>
                <button
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline"
                  onClick={() => setIsSubmitted(false)}
                >
                  {t("contact.form.another")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <FloatingLabelInput
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder={t("contact.form.name")}
                  error={errors.name}
                  icon={<FaUser />}
                />
                
                <FloatingLabelInput
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder={t("contact.form.email")}
                  error={errors.email}
                  icon={<FaEnvelope />}
                />
                
                <FloatingLabelInput
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder={t("contact.form.message")}
                  error={errors.message}
                  icon={<FaComment />}
                />
                
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? t("contact.form.sending") : t("contact.form.send")}
                </motion.button>
              </form>
            )}
          </motion.div>
          
          {/* WhatsApp Button - Side on desktop, below on mobile */}
          <motion.div
            className="flex flex-col gap-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-green-400 to-green-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-200"></div>
              <a
                href="https://wa.me/212612267326"
                target="_blank"
                rel="noopener noreferrer"
                className="relative flex items-center justify-center gap-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-bold py-6 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 group-hover:scale-[1.01]"
              >
                <FaWhatsapp className="text-2xl" />
                <span>{t("contact.whatsapp")}</span>
              </a>
              <div className="invisible group-hover:visible absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full mt-1 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                {t("contact.whatsappNote")}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact; 