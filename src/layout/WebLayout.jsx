import React from "react";
import NavBer from "../components/NavBer";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

const WebLayout = () => {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-brand-100 selection:text-brand-900">
      <NavBer />
      
      <main className="flex-grow relative">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-40 bg-slate-50/80 backdrop-blur-sm flex items-center justify-center min-h-[60vh]"
            >
              <div className="flex flex-col items-center space-y-4">
                <div className="w-12 h-12 border-4 border-brand-200 border-t-brand-500 rounded-full animate-spin" />
                <p className="text-slate-500 font-medium animate-pulse">Loading adventure...</p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <Outlet />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default WebLayout;
