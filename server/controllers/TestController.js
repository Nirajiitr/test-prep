import { User } from "../models/AuthModel.js";
import { Test } from "../models/TestModel.js";

export const createTest = async (req, res) => {
  try {
    const {
      testName,
      class: testClass,
      description,
      duration,
      questions,
    } = req.body;
   
    
    const validSubjects = ["physics", "chemistry", "mathematics", "biology"];
    const hasInvalidSubject = req.body.questions.some(
      (q) => !validSubjects.includes(q.subject)
    );

    if (hasInvalidSubject) {
      return res.status(400).json({
        success: false,
        message: "One or more questions have an invalid subject",
      });
    }
   
     
    const teacher = req.user;
     
    if (!teacher || teacher.userType !== "teacher") {
      return res
        .status(403)
        .json({ message: "Access denied. Only teachers can create tests." });
    }
    const newTest = new Test({
      testName,
      class: testClass,
      description,
      duration,
      questions,
      educatorId: teacher.id,
      educatorName: teacher.fullname,
      educatorImg: teacher.avatar || "", // Assuming teacher may have an avatar field
    });

    await newTest.save();
    
    res.status(201).json({
      success: true,
      message: "Test created successfully",
      test: newTest,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a test by ID
export const updateTest = async (req, res) => {
  try {
    const validSubjects = ["physics", "chemistry", "mathematics", "biology"];
    const hasInvalidSubject = req.body.questions?.some(
      (q) => !validSubjects.includes(q.subject)
    );

    if (hasInvalidSubject) {
      return res.status(400).json({
        success: false,
        message: "One or more questions have an invalid subject",
      });
    }

    const updatedTest = await Test.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedTest) {
      return res
        .status(404)
        .json({ success: false, message: "Test not found" });
    }

    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      test: updatedTest,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all tests
export const getTests = async (req, res) => {
  try {
    const tests = await Test.find();
   
    res.status(200).json(tests);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve tests.", error });
  }
};

// Get a test by ID
export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found." });
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve test.", error });
  }
};

// Delete a test by ID
export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found." });
    res.status(200).json({ message: "Test deleted successfully!", test });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete test.", error });
  }
};
