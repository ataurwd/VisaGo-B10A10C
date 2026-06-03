import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";

const AllVisa = () => {
  const [allVisaData, setAllVisaData] = useState([]);
  const [filter, setFilter] = useState("");

  const [sortOrder, setSortOrder] = useState("");

  const filteredVisas = allVisaData.filter(
    (visa) => !filter || visa.visaType === filter,
  );

  useEffect(() => {
    const fetchVisas = async () => {
      const response = await axios.get(
        `https://visago-server.vercel.app/sorting?sortOrder=${sortOrder}`,
      );
      setAllVisaData(response.data);
    };
    fetchVisas();
  }, [sortOrder]);

  return (
    <div>
      <Helmet>
        <title>Visa Ease | All Visa</title>
      </Helmet>
      <div>
        <div className="flex flex-row md:flex-row justify-start items-center md:mt-0 mt-3">
          <div className="w-full md:w-[20%] lg:pl-[6vw] lg:mt-10 pl-3 mb-4 md:mb-0">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full p-2 border border-primary rounded"
            >
              <option value="">All</option>
              <option value="Tourist">Tourist Visa</option>
              <option value="Student">Student Visa</option>
              <option value="Official">Official Visa</option>
              <option value="Business">Business Visa</option>
              <option value="Transit">Transit Visa</option>
            </select>
          </div>

          <div className="w-full md:w-[15%]  md:mt-10 ml-0 md:ml-2 -mt-4">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="w-full p-2 border border-primary rounded"
            >
              <option value="" disabled>
                Sort
              </option>
              <option value="asc">Sort By Ascending</option>
              <option value="dsc">Sort By Descending</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 lg:w-[90%] mx-auto lg:my-10 md:my-5 my-4 lg:gap-7 gap-4 p-3">
          {allVisaData.length > 0 ? (
            filteredVisas.map((data) => (
              <div
                key={data._id}
                className="rounded overflow-hidden shadow-lg bg-white dark:bg-gray-800"
              >
                <img
                  className="w-full md:h-60 h-40 object-cover"
                  src={data.countryImage || ""}
                  alt={data.countryName || ""}
                />
                <div className="px-6 py-4">
                  <div className="font-bold text-xl mb-2 text-gray-800 dark:text-white">
                    {data.countryName} - {data.visaType} Visa
                  </div>
                  <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-3">
                    <li>
                      <strong>Fee:</strong> ${data.fee}
                    </li>
                    <li>
                      <strong>Validity:</strong> {data.validity}
                    </li>
                    <li>
                      <strong>Application Method:</strong>{" "}
                      {data.applicationMethod}
                    </li>
                  </ul>
                  <Link
                    to={`/all-visa/${data._id}`}
                    className="bg-custom-gradient custom-btn text-white"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <h1>No data found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllVisa;
