import React, { useContext } from "react";
import Lottie from "lottie-react";
import Animation from "../../src/lottie/firstAnimation.json";
import { Typewriter } from "react-simple-typewriter";
import { ThemeContext } from "../context/Theme";
import { motion } from "framer-motion";
import { ArrowRight, FileText, Settings, Plane } from "lucide-react";

const ApplicationProcess = () => {
  const { theme } = useContext(ThemeContext);

  const steps = [
    {
      id: "01",
      title: "Apply Online",
      description: "Quickly fill out our smart forms, complete your secure payment, and upload required documents in minutes.",
      icon: <FileText className="w-6 h-6" />,
      color: "bg-blue-500"
    },
    {
      id: "02",
      title: "Leave the Rest to Us",
      description: "Our experts review your application, handle embassy appointments, and keep you updated at every stage.",
      icon: <Settings className="w-6 h-6" />,
      color: "bg-brand-500"
    },
    {
      id: "03",
      title: "Enjoy Your Visit",
      description: "Receive your approved visa via email. Simply show your passport and documents when you land at your destination.",
      icon: <Plane className="w-6 h-6" />,
      color: "bg-emerald-500"
    }
  ];

  return (
    <section className={`py-24 px-6 md:px-20 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-white'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            <Typewriter
              words={["Our Application Process"]}
              loop={true}
              cursor
              cursorStyle="_"
              typeSpeed={70}
              deleteSpeed={50}
              delaySpeed={1500}
            />
          </h2>
          <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Our streamlined workflow is designed to minimize effort and maximize success. 
            We've distilled the complex visa journey into three simple steps.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Steps */}
          <div className="lg:w-1/2 space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start gap-6 group"
              >
                <div className="relative">
                  <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300 z-10 relative`}>
                    {step.icon}
                  </div>
                  {index !== steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 -translate-x-1/2 w-0.5 h-12 bg-slate-100 dark:bg-slate-800" />
                  )}
                </div>
                <div className="flex-1 pt-1">
                  <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <span className="text-brand-500 mr-2">{step.id}.</span>
                    {step.title}
                  </h3>
                  <p className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'} leading-relaxed`}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="pt-6"
            >
              <button className="btn-gradient-modern group">
                Start My Application
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </div>

          {/* Lottie */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-brand-500/5 blur-3xl rounded-full" />
              <Lottie 
                animationData={Animation} 
                loop={true} 
                className="w-full max-w-lg mx-auto relative z-10" 
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationProcess;
