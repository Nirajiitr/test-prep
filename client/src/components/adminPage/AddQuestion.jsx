import { useState } from "react";
import {PulseLoader} from "react-spinners"
const AddQuestion = ({
  currentQuestion,
  handleQuestionChange,
  handleOptionChange,
  addQuestion,
  generateQuestion,
  isQuesGenerating
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [aiFields, setAiFields] = useState({
    subject: "",
    topic: "",
    numQuestions: 1,
  });
  const [errors, setErrors] = useState({});
  const [aiErrors, setAiErrors] = useState({});

  const validateFields = () => {
    const newErrors = {};
    if (!currentQuestion.subject) newErrors.subject = "Subject is required.";
    if (!currentQuestion.questionText) newErrors.questionText = "Question text is required.";
    if (!currentQuestion.options.every((opt) => opt)) newErrors.options = "All options are required.";
    if (!currentQuestion.correctOption) newErrors.correctOption = "Correct option is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateAiFields = () => {
    const newAiErrors = {};
    if (!aiFields.subject) newAiErrors.subject = "Subject is required.";
    if (!aiFields.topic) newAiErrors.topic = "Topic is required.";
    if (!aiFields.numQuestions || aiFields.numQuestions < 1)
      newAiErrors.numQuestions = "Number of questions must be at least 1.";
    setAiErrors(newAiErrors);
    return Object.keys(newAiErrors).length === 0;
  };

  const handleAiFieldChange = (e) => {
    const { name, value } = e.target;
    setAiFields({ ...aiFields, [name]: value });
  };

  const handleGenerate = (e) => {
    e.preventDefault();
    if (validateAiFields()) {
      generateQuestion(aiFields);
      setIsModalOpen(false);
    }
  };

  const handleAddQuestion = () => {
    if (validateFields()) {
      addQuestion();
    }
  };

  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Add Questions</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <select
            name="subject"
            value={currentQuestion.subject}
            onChange={handleQuestionChange}
            className={`w-full p-2 rounded-lg bg-gray-700 text-white ${
              errors.subject ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Subject</option>
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
          </select>
          {errors.subject && <p className="text-red-500 text-sm">{errors.subject}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Question</label>
          <textarea
            name="questionText"
            value={currentQuestion.questionText}
            onChange={handleQuestionChange}
            className={`w-full p-2 rounded-lg bg-gray-700 text-white ${
              errors.questionText ? "border-red-500" : ""
            }`}
            placeholder="Enter the question"
            required
          ></textarea>
          {errors.questionText && <p className="text-red-500 text-sm">{errors.questionText}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Options</label>
          <div className="space-y-2">
            {currentQuestion.options.map((option, index) => (
              <input
                key={index}
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                className={`w-full p-2 rounded-lg bg-gray-700 text-white ${
                  errors.options ? "border-red-500" : ""
                }`}
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                required
              />
            ))}
          </div>
          {errors.options && <p className="text-red-500 text-sm">{errors.options}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Correct Option</label>
          <select
            name="correctOption"
            value={currentQuestion.correctOption}
            onChange={handleQuestionChange}
            className={`w-full p-2 rounded-lg bg-gray-700 text-white ${
              errors.correctOption ? "border-red-500" : ""
            }`}
            required
          >
            <option value="">Select correct option</option>
            {["A", "B", "C", "D"].map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.correctOption && <p className="text-red-500 text-sm">{errors.correctOption}</p>}
        </div>
        <button
          type="button"
          onClick={handleAddQuestion}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Question
        </button>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="ml-4 px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700"
        >
         {
          isQuesGenerating ?
          <div className="flex justify-center items-center gap-2">
            <PulseLoader />
                
          </div> : "Or Generate Using AI"
         } 
        </button>
      </form>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg lg:w-1/3">
            <h2 className="text-xl font-bold mb-4">Generate Questions Using AI</h2>
            <form className="space-y-4" onSubmit={handleGenerate}>
              <div>
                <label className="block text-sm font-medium mb-2">Subject</label>
                <select
                  name="subject"
                  value={aiFields.subject}
                  onChange={handleAiFieldChange}
                  className={`w-full p-2 rounded-lg bg-gray-700 text-white ${
                    aiErrors.subject ? "border-red-500" : ""
                  }`}
                  required
                >
                  <option value="">Select Subject</option>
                  <option value="mathematics">Mathematics</option>
                  <option value="physics">Physics</option>
                  <option value="chemistry">Chemistry</option>
                  <option value="biology">Biology</option>
                </select>
                {aiErrors.subject && <p className="text-red-500 text-sm">{aiErrors.subject}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Topic</label>
                <input
                  type="text"
                  name="topic"
                  value={aiFields.topic}
                  onChange={handleAiFieldChange}
                  className={`w-full p-2 rounded-lg bg-gray-700 text-white ${
                    aiErrors.topic ? "border-red-500" : ""
                  }`}
                  placeholder="Enter topic"
                  required
                />
                {aiErrors.topic && <p className="text-red-500 text-sm">{aiErrors.topic}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Number of Questions</label>
                <input
                  type="number"
                  name="numQuestions"
                  value={aiFields.numQuestions}
                  onChange={handleAiFieldChange}
                  className={`w-full p-2 rounded-lg bg-gray-700 text-white ${
                    aiErrors.numQuestions ? "border-red-500" : ""
                  }`}
                  min="1"
                  placeholder="Enter number of questions"
                  required
                />
                {aiErrors.numQuestions && (
                  <p className="text-red-500 text-sm">{aiErrors.numQuestions}</p>
                )}
              </div>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
              >
                Generate
              </button>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="ml-4 px-4 py-2 bg-gray-500 rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default AddQuestion;
