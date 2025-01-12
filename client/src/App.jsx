import React, { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { PuffLoader } from "react-spinners";
import CheckAuth from "./components/CheckAuth";
import PageNotFound from "./pages/NotFoundPage";
import { checkAuth } from "./store/auth-slice";
const App = () => {
  const dispatch = useDispatch();
  const [authChecked, setAuthChecked] = useState(false);
  const token =
    sessionStorage.getItem("token") && JSON.parse(sessionStorage.getItem("token"));
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const location = useLocation();

  useEffect(() => {
    const isDefaultPage = location.pathname === "/";
    if (!isDefaultPage) {
      dispatch(checkAuth(token)).finally(() => {
        setAuthChecked(true);
      });
    } else {
      setAuthChecked(true);
    }
  }, [dispatch, location.pathname]);
  if (isLoading && !authChecked) {
    return (
      <div className="w-screen h-screen flex items-center justify-center">
        <PuffLoader color="#3671d6" size="40px" />
      </div>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<Default />} />
      <Route
        path="/auth/:mode"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <AuthComponent />
          </CheckAuth>
        }
      />
      <Route
        path="/user"
        element={
          <CheckAuth isAuthenticated={isAuthenticated} user={user}>
            <HomeLayout />
          </CheckAuth>
        }
      >
        <Route path="home" element={<Home />} />
        <Route path="test-history" element={<TestHistory />} />
        <Route path="test-upcoming" element={<TestUpcoming />} />
        <Route path="bookmarks" element={<Bookmarks />} />
      </Route>

      <Route path="/user/test/:id" element={<Test />} />
      <Route path="/user/test/score" element={ <CheckAuth isAuthenticated={isAuthenticated} user={user}><Score /> </CheckAuth>} />
      <Route path="/teacher/dashboard" element={<Admin />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
