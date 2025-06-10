import { useState } from "react";
import { useNavigate } from "react-router-dom";

import DropDown from "./DropDown";

function FormResume() {
  const navigate = useNavigate(); // Hook to navigate
  const [pdfFiles, setPdfFiles] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleFileChange = (e) => {
    setPdfFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedSkills.length === 0) {
      alert("Please select at least one skill before uploading the PDF.");
      return;
    }

    if (!pdfFiles) return alert("Please select a PDF file.");

    const formData = new FormData();
    [...pdfFiles].forEach((file) => {
      formData.append("resume", file);
    });

    formData.append("jobDescription", JSON.stringify(selectedSkills));

    try {
      const response = await fetch(
        "https://ai-based-resume-screener-ultimez.onrender.com/api/parse-resumes",
        // "http://localhost:5000/api/parse-resumes",
        {
          method: "POST",
          body: formData,
        }
      );

      const result = await response.json();
      if (result.success) {
        // Store parsed resume data and selected skills in localStorage
        localStorage.setItem("parsedResumes", JSON.stringify(result.results));
        localStorage.setItem("selectedSkills", JSON.stringify(selectedSkills));
        alert("Resumes uploaded and parsed successfully!");
        navigate("/generate-score");
      } else {
        alert("Something went wrong: " + result.error);
      }

      console.log("Server Response:", result);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <DropDown
        selectedSkills={selectedSkills}
        setSelectedSkills={setSelectedSkills}
      />
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Upload Resume (PDF)
      </h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          multiple
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-semibold
                     file:bg-blue-600 file:text-white
                     hover:file:bg-blue-700"
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default FormResume;
