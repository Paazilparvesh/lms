// import React, { useState, useRef, useEffect } from 'react';
// import { motion, AnimatePresence, useAnimation } from 'framer-motion';
// import { FiSend, FiX, FiChevronUp, FiThumbsUp } from 'react-icons/fi';
// import { RiRobot2Line } from 'react-icons/ri';

// // ✅ Extended Knowledge Base with All Course Types
// const knowledgeBase = [
//   // General greetings and casual conversation
//   {
//     question: [
//       "hi", "hello", "hey", "good morning", "good afternoon", "good evening", 
//       "howdy", "greetings", "what's up", "sup", "yo", "hi there", "hello there",
//       "hey there", "good day", "morning", "afternoon", "evening", "how are you",
//       "how are you doing", "what's new", "how's it going", "how have you been",
//       "nice to meet you", "pleasure to meet you", "how do you do", "what's happening",
//       "what's going on", "how's everything", "how's your day", "how's your day going"
//     ],
//     answer: `👋 Hello! Welcome to EduMaster! I'm your friendly course assistant. 

// How can I help you today? You can ask me about:
// • Our courses (Python, JavaScript, Data Science, etc.)
// • Pricing and payment options
// • Certificates and exams
// • Free learning resources
// • Enrollment process
// • Or anything else about our platform!

// What would you like to know? 😊`
//   },
//   // Python
//   {
//     question: ["python", "learn python", "python course"],
//     answer: "Our Python course covers basics to advanced topics, including OOP, data analysis, and database integration. Price: $50, Duration: 6 weeks."
//   },
//   // JavaScript
//   {
//     question: ["javascript", "learn javascript", "js course"],
//     answer: "Our JavaScript course focuses on DOM manipulation, ES6+, APIs, and React basics. Price: $60, Duration: 6 weeks."
//   },
//   // MySQL / Database
//   {
//     question: ["mysql", "database", "sql"],
//     answer: "Our MySQL course teaches database creation, queries, joins, and optimization. Price: $40, Duration: 4 weeks."
//   },
//   // Machine Learning
//   {
//     question: ["machine learning", "ml course", "learn ml"],
//     answer: "Our Machine Learning course covers supervised & unsupervised learning, model building, and deployment. Price: $120, Duration: 10 weeks."
//   },
//   // Cyber Security
//   {
//     question: ["cyber security", "cybersecurity", "security course"],
//     answer: "Our Cyber Security course teaches ethical hacking, penetration testing, and network security. Price: $150, Duration: 12 weeks."
//   },
//   // Data Science
//   {
//     question: ["data science", "ds course","deep learning"],
//     answer: "Our Data Science course covers Python, data analysis, machine learning, and visualization. Price: $130, Duration: 12 weeks."
//   },
//   // AI
//   {
//     question: ["artificial intelligence", "ai course"],
//     answer: "Our AI course teaches deep learning, NLP, and computer vision using Python. Price: $140, Duration: 12 weeks."
//   },
//   // Cloud Computing
//   {
//     question: ["cloud computing", "aws", "azure", "gcp"],
//     answer: "Our Cloud Computing course covers AWS, Azure, and GCP deployment. Price: $110, Duration: 8 weeks."
//   },
//   // Course Recommendations - Enhanced with beginner-focused questions
//   {
//     question: [
//       "suggest", "recommend", "best course", "which course", "what should i learn",
//       "beginner-friendly", "where should i start", "most popular", "trending", "good course",
//       "which course should i start with", "what are your beginner-friendly courses",
//       "suggest me a good course for freshers", "which is the most popular course here",
//       "do you have a learning path for beginners", "are there free courses i can try first",
//       "i'm new to coding what should i learn", "best course for absolute beginners",
//       "what's the easiest course to start with", "no experience where to begin",
//       "complete beginner what do you recommend", "first course to take",
//       "starting point for learning", "entry level courses", "courses for newbies",
//       "never coded before what course", "zero experience what to learn first"
//     ],
//     answer: `🎯 Beginner Course Recommendations:

// 1. Absolute Beginners (No Prior Experience):
// • Python Fundamentals ($50) - Easiest to learn
// • Web Development Basics (Free) - HTML/CSS/JavaScript intro
// • Computer Science Principles (Free) - Foundation concepts

// 2. Most Popular Beginner Choices:
// - Python Programming (92% completion rate)
// - JavaScript Fundamentals (85% satisfaction)
// - Data Science Starter Kit (Free first 3 lessons)

