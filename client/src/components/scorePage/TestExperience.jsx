import React, { useState } from "react";
 import {toast} from "react-hot-toast"
const TestExperience = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
     toast.success("Thank you for your feedback!");
     setFeedback("");
     setRating(0)
  };

  return (
    <form className="bg-[#1E293B] rounded-lg p-6 shadow mb-6" onSubmit={handleSubmit}>
      <h2 className="text-xl font-bold mb-4">Your Test Experience</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Rate Us</label>
        <div className="flex items-center space-x-2">
          {[...Array(5)].map((_, index) => (
            <button
              type="button"
              key={index}
               className="rating"
              onClick={() => setRating(index + 1)}
            >
                 <input type="radio" name="rating-1" className={`  ${
                rating > index ? "bg-yellow-400" : "bg-white"
              } hover:bg-yellow-300 mask mask-star`} required />
            </button>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Share your experience</label>
        <textarea
          rows="3"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
          className="w-full bg-[#121212] text-white border border-gray-600 rounded p-2 focus:outline-none"
          placeholder="Write your feedback here"
          required
        />
      </div>
      <button type="submit" className="btn bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        Submit
      </button>
    </form>
  );
};

export default TestExperience;
