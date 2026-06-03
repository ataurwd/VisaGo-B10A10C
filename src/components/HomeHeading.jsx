import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Globe, Shield, Zap } from "lucide-react";
import { Link } from "react-router-dom";

const HomeHeading = () => {
  const slides = [
    {
      id: 1,
      title: "Your Journey Starts with a Single Step",
      subtitle: "Welcome to VisaGo",
      description: "Simplify your global travel with our lightning-fast visa processing. Secure, transparent, and built for the modern traveler.",
      bgImage: "https://images.unsplash.com/photo-1436491865332-7a61a109c0f3?auto=format&fit=crop&q=80&w=2000",
      icon: <Globe className="w-6 h-6" />,
    },
    {
      id: 2,
      title: "Effortless Visa Applications",
      subtitle: "Fast & Secure",
      description: "Experience the future of travel documentation. Our AI-powered system ensures your application is perfect every time.",
      bgImage: "https://images.unsplash.com/photo-1544016768-982d1554f0b9?auto=format&fit=crop&q=80&w=2000",
      icon: <Zap className="w-6 h-6" />,
    },
    {
      id: 3,
      title: "Global Support, Local Expertise",
      subtitle: "Trusted Worldwide",
      description: "Our team of experts is available 24/7 to guide you through complex regulations and ensure a smooth approval process.",
      bgImage: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&q=80&w=2000",
      icon: <Shield className="w-6 h-6" />,
    },
  ];

  return (
    <section className="relative h-[90vh] overflow-hidden bg-slate-900">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        loop
        navigation
        pagination={{ clickable: true }}
        className="h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full flex items-center">
              {/* Background Image with Zoom Effect */}
              <div className="absolute inset-0">
                <img
                  src={slide.bgImage}
                  className="w-full h-full object-cover scale-105 animate-[zoom-slow_20s_infinite_alternate]"
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative z-10 container mx-auto px-6 md:px-20">
                <div className="max-w-3xl">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center space-x-2 text-brand-400 mb-6"
                  >
                    <div className="p-2 bg-brand-400/10 rounded-lg backdrop-blur-sm">
                      {slide.icon}
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest">
                      {slide.subtitle}
                    </span>
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-4xl md:text-7xl font-extrabold text-white mb-6 leading-tight"
                  >
                    {slide.title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl"
                  >
                    {slide.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <Link
                      to="/all-visa"
                      className="btn-gradient-modern inline-flex items-center justify-center group"
                    >
                      Start Application
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link
                      to="/contact"
                      className="px-8 py-3 rounded-xl font-bold text-white border border-white/20 hover:bg-white/10 transition-all backdrop-blur-sm inline-flex items-center justify-center"
                    >
                      View Countries
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes zoom-slow {
          from { transform: scale(1); }
          to { transform: scale(1.1); }
        }
        .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          width: 24px !important;
          border-radius: 4px !important;
        }
        .swiper-button-next, .swiper-button-prev {
          color: white !important;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(4px);
          width: 50px !important;
          height: 50px !important;
          border-radius: 50%;
        }
        .swiper-button-next::after, .swiper-button-prev::after {
          font-size: 20px !important;
        }
      `}} />
    </section>
  );
};

export default HomeHeading;
