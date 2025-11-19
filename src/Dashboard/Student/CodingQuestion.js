// codingQuestions.js
// Each question defines: id, title, description, functionName, template, tests
// tests: array of { input: Array, expected: any }

const codingQuestions = [
  {
    id: "sum-two",
    title: "Sum of Two Numbers",
    description:
      "Implement function `add(a, b)` that returns the sum of two numbers.",
    functionName: "add",
    template: `// Implement the function below\nfunction add(a, b) {\n  // your code here\n}\n\n// Example: return add(1,2) => 3`,
    tests: [
      { input: [2, 3], expected: 5 },
      { input: [10, -4], expected: 6 },
      { input: [0, 0], expected: 0 }
    ]
  },

  {
    id: "reverse-string",
    title: "Reverse a String",
    description:
      "Implement function `reverseStr(s)` that returns the reversed string.",
    functionName: "reverseStr",
    template: `// Implement the function below\nfunction reverseStr(s) {\n  // your code here\n}\n\n// Example: reverseStr("abc") => "cba"`,
    tests: [
      { input: ["abc"], expected: "cba" },
      { input: [""], expected: "" },
      { input: ["racecar"], expected: "racecar" }
    ]
  },

  {
    id: "unique-array",
    title: "Remove Duplicates from Array",
    description:
      "Implement function `unique(arr)` that returns a new array with duplicates removed (preserve first occurrences).",
    functionName: "unique",
    template: `// Implement the function below\nfunction unique(arr) {\n  // your code here\n}\n\n// Example: unique([1,2,2,3]) => [1,2,3]`,
    tests: [
      { input: [[1, 2, 2, 3]], expected: [1, 2, 3] },
      { input: [[1, 1, 1]], expected: [1] },
      { input: [[5, 6, 5, 7, 6]], expected: [5, 6, 7] }
    ]
  },

  {
    id: "fizzbuzz",
    title: "FizzBuzz (output array)",
    description:
      "Implement `fizzBuzz(n)` that returns an array for numbers 1..n where multiples of 3 => 'Fizz', multiples of 5 => 'Buzz', both => 'FizzBuzz', else the number.",
    functionName: "fizzBuzz",
    template: `// Implement the function below\nfunction fizzBuzz(n) {\n  // your code here\n}\n\n// Example: fizzBuzz(5) => [1,2,'Fizz',4,'Buzz']`,
    tests: [
      { input: [1], expected: [1] },
      { input: [5], expected: [1, 2, "Fizz", 4, "Buzz"] },
      { input: [3], expected: [1, 2, "Fizz"] }
    ]
  }
];

export default codingQuestions;
