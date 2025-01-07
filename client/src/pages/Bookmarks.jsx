import React from "react";
import { questions } from "../data";
import { motion } from "framer-motion";
const Bookmarks = () => {
  const bookmarkedQuestions = questions;

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
          {bookmarkedQuestions?.length === 0 ? (
            <p className="text-lg">You have no bookmarked questions.</p>
          ) : (
            <div className="space-y-4 p-4 ">
              {bookmarkedQuestions?.map((question, index) => (
                <div key={question.id} className="p-4 bg-gray-800 rounded-md">
                  <h2 className="font-bold text-lg mb-2">
                    Q{index + 1}: {question.question}
                  </h2>
                  <ul className="space-y-2">
                    {question.options.map((option, optionIndex) => (
                      <li key={optionIndex} className="flex items-center gap-2">
                        <span className="font-bold">
                          {String.fromCharCode(65 + optionIndex)}:
                        </span>
                        <span>{option}</span>
                      </li>
                    ))}
                  </ul>
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
