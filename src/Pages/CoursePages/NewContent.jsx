import React, { useState } from "react";
import {
  CheckCircle,
  PlayCircle,
  Video,
  Share2,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { IoIosPlay } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BiDotsVerticalRounded } from "react-icons/bi";

// A mock component for the video player to simplify the example.
const VideoPlayer = ({ title }) => (
  <div className="relative w-full h-80 rounded-2xl overflow-hidden shadow-xl mb-6">
    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
      <PlayCircle size={64} className="text-white opacity-80" />
    </div>
    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-sm">
      <div className="flex items-center space-x-2">
        <button className="p-1 rounded-full bg-black bg-opacity-50">
          <IoIosPlay size={20} />
        </button>
        <span>00:00 / 1:30</span>
      </div>
      <div className="flex items-center space-x-2">
        <BiDotsVerticalRounded size={20} className="text-white" />
        <BiDotsVerticalRounded size={20} className="text-white" />
      </div>
    </div>
  </div>
);

// Component for the course progress bar.
const CourseProgress = ({ progress }) => {
  const points = [0, 25, 50, 75, 100];
  const progressPercentage = (progress / 25) * 100;

  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">
        Your Study Progress{" "}
        <span className="font-bold text-blue-600">{progress}%</span>
      </h3>
      <div className="relative w-full h-2 rounded-full bg-gray-200 mb-6">
        <div
          className="absolute h-full rounded-full bg-blue-600 transition-all duration-500"
          style={{ width: `${progressPercentage}%` }}
        ></div>
        <div className="absolute top-1/2 left-0 right-0 transform -translate-y-1/2 flex justify-between">
          {points.map((p, index) => (
            <div key={index} className="flex flex-col items-center">
              <span
                className={`w-3 h-3 rounded-full border-2 ${
                  p <= progress
                    ? "bg-blue-600 border-white"
                    : "bg-white border-gray-400"
                } -mt-1.5`}
              ></span>
              <span className="mt-2 text-xs text-gray-500">{p} Points</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-blue-50 text-blue-600 p-4 rounded-xl">
        <p className="font-semibold mb-1">Great Job!</p>
        <p className="text-sm">
          You're on the path to becoming a certified Mastering Illustration.
          Your dedication to learning is impressive Finish strong!
        </p>
      </div>
    </div>
  );
};

// Component for a single course module item.
const ModuleItem = ({ module, isActive, isCompleted, onClick }) => {
  const icon = isCompleted ? (
    <CheckCircle size={20} className="text-green-500" />
  ) : (
    <Video
      size={20}
      className={`${isActive ? "text-blue-600" : "text-gray-500"}`}
    />
  );

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200
        ${
          isActive
            ? "bg-blue-100 text-blue-800 shadow"
            : "bg-white text-gray-700 hover:bg-gray-50"
        }
        border border-gray-200 mb-2`}
    >
      <div
        className={`p-2 rounded-full ${isActive ? "bg-white" : "bg-gray-100"}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4
          className={`font-medium ${
            isActive ? "text-blue-800" : "text-gray-800"
          }`}
        >
          {module.title}
        </h4>
        <span className="text-sm text-gray-500">{module.duration}</span>
      </div>
      {!isCompleted && !isActive && (
        <ChevronRight size={20} className="text-gray-400" />
      )}
    </div>
  );
};

// Main App component
const App = () => {
  const [activeModule, setActiveModule] = useState(1);
  const [completedModules, setCompletedModules] = useState([1]);
  const [showMore, setShowMore] = useState(false);

  const courseData = [
    { id: 1, title: "Introduction", duration: "20 min" },
    { id: 2, title: "Mastering Tools", duration: "1 hour 20 min" },
    { id: 3, title: "Mastering Adobe Illustrator", duration: "2 hour 10 min" },
    { id: 4, title: "Create Simple Shape", duration: "40 min" },
    { id: 5, title: "Typography", duration: "40 min" },
    { id: 6, title: "Mastering Pen Tool", duration: "1 hour 40 min" },
    { id: 7, title: "Mastering Pro Create", duration: "2 hour" },
  ];

  return (
    <div className="font-sans bg-gray-50 text-gray-900 min-h-screen p-4 md:p-8 lg:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="mb-4 text-sm text-gray-500">
          My Course <span className="mx-2"> &gt; </span> Mastering Illustration{" "}
          <span className="mx-2"> &gt; </span> Course
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Video & Course Details */}
          <div className="lg:w-2/3">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Mastering Illustration
            </h1>

            <VideoPlayer />

            {/* Mentor Info */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-4">
                <FaUserCircle size={48} className="text-gray-400" />
                <div>
                  <h4 className="font-semibold text-lg text-gray-800">
                    Simon Simorangkir
                  </h4>
                  <span className="text-sm text-gray-500">
                    Mentor, Illustrator at Google
                  </span>
                </div>
              </div>
              <button className="flex items-center space-x-2 text-blue-600 font-medium">
                <Share2 size={16} />
                <span>Share</span>
              </button>
            </div>

            {/* About This Course */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200 mb-8">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                About This Course
              </h3>
              <p
                className={`text-gray-600 mb-2 ${
                  !showMore ? "line-clamp-3" : ""
                }`}
              >
                Unlock your creative potential with our Beginner-Level
                Illustrator Course! Are you ready to embark on a journey into
                the world of digital art and design? Our Mastering Illustrator
                course is perfect for beginners looking to learn the ropes of
                Adobe Illustrator, the industry-standard vector graphics
                software. From crafting stunning graphics to bringing your
                artistic visions to life, this course is your comprehensive
                guide to mastering the fundamentals and advanced techniques of
                Illustrator. You will learn to navigate the user interface,
                understand essential tools like the Pen Tool and Shape Builder
                Tool, and create beautiful, scalable vector artwork. This course
                covers everything from basic shapes to complex illustrations,
                giving you the skills you need to succeed as a digital artist or
                graphic designer.
              </p>
              <button
                onClick={() => setShowMore(!showMore)}
                className="text-blue-600 font-medium text-sm"
              >
                {showMore ? "Show less" : "Show more"}
              </button>
            </div>

            {/* This Course Suit for: */}
            <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
              <h3 className="text-2xl font-semibold mb-4 text-gray-800">
                This Course Suit for:
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-blue-500 mr-2" />
                  Anyone who wants to start their career & get paid for their
                  illustration design skills.
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-blue-500 mr-2" />
                  This course is for beginners, newbies & amateurs in the field
                  of Illustration field.
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-blue-500 mr-2" />
                  For anyone that needs to add 'Illustration' to their
                  portfolio.
                </li>
                <li className="flex items-center">
                  <ChevronRight size={16} className="text-blue-500 mr-2" />
                  Aimed at people new to the world of illustration design.
                </li>
              </ul>
            </div>
          </div>

          {/* Right Column: Progress & Modules */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8 space-y-6">
              <CourseProgress progress={25} />

              {/* Course Completion Section */}
              <div className="bg-white p-6 rounded-3xl shadow-lg border border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Course Completion
                  </h3>
                  <h3 className="text-gray-500 font-normal">1/25</h3>
                </div>
                <div className="flex flex-col space-y-2 max-h-[60vh] overflow-y-auto">
                  {courseData.map((module) => (
                    <ModuleItem
                      key={module.id}
                      module={module}
                      isActive={activeModule === module.id}
                      isCompleted={completedModules.includes(module.id)}
                      onClick={() => setActiveModule(module.id)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
