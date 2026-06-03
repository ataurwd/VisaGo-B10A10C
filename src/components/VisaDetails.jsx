import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { FormContext } from "../context/FormData";
import { Helmet } from "react-helmet";

const VisaDetails = () => {
  const [timeDate, setTimeDate] = useState(new Date());
  const detailsData = useLoaderData();
  const { user } = useContext(FormContext);
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
    const firstName = e.target.firstName.value;
    const lastName = e.target.UserLastName.value;
    const appliedDate = timeDate.toLocaleDateString("en-CA");
    const fee = e.target.fee.value;
    const userEmail = e.target.email.value;

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
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          toast.success("visa added successfully");
          const closeBtn = document.getElementById("my_modal_1");
          closeBtn.close();
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`${errorMessage}`);
      });
  };
  return (
    <div className="min-h-screen flex flex-col md:flex-row dark:bg-gray-900 text-gray-800 dark:text-white">
      <Helmet>
        <title>Visa Ease | {detailsData.countryName}</title>
      </Helmet>
      {/* Left Side: Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          className="w-full h-full object-cover"
          src={countryImage}
          alt={`${countryName}`}
        />
      </div>

      {/* Right Side: Details */}
      <div className="flex flex-col justify-center p-6 md:p-12 w-full md:w-1/2">
        <h1 className="text-4xl font-bold mb-4">{countryName}</h1>
        <h2 className="text-2xl font-semibold mb-2">{visaType} Visa</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          {description}
        </p>

        <ul className="space-y-4 text-base">
          <li>
            <strong>Fee:</strong> ${fee}
          </li>
          <li>
            <strong>Validity:</strong> {validity}
          </li>
          <li>
            <strong>Processing Time:</strong> {formatHour}
          </li>
          <li>
            <strong>Age Restriction:</strong> {ageRestriction}+
          </li>
          <li>
            <strong>Application Method:</strong> {applicationMethod}
          </li>
        </ul>

        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Visa Type</h3>
          <ul className="list-disc pl-6 text-gray-700 dark:text-gray-400">
            {requiredDocuments.map((doc, index) => (
              <li key={index}>{doc}</li>
            ))}
          </ul>
        </div>
        <button
          onClick={() => document.getElementById("my_modal_1").showModal()}
          className="bg-custom-gradient w-2/5 my-3 text-white py-2 rounded-xl"
        >
          Apply For The Visa
        </button>

        {/* for modal content */}

        <dialog id="my_modal_1" className="modal">
          <div className="modal-box">
            <form onSubmit={handelVisaApplyForm} className="space-y-4">
              {/* email field Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Email</span>
                </label>
                <input
                  name="email"
                  readOnly
                  defaultValue={user?.email}
                  className="input input-bordered w-full"
                />
              </div>
              {/* First Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">First Name</span>
                </label>
                <input
                  required
                  type="text"
                  name="firstName"
                  className="input input-bordered w-full"
                  placeholder="Enter your first name"
                />
              </div>
              {/* Last Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Last Name</span>
                </label>
                <input
                  required
                  type="text"
                  name="UserLastName"
                  className="input input-bordered w-full"
                  placeholder="Enter your last name"
                />
              </div>
              {/* Applied Date Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Applied Date</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  defaultValue={detailsData.validity}
                  readOnly
                  className="input input-bordered w-full"
                  placeholder="Enter your last name"
                />
              </div>
              {/* Fee Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium">Fee (Visa Fee)</span>
                </label>
                <input
                  type="number"
                  name="fee"
                  readOnly
                  value={detailsData.fee}
                  className="input input-bordered w-full"
                  placeholder="Enter visa fee"
                />
              </div>
              {/* Submit Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="btn bg-custom-gradient text-white"
                >
                  Apply
                </button>
              </div>
            </form>
            <div className="modal-action">
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                {/* <button className="btn">Close</button> */}
              </form>
            </div>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default VisaDetails;
