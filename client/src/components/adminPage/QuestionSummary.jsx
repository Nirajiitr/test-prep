const QuestionSummary = ({ questions }) => (
    <section className="bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Questions Summary</h2>
      <div className="w-full h-48 overflow-y-scroll rounded-lg bg-gray-700 p-4">
        {questions.length === 0 ? (
          <p className="text-gray-400">No questions added yet.</p>
        ) : (
          <ul className="space-y-4">
            {questions.map((q, index) => (
              <li
                key={index}
                className="p-4 bg-gray-600 rounded-lg flex justify-between items-start"
              >
                <div>
                  <p className="text-sm font-bold">
                    Q{index + 1}: {q.questionText}
                  </p>
                  <ul className="text-sm text-gray-300 mt-2">
                    {q.options.map((opt, idx) => (
                      <li key={idx}>
                        <span className="font-bold">{String.fromCharCode(65 + idx)}:</span>{" "}
                        {opt}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="text-green-400 font-bold">
                  Correct: {q.correctOption}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );

  export default QuestionSummary