import { useEffect, useRef, useState } from "react";
import { FaRegBookmark } from "react-icons/fa";

const TimerAndBookmark = ({
  toggleBookmark,
  bookmarked,
  currentQuestion,
  questions,
 
  handleEndTest,
}) => {
  const [timeLeft, setTimeLeft] = useState(3600);
   const timeInterval = useRef(null); 
   useEffect(() => {
     
      timeInterval.current = setInterval(() => {
        setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
      }, 1000);
  
      
      return () => clearInterval(timeInterval.current);
    }, []); 
    const formatTime = (time) => {
      const minutes = Math.floor(time / 60);
      const seconds = time % 60;
      return `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")}`;
    };
  
  return (
    <div className="flex justify-between items-start sm:items-center">
      <button
        onClick={() => toggleBookmark(questions[currentQuestion].id)}
        className={`flex items-center justify-center p-2 gap-1 border rounded ${
          bookmarked.includes(questions[currentQuestion].id)
            ? "bg-yellow-500"
            : ""
        }`}
      >
        <FaRegBookmark />
        <span className="text-lg">
          {bookmarked.includes(questions[currentQuestion].id)
            ? "Unmark"
            : "Mark"}
        </span>
      </button>
      <div className="flex-col flex sm:flex-row items-end sm:items-center justify-center gap-5">
        <div className="bg-gray-700 text-white px-4 py-2 rounded-lg">
          Time Left: {formatTime(timeLeft)}
        </div>
        <button onClick={handleEndTest} className="btn btn-neutral">
          End Test
        </button>
      </div>
    </div>
  );
};

export default TimerAndBookmark;
