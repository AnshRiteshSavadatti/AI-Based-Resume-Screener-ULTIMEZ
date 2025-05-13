import { useEffect, useState } from "react";

function GenerateScore() {
  const [, setParsedResumes] = useState([]);
  const [, setSelectedSkills] = useState([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    // Load parsed resumes and selected skills from localStorage
    const storedResumes = localStorage.getItem("parsedResumes");
    const storedSkills = localStorage.getItem("selectedSkills");

    if (storedResumes && storedSkills) {
      const resumes = JSON.parse(storedResumes);
      const skills = JSON.parse(storedSkills);
      setParsedResumes(resumes);
      setSelectedSkills(skills);

      // Calculate scores for each resume
      const calculatedScores = resumes.map((resume) => {
        // Extract skills from parsed resume data
        // Assuming parsedData.skills is an array of skill names (adjust as per actual data)
        const resumeSkills = resume.parsedData?.skills || [];

        // Count how many selected skills are present in resumeSkills
        const matchedSkillsCount = skills.filter((skill) =>
          resumeSkills.includes(skill)
        ).length;

        // Calculate score as percentage of matched skills
        const score =
          skills.length > 0
            ? Math.round((matchedSkillsCount / skills.length) * 100)
            : 0;

        return {
          fileName: resume.fileName,
          score,
          matchedSkillsCount,
          totalSkills: skills.length,
          resumeSkills,
        };
      });

      setScores(calculatedScores);
    }
  }, []);

  if (scores.length === 0) {
    return <div className="p-8 text-center">No resume data available to score.</div>;
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Resume Scores</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr>
            <th className="border border-gray-300 p-2">Resume File</th>
            <th className="border border-gray-300 p-2">Score (%)</th>
            <th className="border border-gray-300 p-2">Matched Skills</th>
            <th className="border border-gray-300 p-2">Total Selected Skills</th>
          </tr>
        </thead>
        <tbody>
          {scores.map(({ fileName, score, matchedSkillsCount, totalSkills }) => (
            <tr key={fileName}>
              <td className="border border-gray-300 p-2">{fileName}</td>
              <td className="border border-gray-300 p-2">{score}</td>
              <td className="border border-gray-300 p-2">{matchedSkillsCount}</td>
              <td className="border border-gray-300 p-2">{totalSkills}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default GenerateScore;
