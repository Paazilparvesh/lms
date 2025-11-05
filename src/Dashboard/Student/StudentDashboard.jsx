// import Header from "/src/Components/ReusableComponents/Header.jsx";
// import { useState, useEffect } from "react";
// import StudentHome from "/src/Dashboard/Student/StudentHome.jsx";
// import StudentStatistics from "/src/Dashboard/Student/StudentStatistics.jsx";
// import Settings from "/src/Components/Settings.jsx";
// import Certificate from "./Certificate";
// import {
//   HiChevronDoubleLeft,
//   HiChevronDoubleRight,
//   HiMenu,
// } from "react-icons/hi";
// import { MdDashboard, MdInsertChart, MdSettings } from "react-icons/md";
// import { FaCableCar, FaCertificate } from "react-icons/fa6"; // ? Certificate Icon
// import { IoMdClose } from "react-icons/io"; // ? X icon
// import useTheme from "/src/Hooks/ThemeHook";
// import SemesterList from "../Student/SemesterList";
// import { FaRegNoteSticky } from "react-icons/fa6";

// function StudentDashboard() {
//   const [active, setActive] = useState("dashboard");
//   const [sidebarExpanded, setSidebarExpanded] = useState(true);
//   const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false); // ?? Mobile drawer state
//   const isDarkMode = useTheme();

