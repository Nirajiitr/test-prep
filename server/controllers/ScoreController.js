import { Test } from "../models/TestModel.js";
import { Score } from "../models/ScoreModel.js";
import { User } from "../models/AuthModel.js";

export const submitTest = async (req, res) => {
  try {
    const { testId, userId, answers, bookmarkedQuestions, timeTaken  } = req.body;

    if (!testId || !userId || !answers || !timeTaken) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const test = await Test.findById(testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let correct = 0,
      incorrect = 0,
      unanswered = 0,
      marksGained = 0,
      totalQues = 0,
      marksLost = 0,
      totalSubQues= 0;
   
    const sectionStats = {};

    test.questions.forEach((question) => {
      const questionNum = question.questionNum;
      const answer = answers[questionNum] !== undefined ? String.fromCharCode(65 + answers[questionNum]) : undefined;

      if (answer === undefined) {
        unanswered++;
      } else if (answer === question.correctOption) {
        correct++;
        marksGained += 4;
      } else {
        incorrect++;
        marksLost += 1;
      }

      const subject = question.subject;
     
      if (!sectionStats[subject]) {
        sectionStats[subject] = { attempted: 0, marksGained: 0, marksLost: 0, totalSubQues: 0 };
      }

      if (answer !== undefined) {
       
        sectionStats[subject].attempted++;
        if (answer === question.correctOption.toUpperCase()) {
          sectionStats[subject].marksGained += 4;
        } else {
          sectionStats[subject].marksLost += 1;
        }
      }

    
      sectionStats[subject].totalSubQues+=1;
     
      totalQues++;
    });
   
    const totalMarks = (correct * 4) - incorrect;

    const accuracy = ((correct /(correct+incorrect)) * 100).toFixed(2);

    const score = new Score({
      studentId: userId,
      testId,
      totalMarks,
      correct,
      incorrect,
      unanswered,
      marksGained,
      marksLost,
      accuracy,
      timeTaken: timeTaken,
     
      sectionStats,
      totalQues,
      bookmarkedQuestions,
      allQuestions: test.questions,
    });

    await score.save();

    res.status(201).json({
      message: "Test submitted successfully",
      score,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


export const getTestHistory = async (req, res) => {
  try {
    const { userId } = req.params; 

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const scores = await Score.find({ studentId: userId }).sort({ createdAt: -1 });

    if (!scores.length) {
      return res.status(200).json({
        message: "No test history found for this user.",
        testHistory: [],
      });
    }

    const testHistory = await Promise.all(
      scores.map(async (score) => {
        const test = await Test.findById(score.testId);
        const percentageScore =Math.round(((score.totalMarks)/(score.totalQues * 4))*100) ;
        if (!test) return null;

        return {
          id: score._id,
          educatorImg: test.educatorImg,
          educatorName: test.educatorName,
          testName: test.testName,
          description: test.description,
          class: test.class,
          score: percentageScore ,
          date: score.createdAt.toISOString().split("T")[0],
        };
      })
    );

    const filteredHistory = testHistory.filter((history) => history !== null);

    res.status(200).json({
      message: "Test history retrieved successfully",
      testHistory: filteredHistory,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getScoreDetails = async (req, res) => {
  try {
    const { scoreId } = req.params; 

    if (!scoreId) {
      return res.status(400).json({ message: "Score ID is required" });
    }

    const score = await Score.findById(scoreId);
    if (!score) {
      return res.status(404).json({ message: "Score not found" });
    }

    const test = await Test.findById(score.testId);
    if (!test) {
      return res.status(404).json({ message: "Test not found for this score" });
    }

    const scoreDetails = {
      ...score._doc, 
      testName: test.testName,
      description: test.description,
      class: test.class,
      educatorName: test.educatorName,
      educatorImg: test.educatorImg,
    };

    res.status(200).json({
      message: "Score details retrieved successfully",
      scoreDetails,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
export const getBookmarkedQuestions = async (req, res) => {
  try {
 

    const { userId } = req.body; 
    
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }
   
    
    const scores = await Score.find({ studentId: userId });

    if (!scores || scores.length === 0) {
      return res.status(404).json({ error: "No scores found for this user" });
    }

    let bookmarkedQuestions = [];

    for (const score of scores) {
      const test = await Test.findById(score.testId);

      if (test) {
        const questions = test.questions.filter((q) =>
          score.bookmarkedQuestions.includes(q.questionNum)
        );

        bookmarkedQuestions = bookmarkedQuestions.concat(
          questions.map((q) => ({
            questionNum: q.questionNum,
            testName: test.testName,
            subject: q.subject,
            questionText: q.questionText,
            options: q.options,
            correctOption: q.correctOption,
          }))
        );
      }
    }

    return res.status(200).json({ bookmarkedQuestions });
  } catch (error) {
    console.error("Error fetching bookmarked questions:", error);
    return res.status(500).json({ error: "Server error" });
  }
};
