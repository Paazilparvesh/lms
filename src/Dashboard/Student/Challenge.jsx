import React, { useState, useEffect, useContext } from "react";
import AceEditor from "react-ace";
import { ChallengeContext } from "/src/App";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools";

const API_URL = import.meta.env.VITE_GEMINIAI_API_KEY;
const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Utility functions
const deepEqual = (a, b) => {
  try {
    return JSON.stringify(a) === JSON.stringify(b);
  } catch {
    return false;
  }
};

const safeExecutePython = (code, functionName, inputs) => {
  try {
    const simulatedResult = simulatePythonExecution(code, functionName, inputs);
    return { success: true, result: simulatedResult };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

const simulatePythonExecution = (code, functionName, inputs) => {
  const functionMatch = code.match(new RegExp(`def ${functionName}\\([^)]*\\):([\\s\\S]*?)(?=def|\\n\\n|$)`));
  
  if (!functionMatch) {
    throw new Error(`Function ${functionName} not found`);
  }
  
  const functionBody = functionMatch[1].trim();
  
  if (functionBody.includes('return a + b')) {
    return inputs[0] + inputs[1];
  }
  if (functionBody.includes('return s[::-1]')) {
    return inputs[0].split('').reverse().join('');
  }
  if (functionBody.includes('sorted(set(arr))')) {
    return [...new Set(inputs[0])].sort();
  }
  
  return `Simulated output for ${functionName} with inputs: ${JSON.stringify(inputs)}`;
};

export default function AICodingChallenge({ onComplete }) {
  const { challengeName, setChallengeName, setChallengeScore } = useContext(ChallengeContext);

  // UI state
  const [inputName, setInputName] = useState(challengeName || "");
  const [showStart, setShowStart] = useState(true);
  const [loading, setLoading] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [code, setCode] = useState("");
  const [outputLog, setOutputLog] = useState([]);
  const [lastRunPassed, setLastRunPassed] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [language, setLanguage] = useState("python");
  const [difficulty, setDifficulty] = useState("beginner");

  useEffect(() => {
    if (questions.length > 0) {
      setCurrentQuestion(questions[currentQuestionIndex]);
      setCode(questions[currentQuestionIndex]?.template || "");
    }
  }, [questions, currentQuestionIndex]);

  const generateAICodingQuestion = async () => {
    setLoading(true);
    try {
      const prompt = {
        contents: [{
          parts: [{
            text: `Generate a ${difficulty} level ${language} coding challenge with the following structure:

            Return ONLY valid JSON in this exact format:
            {
              "title": "Challenge Title",
              "description": "Detailed problem description",
              "functionName": "function_name",
              "template": "def function_name(param):\\n    # Your code here\\n    pass",
              "tests": [
                {"input": [param1], "expected": expected_output},
                {"input": [param2], "expected": expected_output2}
              ],
              "instructions": "Step-by-step instructions"
            }
            
            Requirements:
            - Difficulty: ${difficulty}
            - Language: ${language}
            - Include 3-4 test cases with varied inputs
            - Make it practical and educational
            - Ensure function name is descriptive
            - Provide clear expected outputs`
          }]
        }]
      };

      const response = await fetch(`${API_URL}?key=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(prompt),
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.candidates[0].content.parts[0].text;
      
      const jsonMatch = responseText.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from AI');
      }
      
      const questionData = JSON.parse(jsonMatch[0]);
      
      if (!questionData.title || !questionData.functionName || !questionData.tests) {
        throw new Error('Invalid question structure from AI');
      }
      
      return questionData;
    } catch (error) {
      console.error('Error generating AI question:', error);
      return getFallbackQuestion(language, difficulty);
    } finally {
      setLoading(false);
    }
  };

  const getFallbackQuestion = (lang, diff) => {
    const fallbacks = {
      python: {
        beginner: {
          title: "Sum of Two Numbers",
          description: "Write a function that returns the sum of two numbers.",
          functionName: "add",
          template: "def add(a, b):\n    # Your code here\n    pass",
          tests: [
            { input: [2, 3], expected: 5 },
            { input: [10, -4], expected: 6 },
            { input: [0, 0], expected: 0 }
          ],
          instructions: "1. Define the function with parameters a and b\n2. Return the sum of a and b\n3. Make sure to handle negative numbers"
        },
        intermediate: {
          title: "Find Maximum Number in List",
          description: "Write a function that finds the maximum number in a list.",
          functionName: "find_max",
          template: "def find_max(numbers):\n    # Your code here\n    pass",
          tests: [
            { input: [[1, 5, 3, 9, 2]], expected: 9 },
            { input: [[-1, -5, -3]], expected: -1 },
            { input: [[42]], expected: 42 }
          ],
          instructions: "1. Iterate through the list\n2. Keep track of the maximum value\n3. Return the maximum value"
        }
      },
      javascript: {
        beginner: {
          title: "Reverse a String",
          description: "Write a function that reverses a string.",
          functionName: "reverseString",
          template: "function reverseString(str) {\n    // Your code here\n}",
          tests: [
            { input: ["hello"], expected: "olleh" },
            { input: [""], expected: "" },
            { input: ["racecar"], expected: "racecar" }
          ],
          instructions: "1. Convert string to array\n2. Reverse the array\n3. Join back to string"
        }
      }
    };

    return fallbacks[lang]?.[diff] || fallbacks.python.beginner;
  };

  const handleStart = async () => {
    if (!inputName || inputName.trim().length < 2) {
      alert("Please enter a valid name (min 2 chars).");
      return;
    }

    const trimmed = inputName.trim();
    localStorage.setItem("challengeName", trimmed);
    setChallengeName?.(trimmed);
    
    setLoading(true);
    try {
      const questionPromises = Array(3).fill().map(() => 
        generateAICodingQuestion()
      );
      
      const generatedQuestions = await Promise.all(questionPromises);
      setQuestions(generatedQuestions);
      setShowStart(false);
    } catch (error) {
      console.error('Error generating questions:', error);
      alert('Failed to generate questions. Using fallback questions.');
      const fallbackQuestions = [
        getFallbackQuestion(language, difficulty),
        getFallbackQuestion(language, 'intermediate'),
        getFallbackQuestion(language, 'intermediate')
      ];
      setQuestions(fallbackQuestions);
      setShowStart(false);
    } finally {
      setLoading(false);
    }
  };

  const runTests = () => {
    if (!currentQuestion) return;

    const tests = currentQuestion.tests || [];
    const results = [];
    let passedCount = 0;

    try {
      for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        let actual;
        let passed = false;

        if (language === "python") {
          const execution = safeExecutePython(code, currentQuestion.functionName, test.input);
          if (execution.success) {
            actual = execution.result;
            passed = deepEqual(actual, test.expected);
          } else {
            actual = { error: execution.error };
            passed = false;
          }
        } else {
          const wrapper = new Function(`${code}\nreturn typeof ${currentQuestion.functionName} !== 'undefined' ? ${currentQuestion.functionName} : null;`);
          const userFn = wrapper();

          if (typeof userFn !== "function") {
            setOutputLog([{
              type: "error",
              message: `Function "${currentQuestion.functionName}" not found.`
            }]);
            setLastRunPassed(false);
            return;
          }

          try {
            actual = userFn.apply(null, test.input);
            passed = deepEqual(actual, test.expected);
          } catch (err) {
            actual = { error: err.message };
            passed = false;
          }
        }

        if (passed) passedCount++;
        results.push({
          index: i + 1,
          input: test.input,
          expected: test.expected,
          actual,
          passed
        });
      }

      const questionScore = Math.round((passedCount / tests.length) * 100);
      setScore(questionScore);
      setChallengeScore?.(questionScore);
      setOutputLog(results);
      setLastRunPassed(passedCount === tests.length);

    } catch (err) {
      setOutputLog([{ type: "error", message: `Execution Error: ${err.message}` }]);
      setLastRunPassed(false);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(prev => {
      const next = prev + 1;
      if (next >= questions.length) {
        setCompleted(true);
        setChallengeScore?.(score);
      }
      return Math.min(next, questions.length - 1);
    });
    setOutputLog([]);
    setLastRunPassed(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTryAgain = () => {
    setCode(currentQuestion?.template || "");
    setOutputLog([]);
    setLastRunPassed(false);
    setScore(0);
  };

  const handleFinish = () => {
    setCompleted(true);
    setChallengeScore?.(score);
    onComplete?.(score);
  };

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
          <div className={`text-xs ${r.passed ? "text-green-600" : "text-red-600"}`}>
            {r.passed ? "✓" : "✗"}
          </div>
        </div>
        <div className="mt-2 text-sm space-y-1">
          <div><span className="font-medium">Input: </span><code className="bg-gray-100 px-1 rounded">{JSON.stringify(r.input)}</code></div>
          <div><span className="font-medium">Expected: </span><code className="bg-gray-100 px-1 rounded">{JSON.stringify(r.expected)}</code></div>
          <div><span className="font-medium">Actual: </span><code className="bg-gray-100 px-1 rounded">{JSON.stringify(r.actual)}</code></div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700 font-medium">Generating AI-powered coding challenges...</p>
          <p className="text-sm text-gray-500 mt-2">This may take a few seconds</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 font-mono">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Code Challenge</h1>
            </div>
            {!showStart && !completed && (
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  Question <span className="font-bold">{currentQuestionIndex + 1}</span> of <span className="font-bold">{questions.length}</span>
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showStart ? (
          // Start Screen
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl">🚀</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                AI-Powered Coding Challenge
              </h2>
              <p className="text-gray-600 mb-8">
                Test your programming skills with AI-generated challenges
              </p>
              
              <div className="space-y-6 max-w-md mx-auto">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={inputName}
                    onChange={(e) => setInputName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Language
                    </label>
                    <select
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 text-left">
                      Difficulty
                    </label>
                    <select
                      value={difficulty}
                      onChange={(e) => setDifficulty(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={handleStart}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 transform hover:scale-105 focus:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
                >
                  Start Challenge
                </button>
              </div>
              
              <div className="mt-8 grid grid-cols-3 gap-4 text-center">
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">3</div>
                  <div className="text-sm text-gray-600">Questions</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">AI</div>
                  <div className="text-sm text-gray-600">Generated</div>
                </div>
                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Interactive</div>
                </div>
              </div>
            </div>
          </div>
        ) : completed ? (
          // Completion Screen
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🎉</span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Challenge Complete!
              </h2>
              <p className="text-gray-600 mb-2">
                Great job, <span className="font-semibold text-orange-600">{inputName}</span>!
              </p>
              <div className="mb-8">
                <div className="text-5xl font-bold text-orange-600 my-4">{score}%</div>
                <div className="text-gray-600">Final Score</div>
              </div>
              
              <button
                onClick={() => onComplete?.(score)}
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
              >
                View Leaderboard
              </button>
            </div>
          </div>
        ) : currentQuestion ? (
          // Main Challenge Interface
          <div className="grid lg:grid-cols-3 gap-6">
            {/* Left: Problem Statement */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {currentQuestion.title}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {language.toUpperCase()}
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Description</h4>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {currentQuestion.description}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Function Signature</h4>
                    <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                      {language === 'python' 
                        ? `def ${currentQuestion.functionName}(...):`
                        : `function ${currentQuestion.functionName}(...) { }`
                      }
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-2">Instructions</h4>
                    <div className="bg-orange-50 p-4 rounded-lg">
                      <p className="text-sm text-gray-700 whitespace-pre-line">
                        {currentQuestion.instructions}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-gray-900 mb-3">Test Cases</h4>
                    <div className="space-y-3">
                      {currentQuestion.tests.map((test, i) => (
                        <div key={i} className="bg-gray-50 p-3 rounded-lg">
                          <div className="text-xs font-medium text-gray-700 mb-1">Test Case {i + 1}</div>
                          <div className="text-sm font-mono">
                            <div className="text-gray-600">
                              <span className="font-semibold">Input:</span> {test.input.map(inp => JSON.stringify(inp)).join(', ')}
                            </div>
                            <div className="text-gray-600">
                              <span className="font-semibold">Expected:</span> {JSON.stringify(test.expected)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Code Editor and Results */}
            <div className="lg:col-span-2 space-y-6">
              {/* Code Editor */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-semibold text-gray-900">Code Editor</h4>
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500">
                        {language === 'python' ? 'Python' : 'JavaScript'}
                      </span>
                      <button
                        onClick={() => setCode(currentQuestion.template)}
                        className="text-sm text-orange-600 hover:text-orange-700 font-medium"
                      >
                        Reset Template
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-2">
                  <AceEditor
                    mode={language}
                    theme="github"
                    name="ai_coding_challenge_editor"
                    value={code}
                    onChange={setCode}
                    width="100%"
                    height="400px"
                    fontSize={14}
                    showPrintMargin={false}
                    setOptions={{
                      enableBasicAutocompletion: true,
                      enableLiveAutocompletion: true,
                      enableSnippets: true,
                      showLineNumbers: true,
                      tabSize: 2,
                      showGutter: true,
                      highlightActiveLine: true
                    }}
                  />
                </div>
              </div>

              {/* Test Results and Controls */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Test Results */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h4>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {outputLog.length === 0 ? (
                      <div className="text-center py-8 text-gray-500">
                        <div className="text-3xl mb-2">🧪</div>
                        <p>Run tests to see results</p>
                      </div>
                    ) : (
                      outputLog.map((r, idx) => (
                        <div key={idx}>{renderResultRow(r)}</div>
                      ))
                    )}
                  </div>
                </div>

                {/* Controls and Status */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">Progress</h4>
                  
                  <div className="space-y-4">
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">{score}%</div>
                      <div className="text-sm text-gray-600">Current Score</div>
                    </div>

                    <div className="space-y-3">
                      <button
                        onClick={runTests}
                        className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <span>Run Tests</span>
                        <span>▶</span>
                      </button>
                      
                      <button
                        onClick={() => {
                          if (lastRunPassed) {
                            handleNextQuestion();
                          } else {
                            alert("Please pass all tests before proceeding to the next question!");
                          }
                        }}
                        className="w-full border border-orange-500 text-orange-600 hover:bg-orange-50 font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2"
                      >
                        <span>Submit & Next</span>
                        <span>→</span>
                      </button>

                      <button
                        onClick={handleTryAgain}
                        className="w-full border border-gray-300 text-gray-700 hover:bg-gray-50 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                      >
                        Reset Code
                      </button>
                    </div>

                    {lastRunPassed && (
                      <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2 text-green-700">
                          <span className="text-lg">✓</span>
                          <span className="font-medium">All tests passed! Ready to proceed.</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}