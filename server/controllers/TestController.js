import { User } from "../models/AuthModel.js";
import { Test } from "../models/TestModel.js";
import moment from "moment";
import openai from "../utils/openaiConfig.js";

export const createTest = async (req, res) => {
  try {
    const {
      testName,
      class: testClass,
      description,
      duration,
      questions,
      date,
      time,
    } = req.body;

    if (!testName || !testClass || !description || !duration || !questions || !date || !time) {
      return res.status(400).json({
        success: false,
        message: "All fields (testName, class, description, duration, questions, date, time) are required.",
      });
    }

    const validSubjects = ["physics", "chemistry", "mathematics", "biology"];
    const hasInvalidSubject = questions.some((q) => !validSubjects.includes(q.subject));

    if (hasInvalidSubject) {
      return res.status(400).json({
        success: false,
        message: "One or more questions have an invalid subject.",
      });
    }

    const scheduleDate = new Date(date);
    if (isNaN(scheduleDate.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid date format. Use 'YYYY-MM-DD'.",
      });
    }

    const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/; 
    if (!timePattern.test(time)) {
      return res.status(400).json({
        success: false,
        message: "Invalid time format. Use 'HH:mm'.",
      });
    }

    const teacher = req.user;
    if (!teacher || teacher.userType !== "teacher") {
      return res.status(403).json({
        success: false,
        message: "Access denied. Only teachers can create tests.",
      });
    }

    const newTest = new Test({
      testName,
      class: testClass,
      description,
      duration,
      questions,
      date,
      time,
      educatorId: teacher._id,
      educatorName: teacher.fullname,
      educatorImg: "https://img.icons8.com/?size=100&id=52232&format=png&color=000000", 
    });

    await newTest.save();

    res.status(201).json({
      success: true,
      message: "Test created successfully.",
      test: newTest,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the test.",
      error: error.message,
    });
  }
};


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




export const getTests = async (req, res) => {
  try {
    const { type } = req.query;
    if (!type) {
      return res.status(400).json({ message: "Test type is required (available or upcoming)." });
    }

    const currentDate = moment().format("YYYY-MM-DD");
    const currentTime = moment().format("HH:mm"); 

    
    const tests = await Test.find();
     
  
    let filteredTests;
    if (type === "available") {
      filteredTests = tests.filter(
        (test) =>
          test.date <=currentDate 
      );
    } else if (type === "upcoming") {
      filteredTests = tests.filter(
        (test) =>
          test.date > currentDate || (test.date === currentDate && test.time > currentTime)
      );
    } else {
      return res.status(400).json({ message: "Invalid test type provided." });
    }
   
    res.status(200).json({
      message: `${type === "available" ? "Available Tests" : "Upcoming Tests"} fetched successfully.`,
      tests: filteredTests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getTestById = async (req, res) => {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found." });
    res.status(200).json(test);
  } catch (error) {
    res.status(400).json({ message: "Failed to retrieve test.", error });
  }
};

export const deleteTest = async (req, res) => {
  try {
    const test = await Test.findByIdAndDelete(req.params.id);
    if (!test) return res.status(404).json({ message: "Test not found." });
    res.status(200).json({ message: "Test deleted successfully!", test });
  } catch (error) {
    res.status(400).json({ message: "Failed to delete test.", error });
  }
};


export const generateQuestions = async (req, res) => {
  try {
    const { subject, numQuestions, topic } = req.body;

    if (!subject || !numQuestions || !topic) {
      return res.status(400).json({
        success: false,
        message: "Please provide subject, numQuestions, and topic",
      });
    }

    const prompt = `
      Generate ${numQuestions} multiple-choice questions on the topic of "${topic}" for the subject "${subject}".
      Each question should include 4 options (A, B, C, D), and specify the correct option in JSON format.
      Format as:
      [
        {
          
          "questionText": "...",
          "options": ["...", "...", "...", "..."],
          "correctOption": "A,B,C,D anyone",
          "subject": "${subject}"
        },
        ...
      ]
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message.content;

    const cleanResponse = response.replace(/```json|```/g, "").trim();

    const parsedQuestions = JSON.parse(cleanResponse);

    if (!Array.isArray(parsedQuestions)) {
      throw new Error("Invalid response format");
    }

    res.status(200).json({
      success: true,
      message: "Questions generated successfully",
      questions: parsedQuestions,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to generate questions",
      error: error.message,
    });
  }
};
