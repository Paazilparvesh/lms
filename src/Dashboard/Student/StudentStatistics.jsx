// import { useEffect, useState } from "react";
// import Graph from "/src/Dashboard/Student/Graph";
// import StudentStatus from "/src/Dashboard/Student/StudentStatus.jsx";
// import axios from "axios";
// import useTheme from "/src/Hooks/ThemeHook";

// function Note() {
//   const [course, setCourse] = useState(2);
//   const [certi, setCertifi] = useState(4);
//   const [completed, setCompleted] = useState(2);
//   const isDarkMode = useTheme();

//   const Uemail = localStorage.getItem("userEmail");

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const res = await axios.get(import.meta.env.VITE_STUDENT_PROGRESS, {
//           params: { email: Uemail },
//         });
//         const data = res.data?.courses || {};
//         setCourse(data.total || 0);
//         setCertifi(data.certificate_gained || 0);
//         setCompleted(data.completed || 0);
//       } catch (error) {
//         console.error("Failed to fetch student progress:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   const cardClasses =
//     "flex-1 rounded-2xl overflow-hidden p-6 sm:p-8 transition duration-300 min-w-[250px]";
//   const textColor = isDarkMode ? "text-white" : "text-black";
//   const cardBg = isDarkMode ? "bg-zinc-900" : "bg-[#f7f7f7]";

//   return (
//     <div
//       className={`p-4 sm:p-6 md:p-10 rounded-xl flex flex-col gap-6 transition duration-300 ${isDarkMode ? "text-white" : "text-black"
//         }`}
//     >
//       {/* Top Cards Section */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//         <div className={`${cardClasses} ${cardBg}`}>
//           <h1 className={`text-lg sm:text-xl md:text-2xl mb-2 ${textColor}`}>
//             Courses Enrolled
//           </h1>
//           <p className="text-3xl sm:text-4xl font-bold text-blue-600">
//             {course}
//           </p>
//         </div>

//         <div className={`${cardClasses} ${cardBg}`}>
//           <h1 className={`text-lg sm:text-xl md:text-2xl mb-2 ${textColor}`}>
//             Certificates Gained
//           </h1>
//           <p className="text-3xl sm:text-4xl font-bold text-blue-600">
//             {certi}
//           </p>
//         </div>

//         <div className={`${cardClasses} ${cardBg}`}>
//           <h1 className={`text-lg sm:text-xl md:text-2xl mb-2 ${textColor}`}>
//             Courses Completed
//           </h1>
//           <p className="text-3xl sm:text-4xl font-bold text-blue-600">
//             {completed}
//           </p>
//         </div>
//       </div>

//       {/* Graph */}
//       <div className="w-full mt-6">
//         <Graph />
//       </div>

//       {/* Student Status */}
//       <div className="w-full mt-6">
//         <StudentStatus />
//       </div>
//     </div>
//   );
// }

// export default Note;

import { useEffect, useState } from "react";
import axios from "axios";
import useTheme from "/src/Hooks/ThemeHook";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function Note() {
  const [course, setCourse] = useState(0);
  const [certi, setCertifi] = useState(0);
  const [completed, setCompleted] = useState(0);
  const isDarkMode = useTheme();

  const Uemail = localStorage.getItem("userEmail");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_STUDENT_PROGRESS, {
          params: { email: Uemail },
        });
        const data = res.data?.courses || {};
        setCourse(data.total || 0);
        setCertifi(data.certificate_gained || 0);
        setCompleted(data.completed || 0);
      } catch (error) {
        console.error("Failed to fetch student progress:", error);
      }
    };

    fetchData();
  }, []);

  const cardStyle = `p-4 sm:p-6 rounded-xl border shadow-sm transition min-w-[200px]`;
  const orange = "#f97316";

  return (
    <div
      className={`p-6 md:p-10 transition-all duration-300 font-mono ${
        isDarkMode ? "text-white" : "text-black"
      }`}
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Learning Statistics */}
        <div
          className={`rounded-xl p-6 ${
            isDarkMode ? "bg-zinc-900" : "bg-white"
          } shadow`}
        >
          <h2 className="text-xl font-semibold mb-4 text-orange-500">
            Learning Statistics
          </h2>
          <p className="text-gray-500 mb-6">Your performance metrics</p>

          <div className="grid sm:grid-cols-2 gap-4">
            <StatCard
              title="Hours Spent Learning"
              value={87}
              change={"+12%"}
              positive
              percentage={87}
              isDarkMode={isDarkMode}
              orange={orange}
            />
            <StatCard
              title="Challenges Completed"
              value={completed}
              change={"+8%"}
              positive
              percentage={completed}
              isDarkMode={isDarkMode}
              orange={orange}
            />
            <StatCard
              title="Average Quiz Score"
              value="92%"
              change={"+5%"}
              positive
              percentage={92}
              isDarkMode={isDarkMode}
              orange={orange}
            />
            <StatCard
              title="Community Contributions"
              value={14}
              change={"-3%"}
              positive={false}
              percentage={14}
              isDarkMode={isDarkMode}
              orange={orange}
            />
          </div>
        </div>

        {/* Learning Insights */}
        <div
          className={`rounded-xl p-6 ${
            isDarkMode ? "bg-zinc-900" : "bg-white"
          } shadow`}
        >
          <h2 className="text-xl font-semibold mb-4 text-orange-500">
            Learning Insights
          </h2>
          <p className="text-gray-500 mb-6">
            AI-powered analysis of your learning patterns
          </p>

          <div className="space-y-4 text-sm">
            <InsightCard
              title="💡 Learning Style"
              content="You learn best through visual content and practical exercises. We've adjusted your content to include more interactive elements."
              bg={isDarkMode ? "bg-zinc-800" : "bg-gray-100"}
            />
            <InsightCard
              title="⏰ Optimal Study Time"
              content="Your performance is highest in the morning. Consider scheduling challenging topics between 8–11 AM."
              bg="bg-yellow-100"
            />
            <InsightCard
              title="📈 Strength Area"
              content="You excel at problem-solving tasks. We've added more advanced challenges to help you further develop this skill."
              bg="bg-green-100"
            />
            <InsightCard
              title="🎯 Focus Area"
              content="CSS layouts appear to be challenging for you. We've added extra practice exercises to help improve this skill."
              bg="bg-red-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, positive, percentage, isDarkMode, orange }) {
  return (
    <div className={`flex items-center gap-4 rounded-xl p-4 ${isDarkMode ? "bg-zinc-800" : "bg-gray-50"}`}>
      <div className="w-14 h-14">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={buildStyles({
            pathColor: orange,
            textColor: orange,
            trailColor: isDarkMode ? "#444" : "#eee",
            textSize: "28px",
          })}
        />
      </div>
      <div>
        <p className="text-sm">{title}</p>
        <p className="text-xl font-bold text-orange-500">{value}</p>
        <p className={`text-xs mt-1 ${positive ? "text-green-500" : "text-red-500"}`}>
          {positive ? "↑" : "↓"} {change} from last month
        </p>
      </div>
    </div>
  );
}

function InsightCard({ title, content, bg }) {
  return (
    <div className={`${bg} p-4 rounded-lg`}>
      <p className="font-medium">{title}</p>
      <p className="text-gray-700 mt-1">{content}</p>
    </div>
  );
}

export default Note;
