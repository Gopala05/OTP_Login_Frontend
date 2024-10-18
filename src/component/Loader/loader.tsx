// Library Imports
import React from "react";

const Loader: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 z-50">
      <div className="relative flex items-center justify-center w-40 h-40">
        <div className="w-40 h-40 border-4 border-t-loader-300 border-b-loader-300 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-t-loader-100 border-b-loader-100 border-solid rounded-full animate-spinFast"></div>
        <div className="absolute inset-2 border-4 border-t-loader-200 border-b-loader-200 border-solid rounded-full animate-spinSlow"></div>
      </div>
    </div>
  );
};

export default Loader;
