import React from "react";
import { motion } from "framer-motion";

const TestCard = ({ test, isHistory }) => {
  const handleDetailsClick = () => {
    console.log("View Details for Test:", test.id); 
  };

  return (
    <motion.div
      className="p-6 bg-gray-700 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={test.educatorImg}
          alt={test.educatorName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-bold">{test.educatorName}</h3>
        </div>
      </div>
      <h4 className="text-xl font-semibold text-blue-400">{test.name}</h4>
      <p className="mt-2 text-sm text-gray-300">{test.description}</p>
      <p className="mt-4 text-gray-400">
        <span className="font-semibold">Class:</span> {test.class}
      </p>
      {isHistory ? (
        <>
          <div className="mt-4 text-gray-300">
            <p>
              <span className="font-semibold">Score:</span> {test.score}%
            </p>
            <p>
              <span className="font-semibold">Completed On:</span> {test.date}
            </p>
          </div>
          <button
            onClick={handleDetailsClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Details
          </button>
        </>
      ) : (
        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-green-400 font-mono">{test.time}</span>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            onClick={() => console.log("Start Test:", test.id)}
          >
            Start
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default TestCard;
