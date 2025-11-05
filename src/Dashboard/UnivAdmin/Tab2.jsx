
import { useState, useEffect } from "react";
import axios from "axios";
import { FiImage } from "react-icons/fi";
import useTheme from "/src/Hooks/ThemeHook";

function FinishedCourses() {
  const [search, setSearch] = useState("");
  const [courses, setCourses] = useState([]);
  const isDarkMode = useTheme();
  const Email = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_UNIVERSITY_COURSE, {
        params: { email: Email },
      })
      .then((res) => {
        const courseData = Array.isArray(res.data)
          ? res.data.map((course, index) => ({
              id: course.id || index,
              image: course.course_image,
              name: course.course_name,
            }))
          : [];
        setCourses(courseData);
      })
      .catch((err) => console.error("API error:", err));
  }, [Email]);

  const filteredCourses = search
    ? courses.filter((course) =>
        course.name.toLowerCase().includes(search.toLowerCase())
      )
    : courses;

  return (
    <div
      className={`w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-10 py-6 sm:py-10 transition-colors duration-300 ${
        isDarkMode ? "text-white" : "text-gray-800"
      }`}
    >
      {/* Title and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold">Finished Courses</h1>
        <input
          type="text"
          placeholder="Search courses..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-slate-800 dark:border-slate-600 dark:placeholder-gray-400"
        />
      </div>

      {/* Course Grid Container */}
      <div
        className={`p-4 sm:p-6 rounded-2xl shadow-xl min-h-[400px] max-h-[600px] overflow-y-auto ${
          isDarkMode
            ? "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800"
            : "bg-gradient-to-br from-blue-100 via-white to-blue-100"
        }`}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className={`rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden ${
                  isDarkMode ? "bg-slate-700" : "bg-white"
                }`}
              >
                {course.image ? (
                  <img
                    src={course.image}
                    alt={course.name}
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                ) : (
                  <div className="w-full h-40 sm:h-48 flex items-center justify-center bg-gray-300 dark:bg-slate-600">
                    <FiImage size={48} className="text-gray-600 dark:text-white" />
                  </div>
                )}
                <div className="p-3 sm:p-4">
                  <h2 className="text-md sm:text-lg font-semibold text-center truncate">
                    {course.name}
                  </h2>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-500 dark:text-gray-300 text-lg mt-10">
              No courses found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FinishedCourses;
