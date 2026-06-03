import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { FormContext } from "../context/FormData";
import { ThemeContext } from "../context/Theme";
import { Helmet } from "react-helmet";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Calendar, ShieldCheck, User, Mail, CreditCard, X } from "lucide-react";

const VisaDetails = () => {
  const [timeDate] = useState(new Date());
  const detailsData = useLoaderData();
  const { user } = useContext(FormContext);
  const { theme } = useContext(ThemeContext);

  const {
    countryImage,
    countryName,
    visaType,
    formatHour,
    requiredDocuments,
    ageRestriction,
    description,
    fee,
    validity,
    applicationMethod,
  } = detailsData;

  const handelVisaApplyForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const firstName = form.firstName.value;
    const lastName = form.UserLastName.value;
    const appliedDate = timeDate.toLocaleDateString("en-CA");
    const fee = form.fee.value;
    const userEmail = form.email.value;

    const formData = {
      countryName: detailsData?.countryName,
      countryImage: detailsData?.countryImage,
      visaType: detailsData?.visaType,
      formatHour: detailsData?.formatHour,
      validity: detailsData?.validity,
      applicationMethod: detailsData?.applicationMethod,
      firstName,
      lastName,
      appliedDate,
      fee,
      userName: user.providerData[0].displayName,
      userEmail,
    };

    fetch("https://visago-server.vercel.app/visa", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("Visa application submitted successfully!");
          document.getElementById("my_modal_1").close();
        }
      })
      .catch((error) => toast.error(error.message));
  };

  return (
    <div className={`min-h-screen py-12 px-6 md:px-20 ${theme === 'dark' ? 'bg-themeDatak' : 'bg-slate-50'}`}>
      <Helmet>
        <title>VisaGo | {detailsData.countryName}</title>
      </Helmet>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12"
      >
        {/* Left Side: Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative overflow-hidden rounded-3xl h-80 lg:h-auto shadow-modern-lg"
        >
          <img
            className="w-full h-full object-cover"
            src={countryImage}
            alt={countryName}
          />
        </motion.div>

        {/* Right Side: Details */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col justify-center"
        >
          <h1 className={`text-4xl md:text-5xl font-extrabold mb-4 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            {countryName}
          </h1>
          <h2 className="text-2xl font-semibold mb-6 text-brand-500">{visaType} Visa</h2>
          <p className={`text-lg mb-8 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
            {description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              { icon: <CreditCard />, label: "Fee", value: `$${fee}` },
              { icon: <Calendar />, label: "Validity", value: validity },
              { icon: <Clock />, label: "Processing", value: formatHour },
              { icon: <ShieldCheck />, label: "Age Restriction", value: `${ageRestriction}+` },
            ].map((item, i) => (
              <div key={i} className={`p-4 rounded-xl border ${theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-100 text-slate-600 shadow-sm'}`}>
                <div className="flex items-center space-x-2 text-brand-500 mb-2">{item.icon} <span className="font-bold text-slate-900 dark:text-white">{item.label}</span></div>
                <p className="font-semibold">{item.value}</p>
              </div>
            ))}
          </div>

          <button
            onClick={() => document.getElementById("my_modal_1").showModal()}
            className="btn-gradient-modern w-full md:w-auto"
          >
            Apply For The Visa
          </button>
        </motion.div>
      </motion.div>

      {/* Modal */}
      <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
        <div className={`modal-box rounded-3xl ${theme === 'dark' ? 'bg-slate-900 text-white' : 'bg-white'}`}>
          <form method="dialog"><button className="btn btn-sm btn-circle btn-ghost absolute right-4 top-4"><X /></button></form>
          <h3 className="font-bold text-2xl mb-6">Apply for {countryName}</h3>
          
          <form onSubmit={handelVisaApplyForm} className="space-y-4">
            <div className="form-control">
              <label className="label"><span className="label-text font-medium dark:text-slate-300">Email</span></label>
              <input name="email" readOnly defaultValue={user?.email} className={`input input-bordered w-full ${theme === 'dark' ? 'bg-slate-800' : ''}`} />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium dark:text-slate-300">First Name</span></label>
              <input required type="text" name="firstName" className={`input input-bordered w-full ${theme === 'dark' ? 'bg-slate-800' : ''}`} placeholder="Enter first name" />
            </div>
            <div className="form-control">
              <label className="label"><span className="label-text font-medium dark:text-slate-300">Last Name</span></label>
              <input required type="text" name="UserLastName" className={`input input-bordered w-full ${theme === 'dark' ? 'bg-slate-800' : ''}`} placeholder="Enter last name" />
            </div>
            <input type="hidden" name="fee" value={detailsData.fee} />
            <div className="flex justify-end pt-4">
              <button type="submit" className="btn-gradient-modern w-full">Apply Now</button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default VisaDetails;
