import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import userRoute from "./routes/userRoute.js";
import linkRoute from "./routes/linkRoute.js";
import analyticsRoute from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://url-shortner-client-peach.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(userRoute);
app.use(linkRoute);
app.use(analyticsRoute);

app.get("/", (req, res) => {
  console.log("Server is running...");
  res.send("WORKING");
});

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
