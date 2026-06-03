import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormData";
import { ThemeContext } from "../context/Theme";
import Lottie from "lottie-react";
import NoData from "../../src/lottie/nodataMatch.json";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { Search, Trash2 } from "lucide-react";

const VisaApplication = () => {
  const [personalData, setPersonalData] = useState([]);
  const { user } = useContext(FormContext);
  const { theme } = useContext(ThemeContext);
  const [search, setSearch] = useState("");

  const handleDelete = (_id) => {
    fetch(`https://visago-server.vercel.app/applied-visa/${_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          setPersonalData(personalData.filter((data) => data._id !== _id));
          toast.success("Visa application cancelled successfully!");
        }
      });
  };

  useEffect(() => {
    const query = search ? `search?searchParams=${search}` : `visa-user?userEmail=${user?.email}`;
    fetch(`https://visago-server.vercel.app/${query}`)
      .then((res) => res.json())
      .then((data) => setPersonalData(data));
  }, [user?.email, search]);

  return (
    <div className={`min-h-screen py-12 px-6 md:px-20 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-slate-50'} max-w-7xl`}>
      <Helmet>
        <title>VisaGo | My Applications</title>
      </Helmet>

      {/* Search Header */}
      <div className="max-w-xl mx-auto mb-12">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search applications by country..."
            className={`w-full pl-12 pr-4 py-3 rounded-2xl border shadow-sm outline-none focus:ring-2 focus:ring-brand-500/20 ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-white' : 'bg-white border-slate-200'}`}
          />
        </div>
      </div>

      {/* Cards Grid */}
      {personalData.length > 0 ? (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {personalData.map((data) => (
            <motion.div
              key={data._id}
              whileHover={{ y: -5 }}
              className={`rounded-3xl overflow-hidden border ${theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-100 shadow-modern-sm'}`}
            >
              <img src={data?.countryImage} alt={data?.countryName} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{data?.countryName}</h3>
                <div className="space-y-2 text-sm text-slate-500">
                  <p><strong>Visa Type:</strong> {data?.visaType}</p>
                  <p><strong>Fee:</strong> ${data?.fee}</p>
                  <p><strong>Applied:</strong> {data?.appliedDate}</p>
                </div>
                <button
                  onClick={() => handleDelete(data._id)}
                  className="w-full mt-6 flex items-center justify-center space-x-2 py-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 dark:bg-red-950/30 dark:hover:bg-red-900/50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Cancel Application</span>
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <Lottie animationData={NoData} loop={true} className="h-64 mb-6" />
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No applications found</h3>
        </div>
      )}
    </div>
  );
};

export default VisaApplication;
