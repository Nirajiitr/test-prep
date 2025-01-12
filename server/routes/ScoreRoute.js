import express from "express"
import { getBookmarkedQuestions, getScoreDetails, getTestHistory, submitTest } from "../controllers/ScoreController.js"
 
const Router = express.Router()

Router.post("/test-submit", submitTest)
Router.get("/history/:userId", getTestHistory);
Router.get("/:scoreId", getScoreDetails);
Router.post("/bookmarkedques", getBookmarkedQuestions);

export default Router