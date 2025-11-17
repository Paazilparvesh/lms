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
// import React, { useState, useEffect, useContext } from "react";
// import challengeQuestions from "./Questions";
// import { ChallengeContext } from "/src/App";

// export default function Challenge({ onComplete }) {
//   const { challengeName, setChallengeName, setChallengeScore } =
//     useContext(ChallengeContext);

//   const [inputName, setInputName] = useState(challengeName || "");
//   const [showStart, setShowStart] = useState(true);
//   const [questions, setQuestions] = useState([]);
//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [score, setScore] = useState(0);
//   const [completed, setCompleted] = useState(false);

//   const initializeQuestions = () => {
//     const shuffled = [...challengeQuestions].sort(() => 0.5 - Math.random());
//     setQuestions(shuffled.slice(0, 10));
//   };

//   const handleStartChallenge = () => {
//     if (inputName.trim().length < 2) {
//       alert("Please enter a valid name");
//       return;
//     }
//     localStorage.setItem("challengeName", inputName.trim());
//     setChallengeName(inputName.trim());
//     initializeQuestions();
//     setShowStart(false);
//   };

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
//       setChallengeScore(score);
//     }
//   };

//   const resetChallenge = () => {
//     setCurrent(0);
//     setSelected(null);
//     setScore(0);
//     setCompleted(false);
//     initializeQuestions();
//     setShowStart(true);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-orange-50 font-mono px-4 py-10">
//       <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-2xl w-full text-center">
//         {/* Show Start Screen */}
//         {showStart ? (
//           <>
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-600">
//               🔥 Enter your name and start the challenge!
//             </h2>
//             <input
//               type="text"
//               value={inputName}
//               onChange={(e) => setInputName(e.target.value)}
//               placeholder="Your Name"
//               className="border px-4 py-2 rounded-md w-full mb-4 text-center"
//             />
//             <button
//               onClick={handleStartChallenge}
//               className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold"
//             >
//               Start Your Challenge
//             </button>
//           </>
//         ) : !completed ? (
//           <>
//             <h2 className="text-xl sm:text-2xl font-bold mb-4 text-orange-600">
//               🔥 {inputName}, Question {current + 1} / 10
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
//               🎉 Well Done, {inputName}!
//             </h2>
//             <p className="text-lg mb-6 text-gray-700">
//               You scored <span className="font-bold">{score}</span> XP out of 100
//             </p>
//             <button
//               onClick={() => onComplete?.(score)}
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
import AceEditor from "react-ace";
import codingQuestions from "/src/Dashboard/Student/CodingQuestion.js";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";
import { ChallengeContext } from "/src/App"; // adjust path if needed

// Utility deep-equality via JSON stringify (sufficient for test objects/primitives/arrays)
const deepEqual = (a, b) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
};

