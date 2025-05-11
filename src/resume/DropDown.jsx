import { useState } from "react";

function DropDown({ selectedSkills, setSelectedSkills }) {
  const [searchTerm, setSearchTerm] = useState("");

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

  const removeSkill = (skill) => {
    setSelectedSkills((prev) => prev.filter((s) => s !== skill));
  };

  const filteredSkills = skills.filter((skill) =>
    skill.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-72 mb-6">
      <h2 className="text-lg font-semibold mb-2">Select Skills</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search skills..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      {/* Scrollable List */}
      <div className="border border-gray-300 rounded-lg shadow-inner max-h-48 overflow-y-auto bg-white p-3 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 hover:scrollbar-thumb-gray-500">
        {filteredSkills.length > 0 ? (
          filteredSkills.map((skill) => (
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
          ))
        ) : (
          <p className="text-sm text-gray-500">No matching skills found.</p>
        )}
      </div>

      {/* Selected Skills */}
      <div className="mt-3 text-sm text-gray-600">
        <strong>Selected:</strong>{" "}
        {selectedSkills.length > 0 ? (
          <div className="space-y-1">
            {selectedSkills.map((skill) => (
              <div key={skill} className="flex items-center">
                <span className="mr-2">{skill}</span>
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-red-500 text-xs cursor-pointer"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        ) : (
          "None"
        )}
      </div>
    </div>
  );
}

export default DropDown;
