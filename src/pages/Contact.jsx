import React, { useContext } from "react";
import { ThemeContext } from "../context/Theme";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

const Contact = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <section className={`py-24 px-6 md:px-20 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl md:text-5xl font-extrabold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            Contact Us
          </h2>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            Feel free to get in touch! Connect with us or send a message below.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Section: Contact Details */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex-1 space-y-8"
          >
            <div className={`p-8 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-modern-sm'}`}>
              <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                Get in Touch
              </h3>
              <p className={`mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                We love to hear from you! Whether you have a question or just want to say hi, our inbox is always open.
              </p>
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-brand-500/10 text-brand-500 rounded-full">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Email</p>
                    <a href="mailto:ataurrahman24707@gmail.com" className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'} hover:text-brand-500`}>
                      ataurrahman24707@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-brand-500/10 text-brand-500 rounded-full">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <p className={`text-sm font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Phone</p>
                    <a href="tel:+8801723025991" className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-slate-900'} hover:text-brand-500`}>
                      +88 01723025991
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className={`overflow-hidden rounded-3xl ${theme === 'dark' ? 'bg-slate-900' : 'bg-white shadow-modern-sm'}`}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9120431.442599641!2d-15.010438734450643!3d54.102608694230064!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x25a3b1142c791a9%3A0xc4f8a0433288257a!2sUnited%20Kingdom!5e1!3m2!1sen!2sbd!4v1736242867821!5m2!1sen!2sbd" 
                width="100%" 
                height="220" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location"
              />
            </div>
          </motion.div>

          {/* Right Section: Contact Form */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className={`flex-1 p-8 rounded-3xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-modern-sm'}`}
          >
            <h3 className={`text-2xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Send a Message
            </h3>
            <form className="space-y-6">
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-brand-500/20 transition-all ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your Phone
                </label>
                <input
                  type="tel"
                  className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-brand-500/20 transition-all ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label className={`block text-sm font-medium mb-2 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your Message
                </label>
                <textarea
                  rows="4"
                  className={`w-full px-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-brand-500/20 transition-all ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                  placeholder="Type your message here"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full btn-gradient-modern flex items-center justify-center space-x-2"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;