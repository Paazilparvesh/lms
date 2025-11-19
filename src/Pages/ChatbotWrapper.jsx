import React, { useState } from "react";
import Chatbot from "/src/NewHome/Chatbot.jsx";
import { RiRobot2Line } from "react-icons/ri";

const ChatbotWrapper = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed bottom-5 right-5 
            bg-orange-500 
            text-white 
            p-4 
            rounded-full 
            shadow-lg 
            hover:bg-orange-600 
            transition 
            z-[100]
          "
        >
          <RiRobot2Line size={28} />
        </button>
      )}

      {/* Chatbot Window */}
      <Chatbot 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
};

export default ChatbotWrapper;
