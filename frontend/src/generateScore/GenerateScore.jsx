import { useLoaderData } from "react-router-dom";

function GenerateScore() {
  const resumes = useLoaderData(); // Array from matchedResumesLoader

  if (!resumes || resumes.length === 0) {
    return (
      <div className="p-8 text-center text-red-500">
        No resume scores available.
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Scores</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Resume File</th>
            <th className="border border-gray-300 p-2">Similarity Score (%)</th>
            <th className="border border-gray-300 p-2">ImageKit URL</th>
          </tr>
        </thead>
        <tbody>
          {resumes.map(({ fileName, matchResult, imageKitURL }) => (
            <tr key={fileName}>
              <td className="border border-gray-300 p-2">{fileName}</td>
              <td className="border border-gray-300 p-2">
                {matchResult?.similarityScore ?? "N/A"}
              </td>
              <td className="border border-gray-300 p-2">
                <a
                  href={imageKitURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View Resume
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const matchedResumesLoader = async () => {
  try {
    const response = await fetch(
      "https://ai-based-resume-screener-ultimez.onrender.com/api/matched-resumes"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch matched resumes");
    }

    const data = await response.json();
    return data.matchedResumes;
  } catch (err) {
    console.error("Loader error:", err);
    return [];
  }
};

export default GenerateScore;
