import React from "react";

const Overview = ({ results }) => {
  const { totalMarks, correct, incorrect, unanswered } = results;

  const cards = [
    { title: "Total Marks Scored", value: totalMarks, color: "bg-blue-500" },
    { title: "Correct", value: correct, color: "bg-green-500" },
    { title: "Incorrect", value: incorrect, color: "bg-red-500" },
    { title: "Unanswered", value: unanswered, color: "bg-yellow-500" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-6">
      {cards.map(({ title, value, color }, index) => (
        <div
          key={index}
          className={`${color} text-white rounded-lg p-4 shadow-md hover:shadow-xl`}
        >
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-2xl font-bold mt-2">{value}</p>
        </div>
      ))}
    </div>
  );
};

export default Overview;
