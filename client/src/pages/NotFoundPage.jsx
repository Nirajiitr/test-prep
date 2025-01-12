import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center h-screen bg-[#0D1117] text-[#EDEDED]">
      <div className="max-w-lg p-8 bg-[#161B22] shadow-2xl rounded-lg text-center transform transition-transform duration-500 hover:scale-105">
        <h1 className="text-7xl font-extrabold text-red-500 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-[#EDEDED] mb-4">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-[#A1A1A1] mb-6 leading-relaxed">
          Sorry, we can’t find the page you’re looking for. 
          Maybe you’ve mistyped the URL, or the page has moved.
        </p>
        <button
          className="px-6 py-3 text-lg font-medium rounded-full bg-blue-500 text-white shadow-lg hover:bg-blue-600 transition duration-300"
          onClick={() => navigate("/")}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
};

export default PageNotFound;