// 3. Structured Learning Paths:
// → Coding Beginner Path:
// 1. Python Basics (2 weeks)
// 2. Web Fundamentals (3 weeks)
// 3. Database Essentials (2 weeks)
// 4. Final Project (1 week)

// → Data Beginner Path:
// 1. Python for Data (3 weeks)
// 2. Data Analysis (4 weeks)
// 3. Visualization (2 weeks)

// 4. Free Starter Courses:
// • Try Before You Buy:
// - Python First Steps (Free)
// - JavaScript Crash Course (Free)
// - Cyber Security Basics (Free)

// 5. What Most Beginners Choose:
// - 65% start with Python
// - 20% begin with Web Development
// - 15% jump into Data Science

// 💡 Pro Tip: Start with our "Coding Foundations" free course to explore different fields before committing!`
//   },
//   // Free Courses
//   {
//     question: [
//       "free course",
//       "learn for free",
//       "without paying",
//       "free learning",
//       "no cost",
//       "do you have free courses",
//       "are there any courses i can take without paying",
//       "give me a list of free courses",
//       "are your beginner courses free",
//       "can i learn for free here",
//       "what free learning options do you have",
//       "free classes",
//       "free tutorials",
//       "free lessons",
//       "free resources",
//       "free material",
//       "free access",
//       "free trial",
//       "free samples",
//       "free introduction"
//     ],
//     answer: `🎓 Our Free Learning Options:

// 1. Free Introductory Courses:
// • Python Basics (3 hours)
// • JavaScript Fundamentals (2.5 hours)
// • Cyber Security Essentials (4 hours)
// • Data Science Overview (3 hours)

// 2. Free Learning Paths:
// - Web Development Starter Kit
// - Data Analytics Fundamentals
// - AI & ML Introduction

// 3. Free Resources:
// ✓ 50+ coding exercises
// ✓ Community forums
// ✓ Weekly live Q&A sessions
// ✓ Downloadable cheat sheets

// 4. Free Trial:
// - 7-day access to all premium courses
// - No credit card required
// - Access first 2 modules of any course

// How to access:
// 1. Visit our "Free Learning" section
// 2. No registration needed for free content
// 3. Create free account to track progress

// Upgrade anytime to get:
// • Full course access
// • Certificates
// • Mentor support
// • Project reviews`
//   },
//   // Enrollment & Registration
//   {
//     question: ["join a course", "steps to enroll", "sign up", "register", "enroll", "get started"],
//     answer: "Create an account, choose your course, and click 'Enroll Now'. Some free lessons don't need registration."
//   },
//   // Certification
//   {
//     question: [
//       "certificate",
//       "certificates",
//       "recognized",
//       "linkedin",
//       "download certificate",
//       "will i get a certificate",
//       "do you provide certificates",
//       "how do i download my certificate",
//       "are your certificates recognized by companies",
//       "will my certificate have my name",
//       "can i share my certificate on linkedin",
//       "certificate verification",
//       "certificate validity",
//       "certificate authenticity",
//       "certificate format",
//       "digital certificate",
//       "certificate after completion",
//       "certificate requirements",
//       "certificate criteria"
//     ],
//     answer: `📜 About Our Certificates:

// • You'll receive a certificate upon successful course completion
// • Certificates include:
// - Your full name
// - Course name
// - Completion date
// - Unique verification code
// - EduMaster logo and signature

// • Industry Recognition:
// - Accepted by 85% of employers (2023 survey)
// - Verified by our partner companies
// - Valid for job applications and promotions

// • How to Download:
// 1. Complete all course requirements
// 2. Go to "My Certificates" in dashboard
// 3. Click "Download PDF" or "Share to LinkedIn"

// • LinkedIn Sharing:
// - One-click sharing available
// - Appears under "Licenses & Certifications"
// - Includes verification link for employers

// Need help? Contact certificates@edumaster.com`
//   },
//   // Exams
//   {
//     question: [
//       "exam",
//       "test",
//       "quiz",
//       "practice test",
//       "final exam",
//       "retake",
//       "attempts",
//       "is there a final exam",
//       "do i have to give a test",
//       "how many attempts are allowed for the test",
//       "can i retake the exam",
//       "are the quizzes compulsory",
//       "do you give practice tests",
//       "exam pattern",
//       "test format",
//       "passing criteria",
//       "exam duration",
//       "grading system",
//       "exam preparation",
//       "mock tests",
//       "exam retakes",
//       "failed exam",
//       "exam requirements"
//     ],
//     answer: `📝 Exam Information:

