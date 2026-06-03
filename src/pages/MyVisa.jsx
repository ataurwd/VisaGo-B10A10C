import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormData";
import { ThemeContext } from "../context/Theme";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import NoData from "../../src/lottie/noData.json";
import Lottie from "lottie-react";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { Trash2, Edit } from "lucide-react";

const MyVisa = () => {
  const visaData = useLoaderData();
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [timeDate, setTimeDate] = useState(new Date());
  const { user } = useContext(FormContext);
  const { theme } = useContext(ThemeContext);

  const formatTime12Hour = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleTimeChange = (time) => setSelectedTime(time);

  const [personalData, setPersonalData] = useState([]);
  useEffect(() => {
    fetch(`https://visago-server.vercel.app/added-visa-user?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setPersonalData(data));
  }, [user?.email]);

  const handelFormSubmit = (e, id) => {
    e.preventDefault();
    const form = e.target;
    const countryImage = form.countryImage.value;
    const countryName = form.countryName.value;
    const visaType = form.visaType.value;
    const formatHour = formatTime12Hour(selectedTime);
    const requiredDocuments = Array.from(form.querySelectorAll("input[type='checkbox']:checked")).map((cb) => cb.nextSibling.textContent.trim());
    const ageRestriction = form.ageRestriction.value;
    const description = form.description.value;
    const fee = form.fee.value;
    const validity = timeDate.toLocaleDateString("en-CA");
    const applicationMethod = form.applicationMethod.value;
    
    const formData = { countryImage, countryName, visaType, formatHour, requiredDocuments, ageRestriction, description, fee, validity, applicationMethod, userEmail: user.email };

    fetch(`https://visago-server.vercel.app/add-visa/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          toast.success("Visa updated successfully");
          document.getElementById(`my_modal_${id}`).close();
          setPersonalData(personalData.map((item) => (item._id === id ? { ...item, ...formData } : item)));
        }
      })
      .catch((error) => toast.error(error.message));
  };

  const handelDelete = (_id) => {
    fetch(`https://visago-server.vercel.app/add-visa/${_id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          setPersonalData(personalData.filter((data) => data._id !== _id));
          toast.success("Visa deleted successfully");
        }
      });
  };

  return (
    <div className={`min-h-screen py-12 px-6 md:px-20 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-slate-50'} max-w-7xl mx-auto`}>
      <Helmet>
        <title>VisaGo | My Added Visas</title>
      </Helmet>

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
                  <p><strong>Validity:</strong> {data?.validity}</p>
                </div>
                
                <div className="flex gap-4 mt-6">
                  <button onClick={() => document.getElementById(`my_modal_${data._id}`).showModal()} className="flex-1 py-2.5 rounded-xl bg-brand-500 text-white font-semibold flex items-center justify-center gap-2 hover:bg-brand-600">
                    <Edit className="w-4 h-4" /> Edit
                  </button>
                  <button onClick={() => handelDelete(data._id)} className="flex-1 py-2.5 rounded-xl bg-red-50 text-red-600 font-semibold flex items-center justify-center gap-2 hover:bg-red-100">
                    <Trash2 className="w-4 h-4" /> Delete
                  </button>
                </div>

                {/* Update Modal */}
                <dialog id={`my_modal_${data._id}`} className="modal modal-bottom sm:modal-middle">
                  <div className={`modal-box rounded-3xl ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white'}`}>
                    <h3 className="font-bold text-2xl mb-6">Update Visa</h3>
                    <form onSubmit={(e) => handelFormSubmit(e, data._id)} className="space-y-4">
                      {/* Standardized Form Inputs */}
                      <input name="countryImage" defaultValue={data.countryImage} className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'border-slate-200'}`} placeholder="Image URL" />
                      <input name="countryName" defaultValue={data.countryName} className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'border-slate-200'}`} placeholder="Country Name" />
                      <select name="visaType" defaultValue={data.visaType} className={`w-full p-3 rounded-xl border ${theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'border-slate-200'}`}>
                        <option value="Tourist">Tourist Visa</option>
                        <option value="Student">Student Visa</option>
                        <option value="Official">Official Visa</option>
                      </select>
                      <button type="submit" className="w-full btn-gradient-modern">Update Visa</button>
                    </form>
                  </div>
                </dialog>
              </div>
            </motion.div>
          ))}
        </motion.div>
      ) : (
        <div className="text-center py-12">
          <Lottie animationData={NoData} loop={true} className="h-64 mb-6" />
          <h3 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>No visas added</h3>
        </div>
      )}
    </div>
  );
};

export default MyVisa;
