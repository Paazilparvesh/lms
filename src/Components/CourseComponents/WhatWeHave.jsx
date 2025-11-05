import React from "react";
import {
  FaUserPlus,
  FaBookReader,
  FaLaptopCode,
  FaCertificate,
} from "react-icons/fa";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <FaUserPlus className="text-3xl text-orange-500" />,
    title: "Enroll",
    description:
      "Join the course by signing up and getting instant access to content.",
  },
  {
    icon: <FaBookReader className="text-3xl text-orange-500" />,
    title: "Learn",
    description:
      "Go through expertly crafted lessons, videos, and materials at your pace.",
  },
  {
    icon: <FaLaptopCode className="text-3xl text-orange-500" />,
    title: "Apply",
    description:
      "Practice with quizzes, hands-on projects, and real-world assignments.",
  },
  {
    icon: <FaCertificate className="text-3xl text-orange-500" />,
    title: "Certify",
    description:
      "Earn a certificate upon successful completion to boost your profile.",
  },
];

const WorkProcess = () => {
  return (
    <section className="bg-white py-16 px-6 md:px-20 font-mono w-full min-h-screen flex flex-col justify-center">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        {/* Top Heading */}
        <div className="text-start mb-6 md:mb-0">
          <p className="text-orange-500 font-semibold text-sm tracking-wider mb-2">
            OUR LEARNING FLOW
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            How Does Our <span className="text-orange-500">LMS Work?</span>
          </h2>
        </div>
        <p className="text-gray-600 max-w-lg text-start md:text-end">
          Our platform is designed to guide you step-by-step—from enrolling to
          earning your certificate. Here's how we structure your learning
          journey.
        </p>
      </div>

      {/* Step Cards with Dotted Line */}
      <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mt-12 text-center">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col items-center transform transition duration-300 hover:scale-105"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="w-16 h-16 flex items-center justify-center rounded-full bg-white shadow-md border border-dotted border-orange-500 mb-4 z-10 transition-all duration-300"
            >
              {step.icon}
            </motion.div>
            <h3 className="font-semibold text-lg text-gray-900 mb-2">
              {step.title}
            </h3>
            <p className="text-gray-600 text-sm max-w-xs">{step.description}</p>
          </motion.div>
        ))}

        {/* Dotted connector line */}
        <div className="hidden md:block absolute top-8 left-28 right-0 h-1 w-[68vw] border-t border-dotted border-orange-300 z-0" />
      </div>
    </section>
  );
};

export default WorkProcess;
