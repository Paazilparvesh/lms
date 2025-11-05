// import React from "react";
// import { Users, BadgeCheck, BookOpen, User } from "lucide-react";

// function Stats() {
//   const stats = [
//     {
//       icon: <Users className="text-[#FF6A00] size-20 mb-2" />,
//       title: "12,836",
//       subtitle: "Students",
//     },
//     {
//       icon: <BadgeCheck className="text-[#FF6A00] size-20 mb-2" />,
//       title: "Certificate",
//       subtitle: "Provided",
//     },
//     {
//       icon: <BookOpen className="text-[#FF6A00] size-20 mb-2" />,
//       title: "Detailed",
//       subtitle: "Classes",
//     },
//     {
//       icon: <User className="text-[#FF6A00] size-20 mb-2" />,
//       title: "Professional",
//       subtitle: "Staffs",
//     },
//   ];
//   return (
//     <div className="py-20 px-4 text-center bg-white dark:bg-black transition-colors duration-500">
//       <h2 className="text-3xl md:text-4xl xl:text-5xl font-news pb-20 text-black dark:text-gray-300">
//         Know About The <span className="text-[#FF6A00]">Scopik</span>
//       </h2>

//       <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto px-4">
//         {stats.map((item, index) => (
//           <div
//             key={index}
//             className="bg-gray-100 dark:bg-[#0D0D0D] border border-gray-300 dark:border-[#1E1E1E] rounded-xl py-10 px-6 shadow-md transition-all duration-300 hover:border-[#FF6A00] hover:shadow-[0_0_20px_4px_#FF6A00] hover:scale-105"
//           >
//             <div className="flex flex-col items-center space-y-4">
//               <div className="text-[#FF6A00] text-4xl">{item.icon}</div>
//               <h4 className="text-xl font-semibold text-black dark:text-white">
//                 {item.title}
//               </h4>
//               <p className="text-sm text-gray-700 dark:text-gray-400">
//                 {item.subtitle}
//               </p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// export default Stats;

import React from "react";
import { motion } from "framer-motion";

const StatsSection = () => {
  return (
    <div className="bg-white py-16 px-6 sm:px-10 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start gap-4 mb-12"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-tight">
              Empowering Knowledge <br />
              that <span className="text-orange-500">transforms lives</span>
            </h2>
          </div>
          <div className="max-w-xs text-sm md:text-sm text-gray-600 text-left md:text-right">
            <p>
              Our LMS enables learners worldwide with expert-led courses, <br />
              real-world skills, and career-advancing certifications.
            </p>
          </div>
        </motion.div>

        {/* Stats Grid with Zigzag Effect */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard
            number="8+"
            label="Years of Educational Experience"
            bgColor="bg-[#0F172A]"
            textColor="text-white"
            delay={0}
            extraClass="-translate-y-10"
          />
          <StatCard
            number="120+"
            label="Certified Courses Offered"
            bgColor="bg-orange-600"
            textColor="text-white"
            delay={0.1}
            extraClass="-translate-y-4"
          />
          <StatCard
            number="10,000+"
            label="Learners Successfully Graduated"
            bgColor="bg-gray-400"
            textColor="text-white"
            delay={0.2}
            extraClass="translate-y-4"
          />
          <StatCard
            number="60+"
            label="Professional Instructors"
            bgColor="bg-orange-600"
            textColor="text-white"
            delay={0.3}
            extraClass="-translate-y-4"
          />
        </div>
      </div>
    </div>
  );
};

const StatCard = ({
  number,
  label,
  bgColor,
  textColor,
  delay,
  extraClass = "",
}) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    whileHover={{ y: -5, boxShadow: "0 10px 15px rgba(0,0,0,0.1)" }}
    className={`w-full md:aspect-square rounded-md p-6 flex flex-col justify-center items-start ${bgColor} ${extraClass} transition-all duration-300 cursor-default`}
  >
    <p className={`text-2xl sm:text-5xl font-bold ${textColor}`}>{number}</p>
    <p className={`text-sm sm:text-base mt-2 leading-tight ${textColor}`}>
      {label}
    </p>
  </motion.div>
);

export default StatsSection;
