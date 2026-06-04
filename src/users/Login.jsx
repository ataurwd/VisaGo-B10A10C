import React, { useContext, useState } from "react";
import { Eye, EyeOff, Mail, Lock, LogIn, ArrowLeft } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FormContext } from "./../context/FormData";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/Theme";

const Login = () => {
  const { googleLogin, loginUser, setUser } = useContext(FormContext);
  const { theme } = useContext(ThemeContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const signInUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    loginUser(email, password)
      .then((res) => {
        const user = res.user;
        navigate(location?.state ? location.state : "/");
        toast.success(`Welcome back, ${user.displayName || 'Traveler'}!`);
      })
      .catch((er) => toast.error(er.message));
  };

  const googleSignInUser = () => {
    googleLogin()
      .then((res) => {
        setUser(res.user);
        navigate(location?.state ? location.state : "/");
        toast.success(`Successfully logged in with Google`);
      })
      .catch((er) => toast.error(er.message));
  };

  return (
    <div className="min-h-screen flex lg:grid lg:grid-cols-2 bg-white dark:bg-themeDatak">
      <Helmet>
        <title>Login | VisaGo</title>
      </Helmet>

      {/* Image Side */}
      <div className="lg:block relative w-full h-full overflow-hidden">
        <img
          src="https://wanderingwagars.com/wp-content/uploads/2023/01/Places-to-visit-in-Thailand-Feature.jpg"
          alt="Travel"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-brand-900/40 backdrop-blur-[2px] flex items-center justify-center p-12">
          <div className="text-white">
            <h1 className="text-5xl font-extrabold mb-4">Start your<br/>adventure today.</h1>
            <p className="text-lg opacity-90">Join thousands of travelers who trust VisaGo for a seamless visa experience.</p>
          </div>
        </div>
      </div>

      {/* Form Side */}
      <div className="w-full flex items-center justify-center p-6 md:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <Link to="/" className="inline-flex items-center text-slate-500 hover:text-brand-500 mb-8 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>

          <div className="mb-10">
            <h2 className={`text-4xl font-extrabold mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              Sign In
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Welcome back to your traveler dashboard.
            </p>
          </div>

          <form className="space-y-6" onSubmit={signInUser}>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-brand-500/20 transition-all dark:text-white"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-brand-500 transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-transparent outline-none focus:ring-2 focus:ring-brand-500/20 transition-all dark:text-white"
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

            <button type="submit" className="w-full btn-gradient-modern py-4 text-lg">Sign In</button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100 dark:border-slate-800"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-white dark:bg-themeDatak px-4 text-slate-400 font-bold">Or continue with</span></div>
          </div>

          <button
            onClick={googleSignInUser}
            className="w-full flex items-center justify-center space-x-3 py-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <span className="font-bold text-slate-700 dark:text-slate-300">Google</span>
          </button>

          <p className="text-center mt-10 text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link to="/register" className="text-brand-500 font-extrabold hover:underline">Sign Up Free</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
