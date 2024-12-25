import React, { useState } from "react";
import axios from "axios";

const ViewMarks = () => {
  const [classes, setClasses] = useState(["Class 10", "Class 12"]);
  const [examTypes, setExamTypes] = useState(["Mid Term", "Final Term"]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedExam, setSelectedExam] = useState("");
  const [marks, setMarks] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchMarks = async () => {
    if (!selectedClass || !selectedExam) {
      alert("Please select both Class and Exam Type!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/get-marks", {
        class: selectedClass,
        exam: selectedExam,
      });
      setMarks(response.data);
    } catch (error) {
      console.error("Error fetching marks:", error);
      alert("Unable to fetch marks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-md rounded p-6 w-96">
        <h1 className="text-2xl font-bold text-center mb-6">View Marks</h1>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Class</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="">Choose Class</option>
            {classes.map((cls) => (
              <option key={cls} value={cls}>
                {cls}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Select Exam Type</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedExam}
            onChange={(e) => setSelectedExam(e.target.value)}
          >
            <option value="">Choose Exam Type</option>
            {examTypes.map((exam) => (
              <option key={exam} value={exam}>
                {exam}
              </option>
            ))}
          </select>
        </div>
        <button
          onClick={fetchMarks}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Loading..." : "View Marks"}
        </button>
        {marks && (
          <div className="mt-6">
            <h2 className="text-xl font-bold mb-4">Marks:</h2>
            <ul className="list-disc list-inside space-y-2">
              {marks.subjects.map((subject) => (
                <li key={subject.name}>
                  <span className="font-medium">{subject.name}: </span>
                  {subject.marks}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewMarks;
