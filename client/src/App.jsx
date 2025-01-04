import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import Default from "./pages/Default";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Score from "./pages/Score";
import Admin from "./pages/Admin";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="/auth/:mode" element={<AuthComponent />} />
      <Route path="/user/home" element={<Home />} />
      <Route path="/user/home" element={<Home />} />
      <Route path="/user/test" element={<Test />} />
      <Route path="/user/test/score" element={<Score />} />
      <Route path="/teacher/dashbord" element={<Admin />} />
    </Routes>
  );
};

export default App;
