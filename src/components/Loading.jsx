import Lottie from 'lottie-react';
import React from 'react';
import LoadingJson from "../../src/lottie/loading.json";

const Loading = () => {
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-50">
          <Lottie animationData={LoadingJson} loop={true} className="h-96 w-96" />
        </div>
    );
};

export default Loading;