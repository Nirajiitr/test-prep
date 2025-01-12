import express from "express";
import { createTest, deleteTest, getTestById, getTests } from "../controllers/TestController.js";
import { isAuthenticated } from "../middlewere/isAuthenticated.js";

const router = express.Router();

router.post("/create", isAuthenticated, createTest);

router.get("/get", getTests);

router.get("/get/:id", getTestById);

router.delete("/delete/:id", deleteTest);

export default router;
