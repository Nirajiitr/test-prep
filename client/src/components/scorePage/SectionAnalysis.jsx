import React from "react";

const SectionAnalysis = ({ results }) => {
  const { sectionStats } = results;
    
  return (
    <div className="bg-[#1E293B] rounded-lg p-6 shadow-lg mt-6 text-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">
        Section-wise Analysis
      </h2>
      <div className="space-y-8">
        {Object.keys(sectionStats).map((section) => {
          const stats = sectionStats[section];
          const attemptedPercentage = (stats.attempted / stats.totalSubQues) * 100 || 0;
          const marksGainedPercentage = (stats.marksGained / (stats.totalSubQues*4)) * 100 || 0;
          const marksLostPercentage = (stats.marksLost / (stats.totalSubQues*4)) * 100 || 0;
            
          return (
            <div key={section} className="border-b border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-secondary">{section}</h3>
              <div className="space-y-4 mt-4">
                <div>
                  <p className="text-sm">Questions Attempted: {stats.attempted}/{stats.totalSubQues}</p>
                  <progress
                    className="progress progress-primary w-full border border-gray-400 "
                    value={attemptedPercentage}
                    max="100"
                  ></progress>
                </div>
                <div>
                  <p className="text-sm">Marks Gained: {stats.marksGained}/{stats.totalSubQues*4}</p>
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
    </div>
  );
};

export default SectionAnalysis;
