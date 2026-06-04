import React, { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import VisaCard from "../components/VisaCard";
import { ThemeContext } from "../context/Theme";
import { Filter, SortAsc, SortDesc, Search } from "lucide-react";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const AllVisa = () => {
  const [allVisaData, setAllVisaData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const { theme } = useContext(ThemeContext);

  const filteredVisas = allVisaData.filter(
    (visa) => !filter || visa.visaType === filter,
  );

  useEffect(() => {
    setLoading(true);
    const fetchVisas = async () => {
      try {
        const response = await axios.get(
          `https://visago-server.vercel.app/sorting?sortOrder=${sortOrder}`,
        );
        setAllVisaData(response.data);
      } catch (error) {
        console.error("Error fetching visas:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVisas();
  }, [sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className={`min-h-screen pb-24 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-slate-50'}`}>
      <Helmet>
        <title>All Visas | VisaGo</title>
      </Helmet>

      {/* Header Section */}
      <div className={`pt-32 pb-16 px-6 md:px-20 ${theme === 'dark' ? 'bg-slate-900/50' : 'bg-white shadow-modern-sm'}`}>
        <div className="max-w-7xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-4xl md:text-5xl font-extrabold mb-8 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}
          >
            Explore All <span className="text-brand-500">Visas</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              {/* Filter */}
              <div className="relative group min-w-[200px]">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-brand-500/20 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <option value="">All Visa Types</option>
                  <option value="Tourist">Tourist Visa</option>
                  <option value="Student">Student Visa</option>
                  <option value="Official">Official Visa</option>
                  <option value="Business">Business Visa</option>
                  <option value="Transit">Transit Visa</option>
                </select>
              </div>

              {/* Sort */}
              <div className="relative group min-w-[200px]">
                <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border transition-all appearance-none cursor-pointer outline-none focus:ring-2 focus:ring-brand-500/20 ${
                    theme === 'dark' 
                      ? 'bg-slate-800 border-slate-700 text-white' 
                      : 'bg-white border-slate-200 text-slate-600'
                  }`}
                >
                  <option value="" disabled>Sort by Fee</option>
                  <option value="asc">Fee: Low to High</option>
                  <option value="dsc">Fee: High to Low</option>
                </select>
              </div>
            </div>

            <p className={`text-sm font-medium ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              Showing {filteredVisas.length} available visas
            </p>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-20 mt-12">
        {filteredVisas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVisas.map((visa) => (
              <VisaCard key={visa._id} visa={visa} theme={theme} />
            ))}
          </div>
        ) : (
          <div className="text-center py-32">
            <Search className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              No visas found
            </h3>
            <p className="text-slate-500">Try adjusting your filters or search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllVisa;
