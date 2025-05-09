import { useState } from "react";

function DropDown() {
  const [selectedSkills, setSelectedSkills] = useState([]);

  const skills = [
    "Machine Learning",
    "Web Development",
    "Data Science",
    "UI/UX Design",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "Mobile Development",
    "AI",
    "Backend Engineering",
    "Frontend Engineering",
    "AR/VR",
    "Blockchain",
    "IoT",
    "Game Development",
  ];

  const toggleSkill = (skill) => {
    setSelectedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  return (
    <div className="relative w-72">
      <h2 className="text-lg font-semibold mb-2">Select Skills</h2>
      <div className="border border-gray-300 rounded-lg shadow-inner max-h-48 overflow-y-auto bg-white p-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex items-center mb-2 hover:bg-gray-100 rounded px-2 py-1 transition"
          >
            <input
              type="checkbox"
              id={skill}
              checked={selectedSkills.includes(skill)}
              onChange={() => toggleSkill(skill)}
              className="mr-2 accent-indigo-600"
            />
            <label
              htmlFor={skill}
              className="text-sm font-medium text-gray-800"
            >
              {skill}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-3 text-sm text-gray-600">
        <strong>Selected:</strong> {selectedSkills.join(", ") || "None"}
      </div>
    </div>
  );
}

export default DropDown;