// • Course Structure:
// - Weekly quizzes (optional but recommended)
// - Final exam (required for certification)
// - Practice tests available for all modules

// • Exam Details:
// - Format: Multiple choice + practical tasks
// - Duration: 2 hours for final exam
// - Passing score: 70% minimum
// - Attempts: 3 attempts allowed
// - Retake policy: 7-day cooldown between attempts

// • Practice Materials:
// - 5+ practice tests per course
// - Mock exams with solutions
// - Previous year question banks

// • Important Notes:
// - Quizzes help but aren't mandatory
// - Final exam is required for certificate
// - Exam results available immediately
// - Detailed feedback provided

// Need special accommodations? Contact exams@edumaster.com`
//   },
//   // Pricing
//   {
//     question: ["price", "fees", "cost", "discount", "payment", "installments", "upi", "paypal"],
//     answer: "Prices vary: Python $50, JavaScript $60, Data Science $130. We accept UPI, PayPal, cards."
//   },
//   // Payment Methods - New comprehensive section
//   {
//     question: [
//       "how can i pay",
//       "payment methods",
//       "payment process",
//       "credit card",
//       "debit card",
//       "paypal",
//       "upi",
//       "google pay",
//       "phonepe",
//       "net banking",
//       "bank transfer",
//       "emi",
//       "installment",
//       "how can i pay for a course",
//       "do you accept credit cards",
//       "can i pay using upi or google pay",
//       "do you have emi or installment options",
//       "is there a discount available right now",
//       "are there any hidden charges",
//       "can i get an invoice for my payment",
//       "how do i update my billing information",
//       "do you accept international payments",
//       "what should i do if my payment fails",
//       "payment options",
//       "accepted payment methods",
//       "ways to pay",
//       "payment gateway",
//       "payment processing",
//       "payment security",
//       "payment verification",
//       "payment confirmation",
//       "payment receipt",
//       "payment proof",
//       "failed payment",
//       "payment declined",
//       "payment error",
//       "payment issue",
//       "payment support",
//       "payment help",
//       "payment assistance",
//       "payment problem"
//     ],
//     answer: `💳 Payment Options & Information:

// 1. Accepted Payment Methods:
// • Credit/Debit Cards (Visa, Mastercard, Amex, Discover)
// • PayPal (All countries)
// • UPI (India): Google Pay, PhonePe, Paytm, BHIM
// • Net Banking (100+ banks supported)
// • Bank Transfer/Wire Transfer
// • Mobile Wallets (Selected countries)
// • Cryptocurrency (BTC, ETH - via Coinbase Commerce)

// 2. EMI/Installment Options:
// - 3/6/12 month EMI available (credit cards only)
// - 0% interest on 3-month plans
// - Split payment option (pay 50% now, 50% later)
// - Education loans through our partners

// 3. International Payments:
// • Accept payments from 190+ countries
// • Automatic currency conversion
// • No extra fees for international cards
// • Tax invoices provided for all payments

// 4. Discounts & Offers:
// - CURRENT OFFER: 15% off with code LEARN15
// - Student discount: 20% (with valid ID)
// - Group discounts (3+ enrollments: 25% off)
// - Seasonal sales (Black Friday, New Year etc.)

// 5. Payment Security:
// ✓ PCI-DSS compliant
// ✓ 256-bit SSL encryption
// ✓ Two-factor authentication optional
// ✓ No payment data stored on our servers

// 6. Payment Issues:
// • If payment fails:
// 1. Check card details/balance
// 2. Try a different payment method
// 3. Contact your bank if needed
// 4. Email payments@edumaster.com with screenshot

// 7. Invoices & Receipts:
// - Automatic receipt sent to email
// - Download invoice from dashboard
// - GST/VAT invoices available
// - Corporate billing available

