import React, { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Star, Quote } from "lucide-react";
import { ThemeContext } from "../context/Theme";
import { motion } from "framer-motion";

const reviews = [
  {
    img: "https://img.freepik.com/free-photo/young-man-with-beard-white-t-shirt_273609-5760.jpg?semt=ais_hybrid",
    name: "John Doe",
    comment: "Amazing product! Highly recommended for anyone looking for quality and durability.",
    rating: 5,
    role: "Digital Nomad"
  },
  {
    img: "https://randomuser.me/api/portraits/men/75.jpg",
    name: "Jane Smith",
    comment: "Great service and quality! I'm really satisfied with my purchase.",
    rating: 5,
    role: "Business Traveler"
  },
  {
    img: "https://randomuser.me/api/portraits/women/25.jpg",
    name: "Alice Brown",
    comment: "I am extremely satisfied! Everything was perfect from start to finish.",
    rating: 4.5,
    role: "Expat"
  },
  {
    img: "https://randomuser.me/api/portraits/men/30.jpg",
    name: "Emily Davis",
    comment: "Excellent experience! Fast delivery and top-notch product quality.",
    rating: 5,
    role: "Software Engineer"
  },
  {
    img: "https://randomuser.me/api/portraits/women/10.jpg",
    name: "Sarah Johnson",
    comment: "Simply outstanding! From customer service to product quality, everything was perfect.",
    rating: 4.2,
    role: "Travel Blogger"
  }
];

const BuyerReview = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <section className={`py-24 px-6 md:px-20 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-extrabold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            What Our Travelers Say
          </motion.h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Join thousands of satisfied customers who found their way with VisaGo.
          </p>
        </div>

        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          autoplay={{ delay: 5000 }}
          pagination={{ clickable: true }}
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-16"
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className={`h-full p-8 rounded-3xl border transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-slate-900 border-slate-800 hover:border-brand-500/50' 
                  : 'bg-white border-slate-100 hover:border-brand-500/50 shadow-modern-sm'
              }`}>
                <Quote className="w-10 h-10 text-brand-500/20 mb-6" />
                <p className={`text-lg leading-relaxed mb-8 italic ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                  "{review.comment}"
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center space-x-4">
                    <img
                      src={review.img}
                      alt={review.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-brand-500/20"
                    />
                    <div>
                      <h4 className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {review.name}
                      </h4>
                      <p className="text-xs text-brand-500 font-semibold uppercase tracking-wider">
                        {review.role}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="font-bold text-sm">{review.rating}</span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BuyerReview;
