import React, { useContext, useEffect, useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import { ThemeContext } from "../context/Theme";
import VisaCard from "./VisaCard";
import { motion } from "framer-motion";

const LatestVisa = () => {
  const letestVisa = useLoaderData().slice(0, 6);
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`py-24 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-20">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`text-4xl md:text-5xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            <Typewriter
              words={["Latest Visa Opportunities"]}
              loop={true}
              cursor
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </motion.h2>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Discover our newest visa offerings tailored for your unique journey. 
            Updated daily to ensure you never miss an opportunity to explore the world.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {letestVisa.map((visa) => (
            <VisaCard key={visa._id} visa={visa} theme={theme} />
          ))}
        </div>

        <div className="flex justify-center">
          <Link to='/all-visa' className="btn-gradient-modern inline-flex items-center">
            See All Visas
          </Link>
        </div>
      </div>
    </section>
  );
};

export default LatestVisa;