// Need payment help? Contact payments@edumaster.com or call +1 (800) 555-PAY (24/7)`
//   },
//   // Technical Support
//   {
//     question: [
//       "forgot password",
//       "reset password",
//       "log in",
//       "login",
//       "course not loading",
//       "video buffering",
//       "i forgot my password",
//       "how do i log in",
//       "my course is not loading",
//       "video is buffering a lot",
//       "how do i reset my password",
//       "can you help me access my account",
//       "account access",
//       "cant login",
//       "login issues",
//       "password reset",
//       "recover account",
//       "cant access my account",
//       "technical issues",
//       "video problems",
//       "loading issues",
//       "course access",
//       "cant view course",
//       "playback issues"
//     ],
//     answer: `For account and technical issues:

// 🔹 Password Reset:
// 1. Go to login page → Click "Forgot Password"
// 2. Enter your registered email
// 3. Check inbox for reset link (check spam too)
// 4. Create new password

// 🔹 Login Problems:
// • Ensure caps lock is off
// • Try different browsers (Chrome/Firefox)
// • Clear cache/cookies

// 🔹 Course Loading/Video Issues:
// • Check internet connection
// • Try lower video quality
// • Restart browser
// • Disable ad-blockers/extensions

// For immediate help:
// 📧 Email: support@edumaster.com
// ☎️ Call: +1 (800) 555-EDU (24/7)
// 💬 Live Chat: Available in dashboard

// Our average response time is under 30 minutes!`
//   },
//   // Duration
//   {
//     question: ["duration", "how long", "self-paced", "modules", "live or recorded"],
//     answer: "Most courses are self-paced, 4–12 weeks long, with recorded lessons & downloadable resources."
//   },
//   // Refund
//   {
//     question: [
//       "refund",
//       "cancel subscription",
//       "refund policy",
//       "money back",
//       "get refund",
//       "request refund",
//       "how to get refund",
//       "refund process",
//       "can i get refund",
//       "refund money",
//       "stop course",
//       "cancel course",
//       "terminate course",
//       "withdraw from course",
//       "leave course",
//       "discontinue course",
//       "money-back guarantee",
//       "guarantee policy",
//       "satisfaction guarantee",
//       "7-day guarantee",
//       "refund time",
//       "how long refund",
//       "refund period",
//       "refund duration",
//       "refund eligibility",
//       "refund terms",
//       "refund conditions"
//     ],
//     answer: `Our refund policy:
// - 7-day money-back guarantee for all courses
// - Full refund if requested within 7 days of purchase
// - No questions asked for cancellation within 24 hours
// - Partial refund after 7 days (pro-rated based on course progress)
// - Refunds processed within 5-7 business days
// - To request: Go to Dashboard → My Courses → Cancel & Refund
// - For subscriptions: Cancel anytime in Account Settings
// - Contact support@edumaster.com for any refund issues`
//   },
//   // General Help - Enhanced with platform explanation questions
//   // Navigation / Platform Directions
//   {
//     question: [
//       "dashboard", "my account", "profile page", "where is my dashboard",
//       "course page", "go to course", "find course", "where is course",
//       "my courses", "certificate page", "find certificate", "how to access certificate",
//       "account settings", "billing page", "payment page", "enrolled courses"
//     ],
//     answer: `🗺 Navigation Guide:

// • Dashboard: Click on your profile icon at the top right → Select "Dashboard" to see enrolled courses, progress, and recommendations.
// • Course Page: From Dashboard → Click "My Courses" → Select the course you want to access.
// • Certificates: Dashboard → "My Certificates" → Click "Download" or "Share".
// • Account Settings: Top-right profile icon → "Settings" for profile, payment, or subscription info.
// • Payments/Billing: Dashboard → "Billing" → View invoices, update payment methods, or request refunds.

// 💡 Tip: Use the top navigation bar to quickly access Courses, Dashboard, or Help sections.`
//   },
//   {
//     question: [
//       "help",
//       "about your platform",
//       "how does this site work",
//       "guide me",
//       "i need help",
//       "what can you do",
//       "tell me about your platform",
//       "can you guide me",
//       "i have a question about your courses",
//       "what is this website about",
//       "what do you do",
//       "how does this platform work",
//       "what services do you offer",
//       "can you explain what your website is for",
//       "platform overview",
//       "website purpose",
//       "about edu master",
//       "what's this site",
//       "explain your service",
//       "what's your purpose"
//     ],
//     answer: `🌟 Welcome to EduMaster - Your Learning Platform:

// We're a premier online education platform specializing in tech and professional skills development. Here's what we offer:

// 📚 Our Services:
// • 100+ courses across 10+ categories
// • Beginner to advanced learning paths
// • Industry-recognized certifications
// • Hands-on projects and real-world applications
// • Personalized learning recommendations

