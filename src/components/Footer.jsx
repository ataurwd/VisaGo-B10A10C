import React from "react";
import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const socialLinks = [
  {
    icon: <FaFacebook className="w-5 h-5" />,
    url: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <FaTwitter className="w-5 h-5" />,
    url: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: <FaLinkedin className="w-5 h-5" />,
    url: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: <FaGithub className="w-5 h-5" />,
    url: "https://github.com",
    label: "GitHub",
  },
];

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8 px-6 md:px-20 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Brand */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold tracking-tight mb-6 inline-block"
          >
            Visa<span className="text-brand-400">Go</span>
          </Link>

          <p className="text-slate-400 leading-relaxed mb-6">
            Empowering your global journey with seamless visa solutions and
            expert guidance. Your trusted partner for international travel.
          </p>

          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="p-2 rounded-lg bg-slate-800 hover:bg-brand-500 transition-colors duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
            Explore
          </h3>

          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/all-visa"
                className="text-slate-400 hover:text-white transition-colors"
              >
                All Visas
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
            Support
          </h3>

          <ul className="space-y-4">
            <li>
              <Link
                to="/my-visa-application"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Track Application
              </Link>
            </li>

            <li>
              <Link
                to="/privacy-policy"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
            </li>

            <li>
              <Link
                to="/terms-and-conditions"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-6">
            Contact Us
          </h3>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-400">
              <MapPin className="w-5 h-5 text-brand-400 shrink-0 mt-1" />
              <span>123 Global Plaza, Metropolis City, Earth</span>
            </li>

            <li className="flex items-center gap-3 text-slate-400">
              <Phone className="w-5 h-5 text-brand-400 shrink-0" />
              <span>+1 (234) 567-890</span>
            </li>

            <li className="flex items-center gap-3 text-slate-400">
              <Mail className="w-5 h-5 text-brand-400 shrink-0" />
              <span>support@visago.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
        <p>
          © {new Date().getFullYear()} VisaGo. All rights reserved.
        </p>

        <p>
          Designed & Developed by{" "}
          <span className="font-medium text-white">
            AtaurWD
          </span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;