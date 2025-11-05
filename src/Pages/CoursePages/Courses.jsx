import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { CourseContext } from "/src/App";
import StarRating from "/src/Components/CourseComponents/Rating.jsx";
import { IndianRupee } from "lucide-react";
import useTheme from "/src/Hooks/ThemeHook.js";
import CourseHero from "/src/Components/CourseComponents/CourseHero.jsx";

export default function CourseList() {
  const { Course } = useContext(CourseContext);
  const isDarkMode = useTheme();

  const student_email = localStorage.getItem("userEmail");

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [progressCourses, setProgressCourses] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [myCourses, setMyCourses] = useState([]);

  useEffect(() => {
    if (!student_email) return;
    axios
      .get(
        `https://lms.thirdvizion.com/api/progresscourses/?email=${student_email}`
      )
      .then((res) => {
        if (Array.isArray(res.data)) {
          setProgressCourses(res.data);
        } else if (res.data && res.data.courses) {
          if (Array.isArray(res.data.courses)) {
            setProgressCourses(res.data.courses);
          } else if (typeof res.data.courses === "object") {
            setProgressCourses([res.data.courses]);
          } else {
            setProgressCourses([]);
          }
        } else if (typeof res.data === "object" && res.data !== null) {
          setProgressCourses([res.data]);
        } else {
          setProgressCourses([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch progress courses", err);
        setProgressCourses([]);
      });
  }, [student_email]);

  useEffect(() => {
    if (!student_email) return;
    axios
      .get(import.meta.env.VITE_STUDENT_PROGRESS, {
        params: { email: student_email },
      })
      .then((res) => {
        setEnrolledCourses(res.data.courses?.course_details || []);
      })
      .catch((err) => {
        console.error("Failed to fetch enrolled courses", err);
      });
  }, [student_email]);

  useEffect(() => {
    if (!student_email) return;
    axios
      .get(
        `https://lms.thirdvizion.com/api/completedcourses/?email=${student_email}`
      )
      .then((res) => {
        setMyCourses(res.data.courses || []);
      })
      .catch((err) => {
        console.error("Failed to fetch my courses", err);
        setMyCourses([]);
      });
  }, [student_email]);

  const filteredCourses = (() => {
    let result = [];

    if (filter === "All") {
      result = Course || [];
    } else if (filter === "In Progress") {
      result = progressCourses.map((progress) => {
        const full = (Course || []).find(
          (c) => c.id === progress.course_id || c.id === progress.id
        );
        return { ...full, ...progress };
      });
    } else if (filter === "Completed") {
      result = myCourses.map((completed) => {
        const full = (Course || []).find(
          (c) => c.id === completed.course_id || c.id === completed.id
        );
        return { ...full, ...completed };
      });
    } else if (filter === "My Courses") {
      const merged = [...enrolledCourses, ...myCourses];
      const uniqueCourses = Array.from(
        new Map(merged.map((c) => [c.id || c.course_id, c])).values()
      );

      result = uniqueCourses.map((course) => {
        const full = (Course || []).find(
          (c) => c.id === course.course_id || c.id === course.id
        );
        return { ...full, ...course };
      });
    }

    if (categoryFilter !== "All Categories") {
      result = result.filter((course) =>
        course.categories?.includes(categoryFilter)
      );
    }

    return result.filter((course) =>
      (course.name || course.course_name || "")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  })();

  const isEnrolled = (courseId) => {
    return [...enrolledCourses, ...progressCourses, ...myCourses].some((c) => {
      const id = c.id || c.course_id;
      return id === courseId;
    });
  };

  // const allCount = Course?.length || 0;
  // const inProgressCount = progressCourses.length;
  // const completedCount = myCourses.length;
  // const myCoursesCount = new Set(
  //   [...enrolledCourses, ...myCourses].map((c) => c.id || c.course_id)
  // ).size;

  return (
    <div
      className={`w-full min-h-screen py-2 transition-colors duration-500 font-mono ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <CourseHero
        // search={search}
        setSearch={setSearch}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
      />

      {/* Course grid */}
      <div className="relative my-1 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-12">
        {filteredCourses?.length > 0 ? (
          filteredCourses.map((course, index) => {
            const name = course.name || course.course_name || "Untitled";
            const image = course.image || course.course_image || "";
            const desc = course.description || course.desc || "No description";
            const categoryName = course.categories?.[0] || "General";
            const ratings = course.ratings || "4.0";
            const chapters = course.total_chap || "";
            const courseId = course.id || course.course_id;

            return (
              <div
                key={index}
                className={`relative w-full group border rounded-xl flex flex-col gap-20 shadow-md transition-all duration-500 ease-in-out transform hover:scale-90 ${
                  isDarkMode
                    ? "bg-[#1b1b1b] border-[#333] hover:shadow-orange-500/30"
                    : "bg-white border-gray-300 hover:shadow-orange-200"
                }`}
              >
                <div className="relative mx-5 mt-5 rounded-xl group-hover:scale-110 transition-all duration-300 group-hover:-translate-y-12">
                  <img
                    src={image}
                    alt="Course"
                    className="w-full h-56 object-fit transition-transform duration-700 ease-out rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                </div>

                <div className="px-4 space-y-1 group-hover:-mt-20 -mt-14 transition-all duration-500 ease-in-out">
                  <div className="flex justify-between text-xs text-gray-400">
                    <span className="bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                      {categoryName}
                    </span>
                  </div>

                  <div
                    className={`flex justify-between  font-bold group-hover:text-orange-400 transition-colors ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    {name}
                    <div
                      className={`${isDarkMode ? "text-white" : "text-black"}`}
                    >
                      <div className="text-center">{chapters}</div>
                      Chapters
                    </div>
                  </div>

                  <div
                    className={`max-h-0 group-hover:py-5 opacity-0 overflow-hidden group-hover:max-h-32 group-hover:opacity-100 transition-all duration-500 text-sm ${
                      isDarkMode ? "text-white" : "text-black"
                    }`}
                  >
                    <p>
                      {desc.split(" ").slice(0, 30).join(" ") +
                        (desc.split(" ").length > 30 ? "..." : "")}
                    </p>
                  </div>

                  {filter !== "Completed" && (
                    <div className="pt-1 py-5 flex flex-col items-center justify-between text-base font-semibold">
                      <div className="text-orange-500 py-5 w-full flex justify-between">
                        <StarRating rating={ratings} />
                      </div>

                      {isEnrolled(courseId) ? (
                        <Link
                          to={`/individual/${courseId}`}
                          className="px-6 w-full py-2 border-2 border-orange-400 text-orange-300 text-center hover:bg-orange-500 hover:text-white transition rounded-lg font-semibold"
                        >
                          Start Learning
                        </Link>
                      ) : (
                        <Link
                          to={`/course/${courseId}`}
                          className="px-6 py-2 bg-gradient-to-r from-fuchsia-500 to-orange-400 text-white rounded-lg text-center hover:opacity-90 transition w-full"
                        >
                          Enroll Now
                        </Link>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500 text-xl font-medium py-10">
            {filter === "In Progress"
              ? "No course in progress"
              : filter === "My Courses"
              ? "No courses found in My Courses"
              : "No courses found"}
          </div>
        )}
      </div>
    </div>
  );
}
