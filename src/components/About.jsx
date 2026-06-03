import React, { useContext } from "react";
import Lottie from "lottie-react";
import AboutAninmation from "../../src/lottie/about.json";
import { ThemeContext } from "../context/Theme";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const About = () => {
  const { theme } = useContext(ThemeContext);
  
  const features = [
    "Expert Visa Guidance",
    "100% Secure Process",
    "24/7 Global Support",
    "Fast Document Verification"
  ];

  return (
    <section className={`py-24 px-6 md:px-20 overflow-hidden ${theme === 'dark' ? 'bg-themeDatak' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2"
          >
            <span className="text-brand-500 font-bold uppercase tracking-widest text-sm mb-4 block">
              Our Story
            </span>
            <h2 className={`text-3xl md:text-5xl font-extrabold mb-6 leading-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Simplifying Global Travel <br />
              <span className="text-brand-500">One Visa at a Time</span>
            </h2>
            <p className={`text-lg mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              At VisaGo, we believe travel should be about the destination, not the paperwork. Our platform combines cutting-edge technology with human expertise to deliver a seamless, stress-free visa application experience for travelers worldwide.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
              {features.map((feature, i) => (
                <div key={i} className="flex items-center space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  <span className={`font-medium ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            <button className="btn-primary-modern">
              Learn More About Us
            </button>
          </motion.div>

          {/* Right Side: Visual */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-brand-400/10 blur-3xl rounded-full" />
            <div className="relative glass-card rounded-3xl p-8 border-brand-100/20">
              <Lottie 
                animationData={AboutAninmation} 
                loop={true} 
                className="w-full max-w-md mx-auto" 
              />
            </div>
            
            {/* Floating Badge */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 md:right-0 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-modern-lg border border-slate-100 dark:border-slate-700 z-10"
            >
              <p className="text-3xl font-bold text-brand-500">10k+</p>
              <p className={`text-xs font-bold uppercase tracking-tighter ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                Happy Travelers
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
