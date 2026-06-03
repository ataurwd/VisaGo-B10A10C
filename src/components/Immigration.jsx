import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";
import { motion } from "framer-motion";

const Immigration = () => {
  const { theme } = useContext(ThemeContext);
  const data = [
    {
      title: "Secure Processing",
      description: "Fast & Reliable Immigration Support",
      img: "https://i.ibb.co.com/nMtks7w/passport.png",
      color: "from-blue-500/10 to-blue-600/10",
    },
    {
      title: "Global Expertise",
      description: "Quick & Easy Visa Application",
      img: "https://i.ibb.co.com/HPPnCVX/group.png",
      color: "from-emerald-500/10 to-emerald-600/10",
    },
    {
      title: "Professional Team",
      description: "Skilled Consultants At Your Service",
      img: "https://i.ibb.co.com/BP9wCNv/visa.png",
      color: "from-amber-500/10 to-amber-600/10",
    },
  ];

  return (
    <div className={theme === 'dark' ? 'bg-themeDatak py-16' : 'bg-white py-16'}>
      <div className="max-w-7xl mx-auto px-6 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex items-center space-x-6 p-6 rounded-2xl border border-slate-100 dark:border-slate-800 bg-gradient-to-br ${item.color} hover:shadow-modern-lg transition-all duration-300 group`}
          >
            <div className="shrink-0 w-16 h-16 bg-white dark:bg-slate-800 rounded-xl flex items-center justify-center shadow-modern-sm group-hover:scale-110 transition-transform duration-300">
              <img
                className="w-10 h-10 object-contain"
                src={item.img}
                alt={item.title}
              />
            </div>
            <div className="space-y-1">
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-500">
                {item.title}
              </h3>
              <p className={`text-lg font-bold leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {item.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Immigration;