export default function CodingChallenge({ onComplete }) {
  const { challengeName, setChallengeName, setChallengeScore } =
    useContext(ChallengeContext);

  // UI state
  const [inputName, setInputName] = useState(challengeName || "");
  const [showStart, setShowStart] = useState(true);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [code, setCode] = useState("");
  const [outputLog, setOutputLog] = useState([]);
  const [lastRunPassed, setLastRunPassed] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const question = codingQuestions[questionIndex];

  useEffect(() => {
    // set editor template on question change
    setCode(question.template + `\n\n// You can run tests using Run button.`);
    setOutputLog([]);
    setLastRunPassed(false);
  }, [questionIndex]);

  const handleStart = () => {
    if (!inputName || inputName.trim().length < 2) {
      alert("Please enter a valid name (min 2 chars).");
      return;
    }
    const trimmed = inputName.trim();
    localStorage.setItem("challengeName", trimmed);
    setChallengeName?.(trimmed);
    setShowStart(false);
  };

  // Execute user code and run tests
  const runTests = () => {
    const fnName = question.functionName;
    const tests = question.tests || [];
    const results = [];
    let passedCount = 0;

    try {
      // Wrap user's code and extract the function by name
      // We return the function reference so we can call it.
      const wrapper = new Function(`${code}\nreturn typeof ${fnName} !== 'undefined' ? ${fnName} : null;`);
      const userFn = wrapper();

      if (typeof userFn !== "function") {
        setOutputLog([
          {
            type: "error",
            message: `Function "${fnName}" not found. Make sure you implement and export a function named "${fnName}".`
          }
        ]);
        setLastRunPassed(false);
        return;
      }

      // Run each test
      for (let i = 0; i < tests.length; i++) {
        const t = tests[i];
        let actual;
        let passed = false;
        try {
          // call the user's function with spread inputs
          actual = userFn.apply(null, t.input);
          passed = deepEqual(actual, t.expected);
        } catch (err) {
          actual = { error: err.message || String(err) };
          passed = false;
        }

        if (passed) passedCount++;

        results.push({
          index: i + 1,
          input: t.input,
          expected: t.expected,
          actual,
          passed
        });
      }

      // Score: percentage of passed tests
      const sc = Math.round((passedCount / tests.length) * 100);
      setScore(sc);
      setChallengeScore?.(sc);
      setOutputLog(results);
      setLastRunPassed(passedCount === tests.length);

    } catch (err) {
      setOutputLog([{ type: "error", message: `Execution Error: ${err.message}` }]);
      setLastRunPassed(false);
    }
  };

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => {
      const next = prev + 1;
      if (next >= codingQuestions.length) {
        // finished all questions
        setCompleted(true);
        setShowStart(false);
        setChallengeScore?.(score); // final score recorded
      }
      return Math.min(next, codingQuestions.length - 1);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTryAgain = () => {
    setCode(question.template);
    setOutputLog([]);
    setLastRunPassed(false);
    setScore(0);
  };

  const handleFinish = () => {
    setCompleted(true);
    setChallengeScore?.(score);
    onComplete?.(score);
  };

  // Small helpers for rendering
  const renderResultRow = (r) => {
    if (r.type === "error") {
      return <div className="text-red-600 font-medium">{r.message}</div>;
    }
    return (
      <div
        key={r.index}
        className={`p-3 rounded border ${
          r.passed ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
        }`}
      >
        <div className="flex justify-between items-start">
          <div className="text-sm font-semibold">{`Test ${r.index} — ${
            r.passed ? "Passed" : "Failed"
          }`}</div>
          <div className="text-xs text-gray-600">{r.passed ? "✔" : "✖"}</div>
        </div>
        <div className="mt-2 text-sm">
          <div>
            <span className="font-medium">Input: </span>
            <span>{JSON.stringify(r.input)}</span>
          </div>
          <div>
            <span className="font-medium">Expected: </span>
            <span>{JSON.stringify(r.expected)}</span>
          </div>
          <div>
            <span className="font-medium">Actual: </span>
            <span>{JSON.stringify(r.actual)}</span>
          </div>
        </div>
      </div>
    );
  };

  // Layout: left = question, right = editor
  return (
    <div className="min-h-screen flex items-start justify-center bg-orange-50 font-mono px-4 py-8">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-6xl w-full">
        {showStart ? (
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-orange-600">
              🔥 Enter your name and start the coding challenge
            </h2>
            <input
              type="text"
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
              placeholder="Your Name"
              className="border px-4 py-2 rounded-md w-full max-w-md mb-4 text-center"
            />
            <div className="flex justify-center gap-4">
              <button
                onClick={handleStart}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full font-semibold"
              >
                Start
              </button>
            </div>
          </div>
        ) : completed ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4 text-orange-600">
              🎉 Well Done, {inputName}!
            </h2>
            <p className="text-lg mb-4 text-gray-700">Final Score: <span className="font-bold">{score}</span>%</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => onComplete?.(score)}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full"
              >
                Go to Leaderboard
              </button>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left: question panel */}
            <div className="p-4 border rounded-lg h-full">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-orange-600">{question.title}</h3>
                  <p className="text-sm text-gray-600 mt-2">{question.description}</p>
                </div>

                <div className="text-right">
                  <div className="text-xs text-gray-500">Question</div>
                  <div className="text-lg font-semibold">{questionIndex + 1} / {codingQuestions.length}</div>
                </div>
              </div>

              <div className="mt-4">
                <div className="text-sm text-gray-700 mb-2 font-medium">Function to implement:</div>
                <div className="bg-gray-100 p-3 rounded text-sm font-mono">function {question.functionName}(...){`{ /* ... */ }`}</div>
              </div>

              <div className="mt-4">
                <div className="text-sm font-medium mb-2">Tests</div>
                <div className="space-y-2">
                  {question.tests.map((t, i) => (
                    <div key={i} className="text-xs text-gray-700">
                      <span className="font-medium">Test {i + 1}:</span> input: {JSON.stringify(t.input)} — expected: {JSON.stringify(t.expected)}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5">
                <div className="flex items-center gap-3">
                  <button
                    onClick={runTests}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded"
                  >
                    Run
                  </button>

                  <button
                    onClick={() => {
                      if (lastRunPassed) {
                        // award full points for this question and move next or finish
                        setChallengeScore?.(100);
                        if (questionIndex < codingQuestions.length - 1) {
                          handleNextQuestion();
                        } else {
                          handleFinish();
                        }
                      } else {
                        alert("You need to pass all tests before submitting this question. Run tests and make sure they pass.");
                      }
                    }}
                    className="border border-orange-400 text-orange-600 px-4 py-2 rounded hover:bg-orange-50"
                  >
                    Submit Question
                  </button>

                  <button
                    onClick={handleTryAgain}
                    className="border text-gray-700 px-4 py-2 rounded hover:bg-gray-50"
                  >
                    Reset Editor
                  </button>
                </div>
              </div>

              <div className="mt-5">
                <div className="text-sm font-medium mb-2">Result</div>
                <div className="space-y-2">
                  {outputLog.length === 0 ? (
                    <div className="text-sm text-gray-500">No runs yet. Click <b>Run</b>.</div>
                  ) : (
                    outputLog.map((r, idx) => <div key={idx}>{renderResultRow(r)}</div>)
                  )}
                </div>
              </div>

              <div className="mt-4 text-sm text-gray-600">
                <div>Current score (this question): <span className="font-semibold">{score}%</span></div>
                <div className="mt-1 text-xs text-gray-500">Pass all tests to submit and move to next question.</div>
              </div>
            </div>

            {/* Right: code editor */}
            <div className="p-4 border rounded-lg h-full flex flex-col">
              <div className="flex items-center justify-between mb-2">
                <div className="text-sm font-medium">Code Editor</div>
                <div className="text-xs text-gray-500">Language: JavaScript</div>
              </div>

              <div className="flex-1">
                <AceEditor
                  mode="javascript"
                  theme="github"
                  name="coding_challenge_editor"
                  value={code}
                  onChange={(val) => setCode(val)}
                  width="100%"
                  height="420px"
                  fontSize={14}
                  showPrintMargin={false}
                  setOptions={{
                    enableBasicAutocompletion: true,
                    enableLiveAutocompletion: true,
                    enableSnippets: true,
                    showLineNumbers: true,
                    tabSize: 2
                  }}
                />
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div className="text-sm text-gray-600">Tip: implement the named function and click Run.</div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setOutputLog([]);
                      setCode(question.template);
                    }}
                    className="text-xs border px-3 py-1 rounded"
                  >
                    Load Template
                  </button>
                  <button
                    onClick={() => {
                      // open sample solution (non-destructive)
                      const sample = generateSampleSolution(question.functionName);
                      setCode((cur) => cur + "\n\n// Sample solution (view only)\n" + sample);
                    }}
                    className="text-xs border px-3 py-1 rounded"
                  >
                    Show Hint
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// Simple sample solutions generator for "Show Hint" (non-exhaustive)
function generateSampleSolution(fnName) {
  const map = {
    add: `function add(a, b) {\n  return a + b;\n}`,
    reverseStr: `function reverseStr(s) {\n  return s.split('').reverse().join('');\n}`,
    unique: `function unique(arr) {\n  const seen = new Set();\n  const out = [];\n  for (const v of arr) {\n    if (!seen.has(v)) { seen.add(v); out.push(v); }\n  }\n  return out;\n}`,
    fizzBuzz: `function fizzBuzz(n) {\n  const out = [];\n  for (let i = 1; i <= n; i++) {\n    if (i % 15 === 0) out.push('FizzBuzz');\n    else if (i % 3 === 0) out.push('Fizz');\n    else if (i % 5 === 0) out.push('Buzz');\n    else out.push(i);\n  }\n  return out;\n}`
  };

  return map[fnName] || `// No sample available for ${fnName}\nfunction ${fnName}() {\n  // implement\n}`;
}
