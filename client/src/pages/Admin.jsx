import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddQuestion from "../components/adminPage/AddQuestion";
import Header from "../components/adminPage/Header";
import QuestionSummary from "../components/adminPage/QuestionSummary";
import SubmitButton from "../components/adminPage/SubmitButton";
import TestDetails from "../components/adminPage/TestDetails";
import { toast } from "react-hot-toast";
import { createTest } from "../store/test-slice";

const Admin = () => {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.test);
  const token =
    localStorage.getItem("token") && JSON.parse(localStorage.getItem("token"));
  const [testDetails, setTestDetails] = useState({
    testName: "",
    description: "",
    class: "11",
    duration: "03:00:00",
  });

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: "",
    options: ["", "", "", ""],
    correctOption: "",
    subject: "mathematics",
  });

  const handleTestDetailsChange = (e) => {
    setTestDetails({ ...testDetails, [e.target.name]: e.target.value });
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion({ ...currentQuestion, [name]: value });
  };

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion({ ...currentQuestion, options: updatedOptions });
  };

  const addQuestion = () => {
    if (
      !currentQuestion.questionText.trim() ||
      currentQuestion.options.some((opt) => !opt.trim()) ||
      !currentQuestion.correctOption
    ) {
      toast.error("Please fill all question fields.");
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      questionText: "",
      options: ["", "", "", ""],
      correctOption: "",
      subject: "mathematics",
    });
    toast.success("Question added successfully!");
  };

  const validateDuration = (duration) =>
    /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/.test(duration);

  const handleSubmitTest = async () => {
    if (!validateDuration(testDetails.duration)) {
      toast.error("Invalid duration format! Use HH:MM:SS.");
      return;
    }

    if (questions.length === 0) {
      toast.error("Please add at least one question.");
      return;
    }

    const testData = {
      ...testDetails,
      questions,
    };

    dispatch(createTest({testData, token}))
      .unwrap()
      .then((response) => {
        toast.success("Test created successfully!");
        setTestDetails({
          testName: "",
          description: "",
          class: "11",
          duration: "03:00:00",
        });
        setQuestions([]);
      })
      .catch((err) => {
        toast.error(
          err.message || "Failed to create the test. Please try again."
        );
      });
  };

  return (
    <div className="bg-gray-900 text-gray-100 h-screen w-screen overflow-y-scroll no-scrollbar p-6 flex flex-col">
      <Header />
      <main className="flex-grow mt-6">
        <TestDetails
          testDetails={testDetails}
          handleTestDetailsChange={handleTestDetailsChange}
        />
        <AddQuestion
          currentQuestion={currentQuestion}
          handleQuestionChange={handleQuestionChange}
          handleOptionChange={handleOptionChange}
          addQuestion={addQuestion}
        />
        <QuestionSummary questions={questions} />
        <SubmitButton
          questions={questions}
          handleSubmitTest={handleSubmitTest}
          isLoading={isLoading}
        />
      </main>
      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
};

export default Admin;
