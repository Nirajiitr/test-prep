const AddQuestion = ({
    currentQuestion,
    handleQuestionChange,
    handleOptionChange,
    addQuestion,
  }) => (
    <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Add Questions</h2>
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <select
            name="subject"
            value={currentQuestion.subject}
            onChange={handleQuestionChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          >
            <option value="mathematics">Mathematics</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="biology">Biology</option>
           
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Question</label>
          <textarea
            name="questionText"
            value={currentQuestion.questionText}
            onChange={handleQuestionChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            placeholder="Enter the question"
          ></textarea>
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
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                placeholder={`Option ${String.fromCharCode(65 + index)}`}
                required
              />
            ))}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Correct Option</label>
          <select
            name="correctOption"
            value={currentQuestion.correctOption}
            onChange={handleQuestionChange}
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
          >
            <option value="">Select correct option</option>
            {["A", "B", "C", "D"].map((opt, index) => (
              <option key={index} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          onClick={addQuestion}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Add Question
        </button>
      </form>
    </section>
  );
  
  export default AddQuestion