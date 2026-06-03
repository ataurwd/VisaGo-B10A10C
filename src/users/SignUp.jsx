import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Eye, EyeOff, Mail, Lock, User, Image as ImageIcon, UserPlus, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { FormContext } from "../context/FormData";
import toast from "react-hot-toast";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase/firebase.init";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/Theme";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { handelRegisterUser, setUser } = useContext(FormContext);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const handelRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photoURl = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (password.length < 6) {
      toast.error("Password should be at least 6 characters long");
      return;
    }

    const upperCase = /[A-Z]/;
    const lowerCase = /[a-z]/;

    if (!upperCase.test(password)) {
      toast.error("Password must contain at least one uppercase letter.");
      return;
    }
    if (!lowerCase.test(password)) {
      toast.error("Password must contain at least one lowercase letter.");
      return;
    }

    handelRegisterUser(email, password)
      .then((res) => {
        toast.success("Registration successful");
        navigate('/');
        updateProfile(auth.currentUser, {
          displayName: name,
          photoURL: photoURl,
        });
        setUser({ ...res.user, displayName: name, photoURL: photoURl });
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className="min-h-screen flex lg:grid lg:grid-cols-2 bg-white dark:bg-themeDatak">
      <Helmet>
        <title>Sign Up | VisaGo</title>
      </Helmet>

      {/* Form Side */}
      <div className="w-full flex items-center justify-center p-6 md:p-12">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-500 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>

          <div className="mb-10">
            <h2 className={`text-4xl font-extrabold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Create Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Start your visa journey with us today.
            </p>
          </div>
          
          <form onSubmit={handelRegister} className="space-y-5">
            {[
              { name: "name", type: "text", placeholder: "Your Full Name", icon: User },
              { name: "photo", type: "text", placeholder: "Photo URL", icon: ImageIcon },
              { name: "email", type: "email", placeholder: "name@example.com", icon: Mail },
            ].map((field) => (
              <div key={field.name} className="space-y-1">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1 capitalize">{field.name}</label>
                <div className="relative group">
                  <field.icon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                  <input
                    name={field.name}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    className={`w-full pl-12 pr-4 py-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} outline-none focus:ring-2 focus:ring-brand-500/20 transition-all`}
                  />
                </div>
              </div>
            ))}

            <div className="space-y-1">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className={`w-full pl-12 pr-12 py-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-200'} outline-none focus:ring-2 focus:ring-brand-500/20 transition-all`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button type="submit" className="w-full btn-gradient-modern py-4 text-lg mt-6">
              Create Account
            </button>
          </form>

          <p className="text-center mt-8 text-slate-600 dark:text-slate-400">
            Already have an account?{" "}
            <Link to="/login" className="text-brand-500 font-extrabold hover:underline">
              Sign In
            </Link>
          </p>
        </div>
      </motion.div>

      {/* Image Side */}
      <div className="hidden lg:block relative w-full h-full overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1542296332-2e44d1faf563?q=80&w=2070&auto=format&fit=crop"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-[2px] flex items-center justify-center p-12">
          <div className="text-white text-center">
            <h1 className="text-5xl font-extrabold mb-4">Join our community.</h1>
            <p className="text-lg opacity-90">Create your account and start your global journey today.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
