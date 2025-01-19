import React from "react";
import { motion } from "framer-motion";
import TestCard from "./TestCard";
import { PuffLoader } from "react-spinners";

const TestList = ({ tests, isUpcoming, isLoading }) => {
  
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
      {isLoading ? (
       <div className="w-screen h-screen flex items-center justify-center">
       <PuffLoader color="#3671d6" size="40px" />
     </div>
      ) : tests.length === 0 ? (
        <span>No Tests Available</span>
      ) : (
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
          {tests?.map((test, index) => (
            <motion.div
              key={test.id || index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
            >
              <TestCard test={test} isUpcoming={isUpcoming} />
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.section>
  );
};

export default TestList;
