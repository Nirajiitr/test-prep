const TestDetails = ({ testDetails, handleTestDetailsChange }) => (
  <section className="bg-gray-800 p-6 rounded-lg shadow-md mb-6">
    <h2 className="text-xl font-bold mb-4">Test Details</h2>
    <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div>
        <label className="block text-sm font-medium mb-2">Test Name</label>
        <input
          type="text"
          name="testName"
          value={testDetails.testName}
          onChange={handleTestDetailsChange}
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          placeholder="Enter test name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <input
          type="text"
          name="description"
          value={testDetails.description}
          onChange={handleTestDetailsChange}
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          placeholder="Enter description"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Class</label>
        <select
          name="class"
          value={testDetails.class}
          onChange={handleTestDetailsChange}
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
        >
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Duration</label>
        <input
          type="text"
          name="duration"
          value={testDetails.duration}
          onChange={handleTestDetailsChange}
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          placeholder="HH:MM:SS"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Test Date</label>
        <input
          type="date"
          name="date"
          value={testDetails.date || ""}
          onChange={handleTestDetailsChange}
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Test Time</label>
        <input
          type="time"
          name="time"
          value={testDetails.time || ""}
          onChange={handleTestDetailsChange}
          className="w-full p-2 rounded-lg bg-gray-700 text-white"
          required
        />
      </div>
    </form>
  </section>
);

export default TestDetails;
