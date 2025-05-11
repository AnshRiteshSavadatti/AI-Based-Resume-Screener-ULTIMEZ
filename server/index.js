import express from "express";
import multer from "multer";
import cors from "cors";

import authRouter from "./routes/auth.routes.js";
import connnectToDatabase from "./database/mongodb.js";

const app = express();
const PORT = 5000;

connnectToDatabase();

app.use(
  cors({
    origin: "https://ai-based-resume-screener-ultimez.vercel.app", // no trailing slash!
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204,
    maxAge: 86400,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// using routes now

app.use("/api/auth", authRouter);

// Use multer to handle file uploads
const storage = multer.memoryStorage(); // store in memory (you can also save to disk)
const upload = multer({ storage });

app.post("/", (req, res) => {
  console.log("Received request:", req.body);
  res.json({ message: "Hello from the server!" });
});

app.post("/upload", upload.array("resume", 10), (req, res) => {
  const files = req.files;

  if (!files || files.length === 0) {
    return res.status(400).json({ message: "No files uploaded" });
  }

  files.forEach((file, index) => {
    console.log(`File ${index + 1}:`);
    console.log("Original name:", file.originalname);
    console.log("MIME type:", file.mimetype);
    console.log("Size (bytes):", file.size);
    console.log("-----------");
  });

  res.json({ message: "Files received!", count: files.length });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
