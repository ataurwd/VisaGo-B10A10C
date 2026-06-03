import React, { useContext, useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";
import { ThemeContext } from "../context/Theme";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, LogOut, User as UserIcon } from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const NavBer = () => {
  const { user, logoutUser } = useContext(FormContext);
  const { theme, toggleTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const signOut = () => {
    logoutUser();
    navigate("/login");
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "All Visas", path: "/all-visa" },
    ...(user ? [
      { name: "Add Visa", path: "/add-visa" },
      { name: "My Added Visas", path: "/my-added-visa" },
      { name: "My Applications", path: "/my-visa-application" },
    ] : []),
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav
      className={cn(
        "sticky top-0 left-0 w-full z-50 transition-all duration-300 px-4 py-3 md:px-20",
        scrolled
          ? "bg-white/70 backdrop-blur-lg shadow-modern-lg py-2"
          : theme === "dark" ? "bg-themeDatak" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <motion.span 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
              "text-2xl font-bold tracking-tight",
              theme === "dark" || (scrolled && theme === "dark") ? "text-white" : "text-primary"
            )}
          >
            Visa<span className="text-brand-400">Go</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                cn(
                  "text-sm font-medium transition-colors hover:text-brand-500",
                  isActive 
                    ? "text-brand-500" 
                    : theme === "dark" ? "text-slate-300" : "text-slate-600"
                )
              }
            >
              {link.name}
            </NavLink>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-slate-600" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </button>

          {user ? (
            <div className="relative group">
              <motion.img
                whileHover={{ scale: 1.05 }}
                src={user?.photoURL}
                className="rounded-full w-10 h-10 cursor-pointer border-2 border-brand-200"
                alt="User"
              />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-modern-lg border border-slate-100 dark:border-slate-800 p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-sm font-semibold truncate dark:text-white">
                    {user?.displayName}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {user?.email}
                  </p>
                </div>
                <button
                  onClick={signOut}
                  className="w-full flex items-center space-x-2 px-3 py-2 mt-1 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="hidden md:flex items-center space-x-3">
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-primary transition-colors">
                Login
              </Link>
              <Link to="/register" className="btn-gradient-modern text-sm">
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-slate-600"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden mt-4 overflow-hidden bg-white dark:bg-slate-900 rounded-2xl shadow-modern-lg border border-slate-100 dark:border-slate-800"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      "text-base font-medium transition-colors",
                      isActive ? "text-brand-500" : "text-slate-600 dark:text-slate-300"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              {!user && (
                <div className="flex flex-col space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <Link to="/login" className="text-center font-semibold text-slate-600">
                    Login
                  </Link>
                  <Link to="/register" className="btn-gradient-modern text-center">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default NavBer;
