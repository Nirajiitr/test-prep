import FAQSection from "../components/defaultPage/FAQSection";
import Features from "../components/defaultPage/Features";
import Footer from "../components/defaultPage/Footer";
import Header from "../components/defaultPage/Header";
import HeroSection from "../components/defaultPage/HeroSection";

const Default = () => {
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

export default Default;
