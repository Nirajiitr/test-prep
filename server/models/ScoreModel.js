import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema(
  {
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test", 
      required: true,
    },
    totalQues : { type: Number, required: true },
    bookmarkedQuestions: { type: [Number], required: true },
    totalMarks: { type: Number, required: true }, 
    correct: { type: Number, required: true }, 
    incorrect: { type: Number, required: true }, 
    unanswered: { type: Number, required: true }, 
    marksGained: { type: Number, required: true }, 
    marksLost: { type: Number, required: true }, 
    accuracy: { type: Number, required: true }, 
    timeTaken: { type: Number, required: true }, 
    subjectStats: {
      type: Map,
      of: Number, 
      default: {},
    },
    sectionStats: {
      type: Map,
      of: new mongoose.Schema(
        {
          attempted: { type: Number, required: true }, 
          marksGained: { type: Number, required: true }, 
          marksLost: { type: Number, required: true }, 
        },
        { _id: false }
      ),
      default: {},
    },
  },
  { timestamps: true }
);

export const Score = mongoose.model("Score", scoreSchema);
