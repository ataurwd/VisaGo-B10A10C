import { Helmet } from "react-helmet";
import { useContext, useEffect, useState } from "react";
import { FormContext } from "../context/FormData";
import Lottie from "lottie-react";
import NoData from "../../src/lottie/nodataMatch.json";
import toast from "react-hot-toast";

const VisaApplication = () => {
  const [personalData, setPersonalData] = useState([]);
  const { user } = useContext(FormContext);
  const [search, setSearch] = useState("");

  const handleDelete = (_id) => {
    fetch(`https://visago-server.vercel.app/applied-visa/${_id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.deletedCount) {
          const remainingData = personalData.filter((data) => data._id !== _id);
          setPersonalData(remainingData);
          toast.success("Visa deleted successfully!");
        }
      });
  };

  useEffect(() => {
    const query = search
      ? `search?searchParams=${search}`
      : `visa-user?userEmail=${user?.email}`;
    fetch(`https://visago-server.vercel.app/${query}`)
      .then((res) => res.json())
      .then((data) => setPersonalData(data));
  }, [user?.email, search]);

  return (
    <div>
      <Helmet>
        <title>Visa Ease | Visa Applications</title>
      </Helmet>
      <div className="md:w-[400px] md:mx-auto mt-5 mx-3">
        <input
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          name="search"
          placeholder="Search by country"
          className="input input-bordered w-full"
          required
        />
      </div>
      <div
        className={`${
          personalData.length > 0 ? "grid" : ""
        } grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:w-[90%] mx-auto lg:my-10 md:my-5 my-4 lg:gap-7 gap-4 p-3`}
      >
        {personalData.length > 0 ? (
          personalData.map((data) => (
            <div
              key={data._id}
              className="card w-full lg:w-96 bg-base-100 shadow-xl mx-auto my-4"
            >
              <figure>
                <img
                  src={data?.countryImage || "N/A"}
                  alt={`${data?.countryName || "N/A"} image`}
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
                <p>
                  <strong>Applied Date:</strong> {data?.appliedDate || "N/A"}
                </p>
                <p>
                  <strong>Applicant Name:</strong>{" "}
                  {`${data?.firstName || "N/A"} ${data?.lastName || "N/A"}`}
                </p>
                <p>
                  <strong>Applicant Email:</strong> {data?.userEmail || "N/A"}
                </p>
                <div className="card-actions justify-end">
                  <button
                    onClick={() => handleDelete(data._id)}
                    className="btn btn-error btn-sm"
                  >
                    Cancel
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

export default VisaApplication;
