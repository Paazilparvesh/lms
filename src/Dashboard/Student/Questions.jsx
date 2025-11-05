const challengeQuestions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "Hyper Text Markup Leveler"],
    answer: 1,
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2,
  },
  {
    question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
    options: ["<script name='xxx.js'>", "<script src='xxx.js'>", "<script href='xxx.js'>", "<script file='xxx.js'>"],
    answer: 1,
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["<js>", "<scripting>", "<javascript>", "<script>"],
    answer: 3,
  },
  {
    question: "How do you write 'Hello World' in an alert box?",
    options: ["msg('Hello World');", "alertBox('Hello World');", "alert('Hello World');", "msgBox('Hello World');"],
    answer: 2,
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction()", "function:myFunction()", "function = myFunction()", "def myFunction()"],
    answer: 0,
  },
  {
    question: "How do you call a function named 'myFunction'?",
    options: ["call myFunction()", "myFunction()", "call function myFunction()", "run myFunction()"],
    answer: 1,
  },
  {
    question: "How to write an IF statement in JavaScript?",
    options: ["if i = 5 then", "if i == 5", "if i = 5", "if (i == 5)"],
    answer: 3,
  },
  {
    question: "How can you add a comment in a JavaScript?",
    options: ["<!--This is a comment-->", "'This is a comment", "//This is a comment", "*This is a comment*"],
    answer: 2,
  },
  {
    question: "What is the purpose of the 'break' statement in a loop?",
    options: ["To terminate the loop and continue to the next iteration", "To terminate the loop and jump to the next statement after the loop", "To skip the current iteration and move to the next one", "To restart the loop"],
    answer: 1,
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2,
  },
  {
    question: "How do you add a background color for all <h1> elements?",
    options: ["h1 {background-color: #FFFFFF;}", "all.h1 {background-color: #FFFFFF;}", "h1.all {background-color: #FFFFFF;}", "<h1> {background-color: #FFFFFF;}"],
    answer: 0,
  },
  {
    question: "Which HTML tag is used to define an internal stylesheet?",
    options: ["<script>", "<style>", "<css>", "<link>"],
    answer: 1,
  },
  {
    question: "Which of the following is not a valid CSS selector?",
    options: [".class-name", "#id-name", "h1.class-name", ":tag-name"],
    answer: 3,
  },
  {
    question: "What does 'NaN' stand for in JavaScript?",
    options: ["Not a Number", "No and No", "New and Null", "Non-assignable Name"],
    answer: 0,
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["-", "+", "=", "*"],
    answer: 2,
  },
  {
    question: "Which of the following is not a primitive data type in JavaScript?",
    options: ["string", "number", "boolean", "array"],
    answer: 3,
  },
  {
    question: "Which of the following is a way to declare a constant in JavaScript?",
    options: ["var", "let", "const", "static"],
    answer: 2,
  },
  {
    question: "What is the correct way to write an array in JavaScript?",
    options: ["var colors = 1, 2, 3", "var colors = (1, 2, 3)", "var colors = [1, 2, 3]", "var colors = {1, 2, 3}"],
    answer: 2,
  },
  {
    question: "What does the `document.getElementById()` method do?",
    options: ["Returns the element with the specified ID", "Returns the first element with the specified class name", "Returns a list of all elements with the specified ID", "Returns the element's parent"],
    answer: 0,
  },
  {
    question: "What is the purpose of the `src` attribute in an `<img>` tag?",
    options: ["To specify the image's height", "To specify the image's source file URL", "To specify a tooltip for the image", "To specify the image's alternative text"],
    answer: 1,
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    options: ["<head>", "<h6>", "<heading>", "<h1>"],
    answer: 3,
  },
  {
    question: "Which property is used to change the font of an element in CSS?",
    options: ["font-family", "font-style", "font-weight", "text-font"],
    answer: 0,
  },
  {
    question: "What is the correct HTML for a link to another page?",
    options: ["<a href='url'>Click here</a>", "<link src='url'>Click here</link>", "<href='url'>Click here</href>", "<a>Click here</a>"],
    answer: 0,
  },
  {
    question: "Which tag is used to create an unordered list in HTML?",
    options: ["<ul>", "<ol>", "<li>", "<dl>"],
    answer: 0,
  },
  {
    question: "What does CSS stand for?",
    options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
    answer: 1,
  },
  {
    question: "In CSS, what does `margin: 10px 20px;` mean?",
    options: ["Top and bottom margins are 10px, left and right are 20px", "All margins are 10px", "All margins are 20px", "Top and bottom margins are 20px, left and right are 10px"],
    answer: 0,
  },
  {
    question: "Which property is used to make a text bold in CSS?",
    options: ["font-style: bold;", "font-weight: bold;", "text-decoration: bold;", "text-weight: bold;"],
    answer: 1,
  },
  {
    question: "Which of the following is a block-level element in HTML?",
    options: ["<span>", "<a>", "<div>", "<img>"],
    answer: 2,
  },
  {
    question: "Which of the following is an inline element in HTML?",
    options: ["<p>", "<h1>", "<ul>", "<span>"],
    answer: 3,
  },
  {
    question: "How do you get the number of elements in an array named `myArray`?",
    options: ["myArray.size", "myArray.length", "myArray.count", "myArray.value"],
    answer: 1,
  },
  {
    question: "What is the correct way to open a new window with JavaScript?",
    options: ["window.new()", "window.open()", "new.window()", "open()"],
    answer: 1,
  },
  {
    question: "What is the purpose of the `&&` operator in JavaScript?",
    options: ["Logical OR", "Logical AND", "Bitwise AND", "Comparison"],
    answer: 1,
  },
  {
    question: "What is a 'string' in programming?",
    options: ["A data type that stores a whole number", "A data type that stores text", "A data type that stores a decimal number", "A data type that stores a true/false value"],
    answer: 1,
  },
  {
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["declare", "var", "let", "both B and C"],
    answer: 3,
  },
  {
    question: "What is the output of `console.log(2 + '2')`?",
    options: ["4", "22", "Error", "NaN"],
    answer: 1,
  },
  {
    question: "What is a 'for' loop used for?",
    options: ["Executing a block of code a specific number of times", "Running a function only once", "Skipping a block of code", "Waiting for an event"],
    answer: 0,
  },
  {
    question: "Which operator is used to check for strict equality (both value and type)?",
    options: ["==", "===", "!==", "!"],
    answer: 1,
  },
  {
    question: "What is the correct way to get the current date and time in JavaScript?",
    options: ["Date().now()", "new Date()", "getDate()", "Time.now()"],
    answer: 1,
  },
  {
    question: "Which of these is not a valid way to define a function in JavaScript?",
    options: ["function myFunction() {}", "const myFunction = () => {}", "const myFunction = function() {}", "new Function() {}"],
    answer: 3,
  },
  {
    question: "In CSS, what does `box-sizing: border-box;` do?",
    options: ["It includes padding and border in the element's total width and height", "It includes only padding in the element's total width and height", "It removes padding and border from the element's total width and height", "It sets the box to a square shape"],
    answer: 0,
  },
  {
    question: "How do you include a comment in an HTML file?",
    options: ["// This is a comment", "<!-- This is a comment -->", "/* This is a comment */", "# This is a comment"],
    answer: 1,
  },
  {
    question: "What is a 'callback function' in JavaScript?",
    options: ["A function that is called by another function", "A function that returns a boolean value", "A function that calls itself recursively", "A function that is used to stop an operation"],
    answer: 0,
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
    options: ["src", "alt", "title", "href"],
    answer: 1,
  },
  {
    question: "Which CSS property is used to specify the space between the content and the border of an element?",
    options: ["margin", "border", "padding", "spacing"],
    answer: 2,
  },
  {
    question: "What is a 'variable' in programming?",
    options: ["A container for storing data values", "A keyword used to define a function", "A type of operator", "A logical condition"],
    answer: 0,
  },
  {
    question: "What is the purpose of the `<meta>` tag in HTML?",
    options: ["To define a hyperlink", "To create a list", "To provide metadata about the HTML document", "To embed a video"],
    answer: 2,
  },
  {
    question: "Which keyword is used to exit a loop in most programming languages?",
    options: ["continue", "skip", "break", "exit"],
    answer: 2,
  },
  {
    question: "What is a 'boolean' data type?",
    options: ["A data type that can only store a number", "A data type that can only store text", "A data type that can only store a true or false value", "A data type that can store a collection of items"],
    answer: 2,
  },
  {
    question: "Which CSS pseudo-class is used to style an element when the user hovers over it?",
    options: [":active", ":focus", ":visited", ":hover"],
    answer: 3,
  },
  {
    question: "How do you specify a different style for different elements with the same class?",
    options: ["You can't do that", "Use multiple classes on an element", "Use IDs instead of classes", "Use inline styles"],
    answer: 1,
  },
  {
    question: "What is the output of `console.log(typeof 'hello')`?",
    options: ["'number'", "'string'", "'object'", "'boolean'"],
    answer: 1,
  },
  {
    question: "What is the purpose of a 'promise' in JavaScript?",
    options: ["To perform a synchronous operation", "To handle asynchronous operations", "To store data in a variable", "To create a loop"],
    answer: 1,
  },
  {
    question: "Which of the following is used to include an image as a hyperlink?",
    options: ["<a href='url'><img src='image.jpg'></a>", "<img href='url' src='image.jpg'>", "<a><img href='url' src='image.jpg'></a>", "<link rel='image' href='image.jpg'>"],
    answer: 0,
  },
  {
    question: "Which property is used to change the background color of an element in CSS?",
    options: ["color", "bgcolor", "background-color", "bg-color"],
    answer: 2,
  },
  {
    question: "What is the correct way to get a random number in JavaScript?",
    options: ["Math.random()", "Random.num()", "Math.rnd()", "getRandom()"],
    answer: 0,
  },
  {
    question: "What does the `event.preventDefault()` method do?",
    options: ["Stops the event from bubbling up the DOM", "Stops the default action of an element from happening", "Prevents all events on the page from firing", "It's used to trigger an event manually"],
    answer: 1,
  },
  {
    question: "Which of the following is not a way to declare a function?",
    options: ["Function Expression", "Function Declaration", "Arrow Function", "Class Function"],
    answer: 3,
  },
  {
    question: "Which HTML attribute is used to provide a unique identifier for an element?",
    options: ["class", "name", "id", "data"],
    answer: 2,
  },
  {
    question: "Which CSS property is used for setting the indentation of the first line of a text block?",
    options: ["text-indent", "margin-left", "padding-left", "line-height"],
    answer: 0,
  }
];

export default challengeQuestions;
