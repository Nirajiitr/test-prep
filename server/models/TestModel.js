import mongoose from "mongoose";

const testSchema = new mongoose.Schema(
  {
    testName: { type: String, required: true },
    class: { type: String, required: true },
    description: { type: String, required: true },
    educatorId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "User",
      required: true 
    },
    educatorName: { type: String, required: true },
    educatorImg: { type: String },
    duration: { type: String, required: true },
    date: String,
    time: String, 
    questions: [
      {
        questionNum : {type : Number, required : true},
        subject: {
          type: String,
          enum: ["physics", "chemistry", "mathematics", "biology"],
          required: true,
        },
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctOption: { type: String, required: true },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const Test = mongoose.model("Test", testSchema);
