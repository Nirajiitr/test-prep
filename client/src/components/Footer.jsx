import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-[#EDEDED] py-6">
      <div className="text-center">
        <p className="text-sm">
          &copy; 2025 <span className="text-[#3B82F6]">JEE/NEET Platform</span>. All Rights Reserved.
        </p>
        <div className="mt-4 flex justify-center space-x-6">
          <a
            href="#"
            aria-label="Facebook"
            className="text-[#84CC16] hover:text-[#10B981] transition duration-300 text-lg"
          >
            <FaFacebookF />
          </a>
          <a
            href="#"
            aria-label="Twitter"
            className="text-[#84CC16] hover:text-[#10B981] transition duration-300 text-lg"
          >
            <FaTwitter />
          </a>
          <a
            href="#"
            aria-label="LinkedIn"
            className="text-[#84CC16] hover:text-[#10B981] transition duration-300 text-lg"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="#"
            aria-label="Instagram"
            className="text-[#84CC16] hover:text-[#10B981] transition duration-300 text-lg"
          >
            <FaInstagram />
          </a>
        </div>
        <div className="mt-4 flex justify-center space-x-4">
          <a
            href="#"
            className="text-sm hover:text-[#10B981] transition duration-300"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="text-sm hover:text-[#10B981] transition duration-300"
          >
            Terms of Use
          </a>
          <a
            href="#"
            className="text-sm hover:text-[#10B981] transition duration-300"
          >
            Contact Us
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
