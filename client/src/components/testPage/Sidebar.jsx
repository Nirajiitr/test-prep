const Sidebar = ({ sortedQuestions, calculateCounts, currentQuestion, handleQuestionClick, answers, bookmarked }) => (
    <aside className="w-1/4 bg-gray-800 p-4 h-screen overflow-y-scroll hidden sm:block">
      <h3 className="text-lg font-bold mb-4">Questions</h3>
      {sortedQuestions.map(({ subject, questions }) => {
        const { answered, marked, unanswered } = calculateCounts(subject);
        return (
          <div key={subject} className="mb-6">
            <div className="flex flex-col items-start justify-center mb-4">
              <h4 className="text-blue-400 font-semibold">{subject}</h4>
              <span className="text-sm">Attempt all</span>
            </div>
            <div className="flex items-center gap-3 flex-wrap mb-4">
              <div className="flex items-center gap-1 text-sm">
                <div className="size-2 rounded-full bg-green-400" />
                <span>{answered}</span>
                <span>answered</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <div className="size-2 rounded-full bg-yellow-400" />
                <span>{marked}</span>
                <span>marked</span>
              </div>
              <div className="flex items-center gap-1 text-sm">
                <div className="size-2 rounded-full border" />
                <span>{unanswered}</span>
                <span>unanswered</span>
              </div>
            </div>
  
            <div className="flex gap-2 flex-wrap">
              {questions.map((q) => (
                <button
                  onClick={() => handleQuestionClick(q.id - 1)}
                  key={q.id}
                  className={`size-8 rounded border flex items-center justify-center ${
                    currentQuestion === q.id - 1 ? "bg-blue-800 text-white" : ""
                  } ${bookmarked.includes(q.id) ? "border-yellow-500" : ""} ${
                    answers[q.id] !== undefined ? "border-green-500" : ""
                  }`}
                >
                  {q.quesNumber}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </aside>
  );
export default Sidebar  