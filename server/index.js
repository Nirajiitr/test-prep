import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import AuthRoute from "./routes/AuthRouth.js";
import TestRoute from "./routes/TestRoute.js";
import ScoreRoute from "./routes/ScoreRoute.js";

const app = express();
const port = process.env.port;
const db_url = process.env.DB_URL;
const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL;

// db connection
mongoose
  .connect(db_url)
  .then(() => {
    console.log("database connected successfuly");
  })
  .catch((res) => {
    console.error(res);
  });

//allow server
const corsOption = {
  origin: CLIENT_BASE_URL,
  methods: ["GET", "POST", "DELETE", "PUT"],
  allowedHeaders: [
    "content-Type",
    "Authorization",
    "Cache-Control",
    "Expires",
    "Pragma",
  ],
  credentials: true,
};
app.use(cors(corsOption));

// middlewere
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", AuthRoute);
app.use("/api/test", TestRoute)
app.use("/api/score", ScoreRoute)

app.listen(port || 8000, () => {
  console.log(`server is running on port: ${port}`);
});
