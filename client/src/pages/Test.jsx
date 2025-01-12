import { useEffect, useState } from "react";
import Navigation from "../components/testPage/Navigation";
import QuestionSection from "../components/testPage/QuestionSection";
import Sidebar from "../components/testPage/Sidebar";
import TimerAndBookmark from "../components/testPage/TimerAndBookmark";
import { useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { SubmitTest } from "../store/test-slice";

const Test = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [bookmarked, setBookmarked] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { ongoingTest} = useSelector((state) => state.test);
  const {user} = useSelector((state) => state.auth);
 
  useEffect(() => {
    if (!ongoingTest) {
      navigate("/user/home");
    }
  }, [ongoingTest, navigate]);
  
   
  const questions = ongoingTest?.questions;
 
  const handleEndTest = () => {
    setIsModalOpen(true);
  };

  const confirmEndTest = () => {
    dispatch(SubmitTest({
      testId: ongoingTest?._id,
      userId: user?._id,
      answers,
      bookmarkedQuestions : bookmarked,
  }))
  
    setIsModalOpen(false);
    navigate("/user/test/score");
  };

  const cancelEndTest = () => {
    setIsModalOpen(false);
  };
 
  let cumulativeIndex = 1;
  const subjects = ["physics", "chemistry", "mathematics"];
  const sortedQuestions = subjects.map((subject) => {
    const subjectQuestions = questions
      ?.filter((q) => q.subject === subject)
      ?.map((q) => ({ ...q, quesNumber: cumulativeIndex++ }));
    return { subject, questions: subjectQuestions };
  });

  const calculateCounts = (subject) => {
    const subjectQuestions = questions?.filter((q) => q.subject === subject);

    const answered = subjectQuestions?.filter(
      (q) => answers[q.questionNum] !== undefined
    ).length;
    const marked = subjectQuestions?.filter((q) =>
      bookmarked.includes(q.questionNum)
    ).length;
    const unanswered = subjectQuestions?.length - answered;

    return { answered, marked, unanswered };
  };
  const handleAnswer = (id, answer) => {
    setAnswers((prev) => ({ ...prev, [id]: answer }));
    
  };

  const toggleBookmark = (id) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((qId) => qId !== id) : [...prev, id]
    );
  };

  const handleQuestionClick = (index) => {
    setCurrentQuestion(index);
  };

  return (
    <div className="flex h-screen bg-gray-900 text-gray-100">
      {
        ongoingTest &&  <Sidebar
        sortedQuestions={sortedQuestions}
        calculateCounts={calculateCounts}
        currentQuestion={currentQuestion}
        handleQuestionClick={handleQuestionClick}
        answers={answers}
        bookmarked={bookmarked}
      />
      }
     
      <main className="flex-grow p-4 lg:p-6 flex flex-col relative">
        {
          ongoingTest && <>
          <TimerAndBookmark
          toggleBookmark={toggleBookmark}
          bookmarked={bookmarked}
          currentQuestion={currentQuestion}
          questions={questions}
          handleEndTest={handleEndTest}
        />
        <QuestionSection
          questions={questions}
          currentQuestion={currentQuestion}
          answers={answers}
          handleAnswer={handleAnswer}
        />
        <Navigation
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          questions={questions}
        />
        </>
        }
        
      </main>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="modal modal-open">
            <div className="modal-box  bg-gray-900 text-gray-100 flex flex-col justify-center items-center">
              <h2 className="text-xl font-bold">
                Are you sure you want to end the test?
              </h2>
              <div className="modal-action">
                <button className="btn btn-error" onClick={confirmEndTest}>
                  Yes
                </button>
                <button className="btn btn-secondary" onClick={cancelEndTest}>
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Test;