// 🖥 How It Works:
// 1. Browse courses by category/skill level
// 2. Enroll in free or premium courses
// 3. Learn at your own pace with:
// - Video lessons
// - Interactive exercises
// - Downloadable resources
// 4. Complete assessments
// 5. Earn certificates
// 6. Apply skills in real projects

// 🎯 Our Mission:
// To make quality tech education accessible to everyone, anywhere, with:
// • Affordable pricing
// • Flexible learning schedules
// • Expert-created content
// • Career-focused curriculum

// 🏆 Why Choose Us?
// ✓ 92% course completion rate
// ✓ 300,000+ students worldwide
// ✓ 85% career advancement rate
// ✓ 24/7 mentor support
// ✓ Mobile-friendly platform

// Start learning today and transform your career!`
//   }
// ];

// const Chatbot = ({ isOpen, onClose }) => {
//   const [messages, setMessages] = useState([]);
//   const [userInput, setUserInput] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [isMinimized, setIsMinimized] = useState(false);
//   const messagesEndRef = useRef(null);
//   const controls = useAnimation();

//   const greetings = [
//     "Hello! I'm your EduMaster assistant. Ask me about any course!",
//     "Hi! Need info on Python, ML, Cyber Security, or more?",
//     "Welcome! I can guide you on courses and more.",
//     "Hi there! Looking for beginner courses or career paths? I can help!",
//     "Hello! Want to know which course is best for your skill level? Ask me!"
//   ];

//   useEffect(() => {
//     if (isOpen && messages.length === 0) {
//       const greet = greetings[Math.floor(Math.random() * greetings.length)];
//       setMessages([{ type: 'bot', text: greet, timestamp: new Date(), reacted: false }]);
//     }
//   }, [isOpen]);

//   const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//   useEffect(scrollToBottom, [messages, isMinimized]);

//   const handleReaction = (index) => {
//     setMessages(prev => prev.map((msg, i) => 
//       i === index ? { ...msg, reacted: !msg.reacted } : msg
//     ));
//   };

//   const handleSend = async () => {
//     const input = userInput.trim();
//     if (!input) return;

//     const userMessage = { type: 'user', text: input, timestamp: new Date() };
//     setMessages(prev => [...prev, userMessage]);
//     setUserInput('');
//     setIsLoading(true);

//     await controls.start({ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0], transition: { duration: 0.4 } });

//     setTimeout(() => {
//       const lowerInput = input.toLowerCase();
//       let found = "Sorry, I can only answer course-related questions right now. Try asking about our courses, pricing, or certificates!";

//       for (let item of knowledgeBase) {
//         if (item.question.some(keyword => lowerInput.includes(keyword))) {
//           found = item.answer;
//           break;
//         }
//       }

//       setMessages(prev => [...prev, { type: 'bot', text: found, timestamp: new Date(), reacted: false }]);
//       setIsLoading(false);
//     }, 600);
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const toggleMinimize = () => setIsMinimized(!isMinimized);

//   const handleClose = () => {
//     setMessages([]);
//     onClose();
//   };

//   const formatTime = (d) => d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//   return (
//     <AnimatePresence>
//       {isOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: 20, scale: 0.95 }}
//           animate={{ opacity: 1, y: 0, scale: 1, height: isMinimized ? 60 : 660 }}
//           exit={{ opacity: 0, y: 20, scale: 0.95 }}
//           transition={{ type: 'spring', damping: 25, stiffness: 300 }}
//           className={`fixed bottom-5 right-28 w-[90vw] max-w-[350px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 ${isMinimized ? 'cursor-pointer' : ''}`}
//           onClick={isMinimized ? toggleMinimize : undefined}
//         >
//           {/* Header */}
//           <motion.div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 flex items-center justify-between h-14">
//             <div className="flex items-center space-x-3">
//               <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
//                 <RiRobot2Line className="text-orange-500 text-lg" />
//               </div>
//               <div>
//                 <h3 className="text-white font-semibold text-sm">EduMaster AI</h3>
//                 {!isMinimized && <p className="text-xs text-orange-100">Course Assistant</p>}
//               </div>
//             </div>
//             <div className="flex items-center space-x-2">
//               <motion.button onClick={toggleMinimize} className="text-white hover:text-orange-200">
//                 <FiChevronUp className={`h-5 w-5 ${isMinimized ? 'rotate-180' : ''}`} />
//               </motion.button>
//               <motion.button onClick={handleClose} className="text-white hover:text-orange-200">
//                 <FiX className="h-5 w-5" />
//               </motion.button>
//             </div>
//           </motion.div>

