// import React, { useState, useEffect } from "react";
// import challengeQuestions from "./Questions";

// export default function Challenge({ onComplete }) {
//   const [name, setName] = useState(localStorage.getItem("challengeName") || "");
//   const [inputName, setInputName] = useState("");
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [completed, setCompleted] = useState(false);

//   useEffect(() => {
//     if (name) {
//       const shuffled = [...challengeQuestions].sort(() => 0.5 - Math.random());
//       setQuestions(shuffled.slice(0, 10));
//     }
//   }, [name]);

//   const handleAnswer = (index) => {
//     setSelected(index);
//     if (index === questions[current].answer) {
//       setScore((prev) => prev + 10);
//     }
//   };

//   const nextQuestion = () => {
//     if (current < 9) {
//       setCurrent((prev) => prev + 1);
//       setSelected(null);
//     } else {
//       setCompleted(true);
//     }
//   };

//   const handleStart = () => {
//     if (inputName.trim().length < 2) {
//       alert("Please enter a valid name");
//       return;
//     }
//     localStorage.setItem("challengeName", inputName.trim());
//     setName(inputName.trim());
//   };

//   const resetChallenge = () => {
//     setCurrent(0);
//     setSelected(null);
//     setScore(0);
//     setCompleted(false);
//     const shuffled = [...challengeQuestions].sort(() => 0.5 - Math.random());
//     setQuestions(shuffled.slice(0, 10));
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50 font-mono px-4 py-10">
//       <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-2xl w-full text-center">
//         {/* Name Prompt */}
//         {!name ? (
//           <>
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-600">
//               🔥 Enter your name to start the challenge
//             </h2>
//             <input
//               type="text"
//               value={inputName}
//               onChange={(e) => setInputName(e.target.value)}
//               placeholder="Your Name"
//               className="border px-4 py-2 rounded-md w-full mb-4 text-center"
//             />
//             <button
//               onClick={handleStart}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold"
//             >
//               Start Challenge
//             </button>
//           </>
//         ) : !completed ? (
//           <>
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-600">
//               🔥 {name}, Question {current + 1} / 10
//             </h2>
//             <p className="mb-4 font-semibold text-gray-800">
//               {questions[current]?.question}
//             </p>
//             <div className="grid gap-3 mb-6">
//               {questions[current]?.options.map((opt, idx) => (
//                 <button
//                   key={idx}
//                   onClick={() => handleAnswer(idx)}
//                   disabled={selected !== null}
//                   className={`border px-4 py-2 rounded-md transition-all duration-200 ${
//                     selected === idx
//                       ? idx === questions[current].answer
//                         ? "bg-green-100 border-green-500 text-green-700"
//                         : "bg-red-100 border-red-500 text-red-700"
//                       : "hover:bg-orange-50"
//                   }`}
//                 >
//                   {opt}
//                 </button>
//               ))}
//             </div>
//             {selected !== null && (
//               <button
//                 onClick={nextQuestion}
//                 className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
//               >
//                 {current < 9 ? "Next" : "Finish"}
//               </button>
//             )}
//           </>
//         ) : (
//           <>
//             <h2 className="text-2xl font-bold mb-4 text-orange-600">
//               🎉 Well Done, {name}!
//             </h2>
//             <p className="text-lg mb-6 text-gray-700">
//               You scored <span className="font-bold">{score}</span> XP out of 100
//             </p>
//             <button
//               onClick={() => {
//                 onComplete?.(score);
//               }}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full mr-4"
//             >
//               Go to Leaderboard
//             </button>
//             <button
//               onClick={resetChallenge}
//               className="border border-orange-400 text-orange-600 px-6 py-2 rounded-full hover:bg-orange-50"
//             >
//               Try Again
//             </button>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }
import React, { useState, useEffect, useContext } from "react";
import challengeQuestions from "./Questions";
import { ChallengeContext } from "/src/App";

export default function Challenge({ onComplete }) {
  const { challengeName, setChallengeName, setChallengeScore } =
    useContext(ChallengeContext);

  const [inputName, setInputName] = useState(challengeName || "");
  const [showStart, setShowStart] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const initializeQuestions = () => {
    const shuffled = [...challengeQuestions].sort(() => 0.5 - Math.random());
    setQuestions(shuffled.slice(0, 10));
  };

  const handleStartChallenge = () => {
    if (inputName.trim().length < 2) {
      alert("Please enter a valid name");
      return;
    }
    localStorage.setItem("challengeName", inputName.trim());
    setChallengeName(inputName.trim());
    initializeQuestions();
    setShowStart(false);
  };

  const handleAnswer = (index) => {
    setSelected(index);
    if (index === questions[current].answer) {
      setScore((prev) => prev + 10);
    }
  };

  const nextQuestion = () => {
    if (current < 9) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
    } else {
      setCompleted(true);
      setChallengeScore(score);
    }
  };

  const resetChallenge = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setCompleted(false);
    initializeQuestions();
    setShowStart(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-orange-50 font-mono px-4 py-10">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-2xl w-full text-center">
        {/* Show Start Screen */}
        {showStart ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-600">
              🔥 Enter your name and start the challenge!
            </h2>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Your Name"
              className="border px-4 py-2 rounded-md w-full mb-4 text-center"
            />
            <button
              onClick={handleStartChallenge}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold"
            >
              Start Your Challenge
            </button>
          </>
        ) : !completed ? (
          <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-600">
              🔥 {inputName}, Question {current + 1} / 10
            </h2>
            <p className="mb-4 font-semibold text-gray-800">
              {questions[current]?.question}
            </p>
            <div className="grid gap-3 mb-6">
              {questions[current]?.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  disabled={selected !== null}
                  className={`border px-4 py-2 rounded-md transition-all duration-200 ${
                    selected === idx
                      ? idx === questions[current].answer
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "bg-red-100 border-red-500 text-red-700"
                      : "hover:bg-orange-50"
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
            {selected !== null && (
              <button
                onClick={nextQuestion}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
              >
                {current < 9 ? "Next" : "Finish"}
              </button>
            )}
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4 text-orange-600">
              🎉 Well Done, {inputName}!
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              You scored <span className="font-bold">{score}</span> XP out of 100
            </p>
            <button
              onClick={() => onComplete?.(score)}
              className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full mr-4"
            >
              Go to Leaderboard
            </button>
            <button
              onClick={resetChallenge}
              className="border border-orange-400 text-orange-600 px-6 py-2 rounded-full hover:bg-orange-50"
            >
              Try Again
            </button>
          </>
        )}
      </div>
    </div>
  );
}
