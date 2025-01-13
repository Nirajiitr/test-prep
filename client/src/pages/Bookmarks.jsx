import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkedQuestions } from "../store/test-slice";

const Bookmarks = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { bookmarkedQuestions, isLoading} = useSelector((state) => state.test);
 
  useEffect(() => {
    if (user?._id) {
      dispatch(getBookmarkedQuestions({ userId: user._id }));
    }
  }, [dispatch, user]);

  return (
    <div className="relative items-center justify-center w-screen h-screen overflow-hidden  font-sans bg-[#0D1117] text-[#EDEDED]  flex flex-col">
      <motion.section
        className="py-20 px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="w-full absolute h-full top-0 right-0 overflow-y-scroll">
          <h2 className="text-3xl font-bold text-center text-blue-400 mb-8">
            Bookmarked Questions
          </h2>

          {isLoading ? (
            <p className="text-center text-lg">Loading your bookmarks...</p>
          )  : bookmarkedQuestions?.length === 0 ? (
            <p className="text-lg text-center">You have no bookmarked questions.</p>
          ) : (
            <div className="space-y-6">
              {bookmarkedQuestions?.map((question, index) => (
                <div
                  key={index}
                  className="p-4 bg-gray-800 rounded-md shadow-md hover:bg-gray-700 transition-colors"
                >
                  <h3 className="font-bold text-lg mb-2">
                    Q{question.questionNum}: {question.questionText}
                  </h3>
                  <ul className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <li
                        key={optionIndex}
                        className={`flex items-center gap-2 p-2 rounded-md ${
                          question.correctOption === String.fromCharCode(65 + optionIndex)
                            ? "bg-green-700"
                            : ""
                        }`}
                      >
                        <span className="font-bold">
                          {String.fromCharCode(65 + optionIndex)}:
                        </span>
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-sm text-gray-400">
                    <span className="font-semibold">Test Name:</span> {question.testName}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold">Subject:</span> {question.subject}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default Bookmarks;
