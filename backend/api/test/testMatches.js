#!/usr/bin/env node

import axios from "axios";
import process from "process";
import { performance } from "perf_hooks";

// Test payload
const testPayload = {
  resume: {
    summary: "Software developer with 5+ years of experience.",
    skills: ["JavaScript", "Python", "React", "Node.js"],
    experience: [
      {
        title: "Frontend Developer",
        company: "Tech Corp",
        description: "Worked on developing responsive UI using React.",
      },
    ],
  },
  jobDescription: {
    jobDescription: "We are looking for a Frontend Developer with experience in React and JavaScript.",
  },
};

async function runMatcher() {
  try {
    console.log("🔍 Sending request to Resume Matcher API...");

    const startTime = performance.now();

    const response = await axios.post(
      "https://api-resume-matcher-with-job.onrender.com/api/compare",
      testPayload
    );

    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(2);

    console.log("\n✅ Matcher API Response:");
    console.dir(response.data, { depth: null });

    console.log(`⏱️ Time taken: ${duration} ms`);
  } catch (error) {
    console.error("\n❌ Matcher API Error:", error.message);
    if (error.response?.data) {
      console.error("Details:", error.response.data);
    }
    process.exit(1);
  }
}

runMatcher();
