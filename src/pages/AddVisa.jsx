import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { FormContext } from "../context/FormData";

const AddVisa = () => {
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [timeDate, setTimeDate] = useState(new Date());
  const { user } = useContext(FormContext);

  const formatTime12Hour = (date) => {
    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes}:${seconds} ${ampm}`;
  };

  const handelFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const countryImage = e.target.countryImage.value;
    const countryName = e.target.countryName.value;
    const visaType = form.visaType.value;
    const formatHour = formatTime12Hour(selectedTime);
    const requiredDocuments = Array.from(
      e.target.querySelectorAll("input[type='checkbox']:checked"),
    ).map((checkbox) => checkbox.nextSibling.textContent.trim());
    const ageRestriction = e.target.ageRestriction.value;
    const description = e.target.description.value;
    const fee = e.target.fee.value;
    const validity = timeDate.toLocaleDateString("en-CA");
    const applicationMethod = e.target.applicationMethod.value;
    const formData = {
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
      userEmail: user.email,
    };

    // form data validation

    if (ageRestriction <= 18) {
      toast.error("Age restriction should be 18 or above");
      return;
    }

    fetch("https://visago-server.vercel.app/add-visa", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("visa added successfully");
          form.reset();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorMessage}`);
      });
  };
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };
  return (
    <div>
      <Helmet>
        <title>Visa Ease | Add Visa</title>
      </Helmet>
      <div className="mx-auto p-8 lg:w-2/4">
        <h1 className="text-3xl font-bold mb-6">Add Visa</h1>
        <form onSubmit={handelFormSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="countryImage"
              className="block text-lg font-medium mb-2"
            >
              Country Image URL
            </label>
            <input
              type="text"
              id="countryImage"
              name="countryImage"
              className="w-full p-2 border border-primary rounded"
              placeholder="Enter image URL"
              required
            />
          </div>

          {/* Country Name */}
          <div>
            <label
              htmlFor="countryName"
              className="block text-lg font-medium mb-2"
            >
              Country Name
            </label>
            <input
              required
              type="text"
              id="countryName"
              name="countryName"
              className="w-full p-2 border border-primary rounded"
              placeholder="Enter country name"
            />
          </div>

          {/* Visa Type */}
          <div>
            <label
              htmlFor="visaType"
              className="block text-lg font-medium mb-2"
            >
              Visa Type
            </label>
            <select
              required
              id="visaType"
              name="visaType"
              className="w-full p-2 border border-primary rounded"
            >
              <option value="">Select Visa Type</option>
              <option value="Tourist">Tourist Visa</option>
              <option value="Student">Student Visa</option>
              <option value="Official">Official Visa</option>
              <option value="Business">Business Visa</option>
              <option value="Transit">Transit Visa</option>
            </select>
          </div>

          {/* Processing Time */}
          <div>
            <label
              htmlFor="processingTime"
              className="block text-lg font-medium mb-2"
            >
              Processing Time
            </label>
            <DatePicker
              className="input input-bordered w-full"
              selected={selectedTime}
              onChange={handleTimeChange}
              showTimeSelect
              showTimeSelectOnly
              timeIntervals={15}
              timeCaption="Time"
              dateFormat="h:mm aa"
            />
          </div>

          {/* Required Documents (Checkboxes) */}
          <div>
            <span className="block text-lg font-medium mb-2">
              Required Documents
            </span>
            <div className="space-y-2">
              <div className="flex items-center">
                <input type="checkbox" id="validPassport" className="mr-2" />
                <label htmlFor="validPassport" className="text-lg">
                  Valid passport
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="visaApplication"
                  name="Visa application form"
                  className="mr-2"
                />
                <label htmlFor="visaApplication" className="text-lg">
                  Visa application form
                </label>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="passportPhotograph"
                  name="Recent passport-sized photograph"
                  className="mr-2"
                />
                <label htmlFor="passportPhotograph" className="text-lg">
                  Recent passport-sized photograph
                </label>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-lg font-medium mb-2"
            >
              Description
            </label>
            <textarea
              required
              id="description"
              name="description"
              className="w-full p-2 border border-primary rounded"
              placeholder="Enter description"
            />
          </div>

          {/* Age Restriction */}
          <div>
            <label
              htmlFor="ageRestriction"
              className="block text-lg font-medium mb-2"
            >
              Age Restriction
            </label>
            <input
              type="number"
              id="ageRestriction"
              name="ageRestriction"
              className="w-full p-2 border border-primary rounded"
              placeholder="Enter age restriction"
            />
          </div>

          {/* Fee */}
          <div>
            <label htmlFor="fee" className="block text-lg font-medium mb-2">
              Visa Fee
            </label>
            <input
              type="number"
              id="fee"
              name="fee"
              className="w-full p-2 border border-primary rounded"
              placeholder="Enter fee"
            />
          </div>

          {/* Validity */}
          <div>
            <label
              htmlFor="validity"
              className="block text-lg font-medium mb-2"
            >
              Validity
            </label>
            <DatePicker
              className="input input-bordered w-full"
              selected={timeDate}
              onChange={(date) => setTimeDate(date)}
            />
          </div>

          {/* Application Method */}
          <div>
            <label
              htmlFor="applicationMethod"
              className="block text-lg font-medium mb-2"
            >
              Application Method
            </label>
            <input
              type="text"
              id="applicationMethod"
              name="applicationMethod"
              className="w-full p-2 border border-primary rounded"
              placeholder="Enter application method"
            />
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-custom-gradient text-white py-3 rounded-lg hover:bg-blue-600"
            >
              Add Visa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVisa;
