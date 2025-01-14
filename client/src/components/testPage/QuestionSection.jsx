const QuestionSection = ({
  questions,
  currentQuestion,
  answers,
  handleAnswer,
}) => {
  return (
    <div className="flex-grow flex flex-col items-center justify-center text-center">
      <div className="grid grid-cols-1 gap-4 w-full max-w-md">
      <div className="flex flex-col  justify-center gap-1 mb-6">
        <h2 className="text-xl w-full text-left font-bold ">
          <span>
            {questions[currentQuestion]?.quesNumber || currentQuestion + 1}.
          </span>{" "}
          {questions[currentQuestion]?.questionText || "Question not found"}
        </h2>
        <h4 className="text-right font-semibold text-gray-400">(+4 marks, -1 marks)</h4>
        </div>
        {questions[currentQuestion]?.options.map((option, index) => (
          <button
            key={index}
            onClick={() => {
              handleAnswer(questions[currentQuestion].questionNum, index);
            }}
            className={` hover:bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2 ${
              answers[questions[currentQuestion].questionNum] !== index
                ? "bg-gray-700"
                : "bg-blue-500"
            }`}
          >
            <span className="font-bold">
              {String.fromCharCode(65 + index)}.
            </span>
            <span>{option}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionSection;
