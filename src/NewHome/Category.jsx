// import {
//   BookOpen,
//   Brain,
//   Briefcase,
//   TrendingUp,
//   Activity,
//   BarChart3,
//   PieChart,
// } from "lucide-react";

// const categories = [
//   { title: "Stock Market", subtitle: "50+ courses", icon: <TrendingUp /> },
//   { title: "Futures Crude Palm", subtitle: "30+ courses", icon: <BarChart3 /> },
//   { title: "Funded Traded", subtitle: "70+ courses", icon: <Briefcase /> },
//   { title: "Trading", subtitle: "25+ courses", icon: <Activity /> },
//   { title: "Business", subtitle: "30+ courses", icon: <BookOpen /> },
//   { title: "Invest", subtitle: "100+ courses", icon: <PieChart /> },
//   { title: "Technical trader", subtitle: "15+ courses", icon: <BarChart3 /> },
//   { title: "AI", subtitle: "20+ courses", icon: <Brain /> },
// ];

// export default function Category() {
//   return (
//     <section className="py-12 px-4 md:px-12 lg:px-24 bg-white">
//       <h2 className="text-2xl md:text-3xl font-semibold font-mono text-gray-800 mb-8">
//         Top categories
//       </h2>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//         {categories.map((cat, i) => (
//           <div
//             key={i}
//             className="bg-orange-50 hover:bg-orange-100 transition-all p-4 rounded-xl shadow-sm flex items-center gap-4"
//           >
//             <div className="text-orange-500 bg-white p-2 rounded-lg shadow-md">
//               {cat.icon}
//             </div>
//             <div>
//               <h3 className="font-medium text-gray-900">{cat.title}</h3>
//               <p className="text-sm text-gray-500">{cat.subtitle}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import aiAnimation from "/src/assets/Robot.json";
import graphicsAnimation from "/src/assets/Adobe Photoshop.json";
import webAnimation from "/src/assets/React Logo.json";

const categories = [
  {
    id: 6,
    title: "Graphics Designer",
    desc: "Design stunning visuals.",
    span: "col-span-2",
  },
  {
    id: 2,
    title: "App Development",
    desc: "Build Android & iOS apps.",
    span: "",
  },
  {
    id: 3,
    title: "Web Development",
    desc: "Learn frontend + backend skills.",
    span: "row-span-2",
  },
  {
    id: 4,
    title: "WordPress Development",
    desc: "This course is for students with little to no English.",
    span: "",
  },
  {
    id: 5,
    title: "AI & Machine Learning",
    desc: "Explore AI & ML concepts.",
    span: "col-span-2",
  },
];

export default function CategoryBentoGrid() {
  return (
    <section className="bg-[#fef4f2] pt-5 pb-20 px-6 text-center font-mono">
      <div className="mb-12">
        <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full inline-block mb-4">
          Categories
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Choice Favourite Course <br /> from top category
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-7xl mx-auto auto-rows-[200px]">
        {categories.map((item, i) => {
          const showLeftLottie =
            item.title === "AI & Machine Learning" ||
            item.title === "Graphics Designer";
          const showBottomLottie = item.title === "Web Development";

          const getLottieAnimation = () => {
            switch (item.title) {
              case "AI & Machine Learning":
                return aiAnimation;
              case "Graphics Designer":
                return graphicsAnimation;
              case "Web Development":
                return webAnimation;
              default:
                return null;
            }
          };

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={`group relative bg-white rounded-2xl shadow-lg p-6 text-left flex flex-col justify-between hover:shadow-xl transition-all duration-300 ${item.span}`}
            >
              <div
                className={`flex ${
                  showLeftLottie
                    ? "flex-row items-center gap-4"
                    : "flex-col justify-center"
                }`}
              >
                {/* Text block */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                  <div className="mt-4 text-xs bg-orange-100 text-orange-500 px-3 py-1 rounded-full font-semibold w-fit">
                    ● 4+ Courses
                  </div>
                </div>

                {/* Lottie on Left */}
                {showLeftLottie && (
                  <div className="w-24 h-24 sm:w-40  transition-all duration-300">
                    <Lottie animationData={getLottieAnimation()} />
                  </div>
                )}
              </div>

              {/* Lottie on Bottom (Web Dev) */}
              {showBottomLottie && (
                <div className="w-full flex justify-center items-center mt-4 transition-all duration-300">
                  <Lottie animationData={getLottieAnimation()} />
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      <div className="mt-6">
        <button className="bg-black text-white px-6 py-2 rounded-full hover:bg-gray-800 transition">
          See All Category
        </button>
      </div>
    </section>
  );
}
