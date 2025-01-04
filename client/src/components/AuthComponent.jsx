import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, registerUser } from "../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
const AuthComponent = () => {
  const { mode } = useParams();
  const [isSignUp, setIsSignUp] = useState(mode === "register");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("student");
  const { user } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    class: "",
    stream: "jee",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(registerUser({ ...formData, userType })).then(() => {
        if (user) {
          user?.userType === "student"
            ? navigate("/user/home")
            : navigate("/teacher/dashbord");
        }
      });
    } else {
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
          userType,
        })
      ).then(() => {
        if (user) {
          user?.userType === "student"
            ? navigate("/user/home")
            : navigate("/teacher/dashbord");
        }
      });
    }
  };
  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);

    if (isSignUp) {
      navigate("/auth/login");
    } else {
      navigate("/auth/register");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-[#EDEDED]">
      <div className="w-full max-w-md bg-[#1E293B] rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            <label className="btn btn-outline flex justify-center items-center cursor-pointer">
              <input
                type="radio"
                name="userType"
                className="hidden"
                checked={userType === "student"}
                onChange={() => setUserType("student")}
              />
              <span
                className={`${
                  userType === "student"
                    ? "text-white bg-[#3B82F6]"
                    : "text-[#3B82F6] bg-transparent"
                } py-2 px-4 rounded-full transition-all duration-300`}
              >
                Student
              </span>
            </label>
            <label className="btn btn-outline flex justify-center items-center cursor-pointer">
              <input
                type="radio"
                name="userType"
                className="hidden"
                checked={userType === "teacher"}
                onChange={() => setUserType("teacher")}
              />
              <span
                className={`${
                  userType === "teacher"
                    ? "text-white bg-[#8A2BE2]"
                    : "text-[#8A2BE2] bg-transparent"
                } py-2 px-4 rounded-full transition-all duration-300`}
              >
                Teacher
              </span>
            </label>
          </div>

          {isSignUp && (
            <>
              <input
                type="text"
                name="fullname"
                placeholder="Full Name"
                value={formData.fullname}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              />
              {userType === "student" && (
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  required={formData.userType === "student"}
                >
                  <option value="">Select Class</option>
                  <option value="12">Class 12</option>
                  <option value="11">Class 11</option>
                  <option value="10">Class 10</option>
                  <option value="9">Class 9</option>
                </select>
              )}
              <select
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              >
                <option value="jee">JEE</option>
                <option value="neet">NEET</option>
              </select>
            </>
          )}

          {!isSignUp && (
            <>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
                required
              />
            </>
          )}

          <button
            type="submit"
            className="w-full p-2 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB] transition duration-300"
          >
            {isSignUp ? "Sign Up" : "Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={toggleAuthMode}
            className="text-[#10B981] hover:text-[#84CC16] transition duration-300"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthComponent;
