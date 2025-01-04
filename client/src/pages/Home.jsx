import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
import Features from '../components/Features';

const Home = () => {
  return (
    <div className="font-sans bg-[#0D1117] text-[#EDEDED] h-screen w-screen overflow-x-hidden overflow-y-scroll no-scrollbar ">
      <Header />
      <HeroSection />
      <Features />
      <FAQSection />
      <Footer />
    </div>
  );
};

export default Home;
