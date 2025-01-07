const SubmitButton = ({ questions, handleSubmitTest, isLoading }) => (
  <button
    onClick={handleSubmitTest}
    className={`w-full mt-6 px-4 py-2 rounded-lg ${
      questions.length > 0 && !isLoading
        ? "bg-green-600 hover:bg-green-700"
        : "bg-gray-600 cursor-not-allowed"
    }`}
    disabled={questions.length === 0 || isLoading}
  >
    {isLoading ? "Submitting..." : "Submit Test"}
  </button>
);

export default SubmitButton;
