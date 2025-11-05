// import axios from "axios";
// import { useEffect, useState } from "react";

// function AddQuiz({ onSuccess }) {
//   const [courses, setCourses] = useState([]);
//   const [selectedCourseId, setSelectedCourseId] = useState("");
//   const [selectedChapterId, setSelectedChapterId] = useState("");
//   const [chapters, setChapters] = useState([]);

//   const [showCreateForm, setShowCreateForm] = useState(false);
//   const [quizzes, setQuizzes] = useState([]);

//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", "", "", ""]);
//   const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

//   const [modalVisible, setModalVisible] = useState(false);
//   const [confirmationVisible, setConfirmationVisible] = useState(false);
//   const [modalMessage, setModalMessage] = useState("");

//   const token = btoa("admin:admin@123456");

//   useEffect(() => {
//     axios
//       .get(import.meta.env.VITE_Course_name, {
//         headers: { Authorization: `Basic ${token}` },
//       })
//       .then((res) => {
//         if (Array.isArray(res.data)) {
//           setCourses(res.data);
//         } else {
//           console.error("Expected array, received:", res.data);
//           setCourses([]);
//         }
//       })
//       .catch((err) => {
//         console.error("Fetch error:", err);
//         setCourses([]);
//       });
//   }, []);

//   useEffect(() => {
//     const course = courses.find((c) => c.id == selectedCourseId);
//     setChapters(course?.chapters || []);
//     setSelectedChapterId("");
//     setShowCreateForm(false);
//     setQuizzes([]);
//   }, [selectedCourseId, courses]);

//   useEffect(() => {
//     if (selectedChapterId) {
//       const course = courses.find((c) => c.id == selectedCourseId);
//       const chapter = course?.chapters.find((ch) => ch.id == selectedChapterId);
//       setQuizzes(chapter?.quizzes || []);
//     } else {
//       setQuizzes([]);
//     }
//   }, [selectedChapterId, courses, selectedCourseId]);

//   const handleCreateQuiz = () => {
//     if (!question || options.some((opt) => !opt) || correctAnswerIndex === null) {
//       showModal("Please fill all fields and select the correct answer.");
//       return;
//     }

//     axios
//       .post(import.meta.env.VITE_QUIZ, {
//         question: question,
//         option1: options[0],
//         option2: options[1],
//         option3: options[2],
//         option4: options[3],
//         correct_option: correctAnswerIndex + 1,
//         chapter: selectedChapterId,
//       })
//       .then(() => {
//         setConfirmationVisible(true);
//       })
//       .catch(() => showModal("Failed to create quiz."));
//   };

//   const showModal = (message) => {
//     setModalMessage(message);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//   };

//   const handleConfirmNext = () => {
//     setConfirmationVisible(false);
//     setQuestion("");
//     setOptions(["", "", "", ""]);
//     setCorrectAnswerIndex(null);
//   };

//   const handleCancelNext = () => {
//     setConfirmationVisible(false);
//     if (onSuccess) onSuccess();
//   };

//   const handleAddAnotherChapter = () => {
//     if (onSuccess) {
//       onSuccess(); // 🔥 Move to Step 2 (AddChapter)
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md max-w-screen-xl mx-auto">
//       {modalVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-11/12 max-w-sm">
//             <h2 className="text-xl font-semibold text-green-700">Notification</h2>
//             <p className="text-gray-700">{modalMessage}</p>
//             <button
//               onClick={closeModal}
//               className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {confirmationVisible && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-11/12 max-w-sm">
//             <h2 className="text-xl font-semibold text-blue-700">Quiz Added!</h2>
//             <p className="text-gray-700">Are you willing to add another quiz?</p>
//             <div className="flex gap-4 justify-center">
//               <button
//                 onClick={handleConfirmNext}
//                 className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
//               >
//                 Yes
//               </button>
//               <button
//                 onClick={handleCancelNext}
//                 className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <h1 className="text-2xl font-bold mb-6 text-center">Quiz Manager</h1>

//       <div className="mb-4">
//         <label className="block font-medium mb-1">Select Course</label>
//         <select
//           className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//           value={selectedCourseId}
//           onChange={(e) => setSelectedCourseId(e.target.value)}
//         >
//           <option value="">-- Select Course --</option>
//           {courses.map((course) => (
//             <option key={course.id} value={course.id}>
//               {course.name}
//             </option>
//           ))}
//         </select>
//       </div>

