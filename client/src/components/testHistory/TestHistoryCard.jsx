import React from "react";
import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import {useNavigate} from "react-router-dom"
import { getScoreDetails } from "../../store/test-slice";

const TestHistoryCard = ({ test, isLoading }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const handleDetailsClick = () => {
      dispatch(getScoreDetails({scoreId : test.id}));
      navigate("/user/test/score");
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={test.educatorImg}
              alt={test.educatorName}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="text-lg font-bold">{test.educatorName}</h3>
              <p className="text-sm text-gray-400">{test.date}</p>
            </div>
          </div>
          <h4 className="text-xl font-semibold text-blue-400">
            {test.testName}
          </h4>
          <p className="mt-2 text-sm text-gray-300">{test.description}</p>
          <p className="mt-4 text-gray-400">
            <span className="font-semibold">Class:</span> {test.class}
          </p>
          <div className="mt-4 text-gray-300">
            <p>
              <span className="font-semibold">Score:</span> {test.score}%
            </p>
          </div>
          <button
            onClick={handleDetailsClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            View Details
          </button>
        </>
      )}
    </motion.div>
  );
};

export default TestHistoryCard;
