import React from "react";
import { FaClipboardList, FaChartBar, FaBook, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";

const features = [
  {
    title: "Realistic Test Interface",
    description:
      "Experience a test interface with color-coded statuses, synced timers, and subject switching.",
    icon: <FaClipboardList />,
  },
  {
    title: "Detailed Analytics",
    description:
      "Get insights with graphs and charts showing your strengths and weaknesses.",
    icon: <FaChartBar />,
  },
  {
    title: "Test History & Bookmarks",
    description:
      "Easily access past tests, answer keys, and bookmarked PYQs.",
    icon: <FaBook />,
  },
  {
    title: "Admin Tools",
    description:
      "Manage tests, upload questions, and provide personalized feedback effortlessly.",
    icon: <FaCog />,
  },
];

const Features = () => {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center text-[#EDEDED] mb-8">
        Platform Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="flex flex-col items-center text-center p-6 shadow-lg rounded-lg bg-[#1E293B] hover:shadow-xl hover:bg-[#333f53] hover:text-[#F5F5F5] transition-all duration-300"
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
          >
            <div className="text-5xl text-[#10B981]">{feature.icon}</div>
            <h3 className="mt-4 text-xl font-semibold text-[#F5F5F5]">
              {feature.title}
            </h3>
            <p className="mt-2 text-[#EDEDED]">{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;
