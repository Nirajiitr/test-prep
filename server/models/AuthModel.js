import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const authSchema = new mongoose.Schema(
  {
    fullname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: {
      type: String,
      enum: ["student", "teacher"],
      default: "student",
    },
    class: {
      type: String,
      enum: ["9", "10", "11", "12"],
      required: function () {
        return this.userType === "student";
      },
    },
    stream: { type: String, enum: ["jee", "neet"], default: "jee" },
  },
  { timestamps: true }
);

authSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

authSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

export const User = mongoose.model("User", authSchema);