//           {!isMinimized && (
//             <>
//               {/* Messages */}
//               <div className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
//                 {messages.map((msg, i) => (
//                   <div key={i} className={`mb-3 flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
//                     <div className={`max-w-[85%] rounded-2xl p-2.5 text-sm ${
//                       msg.type === 'user'
//                         ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-none'
//                         : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
//                     }`}>
//                       <div className="whitespace-pre-line">{msg.text}</div>
//                       <div className="flex justify-between items-center mt-1">
//                         <div className={`text-xs ${msg.type === 'user' ? 'text-orange-100' : 'text-gray-500'}`}>
//                           {formatTime(msg.timestamp)}
//                         </div>
//                         {msg.type === 'bot' && (
//                           <motion.button
//                             onClick={() => handleReaction(i)}
//                             className={`ml-2 p-1 rounded-full ${
//                               msg.reacted ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-orange-500'
//                             }`}
//                             whileHover={{ scale: 1.1 }}
//                             whileTap={{ scale: 0.9 }}
//                           >
//                             <FiThumbsUp className="h-3 w-3" />
//                           </motion.button>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//                 {isLoading && (
//                   <div className="flex justify-start mb-4">
//                     <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl p-3 shadow-sm">
//                       <span className="text-sm text-gray-600">Thinking...</span>
//                     </div>
//                   </div>
//                 )}
//                 <div ref={messagesEndRef} />
//               </div>

//               {/* Input */}
//               <div className="p-3 border-t border-gray-200 bg-white">
//                 <div className="flex items-center space-x-2">
//                   <input
//                     type="text"
//                     value={userInput}
//                     onChange={(e) => setUserInput(e.target.value)}
//                     onKeyDown={handleKeyDown}
//                     placeholder="Ask about any course..."
//                     className="flex-1 p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
//                     disabled={isLoading}
//                   />
//                   <motion.button
//                     onClick={handleSend}
//                     disabled={isLoading || !userInput.trim()}
//                     className={`p-3 rounded-xl ${isLoading || !userInput.trim() ? 'bg-gray-200 text-gray-400' : 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'}`}
//                     animate={controls}
//                   >
//                     <FiSend className="h-5 w-5" />
//                   </motion.button>
//                 </div>
//                 <div className="mt-2 flex flex-wrap gap-1">
//                   <button
//                     onClick={() => setUserInput("Which course should I start with?")}
//                     className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg"
//                   >
//                     Are you beginner?
//                   </button>
//                   <button
//                     onClick={() => setUserInput("What are your free courses?")}
//                     className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg"
//                   >
//                     Free courses
//                   </button>
//                   <button
//                     onClick={() => setUserInput("How do I enroll?")}
//                     className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg"
//                   >
//                     Enroll here
//                   </button>
//                   <button
//                     onClick={() => setUserInput("What's your refund policy?")}
//                     className="text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded-lg"
//                   >
//                     Refunds?
//                   </button>
//                 </div>
//               </div>
//             </>
//           )}
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// };

// export default Chatbot;






import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiSend, FiX, FiChevronUp, FiThumbsUp } from 'react-icons/fi';
import { RiRobot2Line } from 'react-icons/ri';
import axios from 'axios';
import ReactMarkdown from "react-markdown";

// ✅ Use environment variable for security
const GEMINI_API_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY; // stored in .env

// ✅ LMS backend URL (use .env for deployment)
const LMS_API_BASE = import.meta.env.VITE_LMS_BASE_URL || 'https://lms-chi-pearl.vercel.app';

// ✅ Optional: Local knowledge base (keep your original one, shortened here for brevity)
const knowledgeBase = [
  { question: ['hi', 'hello'], answer: 'Hi! 👋 I’m your EduMaster assistant. How can I help you today?' },
  { question: ['python', 'learn python'], answer: 'Our Python course covers basics to advanced topics.' },
  { question: ['free courses'], answer: 'You can explore free Python, JS, and Cyber Security basics courses.' },
];

