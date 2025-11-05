
import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function SemesterList() {
  const [semesters, setSemesters] = useState([]);
  const [department, setDepartment] = useState("");
  const Uemail = localStorage.getItem("userEmail");

  // 1️⃣ Fetch department based on user email
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_STUDENT_PROGRESS}?email=${Uemail}`)
      .then((res) => {
        setDepartment(res.data.student.department);
      })
      .catch((err) => {
        console.error("Error fetching student department:", err);
      });
  }, []);

  
  useEffect(() => {
    if (department) {
      console.log("Fetching syllabus for department:", department);
      axios
        .get(
          `https://lms.thirdvizion.com/api/getsyllabus/?department=${encodeURIComponent(
            department
          )}`
        )
        .then((res) => {
          console.log("Syllabus response:", res.data);
          setSemesters(res.data);
        })
        .catch((err) => {
          console.error("Error fetching syllabus:", err);
        });
    }
  }, [department]); 

  return (
    <div className="p-8 bg-white dark:bg-black min-h-screen transition-colors duration-500">
      <h1 className="text-3xl font-bold text-blue-700 dark:text-orange-500 mb-6">
        📘 Semester List
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {semesters.map((semester) => (
          <div
            key={semester.id}
            className="bg-gray-100 dark:bg-zinc-900 border border-gray-300 dark:border-zinc-700 rounded-xl overflow-hidden shadow hover:shadow-orange-500/40 transition duration-300"
          >
            <div className="p-6">
              <h2 className="text-xl font-bold text-blue-700 dark:text-orange-500 mb-2">
                Semester {semester.sem}
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-sm">
                Subjects: {semester.subjects?.join(", ") || "N/A"}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                <strong>Start Date:</strong> {semester.start_date}
              </p>
              <Link
                to={`/semesters/${semester.id}`}
                className="mt-4 inline-block text-blue-600 dark:text-orange-400 hover:underline font-semibold"
              >
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
