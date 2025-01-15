import { IoCloseCircleOutline } from "react-icons/io5";

const Sidebar = ({
  sortedQuestions,
  calculateCounts,
  currentQuestion,
  handleQuestionClick,
  answers,
  bookmarked,
  isSideOpen,
  setSideOpen
}) => (
  <aside className={`w-1/2 sm:w-1/4 bg-gray-800 p-4 h-screen overflow-y-scroll  sm:relative ${isSideOpen? " absolute left-0 top-0 z-20": "hidden"}  sm:block`}>
    <div className="mb-4 flex justify-between items-center">
    <h3 className="text-lg font-bold ">Questions</h3>
     <button className={isSideOpen? "block" : "hidden"} onClick={()=>setSideOpen(false)}><IoCloseCircleOutline size={30} /></button>
    </div>
    {sortedQuestions.map(({ subject, questions }) => {
      const { answered, marked, unanswered } = calculateCounts(subject);
      return (
        <div key={subject} className="mb-6 ">
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
            {questions?.map((q) => (
              <button
                onClick={() => handleQuestionClick(q.questionNum - 1)}
                key={q._id}
                className={`size-8 rounded border flex items-center justify-center ${
                  currentQuestion === q.questionNum - 1
                    ? "bg-blue-800 text-white"
                    : ""
                } ${
                  bookmarked.includes(q.questionNum) ? "border-yellow-500" : ""
                } ${
                  answers[q.questionNum] !== undefined ? "border-green-500" : ""
                }`}
              >
                {q.questionNum}
              </button>
            ))}
          </div>
        </div>
      );
    })}
  </aside>
);
export default Sidebar;
