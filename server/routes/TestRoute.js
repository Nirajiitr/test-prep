import express from "express";
import { createTest, deleteTest, getTestById, getTests } from "../controllers/TestController.js";
import { isAuthenticated } from "../middlewere/isAuthenticated.js";

const router = express.Router();

// POST: Create a new test
router.post("/create", isAuthenticated, createTest);

// GET: Get all tests
router.get("/get", getTests);

// GET: Get a test by ID
router.get("/get/:id", getTestById);

// DELETE: Delete a test by ID
router.delete("/delete/:id", deleteTest);

export default router;
