import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Menu = ({ isMenuOpen }) => {
  return (
    isMenuOpen && (
      <motion.nav
        className="bg-gray-700 text-white px-6 py-4 lg:hidden"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 0 }}
        transition={{ duration: 0.9 }}
      >
       
        <Link to="/user/home" className="block mb-2 hover:text-blue-400">
          Home
        </Link>
        <Link to="/user/bookmarks" className="block mb-2 hover:text-blue-400">
          Bookmarks
        </Link>
        <Link to="/user/test-history" className="block mb-2 hover:text-blue-400">
          Test History
        </Link>
        <Link to="/user/test-upcoming" className="block mb-2 hover:text-blue-400">
          Upcoming Tests
        </Link>
        
      </motion.nav>
    )
  );
};

export default Menu;