//       {chapters.length > 0 && (
//         <div className="mb-6">
//           <label className="block font-medium mb-1">Select Chapter</label>
//           <select
//             className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//             value={selectedChapterId}
//             onChange={(e) => setSelectedChapterId(e.target.value)}
//           >
//             <option value="">-- Select Chapter --</option>
//             {chapters.map((ch) => (
//               <option key={ch.id} value={ch.id}>
//                 {ch.title}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {selectedChapterId && (
//         <div className="flex flex-col sm:flex-row gap-4 mb-6">
//           <button
//             onClick={() => setShowCreateForm(true)}
//             className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
//           >
//             Create Quiz
//           </button>
//         </div>
//       )}

//       {showCreateForm && (
//         <div className="space-y-4 border-t pt-6">
//           <h2 className="text-xl font-semibold mb-2">Create New Quiz</h2>
//           <div>
//             <label className="block font-medium mb-1">Question</label>
//             <input
//               type="text"
//               className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               value={question}
//               onChange={(e) => setQuestion(e.target.value)}
//             />
//           </div>

//           {options.map((opt, index) => (
//             <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
//               <input
//                 type="checkbox"
//                 checked={correctAnswerIndex === index}
//                 onChange={() => setCorrectAnswerIndex(index)}
//               />
//               <input
//                 type="text"
//                 placeholder={`Option ${index + 1}`}
//                 value={opt}
//                 onChange={(e) => {
//                   const newOpts = [...options];
//                   newOpts[index] = e.target.value;
//                   setOptions(newOpts);
//                 }}
//                 className="flex-grow border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//             </div>
//           ))}

//           <button
//             onClick={handleCreateQuiz}
//             className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-4 w-full sm:w-auto"
//           >
//             Save Quiz
//           </button>
//         </div>
//       )}

//       {selectedChapterId && (
//         <div className="mt-6 border-t pt-6">
//           <h2 className="text-xl font-semibold mb-4">Existing Quizzes</h2>
//           {quizzes.length > 0 ? (
//             <ul className="space-y-4">
//               {quizzes.map((q, idx) => (
//                 <li key={idx} className="bg-gray-100 p-4 rounded shadow-sm">
//                   <p className="font-medium">{q.question_text}</p>
//                   <ul className="ml-4 mt-2 list-disc text-sm">
//                     {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
//                       <li key={i} className={q.correct_options === i + 1 ? "font-bold text-green-600" : ""}>
//                         {opt}
//                       </li>
//                     ))}
//                   </ul>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p className="text-gray-500">No quizzes found for this chapter.</p>
//           )}
//         </div>
//       )}

//       {selectedChapterId && (
//         <div className="mt-6 text-center">
//           <button
//             onClick={handleAddAnotherChapter}
//             className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
//           >
//             + Add Another Chapter
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AddQuiz;












import axios from "axios";
import { useEffect, useState } from "react";

