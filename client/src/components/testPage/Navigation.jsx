const Navigation = ({ currentQuestion, setCurrentQuestion, questions }) => (
    <div className="flex justify-between items-center mt-6">
      <button
        onClick={() => setCurrentQuestion((prev) => Math.max(prev - 1, 0))}
        className={`px-4 py-2 rounded-lg ${
          currentQuestion === 0
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Previous
      </button>
      <button
        onClick={() =>
          setCurrentQuestion((prev) =>
            Math.min(prev + 1, questions.length - 1)
          )
        }
        className={`px-4 py-2 rounded-lg ${
          currentQuestion === questions.length - 1
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        Save & Next
      </button>
    </div>
  );
export default Navigation  