const Chatbot = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);
  const hasGreeted = useRef(false);
  const controls = useAnimation();

  const greetings = [
    "Hello! I'm your EduMaster assistant. Ask me about any course!",
    "Hi! Need info on Python, ML, Cyber Security, or more?",
    "Welcome! I can guide you on courses and more.",
  ];


  useEffect(() => {
    if (isOpen && !hasGreeted.current) {
      const greet = greetings[Math.floor(Math.random() * greetings.length)];
      setMessages([{ type: 'bot', text: greet, timestamp: new Date(), reacted: false }]);
      hasGreeted.current = true; // ✅ Prevent future greetings
    }
  }, [isOpen,]);


  useEffect(() => {
    const saved = localStorage.getItem("edumaster_chat");
    if (saved) setMessages(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem("edumaster_chat", JSON.stringify(messages));
  }, [messages]);


  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isMinimized]);

  const handleReaction = (index) => {
    setMessages(prev =>
      prev.map((msg, i) => (i === index ? { ...msg, reacted: !msg.reacted } : msg))
    );
  };


  const buildConversationContext = (messages) => {
    // Keep last 5 messages for context
    const recentMessages = messages.slice(-5);

    return recentMessages
      .map(m => `${m.type === 'user' ? 'User' : 'Assistant'}: ${m.text}`)
      .join('\n');
  };



  const handleSend = async () => {
    const input = userInput.trim();
    if (!input) return;

    const fetchLMSData = async (query) => {
      try {
        const username = import.meta.env.VITE_LMS_USER;
        const password = import.meta.env.VITE_LMS_PASS;
        const token = btoa(`${username}:${password}`);

        // ✅ Fetch courses securely with Basic Auth
        const coursesRes = await axios.get(`${import.meta.env.VITE_Course_name}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });

        const courses = coursesRes.data || [];

        if (!courses.length) return "No courses available right now.";

        // ✅ Make a clean context summary
        const context = courses
          .slice(0, 10)
          .map(
            (c) =>
              `• ${c.name || c.title} — ${c.description?.slice(0, 80) || "No description."}`
          )
          .join("\n");

        return `Here are some available courses from EduMaster LMS:\n${context}`;
      } catch (err) {
        console.error("Error fetching LMS data:", err);
        return "No course data available right now.";
      }
    };



    const userMessage = { type: 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    await controls.start({
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: { duration: 0.4 },
    });

    try {
      const lowerInput = input.toLowerCase();

      // ✅ 1. Check local knowledge base first
      let foundAnswer = null;
      for (let item of knowledgeBase) {
        if (
          item.question.some(keyword =>
            new RegExp(`\\b${keyword}\\b`, "i").test(lowerInput)
          )
        ) {
          // 👇 prevent re-greeting after first message
          if (item.answer.includes("Hi! 👋") && hasGreeted.current) continue;
          foundAnswer = item.answer;
          break;
        }
      }



      if (foundAnswer) {
        setMessages(prev => [
          ...prev,
          { type: 'bot', text: foundAnswer, timestamp: new Date(), reacted: false },
        ]);
      } else {

        const lmsContext = await fetchLMSData(input);
        const chatHistory = buildConversationContext(messages);
        const trimmedHistory = chatHistory.slice(-1500); // Keep last ~1500 chars


        const prompt = `
You are EduMaster AI, the official assistant for ${LMS_API_BASE}.
You are having a conversation with a user about EduMaster courses.
Use both the conversation history and the LMS course data below to respond naturally.
Stay concise (2–4 sentences), friendly, and on-topic.

=== CONVERSATION HISTORY ===
${trimmedHistory}

=== COURSE DATA CONTEXT ===
${lmsContext}

User: ${input}
Assistant:
`;

        // ✅ 2. Call Gemini API for natural conversation
        const geminiResponse = await axios.post(
          GEMINI_API_URL,
          {
            contents: [{
              parts: [{ text: prompt }],
            }]
          },
          {
            headers: {
              'Content-Type': 'application/json',
              'X-goog-api-key': GEMINI_API_KEY,
            },
          }
        );

        let botReply =
          geminiResponse?.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "I'm sorry, I couldn't find that in our system.";


        // 🧩 Enforce brevity (hard cap)
        const trimmedReply =
          botReply.length > 400
            ? botReply.slice(0, 380).trim() + "..."
            : botReply;


        setMessages(prev => [
          ...prev,
          { type: 'bot', text: trimmedReply, timestamp: new Date(), reacted: false },
        ]);

        // ✅ 3. (Optional) LMS integration — fetch course data dynamically
        if (lowerInput.includes('courses') || lowerInput.includes('list')) {
          try {
            const { data: courses } = await axios.get(`${LMS_API_BASE}/api/courses`);
            const formattedCourses = courses
              .map(c => `• ${c.name} (${c.duration})`)
              .join('\n');
            setMessages(prev => [
              ...prev,
              {
                type: 'bot',
                text: `Here are some available courses:\n${formattedCourses}`,
                timestamp: new Date(),
                reacted: false,
              },
            ]);
          } catch (err) {
            console.error('LMS fetch error:', err);
          }
        }
      }
    } catch (err) {
      console.error('Error sending message:', err);
      setMessages(prev => [
        ...prev,
        {
          type: 'bot',
          text: '⚠️ Sorry, there was an issue reaching the AI server. Please try again later.',
          timestamp: new Date(),
          reacted: false,
        },
      ]);
    }

    setIsLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleMinimize = () => setIsMinimized(!isMinimized);
  const handleClose = () => {
    setMessages([]);
    hasGreeted.current = false; // ✅ Allow greeting again next time it opens
    onClose();
  };

  const formatTime = (d) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{
            opacity: 1,
            y: 0,
            scale: 1,
            height: isMinimized ? 60 : 660,
          }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className={`fixed bottom-5 right-28 w-[90vw] max-w-[350px] max-h-[80vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 ${isMinimized ? 'cursor-pointer' : ''
            }`}
          onClick={isMinimized ? toggleMinimize : undefined}
        >
          {/* Header */}
          <motion.div className="bg-gradient-to-r from-orange-500 to-orange-600 p-3 flex items-center justify-between h-14">
            <div className="flex items-center space-x-3">
              <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-sm">
                <RiRobot2Line className="text-orange-500 text-lg" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">
                  EduMaster AI
                </h3>
                {!isMinimized && (
                  <p className="text-xs text-orange-100">Course Assistant</p>
                )}
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={toggleMinimize}
                className="text-white hover:text-orange-200"
              >
                <FiChevronUp
                  className={`h-5 w-5 ${isMinimized ? 'rotate-180' : ''}`}
                />
              </motion.button>
              <motion.button
                onClick={handleClose}
                className="text-white hover:text-orange-200"
              >
                <FiX className="h-5 w-5" />
              </motion.button>
            </div>
          </motion.div>

          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 p-3 overflow-y-auto bg-gradient-to-b from-white to-gray-50">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`mb-3 flex ${msg.type === 'user'
                      ? 'justify-end'
                      : 'justify-start'
                      }`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl p-2.5 text-sm ${msg.type === 'user'
                        ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-br-none'
                        : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                        }`}
                    >
                      <div className={`whitespace-pre-line ${msg.type === 'user' ? "text-white" : " prose prose-sm  max-w-none"}`}><ReactMarkdown>{msg.text}</ReactMarkdown></div>
                      <div className="flex justify-between items-center mt-1">
                        <div
                          className={`text-xs ${msg.type === 'user'
                            ? 'text-orange-100'
                            : 'text-gray-500'
                            }`}
                        >
                          {formatTime(msg.timestamp)}
                        </div>
                        {msg.type === 'bot' && (
                          <motion.button
                            onClick={() => handleReaction(i)}
                            className={`ml-2 p-1 rounded-full ${msg.reacted
                              ? 'bg-orange-100 text-orange-600'
                              : 'text-gray-400 hover:text-orange-500'
                              }`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <FiThumbsUp className="h-3 w-3" />
                          </motion.button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="bg-white border border-gray-200 text-gray-800 rounded-2xl p-3 shadow-sm">
                      <span className="text-sm text-gray-600">
                        Thinking...
                      </span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-gray-200 bg-white">
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={userInput}
                    onChange={(e) => setUserInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask about any course..."
                    className="flex-1 p-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm"
                    disabled={isLoading}
                  />
                  <motion.button
                    onClick={handleSend}
                    disabled={isLoading || !userInput.trim()}
                    className={`p-3 rounded-xl ${isLoading || !userInput.trim()
                      ? 'bg-gray-200 text-gray-400'
                      : 'bg-gradient-to-br from-orange-500 to-orange-600 text-white'
                      }`}
                    animate={controls}
                  >
                    <FiSend className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Chatbot;
