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
