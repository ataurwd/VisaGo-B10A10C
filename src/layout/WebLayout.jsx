import React, { useEffect, useState } from "react";
import NavBer from "../components/NavBer";
import { Outlet, useNavigation } from "react-router-dom";
import Footer from "../components/Footer";
import Loading from "../components/Loading";

const WebLayout = () => {
  const navigation = useNavigation();

  const isNavigation = navigation.state === "loading";

  return (
    <div>
      {isNavigation ? (
        // Show loader while loading
        <div className="flex justify-center items-center h-screen">
          <Loading />
        </div>
      ) : (
        <div>
          <NavBer />
          <div className="min-h-[calc(100vh-285px)]">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
};

export default WebLayout;