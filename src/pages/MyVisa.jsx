import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormData";
import DatePicker from "react-datepicker";
import toast from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import NoData from "../../src/lottie/noData.json";
import Lottie from "lottie-react";
import Loading from "../components/Loading";
import { Helmet } from "react-helmet";
const MyVisa = () => {
  const visaData = useLoaderData();
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
  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  const [personalData, setPersonalData] = useState([]);
  useEffect(() => {
    fetch(
      `https://visago-server.vercel.app/added-visa-user?userEmail=${user?.email}`,
    )
      .then((res) => res.json())
      .then((data) => setPersonalData(data));
  }, []);

  // update form
  const handelFormSubmit = (e, id) => {
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

    fetch(`https://visago-server.vercel.app/add-visa/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.matchedCount > 0) {
          toast.success("visa updated successfully");
          const modal = document.getElementById("my_modal_2");
          modal.close();

          setPersonalData(
            personalData.map((item) =>
              item._id === id ? { ...item, ...formData } : item,
            ),
          );
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(`${errorMessage}`);
      });
  };

  const handelDelete = (_id) => {
    fetch(`https://visago-server.vercel.app/add-visa/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remeaningData = personalData.filter((data) => data._id !== _id);
          setPersonalData(remeaningData);
          toast.success("visa deleted successfully");
        }
      });
  };
  return (
    <div>
      <Helmet>
        <title>Visa Ease | My Added Visas</title>
      </Helmet>
      <div
        className={`${
          personalData.length > 0 ? "grid" : ""
        } grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:w-[90%] mx-auto lg:my-10 md:my-5 my-4 lg:gap-7 gap-4 p-3`}
      >
        {personalData.length > 0 ? (
          personalData.map((data) => (
            <div
              key={data?._id || "N/A"}
              className="card w-full lg:w-96 bg-base-100 shadow-xl mx-auto my-4"
            >
              <figure>
                <img
                  src={data?.countryImage || "N/A"}
                  alt={`${data?.country || "N/A"} image`}
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{data?.countryName || "N/A"}</h2>
                <p>
                  <strong>Visa Type:</strong> {data?.visaType || "N/A"}
                </p>
                <p>
                  <strong>Processing Time:</strong> {data?.formatHour || "N/A"}
                </p>
                <p>
                  <strong>Fee:</strong> ${data?.fee || "N/A"}
                </p>
                <p>
                  <strong>Validity:</strong> {data?.validity || "N/A"}
                </p>
                <p>
                  <strong>Application Method:</strong>{" "}
                  {data?.applicationMethod || "N/A"}
                </p>

                {/* modal for update visa */}
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    <div className="mx-auto p-8">
                      <h1 className="text-3xl font-bold mb-6">
                        Update Your Visa Information
                      </h1>
                      <form
                        onSubmit={(e) => handelFormSubmit(e, data._id)}
                        className="space-y-6"
                      >
                        <div>
                          <label
                            htmlFor="countryImage"
                            className="block text-lg font-medium mb-2"
                          >
                            Country Image URL
                          </label>
                          <input
                            defaultValue={data.countryImage}
                            type="text"
                            id="countryImage"
                            name="countryImage"
                            className="w-full p-2 border border-primary rounded"
                            placeholder="Enter image URL"
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
                            defaultValue={data.countryName}
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
                            defaultChecked={data.visaType}
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
                              <input
                                type="checkbox"
                                id="validPassport"
                                className="mr-2"
                              />
                              <label
                                htmlFor="validPassport"
                                className="text-lg"
                              >
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
                              <label
                                htmlFor="visaApplication"
                                className="text-lg"
                              >
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
                              <label
                                htmlFor="passportPhotograph"
                                className="text-lg"
                              >
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
                            defaultValue={data?.description}
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
                            defaultValue={data.ageRestriction}
                            type="number"
                            id="ageRestriction"
                            name="ageRestriction"
                            className="w-full p-2 border border-primary rounded"
                            placeholder="Enter age restriction"
                          />
                        </div>

                        {/* Fee */}
                        <div>
                          <label
                            htmlFor="fee"
                            className="block text-lg font-medium mb-2"
                          >
                            Visa Fee
                          </label>
                          <input
                            defaultValue={data.fee}
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
                            defaultValue={data.applicationMethod}
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
                            Update
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="modal-action">
                      {/* <form method="dialog"> */}
                      {/* if there is a button in form, it will close the modal */}
                      {/* <button className="btn">Close</button>
                    </form> */}
                    </div>
                  </div>
                </dialog>

                <div className="card-actions">
                  <button
                    onClick={() =>
                      document.getElementById("my_modal_2").showModal()
                    }
                    className="btn bg-custom-gradient btn-sm"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handelDelete(data._id)}
                    className="btn btn-error btn-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <Lottie animationData={NoData} loop={true} className="h-96" />
        )}
      </div>
    </div>
  );
};

export default MyVisa;
