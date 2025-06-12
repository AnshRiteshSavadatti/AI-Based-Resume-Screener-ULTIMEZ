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
// Object to store matched results
let matchedResumes = [];

uploadRouter.post(
  "/parse-resumes",
  upload.array("resume", 10),
  async (req, res) => {
    try {
      const files = req.files;
      const jobDescription = req.body.jobDescription; // Get job description from frontend

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "No files uploaded" });
      }

      if (!jobDescription) {
        return res.status(400).json({ message: "Job description is required" });
      }

      const results = [];

      for (const file of files) {
        // Step 1: Upload to ImageKit
        const url = await uploadToImageKit(file.buffer, file.originalname);

        // Step 2: Parse the resume via Apilayer
        const parsed = await parseWithApilayer(url);

        // Step 3: Send to Resume Matcher API
        // Normalize parsed resume to expected matcher format
        const normalizedResume = {
          summary:
            parsed?.summary ||
            parsed?.professional_summary ||
            "No summary provided.",
          skills: parsed?.skills || [],
          experience: parsed?.experience || parsed?.work_experience || [],
        };

        const matcherPayload = {
          resume: normalizedResume,
          jobDescription: {
            jobDescription,
          },
        };

        console.log("Parsed Apilayer response:", parsed);

        const matcherResponse = await axios.post(
          "https://api-resume-matcher-with-job.onrender.com/api/compare",
          JSON.stringify(matcherPayload),
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 500000, // 5 minutes max
          }
        );

        // Step 4: Combine and store results
        const combinedResult = {
          fileName: file.originalname,
          imageKitURL: url,
          parsedData: parsed,
          matchResult: matcherResponse.data,
        };
        console.log("🎯 Matcher Response:", matcherResponse.data);
        console.log("Normalized resume payload:", matcherPayload.resume);
        console.log("Job Description payload:", matcherPayload.jobDescription);

        results.push(combinedResult);
      }

      parsedResumes = results;
      matchedResumes = results;

      res.json({ success: true, results });
      console.log("Matched resumes:", matchedResumes);
    } catch (error) {
      console.error("Error during parsing/matching:", error.message);
      res.status(500).json({ success: false, error: error.message });
    }
  }
);

// Route 3: Return matched resumes
uploadRouter.get("/matched-resumes", (req, res) => {
  if (matchedResumes.length === 0) {
    return res.status(404).json({ message: "No matched resumes found" });
  }

  // Optionally trim parsedData
  const trimmed = matchedResumes.map(
    ({ fileName, imageKitURL, matchResult }) => ({
      fileName,
      imageKitURL,
      matchResult,
    })
  );

  console.log("📤 Sending matched resumes:", trimmed); // Add this line

  res.json({ success: true, results: trimmed });
});

export { parsedResumes, matchedResumes };
export default uploadRouter;
