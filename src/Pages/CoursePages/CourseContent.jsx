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
  Sparkles,
} from "lucide-react";

// AI Quiz Generator Component
const AIQuizGenerator = ({ chapterDescription, videoDescription, onQuizGenerated, chapterId }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [generatedQuestions, setGeneratedQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);

  // Function to get 5 random questions from generated ones
  const getRandomQuestions = (questions, count = 5) => {
    if (questions.length <= count) return questions;

    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const regenerateRandomQuestions = () => {
    if (generatedQuestions.length === 0) {
      setError("No questions available to regenerate. Please generate quiz first.");
      return;
    }

    const newRandomQuestions = getRandomQuestions(generatedQuestions, 5);
    setDisplayedQuestions(newRandomQuestions);
    onQuizGenerated(newRandomQuestions);
    console.log("Regenerated 5 Random Questions:", newRandomQuestions);
  };

  const generateQuiz = async () => {
    // Use video description if available, otherwise fall back to chapter description
    const description = videoDescription || chapterDescription;

    if (!description || description === "no description available for this chapter.") {
      setError("No description available to generate quiz");
      return;
    }

    setLoading(true);
    setError("");
    setGeneratedQuestions([]);
    setDisplayedQuestions([]);

    try {
      const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;
      console.log("API Key loaded:", API_KEY ? "Yes" : "No");

      if (!API_KEY) {
        throw new Error("API key not configured");
      }

      // CORRECTED: Use the Gemini text generation endpoint
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

      console.log("Sending request to Gemini API with description:", description.substring(0, 100) + "...");

      const response = await axios.post(
        API_URL,
        {
          contents: [
            {
              parts: [
                {
                  text: `Generate 10 multiple choice questions based on this educational content: "${description}". 
                  
                  Requirements:
                  - Create 10 diverse questions that test different aspects of the content
                  - Each question must have exactly 4 options
                  - Mark the correct answer with an index (0-3)
                  - Include brief explanations
                  - Make questions relevant to the content
                  
                  Return ONLY valid JSON in this exact format, no other text:
                  {
                    "questions": [
                      {
                        "question": "What is the main topic discussed?",
                        "options": ["Topic A", "Topic B", "Topic C", "Topic D"],
                        "correctAnswer": 0,
                        "explanation": "This is correct because it matches the main focus."
                      }
                    ]
                  }`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        },
        {
          headers: {
            "Content-Type": "application/json",
            'X-goog-api-key': API_KEY,
          },
          timeout: 30000, // 30 second timeout
        }
      );

      console.log("Full API Response:", response.data);

      if (!response.data.candidates || !response.data.candidates[0]) {
        throw new Error("No response generated from AI");
      }

      const content = response.data.candidates[0].content.parts[0].text;
      console.log("AI Response Content:", content);

      // Extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No valid JSON found in response");
      }

      const quizData = JSON.parse(jsonMatch[0]);
      console.log("Parsed Quiz Data:", quizData);

      if (!quizData.questions || !Array.isArray(quizData.questions)) {
        throw new Error("Invalid quiz data structure");
      }

      // Transform to match your existing quiz structure
      const transformedQuiz = quizData.questions.map((q, index) => ({
        id: `ai-${chapterId}-${index}-${Date.now()}`,
        question: q.question || `Question ${index + 1}`,
        options: q.options || ["Option A", "Option B", "Option C", "Option D"],
        correctAnswer: typeof q.correctAnswer === 'number' ? q.correctAnswer : 0,
        explanation: q.explanation || "No explanation provided."
      }));

      console.log("All Generated Questions:", transformedQuiz);

      // Store all generated questions
      setGeneratedQuestions(transformedQuiz);

      // Select 5 random questions to display
      const randomQuestions = getRandomQuestions(transformedQuiz, 5);
      setDisplayedQuestions(randomQuestions);

      console.log("Displaying 5 Random Questions:", randomQuestions);
      onQuizGenerated(randomQuestions);

    } catch (err) {
      console.error("Error generating quiz:", err);

      if (err.response) {
        // API error response
        setError(`API Error: ${err.response.data.error?.message || err.response.statusText}`);
      } else if (err.request) {
        // Network error
        setError("Network error: Unable to connect to AI service. Please check your internet connection.");
      } else {
        // Other errors
        setError(`Error: ${err.message}`);
      }

      // Fallback: Generate simple questions if API fails
      generateFallbackQuiz(description);
    } finally {
      setLoading(false);
    }
  };

  const generateFallbackQuiz = (description) => {
    if (!description) {
      setError("No description available for fallback quiz");
      return;
    }

    // Extract keywords from description for fallback questions
    const sentences = description.split('. ').filter(s => s.length > 10);
    const words = description.toLowerCase().split(' ').filter(word =>
      word.length > 4 && !['this', 'that', 'with', 'from', 'about', 'which', 'their', 'there', 'would', 'could'].includes(word)
    ).slice(0, 20);

    // Create a pool of 10 fallback questions
    const allQuestions = [
      {
        id: `ai-${chapterId}-1-${Date.now()}`,
        question: `What is the primary focus of this content based on the description?`,
        options: [
          sentences[0] || `Understanding ${words[0] || 'key'} concepts`,
          sentences[1] || `Learning ${words[1] || 'important'} techniques`,
          `Advanced ${words[2] || 'complex'} applications`,
          `Historical context of ${words[0] || 'the topic'}`
        ],
        correctAnswer: 0,
        explanation: "This question tests understanding of the main topic discussed in the content."
      },
      {
        id: `ai-${chapterId}-2-${Date.now()}`,
        question: `Which key concept is emphasized in this material?`,
        options: [
          words[3] || "Fundamental principles",
          words[4] || "Core methodologies",
          words[5] || "Advanced techniques",
          words[6] || "Practical applications"
        ],
        correctAnswer: 1,
        explanation: "This question identifies the central concept discussed in the material."
      },
      {
        id: `ai-${chapterId}-3-${Date.now()}`,
        question: `What is the main learning objective of this content?`,
        options: [
          `To master ${words[7] || "the subject"}`,
          `To understand ${words[8] || "basic concepts"}`,
          `To apply ${words[9] || "the techniques"}`,
          `To analyze ${words[10] || "complex scenarios"}`
        ],
        correctAnswer: 0,
        explanation: "This question focuses on the primary learning goal of the content."
      },
      {
        id: `ai-${chapterId}-4-${Date.now()}`,
        question: `Based on the description, what skill would you develop from this content?`,
        options: [
          `${words[11] || "Critical"} thinking`,
          `${words[12] || "Technical"} skills`,
          `${words[13] || "Problem-solving"} abilities`,
          `${words[14] || "Creative"} approaches`
        ],
        correctAnswer: 2,
        explanation: "This question relates to the practical skills gained from the content."
      },
      {
        id: `ai-${chapterId}-5-${Date.now()}`,
        question: `What aspect of ${words[15] || "the topic"} is covered in this material?`,
        options: [
          `Theoretical foundations`,
          `Practical implementations`,
          `Common challenges`,
          `Future developments`
        ],
        correctAnswer: 1,
        explanation: "This question explores the content focus area."
      },
      {
        id: `ai-${chapterId}-6-${Date.now()}`,
        question: `Which approach or method is discussed in this content?`,
        options: [
          words[16] || "Standard approaches",
          words[17] || "Modern methods",
          words[18] || "Traditional techniques",
          words[19] || "Innovative strategies"
        ],
        correctAnswer: 0,
        explanation: "This question identifies specific approaches or methods mentioned."
      },
      {
        id: `ai-${chapterId}-7-${Date.now()}`,
        question: `What problem does this content help solve?`,
        options: [
          `Understanding ${words[0] || "complex"} concepts`,
          `Implementing ${words[1] || "effective"} solutions`,
          `Avoiding common mistakes`,
          `All of the above`
        ],
        correctAnswer: 3,
        explanation: "This question addresses the practical benefits of the content."
      },
      {
        id: `ai-${chapterId}-8-${Date.now()}`,
        question: `What prerequisite knowledge is suggested by the content description?`,
        options: [
          `Basic ${words[2] || "fundamental"} concepts`,
          `Advanced technical skills`,
          `No prior knowledge needed`,
          `Industry-specific experience`
        ],
        correctAnswer: 0,
        explanation: "This question covers the expected background knowledge."
      },
      {
        id: `ai-${chapterId}-9-${Date.now()}`,
        question: `How does this content approach teaching ${words[3] || "the subject"}?`,
        options: [
          `Step-by-step tutorials`,
          `Theoretical explanations`,
          `Real-world examples`,
          `Interactive demonstrations`
        ],
        correctAnswer: 2,
        explanation: "This question examines the teaching methodology."
      },
      {
        id: `ai-${chapterId}-10-${Date.now()}`,
        question: `What is the expected outcome after engaging with this content?`,
        options: [
          `Comprehensive understanding`,
          `Basic familiarity`,
          `Expert-level mastery`,
          `Specialized certification`
        ],
        correctAnswer: 0,
        explanation: "This question defines the learning outcomes."
      }
    ];

    // Select 5 random questions from the fallback pool
    const randomQuestions = getRandomQuestions(allQuestions, 5);
    setGeneratedQuestions(allQuestions);
    setDisplayedQuestions(randomQuestions);

    console.log("Fallback Quiz (5 random):", randomQuestions);
    onQuizGenerated(randomQuestions);
  };

  return (
    <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-lg font-semibold text-orange-700 dark:text-orange-300 flex items-center gap-2">
          <Sparkles size={20} />
          AI-Generated Quiz
        </h4>
        <div className="flex gap-2">
          {generatedQuestions.length > 5 && (
            <button
              onClick={regenerateRandomQuestions}
              disabled={loading}
              className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2 text-sm"
            >
              Shuffle Questions
            </button>
          )}
          <button
            onClick={generateQuiz}
            disabled={loading || (!chapterDescription && !videoDescription)}
            className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition flex items-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Generating...
              </>
            ) : (
              "Generate Quiz"
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-sm mb-2">{error}</p>
      )}

      <p className="text-sm text-orange-600 dark:text-orange-400 mb-2">
        Get personalized quiz questions generated based on this content
        {displayedQuestions.length > 0 && ` • Showing 5 of ${generatedQuestions.length} questions`}
      </p>

      {/* {(chapterDescription || videoDescription) && (
        <div className="mt-2 p-2 bg-orange-100 dark:bg-orange-800/30 rounded text-xs">
          <p className="font-semibold">Using description:</p>
          <p className="truncate">
            {videoDescription
              ? `Video: ${videoDescription.substring(0, 100)}...`
              : `Chapter: ${chapterDescription.substring(0, 100)}...`
            }
          </p>
        </div>
      )} */}

      {/* Display success message when questions are generated */}
      {displayedQuestions.length > 0 && (
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-green-700 dark:text-green-300 text-sm font-medium">
            ✅ Successfully generated {displayedQuestions.length} quiz questions!
          </p>
          <p className="text-green-600 dark:text-green-400 text-xs mt-1">
            The questions are now available in the quiz section below.
          </p>
        </div>
      )}
    </div>
  );
};

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
      className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-200 font-mono ${isActive
        ? "bg-orange-100 text-orange-800 shadow"
        : `bg-white text-gray-700 hover:bg-gray-50 ${isDark ? "bg-zinc-800 text-white" : ""
        }`
        } border border-gray-200 mb-2 ${!isUnlocked ? "opacity-50 pointer-events-auto" : ""
        }`}
    >
      <div
        className={`p-2 rounded-full ${isActive ? "bg-white" : "bg-gray-100"}`}
      >
        {icon}
      </div>
      <div className="flex-1">
        <h4
          className={`font-medium ${isActive ? "text-orange-800" : "text-gray-800"
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
              className={`text-xs px-2 py-1 rounded-full ${difficulty === "Easy"
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

// Simple Quiz Display Component for AI Generated Questions
const AIQuizDisplay = ({ questions, onQuizComplete, onNextChapter }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizCompleted(true);
      onQuizComplete(score >= questions.length * 0.7); // 70% to pass
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setScore(0);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const passed = score >= questions.length * 0.7;
    return (
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-orange-200 dark:border-zinc-700">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${passed ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
            {passed ? '✓' : '✗'}
          </div>
          <h3 className="text-xl font-semibold mb-2">
            {passed ? 'Quiz Completed!' : 'Try Again'}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            You scored {score} out of {questions.length} questions correctly.
            {passed ? ' Congratulations!' : ' You need at least 70% to pass.'}
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestartQuiz}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
            >
              Restart Quiz
            </button>
            {passed && (
              <button
                onClick={onNextChapter}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
              >
                Next Chapter
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-orange-200 dark:border-zinc-700 text-center">
        <p className="text-gray-600 dark:text-gray-300">No questions available.</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl border border-orange-200 dark:border-zinc-700">
      <div className="flex justify-between items-center mb-4">
        <h4 className="text-lg font-semibold text-orange-600">AI Generated Quiz</h4>
        <span className="text-sm text-gray-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
          {currentQuestion.question}
        </h3>

        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !showExplanation && handleAnswerSelect(index)}
              disabled={showExplanation}
              className={`w-full text-left p-4 rounded-lg border transition-all ${selectedAnswer === index
                ? index === currentQuestion.correctAnswer
                  ? 'bg-green-100 border-green-500 text-green-800'
                  : 'bg-red-100 border-red-500 text-red-800'
                : showExplanation && index === currentQuestion.correctAnswer
                  ? 'bg-green-50 border-green-300 text-green-700'
                  : 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100'
                } ${!showExplanation ? 'cursor-pointer hover:border-orange-300' : 'cursor-default'
                }`}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 flex items-center justify-center rounded-full border border-gray-400 mr-3 text-sm">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800 mb-4">
          <p className="text-blue-800 dark:text-blue-200 text-sm">
            <strong>Explanation:</strong> {currentQuestion.explanation}
          </p>
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          Score: {score} / {questions.length}
        </span>
        <button
          onClick={handleNextQuestion}
          disabled={!showExplanation}
          className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
        </button>
      </div>
    </div>
  );
};

export default function CourseContent() {
  const { id } = useParams();
  const { Course: CourseList } = useContext(CourseContext);
  const Uemail = localStorage.getItem("userEmail");
  const Content = CourseList.find((course) => course.id === Number(id));
  const assignment = localStorage.getItem("assi");

  console.log("course", Content);

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
  const [coursePoints, setCoursePoints] = useState(0);
  const [pointsToAnimateTo, setPointsToAnimateTo] = useState(0);
  const [showVideoProgressModal, setShowVideoProgressModal] = useState(false);
  const [videoWatchedPercentage, setVideoWatchedPercentage] = useState(0);
  const [aiGeneratedQuiz, setAiGeneratedQuiz] = useState([]);
  const [showAIQuiz, setShowAIQuiz] = useState(false);
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
    setAnimatedPoints(savedPoints);
    setPointsToAnimateTo(savedPoints);
  }, []);

  useEffect(() => {
    if (selectedChapterId && Content) {
      const chapter = Content.chapters.find(
        (ch) => ch.id === selectedChapterId
      );
      const video = chapter?.videos?.[0]?.video;
      const video_desc = chapter?.videos?.[0]?.description;
      console.log("Selected Chapter Video URL:", video);
      console.log("Selected Chapter Video Description:", video_desc);
      setSelectedVideoUrl(
        video ? video.replace(/^http:/, "https:") : fallbackVideo
      );
      // Reset AI quiz when chapter changes
      setAiGeneratedQuiz([]);
      setShowAIQuiz(false);
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

    try {
      await axios.post(import.meta.env.VITE_STATUS_CREATE, payload);
      console.log("✅ Progress successfully updated");
    } catch (err) {
      console.error("❌ Error updating progress:", err?.response?.data || err.message);
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
      setShowAIQuiz(false);
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

  // Store video completion
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

  useEffect(() => {
    const watched = JSON.parse(localStorage.getItem(videoKey) || "[]");
    const chapter = Content?.chapters.find((ch) => ch.id === selectedChapterId);
    if (chapter && watched.includes(chapter.title)) {
      setVideoWatchedPercentage(100);
    } else {
      setVideoWatchedPercentage(0);
    }
  }, [selectedChapterId, Content, videoKey]);

  const addCoursePoints = (pointsToAdd = 100) => {
    const existing = parseInt(localStorage.getItem("CoursePoints") || "0", 10);
    const updated = existing + pointsToAdd;
    localStorage.setItem("CoursePoints", updated);
    setCoursePoints(updated);
    setPointsToAnimateTo(updated);
    return updated;
  };

  const handleQuizTabClick = () => {
    if (videoWatchedPercentage >= 90) {
      setActiveTab("quiz");
    } else {
      setShowVideoProgressModal(true);
    }
  };

  const handleAiQuizGenerated = (quizData) => {
    console.log("AI Quiz Data Received:", quizData);
    setAiGeneratedQuiz(quizData);
    setShowAIQuiz(true);
  };

  const handleAIQuizComplete = (isCorrect) => {
    if (isCorrect) {
      const chapterTitle = selectedChapter?.title;
      if (!quizPassedChapters.includes(chapterTitle)) {
        setQuizPassedChapters([
          ...quizPassedChapters,
          chapterTitle,
        ]);
      }
      addCoursePoints(100);
    }
  };

  const selectedChapter = Content?.chapters.find(
    (ch) => ch.id === selectedChapterId
  );
  const currentQuiz = selectedChapter?.quizzes || [];
  // Combine predefined quizzes with AI generated ones
  const allQuizzes = [...currentQuiz, ...aiGeneratedQuiz];
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
                  className={`pb-2 border-b-2 transition-colors ${activeTab === "description"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-orange-500"
                    }`}
                  onClick={() => setActiveTab("description")}
                >
                  Description
                </button>
                <button
                  className={`pb-2 border-b-2 transition-colors ${activeTab === "quiz"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-orange-500"
                    }`}
                  onClick={handleQuizTabClick}
                >
                  Quiz
                </button>
                <button
                  className={`pb-2 border-b-2 transition-colors ${activeTab === "assignment"
                    ? "border-orange-500 text-orange-600"
                    : "border-transparent text-gray-500 hover:text-orange-500"
                    }`}
                  onClick={() => setActiveTab("assignment")}
                >
                  Assignment
                </button>
                <button
                  className={`pb-2 border-b-2 transition-colors ${activeTab === "note"
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
                    "no description available for this chapter."}
                </p>
              </div>
            )}

            {activeTab === "quiz" && (
              <div className="mt-4 p-4 border border-orange-300 dark:border-zinc-700 rounded-xl">
                {/* AI Quiz Generator */}
                <AIQuizGenerator
                  chapterDescription={selectedChapter?.description}
                  videoDescription={selectedChapter?.videos?.[0]?.description}
                  onQuizGenerated={handleAiQuizGenerated}
                  chapterId={selectedChapterId}
                />

                {/* Quiz Display Section */}
                <div className="mt-6">
                  {/* <h3 className="text-lg font-semibold text-orange-600 mb-4 flex items-center gap-2">
                    <Sparkles size={20} />
                    Chapter Quiz
                  </h3> */}

                  {showAIQuiz && aiGeneratedQuiz.length > 0 ? (
                    <div className="space-y-6">
                      {/* Info about quiz sources */}
                      {/* <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <p className="text-blue-700 dark:text-blue-300 text-sm">
                          🤖 This quiz contains {aiGeneratedQuiz.length} AI-generated questions based on the chapter content
                        </p>
                      </div> */}

                      {/* Render the AI Quiz Display Component */}
                      <AIQuizDisplay
                        questions={aiGeneratedQuiz}
                        onQuizComplete={handleAIQuizComplete}
                        onNextChapter={handleNextChapter}
                      />
                    </div>
                  ) : allQuizzes.length > 0 ? (
                    <div className="space-y-4">
                      {/* Info about quiz sources */}
                      {/* <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800"> */}
                        {/* <p className="text-blue-700 dark:text-blue-300 text-sm">
                          {aiGeneratedQuiz.length > 0 && currentQuiz.length > 0
                            ? `📚 This quiz contains ${currentQuiz.length} predefined questions and ${aiGeneratedQuiz.length} AI-generated questions`
                            : aiGeneratedQuiz.length > 0
                              ? `🤖 This quiz contains ${aiGeneratedQuiz.length} AI-generated questions`
                              : `📖 This quiz contains ${currentQuiz.length} predefined questions`
                          }
                        </p> */}
                      {/* </div> */}

                      {/* Render the original Quizzes component for predefined quizzes */}
                      <Quizzes
                        chapterId={selectedChapterId}
                        quizData={allQuizzes}
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
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Sparkles size={48} className="mx-auto text-orange-400 mb-4" />
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                        No quiz available for this chapter.
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Click "Generate Quiz" above to create AI-powered questions based on this chapter's content.
                      </p>
                    </div>
                  )}
                </div>
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
                          setShowAIQuiz(false);
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