import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Clock, DollarSign, Calendar, ArrowRight, Tag } from "lucide-react";

const VisaCard = ({ visa, theme }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className={`group rounded-3xl overflow-hidden border transition-all duration-300 ${
        theme === 'dark' 
          ? 'bg-slate-900 border-slate-800 hover:border-brand-500/50' 
          : 'bg-white border-slate-100 hover:border-brand-500/50 shadow-modern-sm hover:shadow-modern-lg'
      }`}
    >
      {/* Image Container */}
      <div className="relative h-56 overflow-hidden">
        <img
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          src={visa.countryImage}
          alt={visa.countryName}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-xs font-bold uppercase tracking-widest border border-white/20">
            {visa.visaType}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
          {visa.countryName}
        </h3>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center space-x-2 text-slate-500">
            <DollarSign className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium">${visa.fee}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-500">
            <Clock className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium">{visa.formatHour}</span>
          </div>
          <div className="flex items-center space-x-2 text-slate-500 col-span-2">
            <Calendar className="w-4 h-4 text-brand-500" />
            <span className="text-sm font-medium line-clamp-1">{visa.validity}</span>
          </div>
        </div>

        <Link
          to={`/all-visa/${visa._id}`}
          className="w-full btn-primary-modern flex items-center justify-center group/btn"
        >
          See Details
          <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};

export default VisaCard;
