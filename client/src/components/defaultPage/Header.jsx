import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <header className="flex justify-between items-center px-6 py-4 bg-[#1A1A2E] shadow-md">
      <div className="text-2xl font-bold text-[#3B82F6]">
        <img
          src="./logo.png"
          width={60}
          height={60}
          className="rounded-full"
          alt="logo"
        />
      </div>
      
      
        <div className="space-x-4">
          <button
            onClick={() => navigate("/auth/login")}
            className="px-4 py-2 bg-[#3B82F6] text-[#F5F5F5] font-semibold rounded-lg hover:bg-[#00AFFF] transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/auth/register")}
            className="px-4 py-2 bg-[#8A2BE2] text-[#F5F5F5] font-semibold rounded-lg hover:bg-[#9F7AEA] transition"
          >
            Sign Up
          </button>
        </div>
    
    </header>
  );
};

export default Header;
