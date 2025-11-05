import React, { useState, useEffect, useContext, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { CourseContext } from "/src/App";
import Quizzes from "/src/Components/CourseComponents/Quizzes.jsx";
import useTheme from "/src/Hooks/ThemeHook.js";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import fallbackVideo from "/src/assets/video.mp4";
import {
  CheckCircle,
  PlayCircle,
  Video,
  ChevronRight,
  Lock,
  Code,
  BarChart2,
  Database,
  Mail,
  Users,
} from "lucide-react";

// Video player component
const VideoPlayer = ({ videoUrl, videoRef, onProgressUpdate }) => (
  <div className="relative w-full h-64 md:h-fit rounded-2xl overflow-hidden shadow-xl mb-6">
    {videoUrl ? (
      <video
        key={videoUrl}
        src={videoUrl}
        controls
        controlsList="nodownload"
        disablePictureInPicture
        ref={videoRef}
        onTimeUpdate={onProgressUpdate}
        className="w-full h-full object-cover"
      />
    ) : (
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500 to-yellow-400 flex flex-col items-center justify-center space-y-4">
        <PlayCircle size={64} className="text-white opacity-80" />
        <span className="text-white text-lg font-bold font-mono">
          No video for this chapter
        </span>
      </div>
    )}
  </div>
);

// Progress bar component
const CourseProgress = ({ progress }) => (
  <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-zinc-700 font-mono">
    <h3 className="text-xl font-bold text-orange-600 mb-4">
      Your Study Progress: <span>{progress}%</span>
    </h3>
    <div className="w-full bg-gray-200 dark:bg-zinc-700 h-4 rounded-full overflow-hidden mb-4">
      <div
        className="bg-orange-500 h-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
    <div className="bg-orange-50 text-orange-700 p-4 rounded-xl text-sm">
      <p className="font-semibold mb-1">Great Job!</p>
      <p>You're on the path to mastering this course. Keep going!</p>
    </div>
  </div>
);

// Each chapter list item
const ModuleItem = ({
  chapter,
  isActive,
  isCompleted,
  isUnlocked,
  onClick,
}) => {
  const icon = isCompleted ? (
    <CheckCircle size={20} className="text-green-500" />
  ) : !isUnlocked ? (
    <Lock size={20} className="text-gray-500" />
  ) : (
    <Video
      size={20}
      className={`${isActive ? "text-orange-600" : "text-gray-500"}`}
    />
  );
  const isDark = useTheme();

  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 font-mono ${
        isActive
          ? "bg-orange-100 text-orange-800 shadow"
          : `bg-white text-gray-700 hover:bg-gray-50 ${
              isDark ? "bg-zinc-800 text-white" : ""
            }`
      } border border-gray-200 mb-2 ${
        !isUnlocked ? "opacity-50 pointer-events-auto" : ""
      }`}
    >
      <div
        className={`p-2 rounded-full ${isActive ? "bg-white" : "bg-gray-100"}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4
          className={`font-medium ${
            isActive ? "text-orange-800" : "text-gray-800"
          }`}
        >
          {chapter.title}
        </h4>
        <span className="text-sm text-gray-500">{chapter.duration}</span>
      </div>
      {!isCompleted && !isActive && (
        <ChevronRight size={20} className="text-gray-400" />
      )}
    </div>
  );
};

