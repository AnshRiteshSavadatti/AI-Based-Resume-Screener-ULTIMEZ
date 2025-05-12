import express from "express";

import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import uploadRouter from "./routes/upload.routes.js";
import connnectToDatabase from "./database/mongodb.js";

const app = express();
const PORT = 5000;

connnectToDatabase();

const allowedOrigins = [
  "https://ai-based-resume-screener-ultimez.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using routes now

app.use("/api/auth", authRouter);
app.use("/api", uploadRouter);

app.post("/", (req, res) => {
  console.log("Received request:", req.body);
  res.json({ message: "Hello from the server!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// export default app;
