import express from "express";
import multer from "multer";
import cors from "cors";
import fs from "fs";
import path from "path";

const app = express();
const PORT = 5000;

// Allow frontend requests
app.use(cors());

// Use multer to handle file uploads
const storage = multer.memoryStorage(); // store in memory (you can also save to disk)
const upload = multer({ storage });

app.post("/upload", upload.single("resume"), (req, res) => {
  const file = req.file;

  if (!file) {
    return res.status(400).json({ message: "No file uploaded" });
  }

  console.log("Received file:");
  console.log("Original name:", file.originalname);
  console.log("MIME type:", file.mimetype);
  console.log("Size (bytes):", file.size);

  // You can now process file.buffer (like running NLP on PDF)
  res.json({ message: "File received!", filename: file.originalname });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
