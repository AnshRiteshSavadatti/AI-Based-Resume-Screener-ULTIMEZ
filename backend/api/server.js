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
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("Not allowed by CORS"));
    },
    methods: "GET,POST,PUT,DELETE,OPTIONS", // Add allowed methods
    allowedHeaders: "Content-Type, Authorization", // Add allowed headers
    credentials: true, // If you need to support cookies or authentication
  })
);

// Handle preflight OPTIONS requests globally
app.options(
  "*",
  (req, res, next) => {
    console.log("Received OPTIONS request for:", req.headers.origin);
    next();
  },
  cors()
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

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

export default app;