function AddQuiz({ onSuccess, goToChapterStep }) {
  const [courses, setCourses] = useState([]);
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedChapterId, setSelectedChapterId] = useState("");
  const [chapters, setChapters] = useState([]);

  const [showCreateForm, setShowCreateForm] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswerIndex, setCorrectAnswerIndex] = useState(null);

  const [modalVisible, setModalVisible] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [chapterConfirmationVisible, setChapterConfirmationVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const token = btoa("admin:admin@123");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_Course_name, {
        headers: { Authorization: `Basic ${token}` },
      })
      .then((res) => {
        if (Array.isArray(res.data)) {
          setCourses(res.data);
        } else {
          console.error("Expected array, received:", res.data);
          setCourses([]);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCourses([]);
      });
  }, []);

  useEffect(() => {
    const course = courses.find((c) => c.id == selectedCourseId);
    setChapters(course?.chapters || []);
    setSelectedChapterId("");
    setShowCreateForm(false);
    setQuizzes([]);
  }, [selectedCourseId, courses]);

  useEffect(() => {
    if (selectedChapterId) {
      const course = courses.find((c) => c.id == selectedCourseId);
      const chapter = course?.chapters.find((ch) => ch.id == selectedChapterId);
      setQuizzes(chapter?.quizzes || []);
    } else {
      setQuizzes([]);
    }
  }, [selectedChapterId, courses, selectedCourseId]);

  const handleCreateQuiz = () => {
    if (!question || options.some((opt) => !opt) || correctAnswerIndex === null) {
      showModal("Please fill all fields and select the correct answer.");
      return;
    }

    axios
      .post(import.meta.env.VITE_QUIZ, {
        question: question,
        option1: options[0],
        option2: options[1],
        option3: options[2],
        option4: options[3],
        correct_option: correctAnswerIndex + 1,
        chapter: selectedChapterId,
      })
      .then(() => {
        setConfirmationVisible(true);
      })
      .catch(() => showModal("Failed to create quiz."));
  };

  const showModal = (message) => {
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleConfirmNext = () => {
    setConfirmationVisible(false);
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswerIndex(null);
  };

  const handleCancelNext = () => {
    setConfirmationVisible(false);
    setChapterConfirmationVisible(true); // 👈 Ask for another chapter
  };

  const handleAddAnotherChapterYes = () => {
    setChapterConfirmationVisible(false);
    if (goToChapterStep) goToChapterStep(); // 👈 Move to Step 2
  };

  const handleAddAnotherChapterNo = () => {
    setChapterConfirmationVisible(false);
    if (onSuccess) onSuccess(); // 👈 Fully close modal
  };

  return (
    <div className="p-4 sm:p-6 bg-white rounded-lg shadow-md max-w-screen-xl mx-auto">
      {/* Error Modal */}
      {modalVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-11/12 max-w-sm">
            <h2 className="text-xl font-semibold text-green-700">Notification</h2>
            <p className="text-gray-700">{modalMessage}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition w-full"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Quiz Added Modal */}
      {confirmationVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-11/12 max-w-sm">
            <h2 className="text-xl font-semibold text-blue-700">Quiz Added!</h2>
            <p className="text-gray-700">Do you want to add another quiz?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleConfirmNext}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Yes
              </button>
              <button
                onClick={handleCancelNext}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Another Chapter Confirmation */}
      {chapterConfirmationVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4 w-11/12 max-w-sm">
            <h2 className="text-xl font-semibold text-purple-700">Add Another Chapter?</h2>
            <p className="text-gray-700">Do you want to create a new chapter?</p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={handleAddAnotherChapterYes}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
              >
                Yes
              </button>
              <button
                onClick={handleAddAnotherChapterNo}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      <h1 className="text-2xl font-bold mb-6 text-center">Quiz Manager</h1>

      {/* Course Select */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Select Course</label>
        <select
          className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedCourseId}
          onChange={(e) => setSelectedCourseId(e.target.value)}
        >
          <option value="">-- Select Course --</option>
          {courses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.name}
            </option>
          ))}
        </select>
      </div>

      {/* Chapter Select */}
      {chapters.length > 0 && (
        <div className="mb-6">
          <label className="block font-medium mb-1">Select Chapter</label>
          <select
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={selectedChapterId}
            onChange={(e) => setSelectedChapterId(e.target.value)}
          >
            <option value="">-- Select Chapter --</option>
            {chapters.map((ch) => (
              <option key={ch.id} value={ch.id}>
                {ch.title}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Create Quiz Button */}
      {selectedChapterId && (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <button
            onClick={() => setShowCreateForm(true)}
            className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Create Quiz
          </button>
        </div>
      )}

      {/* Quiz Form */}
      {showCreateForm && (
        <div className="space-y-4 border-t pt-6">
          <h2 className="text-xl font-semibold mb-2">Create New Quiz</h2>
          <div>
            <label className="block font-medium mb-1">Question</label>
            <input
              type="text"
              className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </div>

          {options.map((opt, index) => (
            <div key={index} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <input
                type="checkbox"
                checked={correctAnswerIndex === index}
                onChange={() => setCorrectAnswerIndex(index)}
              />
              <input
                type="text"
                placeholder={`Option ${index + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOpts = [...options];
                  newOpts[index] = e.target.value;
                  setOptions(newOpts);
                }}
                className="flex-grow border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}

          <button
            onClick={handleCreateQuiz}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 mt-4 w-full sm:w-auto"
          >
            Save Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default AddQuiz;
