import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Menu from "./Menu";

const Home = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="font-sans bg-[#0D1117] text-[#EDEDED] h-screen w-screen overflow-x-hidden overflow-y-scroll no-scrollbar flex flex-col">
     <Header
        onMenuToggle={() => setMenuOpen(!menuOpen)}
        isMenuOpen={menuOpen}
      />
      <Menu isMenuOpen={menuOpen} />
       <Outlet />
    </div>
  );
};

export default Home;
