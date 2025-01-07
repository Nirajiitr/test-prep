import React from "react";

const SectionAnalysis = ({ results }) => {
  const { sectionStats } = results;

  return (
    <div className="bg-[#1E293B] rounded-lg p-6 shadow-md mt-6">
      <h2 className="text-2xl font-semibold mb-4 text-center">Section-wise Analysis</h2>
      <div className="space-y-4">
        {Object.keys(sectionStats).map((section) => (
          <div key={section} className="border-b pb-4">
            <h3 className="text-lg font-semibold ">{section}</h3>
            <div className="space-y-2 mt-2">
              <p className="text-md">Questions Attempted: {sectionStats[section].attempted}</p>
              <p className="text-md">Marks Gained: {sectionStats[section].marksGained}</p>
              <p className="text-md">Marks Lost: {sectionStats[section].marksLost}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionAnalysis;
