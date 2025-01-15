import React from "react";
import { Doughnut, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  Title,
} from "chart.js";

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

  const doughnutData = {
    labels: ["Marks Gained", "Marks Lost", "Remaining"],
    datasets: [
      {
        label: "Overall Marks Breakdown",
        data: [marksGained, marksLost, 100 - (marksGained + marksLost)],
        backgroundColor: ["#4CAF50", "#FF5252", "#CFCFCF"],
        hoverOffset: 4,
      },
    ],
  };

  const doughnutOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} %`,
        },
      },
      legend: {
        labels: {
          color: "white",
        },
        position: "bottom",
      },
    },
  };

  const accuracyData = {
    labels: ["Accuracy", "Inaccuracy"],
    datasets: [
      {
        data: [accuracy, 100 - accuracy],
        backgroundColor: ["#50E3C2", "#FF6F61"],
        hoverOffset: 4,
      },
    ],
  };

  const accuracyOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} %`,
        },
      },
      legend: {
        labels: {
          color: "white",
        },
        position: "bottom",
      },
    },
  };

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
        data: [marksGained, marksLost, results.timeTaken/60],
        backgroundColor: ["#4CAF50", "#FF5252", "#FFC107"],
      },
    ],
  };

  const barOptions = {
    scales: {
      x: {
        ticks: {
          color: "white",
        },
      },
      y: {
        ticks: {
          color: "white",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  const pieOptions = {
    plugins: {
      legend: {
        labels: {
          color: "white",
        },
      },
    },
  };

  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Test Statistics & Status
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-[#1E293B] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            Overall Marks Breakdown
          </h3>
          <Doughnut data={doughnutData} options={doughnutOptions} />
        </div>

        <div className="bg-[#1E293B] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            Overall Accuracy
          </h3>
          <Doughnut data={accuracyData} options={accuracyOptions} />
        </div>

        <div className="bg-[#1E293B] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            Subject-wise Distribution
          </h3>
          <Pie data={pieData} options={pieOptions} />
        </div>

        <div className="bg-[#1E293B] p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-center mb-4">
            Marks & Performance Breakdown
          </h3>
          <Bar data={barData} options={barOptions} />
        </div>
      </div>
    </div>
  );
};

export default Status;
