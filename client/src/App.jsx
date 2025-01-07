import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthComponent from "./components/AuthComponent";
import Default from "./pages/Default";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Score from "./pages/Score";
import Admin from "./pages/Admin";
import Bookmarks from "./pages/Bookmarks";
import HomeLayout from "./components/homePage/Layout";
import TestHistory from "./pages/TestHistory";
import TestUpcoming from "./pages/TestUpcoming";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route path="/auth/:mode" element={<AuthComponent />} />
      <Route path="/user" element={<HomeLayout />}>
        <Route path="home" element={<Home />} />
        <Route path="test-history" element={<TestHistory />} />
        <Route path="test-upcoming" element={<TestUpcoming />} />
        <Route path="bookmarks" element={<Bookmarks />} />
      </Route>

      <Route path="/user/test" element={<Test />} />
      <Route path="/user/test/score" element={<Score />} />
      <Route path="/teacher/dashboard" element={<Admin />} />
     
    </Routes>
  );
};

export default App;
