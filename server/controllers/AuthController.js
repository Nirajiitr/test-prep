import { User } from "../models/AuthModel.js";
import jwt from "jsonwebtoken";

const registerUser = async (req, res) => {
  const {
    fullname,
    email,
    password,
    userType,
    class: userClass,
    stream,
  } = req.body;

  try {
    if (userType === "student" && !userClass) {
      return res
        .status(400)
        .json({ message: "Class is required for students" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const classValue = userType === "student" ? userClass : undefined;
    const newUser = new User({
      fullname,
      email,
      password,
      userType,
      class: classValue,
      stream,
    });
    await newUser.save();

    const token = jwt.sign(
      {
        _id: newUser._id,
        fullname: newUser.fullname,
        email: newUser.email,
        userType: newUser.userType,
        stream: newUser.stream,
        class: newUser.class,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userData } = newUser._doc;
    res.status(201).json({
      userData,
      message: "account created successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password, userType } = req.body;

  try {
    const user = await User.findOne({ email, userType });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        userType: user.userType,
        stream: user.stream,
        class: user.class,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    const { password: _, ...userData } = user._doc;
    res.status(200).json({
      userData,
      message: "login successfully",
      success: true,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export { registerUser, loginUser };
