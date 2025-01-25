import React, { useState } from "react";

const SectionAnalysis = ({ results }) => {
  const { sectionStats, allQuestions } = results; 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => setIsModalOpen(true);
  const handleModalClose = () => setIsModalOpen(false);
    console.log(allQuestions)
  return (
    <div className="bg-[#1E293B] rounded-lg p-6 shadow-lg mt-6 text-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
        Section-wise Analysis
      </h2>
      <div className="sm:flex sm:items-center sm:gap-5">
        {Object.keys(sectionStats).map((section) => {
          const stats = sectionStats[section];
          const attemptedPercentage =
            (stats.attempted / stats.totalSubQues) * 100 || 0;
          const marksGainedPercentage =
            (stats.marksGained / (stats.totalSubQues * 4)) * 100 || 0;
          const marksLostPercentage =
            (stats.marksLost / (stats.totalSubQues * 4)) * 100 || 0;

          return (
            <div key={section} className="border-b border-gray-700 pb-6 w-full">
              <h3 className="text-lg font-semibold text-secondary">{section}</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-sm">
                    Questions Attempted: {stats.attempted}/{stats.totalSubQues}
                  </p>
                  <progress
                    className="progress progress-primary w-full border border-gray-400 "
                    value={attemptedPercentage}
                    max="100"
                  ></progress>
                </div>
                <div>
                  <p className="text-sm">
                    Marks Gained: {stats.marksGained}/{stats.totalSubQues * 4}
                  </p>
                  <progress
                    className="progress progress-success w-full border border-gray-400"
                    value={marksGainedPercentage}
                    max="100"
                  ></progress>
                </div>
                <div>
                  <p className="text-sm">Marks Lost: {stats.marksLost}</p>
                  <progress
                    className="progress progress-error w-full border border-gray-400"
                    value={marksLostPercentage}
                    max="100"
                  ></progress>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-6">
        <button
          onClick={handleModalOpen}
          className="btn btn-secondary px-4 py-2 rounded-lg text-sm"
        >
          Show All Questions & Answers
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal modal-open">
            <div className="modal-box max-w-3xl bg-gray-900 text-gray-100">
              <h2 className="text-xl font-bold mb-4">All Questions & Answers</h2>
              <div className="space-y-4 max-h-[60vh] overflow-auto">
                {allQuestions.map((question) => (
                  <div key={question.questionNum
                  } className="p-3 rounded-lg bg-gray-800 mb-4">
                    <p className="font-semibold text-sm">
                      Q{question.questionNum}: {question.questionText}
                    </p>
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
                  </div>
                ))}
              </div>
              <div className="modal-action mt-4">
                <button
                  onClick={handleModalClose}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionAnalysis;
