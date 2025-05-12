import { Router } from "express";
import multer from "multer";
import axios from "axios";
import FormData from "form-data";

const uploadRouter = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

const IMAGEKIT_PRIVATE_KEY = "private_qWTUtttYi5e+XJQcaX7nphTJsC0="; // Keep this secret
const APILAYER_KEY = "k3b13nyFCkScf2S7jDGR8I51W2ZkP9uO"; // Keep this secret

let parsedResumes = []; // Array to store parsed resume data

// Route 1: Just logs file info
uploadRouter.post("/upload", upload.array("resume", 10), (req, res) => {
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

// Utility function: Upload to ImageKit
async function uploadToImageKit(fileBuffer, filename) {
  const formData = new FormData();
  formData.append("file", fileBuffer, filename);
  formData.append("fileName", filename);
  formData.append("useUniqueFileName", "true");

  const response = await axios.post(
    "https://upload.imagekit.io/api/v1/files/upload",
    formData,
    {
      auth: {
        username: IMAGEKIT_PRIVATE_KEY,
        password: "",
      },
      headers: formData.getHeaders(),
    }
  );

  return response.data.url;
}

// Utility function: Parse resume with Apilayer
async function parseWithApilayer(url) {
  const response = await axios.get(
    `https://api.apilayer.com/resume_parser/url?url=${encodeURIComponent(url)}`,
    {
      headers: {
        apikey: APILAYER_KEY,
      },
    }
  );

  return response.data;
}

// Route 2: Upload to ImageKit & parse via Apilayer
uploadRouter.post(
  "/parse-resumes",
  upload.array("resume", 10),
  async (req, res) => {
    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      const results = [];

      for (const file of files) {
        const url = await uploadToImageKit(file.buffer, file.originalname);
        const parsed = await parseWithApilayer(url);
        results.push({
          fileName: file.originalname,
          imageKitURL: url,
          parsedData: parsed,
        });
      }

      parsedResumes = results; // Update parsedResumes with the results

      res.json({ success: true, results });
      console.log("Parsed resumes:", parsedResumes);
    } catch (error) {
      console.error("Parsing error:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

export { parsedResumes }; // Export the updated parsedResumes array
export default uploadRouter;
