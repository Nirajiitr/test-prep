import React from "react";
import { Pie } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement, // For pie charts
  BarElement, // For bar charts
  CategoryScale, // For x-axis category scaling
  LinearScale, // For y-axis linear scaling
  Tooltip, // For tooltips
  Legend, // For legends
  Title, // For titles
} from "chart.js";

// Register elements, scales, and controllers for chart.js
ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title
);

const Status = ({ results }) => {
  const { marksGained, marksLost, accuracy, subjectStats } = results;

  const pieData = {
    labels: ["Physics", "Chemistry", "Mathematics"],
    datasets: [
      {
        data: Object.values(subjectStats),
        backgroundColor: ["#4A90E2", "#50E3C2", "#F5A623"],
      },
    ],
  };

  const barData = {
    labels: ["Marks Gained", "Marks Lost", "Time Taken (min)"],
    datasets: [
      {
        label: "Scores",
        data: [marksGained, marksLost, results.timeTaken],
        backgroundColor: ["#4CAF50", "#FF5252", "#FFC107"],
      },
    ],
  };
  const options = {
    scales: {
      x: {
        ticks: {
          color: "white", // Set x-axis labels to white
        },
      },
      y: {
        ticks: {
          color: "white", // Set y-axis labels to white
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white", // Set the "Scores" label color to white
        },
      },
    },
  };
  const Pieoptions = {
    plugins: {
      legend: {
        labels: {
          color: "white", // Change label color in legend to white
        },
      },
    },
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Test Statistics & Status
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Stats Card */}
        <div className="bg-[#1E293B] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Overall Statistics</h3>
          <ul className="list-disc list-inside space-y-2 mt-3">
            <li className="text-md">Marks Gained: {marksGained}</li>
            <li className="text-md">Marks Lost: {marksLost}</li>
            <li className="text-md">Accuracy: {accuracy}%</li>
          </ul>
        </div>

        {/* Graphical Analysis */}
        <div className="flex flex-col space-y-4">
          <div className="bg-[#1E293B] p-4 rounded-lg shadow-md ">
            <h3 className="text-lg font-semibold text-center">
              Subject-wise Distribution
            </h3>
            <Pie data={pieData} options={Pieoptions} />
          </div>
          <div className="bg-[#1E293B] p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-center">
              Marks & Performance Breakdown
            </h3>
            <Bar data={barData} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
