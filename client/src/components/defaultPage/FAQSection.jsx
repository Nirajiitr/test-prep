import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleCollapse = (index) => {
    setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const faqs = [
    {
      question: "Why is this platform important?",
      answer:
        "This platform offers a realistic test interface, analytics, and tools to improve your preparation.",
    },
    {
      question: "How to access test history?",
      answer:
        "Log in to your account and navigate to the Test History section in your dashboard.",
    },
    {
      question: "Is this platform free to use?",
      answer:
        "Yes, this platform is completely free for students to use and enhance their exam preparation.",
    },
    {
      question: "Can I bookmark questions for later review?",
      answer:
        "Absolutely! You can bookmark important questions and access them anytime from your dashboard.",
    },
    {
      question: "How often are new tests added?",
      answer:
        "New tests are added regularly based on the latest syllabus and exam patterns.",
    },
    {
      question: "Is the platform mobile-friendly?",
      answer:
        "Yes, the platform is designed to be fully responsive and works seamlessly on all devices.",
    },
    {
      question: "Can I get detailed performance analysis for each test?",
      answer:
        "Yes, after completing a test, you can view a detailed performance analysis, including subject-wise and topic-wise insights.",
    },
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-2xl font-bold text-center text-[#EDEDED] mb-6">
        Importance & FAQs
      </h2>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`border border-[#3B82F6] rounded-lg bg-[#1E293B] hover:bg-[#273344] transition-all duration-300 ${
              activeIndex === index ? "shadow-lg" : ""
            }`}
          >
            <div
              onClick={() => toggleCollapse(index)}
              className="flex justify-between items-center p-4 cursor-pointer"
            >
              <h3 className="text-lg font-medium text-[#F5F5F5]">
                {faq.question}
              </h3>
              <span className="text-[#F5F5F5]">
                {activeIndex === index ? <FaChevronUp /> : <FaChevronDown />}
              </span>
            </div>
            {activeIndex === index && (
              <div className=" text-[#D1D5DB] px-4 py-2">
                <p>{faq.answer}</p>
                
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
