import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { loginUser, registerUser } from "../store/auth-slice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

const AuthComponent = () => {
  const { mode } = useParams();
  const [isSignUp, setIsSignUp] = useState(mode === "register");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userType, setUserType] = useState("student");
  const { user, isLoading } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
    class: "",
    stream: "jee",
  });

  const [passwordStrength, setPasswordStrength] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "password") {
      if (value.length < 6) setPasswordStrength("Weak");
      else if (value.length < 10) setPasswordStrength("Medium");
      else setPasswordStrength("Strong");
    }
  };

  const validateInputs = () => {
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return false;
      }
      if (!formData.email.includes("@")) {
        toast.error("Invalid email format");
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    if (isSignUp) {
      dispatch(registerUser({ ...formData, userType })).then((result) => {
        if (result?.payload?.userData) {
          result?.payload?.userData?.userType === "student"
            ? navigate("/user/home")
            : navigate("/teacher/dashboard");
        }
      });
    } else {
      dispatch(
        loginUser({
          email: formData.email,
          password: formData.password,
          userType,
        })
      ).then((result) => {
        if (result?.payload?.userData) {
          result?.payload?.userData?.userType === "student"
            ? navigate("/user/home")
            : navigate("/teacher/dashboard");
        }
      });
    }
  };

  const toggleAuthMode = () => {
    setIsSignUp(!isSignUp);
    navigate(isSignUp ? "/auth/login" : "/auth/register");
    setFormData({
      fullname: "",
      email: "",
      password: "",
      confirmPassword: "",
      class: "",
      stream: "jee",
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#0D1117] text-[#EDEDED]">
      <div className="w-full max-w-md bg-[#1E293B] rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center">
          {isSignUp ? "Sign Up" : "Login"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex justify-center space-x-4 mb-4">
            {["student", "teacher"].map((type) => (
              <label key={type} className="cursor-pointer">
                <input
                  type="radio"
                  name="userType"
                  className="hidden"
                  checked={userType === type}
                  onChange={() => setUserType(type)}
                  aria-label={`Select ${type} role`}
                />
                <span
                  className={`py-2 px-4 rounded-full transition-all duration-300 ${
                    userType === type
                      ? "text-white bg-[#3B82F6]"
                      : "text-[#3B82F6] bg-transparent"
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              </label>
            ))}
          </div>

          {isSignUp && (
            <>
              {["fullname", "email", "password", "confirmPassword"].map(
                (field) => (
                  <div key={field} className="relative">
                    <input
                      type={field.includes("password") ? "password" : "text"}
                      name={field}
                      placeholder={field.replace(/([A-Z])/g, " $1")}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full p-2 rounded-lg bg-gray-700 text-white"
                      required
                    />
                    {field === "password" && (
                      <span
                        className={`absolute right-3 top-2 text-sm ${
                          passwordStrength === "Strong"
                            ? "text-green-500"
                            : passwordStrength === "Medium"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {passwordStrength}
                      </span>
                    )}
                  </div>
                )
              )}
              {userType === "student" && (
                <select
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  required
                >
                  <option value="">Select Class</option>
                  {[9, 10, 11, 12].map((cls) => (
                    <option key={cls} value={cls}>{`Class ${cls}`}</option>
                  ))}
                </select>
              )}
              <select
                name="stream"
                value={formData.stream}
                onChange={handleChange}
                className="w-full p-2 rounded-lg bg-gray-700 text-white"
              >
                <option value="jee">JEE</option>
                <option value="neet">NEET</option>
              </select>
            </>
          )}

          {!isSignUp && (
            <>
              {["email", "password"].map((field) => (
                <input
                  key={field}
                  type={field === "password" ? "password" : "text"}
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleChange}
                  className="w-full p-2 rounded-lg bg-gray-700 text-white"
                  required
                />
              ))}
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full p-2 rounded-lg bg-[#3B82F6] text-white hover:bg-[#2563EB] transition duration-300"
          >
            {isLoading ? "Processing..." : isSignUp ? "Sign Up" : "Login"}
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
