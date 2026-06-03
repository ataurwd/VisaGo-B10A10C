import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";
import { motion } from "framer-motion";
import { Globe2, ArrowRight } from "lucide-react";

const countries = [
  {
    name: "Australia",
    img: "https://wp2022.kodesolution.com/vizox/wp-content/uploads/2022/12/flag-1.jpg",
    details: "The Land Down Under offers great opportunities."
  },
  {
    name: "Germany",
    img: "https://wp2022.kodesolution.com/vizox/wp-content/uploads/2022/12/f1-150x150.png",
    details: "Engine of Europe with a robust economy."
  },
  {
    name: "Brazil",
    img: "https://wp2022.kodesolution.com/vizox/wp-content/uploads/2022/12/f2-150x150.png",
    details: "Vibrant culture and growing tech sector."
  },
  {
    name: "Russia",
    img: "https://wp2022.kodesolution.com/vizox/wp-content/uploads/2022/12/f4-150x150.png",
    details: "Rich history and vast opportunities."
  },
  {
    name: "Saudi Arabia",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/Flag_of_Saudi_Arabia.svg/1200px-Flag_of_Saudi_Arabia.svg.png",
    details: "Economic hub of the Middle East."
  },
  {
    name: "United Kingdom",
    img: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg/1200px-Flag_of_the_United_Kingdom_%281-2%29.svg.png",
    details: "Global center for finance and education."
  },
];

const CountryCard = ({ country, index, theme }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, delay: index * 0.1 }}
    whileHover={{ y: -5 }}
    className={`group relative overflow-hidden rounded-3xl border border-white/10 p-8 flex flex-col items-center text-center transition-all duration-300 ${
      theme === 'dark' ? 'bg-slate-900/50 hover:bg-slate-800' : 'bg-white/10 hover:bg-white/20'
    } backdrop-blur-md`}
  >
    <div className="relative mb-6">
      <div className="absolute inset-0 bg-brand-400 blur-2xl opacity-20 group-hover:opacity-40 transition-opacity" />
      <img
        src={country.img}
        alt={country.name}
        className="relative w-24 h-24 object-cover rounded-full border-4 border-white/20 shadow-modern-lg"
      />
    </div>
    <h4 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-400 transition-colors">
      {country.name}
    </h4>
    <p className="text-slate-300 text-sm leading-relaxed mb-6">
      {country.details}
    </p>
    <button className="flex items-center space-x-2 text-brand-400 font-bold text-sm uppercase tracking-widest hover:text-white transition-colors">
      <span>Explore</span>
      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
    </button>
  </motion.div>
);

const CountriesSection = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <section 
      className={`py-24 px-6 md:px-20 relative overflow-hidden ${theme === 'dark' ? 'bg-themeDatak' : 'bg-primary'}`}
    >
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{backgroundImage: 'url(https://wp2022.kodesolution.com/vizox/wp-content/uploads/2023/01/lines-waves1.png)', backgroundSize: 'cover'}}
      />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-brand-400/20 blur-[120px] rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center space-x-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm mb-6"
          >
            <Globe2 className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-brand-400 uppercase tracking-widest">
              Global Reach
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6">
            Supported Destinations
          </h2>
          <p className="text-slate-300 max-w-2xl mx-auto text-lg">
            We've partnered with governments and embassies worldwide to bring you the fastest visa processing for the most popular destinations.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} index={index} theme={theme} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountriesSection;
