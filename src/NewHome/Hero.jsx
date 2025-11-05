import React, { useState } from 'react';
import heroImg from '/src/assets/heroillustration.png';
import { motion } from 'framer-motion';
import Chatbot from './Chatbot';

const Hero = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div
      className="relative lg:min-h-screen px-6 py-16 lg:px-10 flex flex-col-reverse md:flex-row items-center justify-end gap-10 font-mono"
      style={{ backgroundColor: '#FFF4E5' }}
    >
      {/* Left Content */}
      <div className="w-full md:w-1/2">
        <h1 className="text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl xl:max-w-lg 2xl:max-w-xl font-bold text-black md:mt-5 mb-4">
          The Best Platform To <span className="text-orange-400">Learn</span> In
          Your Specials <span className="text-orange-400">Course.</span>
        </h1>

        <p className="text-base md:text-sm lg:text-md lg:max-w-sm xl:max-w-md leading-relaxed mb-8 text-gray-700">
          Learn anytime, anywhere with expert-led courses designed to boost your
          skills and knowledge. Gain real-world experience through interactive
          lessons and start achieving your career goals today.
        </p>

        {/* Buttons with emojis in horizontal layout */}
        <div className="flex flex-wrap gap-4">
          <button className="bg-white text-xs font-semibold py-3 px-3 lg:px-6 rounded-full shadow-md hover:bg-gray-100 transition flex items-center">
            <span className="mr-2">👨‍🏫</span> 100+ Expert Mentors
          </button>
          <button className="bg-white text-xs font-semibold py-3 px-4 lg:px-6 rounded-full shadow-md hover:bg-gray-100 transition flex items-center">
            <span className="mr-2">👥</span> 3k+ Active Learners
          </button>
        </div>
      </div>

      {/* Right Side Image */}
      <div className="w-full md:w-1/2">
        <img
          src={heroImg}
          alt="Student Learning"
          className="w-full h-auto object-contain"
        />
      </div>

      {/* Chatbot Floating Button */}
      <motion.button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-orange-500 to-orange-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-xl z-40"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          rotate: isChatOpen ? 180 : 0,
          scale: isChatOpen ? 1.1 : [1, 1.05, 1],
        }}
        transition={{
          rotate: { type: 'spring', stiffness: 300, damping: 20 },
          scale: {
            repeat: isChatOpen ? 0 : Infinity,
            duration: 1.5,
            ease: 'easeInOut',
          },
        }}
      >
        {isChatOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </motion.button>

      {/* Chatbot Component */}
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default Hero;