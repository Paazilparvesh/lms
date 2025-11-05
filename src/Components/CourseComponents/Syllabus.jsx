// import { useState, useContext } from "react";
// import { loginContext, CourseContext } from "/src/App";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { useParams } from "react-router-dom";
// import useTheme from "/src/Hooks/ThemeHook";

// function Syllabus() {
//   const [openIndex, setOpenIndex] = useState(null);
//   const { login } = useContext(loginContext);
//   const { Course } = useContext(CourseContext);
//   const { id } = useParams();
//   const isDarkMode = useTheme();

//   const selectedCourse = Course.find((c) => c.id === Number(id));
//   const chapters = selectedCourse?.chapters || [];

//   const toggle = (index) => {
//     setOpenIndex(openIndex === index ? null : index);
//   };

//   return (
//     <div
//       className={`p-6 sm:p-10 w-full max-w-6xl mx-auto rounded-2xl shadow-lg border ${
//         isDarkMode
//           ? "bg-white/5 backdrop-blur-md border-orange-300/30 text-white"
//           : "bg-gray-100 border-orange-200 text-black"
//       }`}
//     >
//       <div className="space-y-6">
//         <div>
//           <h2 className="text-3xl sm:text-4xl font-bold text-orange-400 mb-2">
//             Course <span className="text-orange-400">Modules</span>
//           </h2>
//           <p
//             className={`max-w-3xl text-base sm:text-lg ${
//               isDarkMode ? "text-gray-300" : "text-gray-700"
//             }`}
//           >
//             {selectedCourse?.description || "Course details not available."}
//           </p>
//         </div>

//         <div className="divide-y divide-orange-600/40">
//           {chapters.map((chapter, index) => {
//             const isOpen = openIndex === index;

//             return (
//               <div
//                 key={chapter.id}
//                 className="py-4 cursor-pointer transition duration-300"
//                 onClick={() => toggle(index)}
//               >
//                 <div
//                   className={`flex justify-between items-center text-lg font-semibold ${
//                     isDarkMode ? "text-white" : "text-gray-800"
//                   }`}
//                 >
//                   <span>{chapter.title}</span>
//                   <span className="text-orange-500 text-sm">
//                     {isOpen ? (
//                       <ChevronUp size={25} />
//                     ) : (
//                       <ChevronDown size={25} />
//                     )}
//                   </span>
//                 </div>

//                 <div
//                   className={`overflow-hidden transition-all duration-500 ease-in-out ${
//                     isOpen ? "max-h-[500px] mt-3" : "max-h-0"
//                   }`}
//                 >
//                   <ul
//                     className={`ml-4 text-sm space-y-2 ${
//                       isDarkMode ? "text-gray-300" : "text-gray-700"
//                     }`}
//                   >
//                     {chapter.materials && chapter.materials.length > 0 ? (
//                       chapter.materials.map((material) => (
//                         <li
//                           key={material.id}
//                           className="flex items-center gap-2"
//                         >
//                           <p>{material.material_name}</p>
//                         </li>
//                       ))
//                     ) : (
//                       <li
//                         className={`italic ${
//                           isDarkMode ? "text-gray-500" : "text-gray-400"
//                         }`}
//                       >
//                         No materials yet
//                       </li>
//                     )}

//                     {login && chapter.quizzes.length > 0 && (
//                       <li className="pt-2 text-orange-400 text-xs">
//                         Quizzes available: {chapter.quizzes.length}
//                       </li>
//                     )}
//                   </ul>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Syllabus;




import { useState, useContext } from "react";
import { loginContext, CourseContext } from "/src/App";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useParams } from "react-router-dom";
import useTheme from "/src/Hooks/ThemeHook";

function Syllabus() {
  const [openIndex, setOpenIndex] = useState(null);
  const { login } = useContext(loginContext);
  const { Course } = useContext(CourseContext);
  const { id } = useParams();
  const isDarkMode = useTheme();

  const selectedCourse = Course.find((c) => c.id === Number(id));
  const chapters = selectedCourse?.chapters || [];

  const defaultDescriptions = [
    "Overview and objectives of the chapter.",
    "Explore key concepts with examples.",
    "In-depth analysis and interactive lessons.",
    "Hands-on practice with exercises.",
    "Recap and quizzes to assess your knowledge.",
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-8 py-10">
      <h2 className="text-4xl font-bold mb-8 text-orange-500">
        Course <span className="text-orange-400">Syllabus</span>
      </h2>

      <div className="flex flex-col">
        {chapters.map((chapter, index) => {
          const isOpen = openIndex === index;
          const chapterDescription =
            chapter.description ||
            defaultDescriptions[index % defaultDescriptions.length];

          return (
            <div
              key={chapter.id}
              className={`rounded-xl border ${
                isDarkMode
                  ? "bg-white/5 backdrop-blur-lg border-orange-300/30 text-white"
                  : "bg-white border-orange-200 text-black"
              } mb-0 overflow-hidden shadow transition duration-300`}
            >
              <div
                onClick={() => toggle(index)}
                className="flex justify-between items-center p-5 cursor-pointer"
              >
                <h3 className="text-lg sm:text-xl font-semibold">
                  {chapter.title}
                </h3>
                <span className="text-orange-500">
                  {isOpen ? <ChevronUp /> : <ChevronDown />}
                </span>
              </div>

              {isOpen && (
                <div className="px-5 pb-4 text-sm sm:text-base space-y-2">
                  <p
                    className={`${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {chapterDescription}
                  </p>

                  <ul className="list-disc pl-5">
                    {chapter.materials && chapter.materials.length > 0 ? (
                      chapter.materials.map((material) => (
                        <li key={material.id}>{material.material_name}</li>
                      ))
                    ) : (
                      <li
                        className={`italic ${
                          isDarkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        No materials available
                      </li>
                    )}
                  </ul>

                  {login && chapter.quizzes.length > 0 && (
                    <p className="text-orange-400">
                      Quizzes: {chapter.quizzes.length}
                    </p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Syllabus;