import React from "react";
import { motion } from "framer-motion";
import TestCard from "./TestCard";

const TestList = ({ tests,isUpcoming}) => {
  return (
    <motion.section
      className="py-16 px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
        {isUpcoming ? "Upcoming Tests" : "Available Tests"}
      </h2>
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { staggerChildren: 0.2 },
          },
        }}
      >
        {tests.map((test) => (
          <TestCard key={test.id} test={test} />
        ))}
      </motion.div>
    </motion.section>
  );
};

export default TestList;