// Assignment card component (simplified)
const AssignmentCard = ({
  title,
  icon,
  difficulty,
  dataset,
  index,
  value,
  onChange,
  onSubmit,
}) => {
  return (
    <div className="p-4 rounded-lg border shadow bg-white dark:bg-zinc-800 border-orange-200 dark:border-zinc-600">
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-full bg-orange-100 dark:bg-zinc-700 text-orange-600 dark:text-orange-400">
          {icon}
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-start">
            <h4 className="font-semibold text-orange-700 dark:text-orange-400">
              {title}
            </h4>
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                difficulty === "Easy"
                  ? "bg-green-100 text-green-800"
                  : difficulty === "Medium"
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {difficulty}
            </span>
          </div>

          {dataset && (
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              {dataset}
            </p>
          )}

          <textarea
            id={`assignment-${index}`}
            placeholder="Write your answer here..."
            value={value}
            onChange={(e) => onChange(index, e.target.value)}
            className="mt-2 w-full p-2 border rounded-md dark:bg-zinc-700 dark:text-white"
          ></textarea>

          <button
            onClick={() => onSubmit(index)}
            className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition"
          >
            Submit Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default function CourseContent() {
  const { id } = useParams();
  const { Course: CourseList } = useContext(CourseContext);
  const Uemail = localStorage.getItem("userEmail");
  const Assign = localStorage.setItem;
  const Content = CourseList.find((course) => course.id === Number(id));
  const assignment = localStorage.getItem("assi");

  const [selectedChapterId, setSelectedChapterId] = useState(null);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState(null);
  const [courseData, setCourseData] = useState([]);
  const [certificateName, setCertificateName] = useState("");
  const [loading, setLoading] = useState(true);
  const [completedChapters, setCompletedChapters] = useState([]);
  const [unlockedChapters, setUnlockedChapters] = useState([0]);
  const [chapterNotes, setChapterNotes] = useState("");
  const [animatedPoints, setAnimatedPoints] = useState(0);
  const [activeTab, setActiveTab] = useState("description");
  const [quizPassedChapters, setQuizPassedChapters] = useState([]);
  const [showLockModal, setShowLockModal] = useState(false);
  const [, setCoursePoints] = useState(0);
  const [, setPointsToAnimateTo] = useState(0);
  const [showVideoProgressModal, setShowVideoProgressModal] = useState(false);
  const [videoWatchedPercentage, setVideoWatchedPercentage] = useState(0);
  const handleNoteTabClick = () => setActiveTab("note");
  const videoRef = useRef(null);
  const videoKey = `course-${id}-videoCompleted`;
  const quizKey = `course-${id}-quizCompleted`;

  useEffect(() => setVideoWatchedPercentage(0), [selectedChapterId]);

  // This useEffect initializes the points on page load.
  useEffect(() => {
    const savedPoints = parseInt(
      localStorage.getItem("CoursePoints") || "0",
      10
    );
    setCoursePoints(savedPoints);
    setAnimatedPoints(savedPoints); // Initialize animatedPoints to the saved value
    setPointsToAnimateTo(savedPoints); // Initialize the target to the saved value
  }, []);

  useEffect(() => {
    if (selectedChapterId && Content) {
      const chapter = Content.chapters.find(
        (ch) => ch.id === selectedChapterId
      );
      const video = chapter?.videos?.[0]?.video;
      setSelectedVideoUrl(
        video ? video.replace(/^http:/, "https:") : fallbackVideo
      );
    }
  }, [selectedChapterId, Content]);

  useEffect(() => {
    if (!Uemail || !CourseList?.length) return;
    setLoading(true);
    const selectedCourse = CourseList.find(
      (course) => course.id === Number(id)
    );

    if (selectedCourse) {
      setCertificateName(selectedCourse.name);
      const formattedChapters = selectedCourse.chapters.map(
        (chapter, index) => ({
          title: chapter.title,
          id: chapter.id,
          index,
          duration: "1 hour 20 min",
        })
      );
      setCourseData(formattedChapters);
      const firstUnlockedChapter = selectedCourse.chapters[0];
      if (firstUnlockedChapter) {
        setSelectedChapterId(firstUnlockedChapter.id);
      }

      async function fetchProgress() {
        try {
          const res = await axios.get(import.meta.env.VITE_STATUS_VIEW, {
            params: { email: Uemail, course: selectedCourse.name },
          });

          const chapters = res.data?.chapters || [];
          const completed = chapters
            .filter((ch) => ch.status === true)
            .map((ch) => ch.chapter_title);
          const unlocked = completed.map((_, index) => index);
          if (completed.length < selectedCourse.chapters.length)
            unlocked.push(completed.length);
          setCompletedChapters(completed);
          setUnlockedChapters(unlocked.length ? unlocked : [0]);
          // Calculate initial points from the fetched data

          const initialPoints = completed.length * 100;

          localStorage.setItem("CoursePoints", initialPoints);

          setCoursePoints(initialPoints);

          setAnimatedPoints(initialPoints);

          setPointsToAnimateTo(initialPoints);
        } catch (err) {
          console.error("Error fetching progress:", err);
          setUnlockedChapters([0]);
        } finally {
          setLoading(false);
        }
      }
      fetchProgress();
    } else {
      setLoading(false);
    }
  }, [id, CourseList, Uemail]);

  const unlockNextChapter = async (index) => {
    const chapter = courseData[index];

    if (!chapter || completedChapters.includes(chapter.title)) {
      console.log("Chapter already completed or not found:", chapter);

      return;
    }

    const newCompleted = [...completedChapters, chapter.title];

    setCompletedChapters(newCompleted);

    const newUnlocked = [...unlockedChapters];

    if (!newUnlocked.includes(index + 1)) newUnlocked.push(index + 1);

    setUnlockedChapters(newUnlocked);

    const payload = {
      email: Uemail,

      course: certificateName,

      chapter: newCompleted.map((title) => ({
        chapter_title: title,

        status: true,
      })),
    };

    console.log("Unlocking next chapter at index:", index);

    console.log("Payload:", payload);

    try {
      await axios.post(import.meta.env.VITE_STATUS_CREATE, payload);

      console.log("✅ Progress successfully updated");
    } catch (err) {
      console.error(
        "❌ Error updating progress:",

        err?.response?.data || err.message
      );
    }
  };

  const handleNextChapter = () => {
    const currentIndex = Content.chapters.findIndex(
      (ch) => ch.id === selectedChapterId
    );
    if (currentIndex !== -1 && currentIndex < Content.chapters.length - 1) {
      unlockNextChapter(currentIndex);
      const nextChapter = Content.chapters[currentIndex + 1];
      setSelectedChapterId(nextChapter.id);
      setActiveTab("description");
    }
  };
  const handleVideoTimeUpdate = () => {
    if (videoRef.current) {
      const { currentTime, duration } = videoRef.current;
      const percentage = (currentTime / duration) * 100;
      setVideoWatchedPercentage(percentage);
    }
  };

  useEffect(() => {
    localStorage.setItem(
      `course-${id}-unlocked`,

      JSON.stringify(unlockedChapters)
    );

    localStorage.setItem(
      `course-${id}-completed`,

      JSON.stringify(completedChapters)
    );
  }, [id, unlockedChapters, completedChapters]);

  useEffect(() => {
    const savedVideo = JSON.parse(localStorage.getItem(videoKey) || "[]");

    const savedQuiz = JSON.parse(localStorage.getItem(quizKey) || "[]");

    const combined = [...new Set([...savedVideo, ...savedQuiz])];

    const savedUnlocked = combined.map((title) =>
      Content?.chapters.findIndex((ch) => ch.title === title)
    );

    if (combined.length < Content?.chapters.length)
      savedUnlocked.push(combined.length);

    setCompletedChapters(combined);

    setUnlockedChapters(savedUnlocked.length ? savedUnlocked : [0]);
  }, [id, Content, videoKey, quizKey]);

  // ✅ Store video completion

  useEffect(() => {
    if (videoWatchedPercentage >= 90 && selectedChapterId && Content) {
      const chapter = Content.chapters.find((c) => c.id === selectedChapterId);

      if (chapter) {
        const watched = JSON.parse(localStorage.getItem(videoKey) || "[]");

        if (!watched.includes(chapter.title)) {
          const updated = [...watched, chapter.title];

          localStorage.setItem(videoKey, JSON.stringify(updated));
        }
      }
    }
  }, [videoWatchedPercentage, selectedChapterId, Content, videoKey]);

  // ✅ ✅ UPDATED HERE

  useEffect(() => {
    const watched = JSON.parse(localStorage.getItem(videoKey) || "[]");

    const chapter = Content?.chapters.find((ch) => ch.id === selectedChapterId);

    if (chapter && watched.includes(chapter.title)) {
      setVideoWatchedPercentage(100);
    } else {
      setVideoWatchedPercentage(0);
    }
  }, [selectedChapterId, Content, videoKey]);

  // Update this function to only set the new target for the animation
  const addCoursePoints = (pointsToAdd = 100) => {
    const existing = parseInt(localStorage.getItem("CoursePoints") || "0", 10);
    const updated = existing + pointsToAdd;
    localStorage.setItem("CoursePoints", updated);
    setCoursePoints(updated);
    setPointsToAnimateTo(updated); // This triggers the animation
    return updated;
  };

  const handleQuizTabClick = () => {
    if (videoWatchedPercentage >= 90) {
      setActiveTab("quiz");
    } else {
      setShowVideoProgressModal(true);
    }
  };

  const selectedChapter = Content?.chapters.find(
    (ch) => ch.id === selectedChapterId
  );
  const currentQuiz = selectedChapter?.quizzes || [];
  const progressPercent = Math.round(
    (completedChapters.length / courseData.length) * 100
  );

  const handleModalOkay = () => {
    const lastUnlockedIndex = unlockedChapters[unlockedChapters.length - 1];
    const lastUnlockedChapter = Content.chapters[lastUnlockedIndex];

    if (lastUnlockedChapter) {
      setSelectedChapterId(lastUnlockedChapter.id);
      setActiveTab("quiz");
    }
    setShowLockModal(false);
  };

  const handleNoteChange = (e) => {
    const newNote = e.target.value;
    setChapterNotes(newNote);
    localStorage.setItem(`notes-${id}-chapter-${selectedChapterId}`, newNote);
  };

  const [answers, setAnswers] = useState(() => {
    const stored = localStorage.getItem("assignmentAnswers");
    return stored ? JSON.parse(stored) : {};
  });

  const handleSubmitAnswer = (index) => {
    if (answers[index]) {
      alert(`Answer for assignment ${index + 1} submitted successfully!`);
      // Here you would typically send the answer to your backend
      // For now, we'll just show an alert
    } else {
      alert("Please write your answer before submitting!");
    }
  };

  // Assignment data
  const assignments = [
    {
      title: "SQL Database Management for E-Commerce",
      icon: <Mail size={20} />,
      difficulty: "Medium",
    },
    {
      title: "AI-Powered Chatbot for Customer Support",
      icon: <Code size={20} />,
      difficulty: "Easy",
    },
    {
      title: "Responsive Web Design Grant",
      icon: <Database size={20} />,
      difficulty: "Hard",
    },
  ];

  if (loading)
    return (
      <div className="p-10 text-center text-xl text-orange-500 font-mono">
        Loading...
      </div>
    );

  return (
    <div className="font-mono bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 min-h-screen p-4 pt-20 md:p-8 lg:p-12">
      {showLockModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-orange-600 mb-2">
              Hold on!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please complete the previous quiz to unlock this chapter.
            </p>
            <button
              onClick={handleModalOkay}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      {showVideoProgressModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-800 rounded-xl shadow-xl p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-semibold text-orange-600 mb-2">
              Almost there!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Please watch at least 90% of the video before taking the quiz.
            </p>
            <button
              onClick={() => setShowVideoProgressModal(false)}
              className="mt-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Okay
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <nav className="mb-4 text-sm text-gray-500">
          <Link
            to="/course"
            className="hover:text-orange-500 transition-colors"
          >
            Courses
          </Link>
          <span className="mx-2">&gt;</span>
          <Link
            to={`/course/${Content.id}`}
            className="hover:text-orange-500 transition-colors"
          >
            {Content.name}
          </Link>
          <span className="mx-2">&gt;</span>
          <span className="text-gray-800 font-semibold dark:text-white">
            Detailed Course
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold mb-6 text-orange-600">
              {Content?.name || "Course Title"}
            </h1>

            {selectedVideoUrl && (
              <VideoPlayer
                videoUrl={selectedVideoUrl}
                videoRef={videoRef}
                onProgressUpdate={handleVideoTimeUpdate}
              />
            )}

            {/* Tabs */}
            <div className="border-b border-gray-300 dark:border-zinc-700 mb-2">
              <div className="flex gap-6 text-sm font-semibold">
                <button
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === "description"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-orange-500"
                  }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === "quiz"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-orange-500"
                  }`}
                  onClick={handleQuizTabClick}
                >
                  Quiz
                </button>
                <button
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === "assignment"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-orange-500"
                  }`}
                  onClick={() => setActiveTab("assignment")}
                >
                  Assignment
                </button>
                <button
                  className={`pb-2 border-b-2 transition-colors ${
                    activeTab === "note"
                      ? "border-orange-500 text-orange-600"
                      : "border-transparent text-gray-500 hover:text-orange-500"
                  }`}
                  onClick={handleNoteTabClick}
                >
                  Notes
                </button>
              </div>
            </div>

            {activeTab === "description" && (
              <div className="mt-4 bg-white dark:bg-zinc-800 p-4 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="text-lg font-semibold text-orange-600 mb-2">
                  Chapter Description
                </h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                  {selectedChapter?.description ||
                    "No description available for this chapter."}
                </p>
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="mt-4 p-4 border border-orange-300 dark:border-zinc-700 rounded-xl">
                {currentQuiz.length > 0 ? (
                  <Quizzes
                    chapterId={selectedChapterId}
                    quizData={currentQuiz}
                    onQuizComplete={(isCorrect) => {
                      if (isCorrect) {
                        const chapterTitle = selectedChapter?.title;
                        if (!quizPassedChapters.includes(chapterTitle)) {
                          setQuizPassedChapters([
                            ...quizPassedChapters,
                            chapterTitle,
                          ]);
                        }
                      }
                    }}
                    onNextChapter={(completedChapterId) => {
                      const completedChapter = Content.chapters.find(
                        (ch) => ch.id === completedChapterId
                      );
                      if (
                        completedChapter &&
                        !completedChapters.includes(completedChapter.title)
                      ) {
                        setCompletedChapters([
                          ...completedChapters,
                          completedChapter.title,
                        ]);
                        addCoursePoints(100);
                        console.log(
                          `Chapter "${completedChapter.title}" completed. 100 CoursePoints added.`
                        );
                      }
                      const idx = Content.chapters.findIndex(
                        (ch) => ch.id === completedChapterId
                      );
                      if (!unlockedChapters.includes(idx + 1)) {
                        setUnlockedChapters([...unlockedChapters, idx + 1]);
                      }
                      handleNextChapter();
                    }}
                    userEmail={Uemail}
                    courseName={certificateName}
                    assi={assignment}
                  />
                ) : (
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    No quiz available for this chapter.
                  </p>
                )}
              </div>
            )}

            {activeTab === "assignment" && (
              <div className="mt-4 space-y-4">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-gray-200 dark:border-zinc-700">
                  <h3 className="text-xl font-semibold text-orange-600 mb-4 flex items-center gap-2">
                    <Code size={24} /> Assignments
                  </h3>

                  <div className="space-y-4">
                    {assignments.map((assignment, index) => (
                      <AssignmentCard
                        key={index}
                        index={index}
                        title={assignment.title}
                        icon={assignment.icon}
                        difficulty={assignment.difficulty}
                        dataset={assignment.dataset}
                        value={answers[index] || ""}
                        onChange={(idx, val) => {
                          const updatedAnswers = { ...answers, [idx]: val };
                          setAnswers(updatedAnswers);
                          localStorage.setItem(
                            "assignmentAnswers",
                            JSON.stringify(updatedAnswers)
                          );
                        }}
                        onSubmit={handleSubmitAnswer}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "note" && (
              <div className="mt-4 bg-white dark:bg-zinc-800 p-4 rounded-xl border border-gray-200 dark:border-zinc-700">
                <h3 className="text-lg font-semibold text-orange-600 mb-4">
                  Your Notes for this Chapter
                </h3>

                <textarea
                  value={chapterNotes}
                  onChange={handleNoteChange}
                  placeholder="Write your notes here..."
                  className="w-full h-48 p-3 rounded-lg bg-gray-100 dark:bg-zinc-700 text-gray-800 dark:text-gray-100 border border-gray-300 dark:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>
            )}
          </div>

          {/* Right Panel: Progress + Chapter List */}
          <div className="lg:w-1/3">
            <div className="lg:sticky lg:top-8 space-y-6">
              <CourseProgress progress={progressPercent} />

              <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-zinc-700 text-center font-mono">
                <h3 className="text-lg font-semibold text-orange-600 mb-4">
                  Your Course Points
                </h3>

                <div className="w-40 mx-auto">
                  <CircularProgressbarWithChildren
                    value={animatedPoints}
                    maxValue={courseData.length * 100}
                    styles={buildStyles({
                      pathColor: "#f97316",

                      textColor: "#f97316",
                    })}
                  >
                    <div className="text-2xl font-bold text-orange-500">
                      {animatedPoints}
                    </div>

                    <div className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                      XP Points
                    </div>
                  </CircularProgressbarWithChildren>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
                  Earn points by completing chapters and quizzes!
                </p>
              </div>

              <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-lg border border-gray-200 dark:border-zinc-700">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-orange-600">
                    Course Chapters
                  </h3>
                  <span className="text-sm text-gray-500">
                    {completedChapters.length}/{courseData.length}
                  </span>
                </div>
                <div className="flex flex-col space-y-2 max-h-[60vh] overflow-y-auto">
                  {Content?.chapters?.map((chapter, index) => {
                    const isUnlocked = unlockedChapters.includes(index);
                    const isCompleted = completedChapters.includes(
                      chapter.title
                    );
                    return (
                      <ModuleItem
                        key={chapter.id}
                        chapter={chapter}
                        isActive={selectedChapterId === chapter.id}
                        isCompleted={isCompleted}
                        isUnlocked={isUnlocked}
                        onClick={() => {
                          if (!isUnlocked) {
                            setShowLockModal(true);
                            return;
                          }
                          setSelectedChapterId(chapter.id);
                          setActiveTab("description");
                        }}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