//   // Automatically collapse sidebar on small screens
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth < 768) {
//         setSidebarExpanded(false);
//       } else {
//         setSidebarExpanded(true);
//         setMobileSidebarOpen(false); // Close mobile sidebar on resize
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     handleResize();
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const items = [
//     { id: "dashboard", icon: <MdDashboard />, label: "Dashboard" },
//     { id: "statistics", icon: <MdInsertChart />, label: "Statistics" },
//     { id: "settings", icon: <MdSettings />, label: "Settings" },
//     { id: "certificates", icon: <FaCertificate />, label: "Certificates" },

//     { id: "Semesters", icon: <FaRegNoteSticky />, label: "Semester Details" },
//   ];

//   const renderContent = () => {
//     switch (active) {
//       case "dashboard":
//         return <StudentHome />;
//       case "statistics":
//         return <StudentStatistics />;
//       case "settings":
//         return <Settings />;
//       case "certificates":
//         return <Certificate />;
//       case "Semesters":
//         return <SemesterList />;
//       default:
//         return <StudentHome />;
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div
//         className={`flex w-full min-h-screen pt-20 relative transition-colors duration-300 ${
//           isDarkMode
//             ? "bg-gradient-to-br from-sky-800 to-sky-800"
//             : "bg-gradient-to-br from-[#084E90] to-[#23A4DC]"
//         }`}
//       >
//         {/* Mobile Menu Button */}
//         <button
//           onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
//           className="md:hidden fixed top-16 left-4 z-40 p-2 rounded-full bg-blue-600 text-white shadow-lg"
//         >
//           {mobileSidebarOpen ? <IoMdClose size={24} /> : <HiMenu size={24} />}
//         </button>

//         {/* Sidebar */}
//         {/* <div
//           className={`fixed top-12 left-0 h-[calc(100vh-50px)] transition-all duration-300 shadow-lg z-30 flex-shrink-0 ${
//             sidebarExpanded ? "w-64" : "w-[70px]"
//           } ${isDarkMode ? "bg-zinc-900" : "bg-white"}
//           ${
//             mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
//           } md:translate-x-0`}
//         >
//           <div
//             className={`flex flex-col items-start h-full p-3 ${
//               mobileSidebarOpen ? "mt-14" : ""
//             }`} // ? Top margin for mobile
//           >
//             Collapse Button (Desktop only)
//             <button
//               onClick={() => setSidebarExpanded(!sidebarExpanded)}
//               className="hidden md:block self-end mb-4 p-1 text-gray-600 dark:text-gray-300 hover:text-blue-500"
//             >
//               {sidebarExpanded ? (
//                 <HiChevronDoubleLeft size={20} />
//               ) : (
//                 <HiChevronDoubleRight size={20} />
//               )}
//             </button>

//             {items.map((item) => (
//               <div
//                 key={item.id}
//                 onClick={() => {
//                   setActive(item.id);
//                   setMobileSidebarOpen(false); // ?? Close drawer on item click
//                 }}
//                 className={`flex items-center gap-3 p-2 my-1 rounded-md cursor-pointer w-full transition-all duration-200 hover:bg-blue-100 dark:hover:bg-zinc-700 ${
//                   active === item.id
//                     ? "bg-blue-200 dark:bg-zinc-700 border-l-4 border-blue-500"
//                     : ""
//                 }`}
//               >
//                 <div className="text-xl text-gray-700 dark:text-gray-200">
//                   {item.icon}
//                 </div>
//                 {sidebarExpanded && (
//                   <span className="text-sm text-gray-800 dark:text-gray-200">
//                     {item.label}
//                   </span>
//                 )}
//               </div>
//             ))}
//           </div>
//         </div> */}

//         {/* Main Content */}
//         <div
//           className={`transition-all duration-300 w-full px-4 md:px-6 flex justify-center ${
//             sidebarExpanded ? "md:ml-64" : "md:ml-[70px]"
//           }`}
//         >
//           <div className=" w-full">{renderContent()}</div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default StudentDashboard;

import Header from "/src/Components/ReusableComponents/Header.jsx";
import { useState, useEffect } from "react";
import StudentHome from "/src/Dashboard/Student/StudentHome.jsx";
import StudentStatistics from "/src/Dashboard/Student/StudentStatistics.jsx";
import Settings from "/src/Components/Settings.jsx";
import Certificate from "./Certificate";
import Help from "/src/Dashboard/Student/Help.jsx";
import {
  HiChevronDoubleLeft,
  HiChevronDoubleRight,
  HiMenu,
} from "react-icons/hi";
import { MdDashboard, MdSettings, MdAdminPanelSettings } from "react-icons/md";
import { FaRegCalendarAlt, FaChartLine } from "react-icons/fa";
import { IoMdClose, IoIosBook } from "react-icons/io";
import useTheme from "/src/Hooks/ThemeHook";
import SemesterList from "../Student/SemesterList";
import { FaRegNoteSticky } from "react-icons/fa6";
import { FiHelpCircle } from "react-icons/fi";
import { GoSignOut } from "react-icons/go";
import Leaderboard from "/src/Dashboard/Student/Leaderboard"; // ✅ import your Leaderboard component
import Signout from "/src/Dashboard/Student/Signout.jsx";
import Challenge from "/src/Dashboard/Student/Challenge.jsx";
import Assignment from "/src/Dashboard/Student/Assignment.jsx";

function StudentDashboard() {
  const [active, setActive] = useState("dashboard");
  const [sidebarExpanded, setSidebarExpanded] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const isDarkMode = useTheme();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarExpanded(false);
      } else {
        setSidebarExpanded(true);
        setMobileSidebarOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const topItems = [
    { id: "dashboard", icon: <MdDashboard size={20} />, label: "Dashboard" },
    {
      id: "leaderboard",
      icon: <FaChartLine size={20} />,
      label: "Leaderboard",
    },
    {
      id: "challenge",
      icon: <FaRegCalendarAlt size={20} />,
      label: "Challenge",
    },
    {
      id: "reports",
      icon: <FaRegNoteSticky size={20} />,
      label: "Reports",
    },
    {
      id: "assignment",
      icon: <IoIosBook size={20} />,
      label: "Assignments",
    },
    {
      id: "certificate",
      icon: <MdDashboard size={20} />,
      label: "Certificate",
    },
  ];

  const bottomItems = [
    { id: "help", icon: <FiHelpCircle size={20} />, label: "Help" },
    { id: "settings", icon: <MdSettings size={20} />, label: "Settings" },
  ];

  // const renderContent = () => {
  //   switch (active) {
  //     case "dashboard":
  //       return <StudentHome />;
  //     case "my-learning":
  //       return <SemesterList />;
  //     case "leaderboard":
  //       return <Leaderboard />; // ✅ render Leaderboard
  //     case "reports":
  //       return <StudentStatistics />;
  //     case "settings":
  //       return <Settings />;
  //     case "help":
  //       return <Help />;
  //     default:
  //       return <StudentHome />;
  //   }
  // };

  const renderContent = () => {
    switch (active) {
      case "dashboard":
        return <StudentHome />;
      case "leaderboard":
        return <Leaderboard onStartChallenge={() => setActive("challenge")} />;
      case "challenge":
        return <Challenge onComplete={() => setActive("leaderboard")} />;
      case "reports":
        return <StudentStatistics />;
      case "assignment":
        return <Assignment />;
      case "certificate":
        return <Certificate />;
      case "settings":
        return <Settings />;
      case "help":
        return <Help />;
      default:
        return <StudentHome />;
    }
  };

  const SidebarItem = ({ item }) => {
    const isActive = active === item.id;
    return (
      <div
        key={item.id}
        onClick={() => {
          setActive(item.id);
          setMobileSidebarOpen(false);
        }}
        className={`flex items-center gap-3 p-2 my-1 rounded-lg cursor-pointer w-full transition-all duration-200 
          ${
            isActive
              ? "bg-orange-100 text-orange-600 font-semibold"
              : "text-gray-600 hover:bg-orange-50 dark:text-gray-200 dark:hover:bg-zinc-700"
          }`}
      >
        <div
          className={`${
            isActive ? "text-orange-600" : "text-gray-500 dark:text-gray-400"
          }`}
        >
          {item.icon}
        </div>
        {sidebarExpanded && <span className="text-sm">{item.label}</span>}
      </div>
    );
  };

  return (
    <>
      <Header />
      <div
        className={`flex w-full min-h-screen  relative bg-orange-50 dark:bg-zinc-900 font-sans`}
      >
        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
          className="md:hidden fixed top-20 left-4 z-40 p-2 rounded-full bg-orange-500 text-white shadow-lg"
        >
          {mobileSidebarOpen ? <IoMdClose size={24} /> : <HiMenu size={24} />}
        </button>

        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-full transition-all duration-300 shadow-2xl z-30 flex-shrink-0 
            ${sidebarExpanded ? "w-64" : "w-[65px]"} 
            ${isDarkMode ? "bg-zinc-800 text-white" : "bg-white text-gray-800"} 
            ${
              mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:translate-x-0`}
        >
          {/* Sidebar Content */}
          <div className="flex flex-col h-full pt-16 py-4 px-3">
            {/* Sidebar Header */}
            <div
              className={`flex items-center mb-6 pt-2 pb-2 pl-2 ${
                sidebarExpanded ? "justify-between" : "justify-center"
              }`}
            >
              {sidebarExpanded && (
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-orange-500">LMS</span>
                </div>
              )}
              <button
                onClick={() => setSidebarExpanded(!sidebarExpanded)}
                className={`hidden md:block p-1 rounded-full text-gray-400 hover:text-orange-500
                  ${
                    sidebarExpanded
                      ? "p-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
                      : "p-2 hover:bg-gray-200 dark:hover:bg-zinc-700"
                  }
                `}
              >
                {sidebarExpanded ? (
                  <HiChevronDoubleLeft size={20} />
                ) : (
                  <HiChevronDoubleRight size={20} />
                )}
              </button>
            </div>

            {/* Top Menu Items */}
            <nav className="flex-grow">
              {topItems.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </nav>

            {/* Bottom Menu Items */}
            <div className="mt-auto">
              <hr className="my-2 border-gray-200 dark:border-zinc-700" />
              {bottomItems.map((item) => (
                <SidebarItem key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div
          className={`transition-all duration-300 w-full pt-16 px-4 md:px-6 flex justify-center ${
            sidebarExpanded ? "md:ml-64" : "md:ml-[80px]"
          }`}
        >
          <div className="w-full">{renderContent()}</div>
        </div>
      </div>
    </>
  );
}

export default StudentDashboard;
