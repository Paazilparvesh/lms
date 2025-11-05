// import { useEffect, useState } from "react";
// import VanillaTilt from "vanilla-tilt";
// import axios from "axios";
// import learnBGDark from "../../assets/newImage/BlackBg.png";
// import learnBGLight from "../../assets/newImage/WhiteBg.png";
// import useTheme from "/src/Hooks/ThemeHook.js";

// export default function DarkCourseCard() {
//   const isDarkMode = useTheme()
//   const [category, setCategory] = useState([]);

//   useEffect(() => {
//     axios
//       .get(import.meta.env.VITE_View_Category)
//       .then((res) => setCategory(res.data))
//       .catch((err) => console.error("Error fetching categories:", err));
//   }, []);

//   useEffect(() => {
//     const tiltElements = document.querySelectorAll(".tilt-card");
//     if (tiltElements.length > 0) {
//       VanillaTilt.init(tiltElements, {
//         max: 15,
//         speed: 1000,
//         glare: true,
//         "max-glare": 0.4,
//       });
//     }
//     return () => {
//       tiltElements.forEach((el) => el.vanillaTilt?.destroy());
//     };
//   }, [category]);

//   const cards = category.slice(0, 4);
//   const bgImage = isDarkMode ? learnBGDark : learnBGLight;

//   return (
//     <div
//       className="relative flex flex-col items-center justify-center px-4 py-16 transition-colors duration-500"
//      style={{
//   backgroundImage: `url(${bgImage})`,
//   backgroundSize: "cover",
//   backgroundPosition: "center",
// }}
//     >
//       <div className="absolute inset-0 z-0 flex justify-center px-2 sm:px-4 pointer-events-none">
//         <div className="
//           w-full max-w-[1440px]
//           mt-8 sm:mt-10
//           mb-5
//           min-h-[80%]
//           p-5 rounded-3xl
//           bg-white/10 dark:bg-white/5
//           backdrop-blur-sm bg-opacity-50 shadow-lg
//         " />
//       </div>

//       <h1 className="text-3xl md:text-4xl mt-3 xl:text-5xl z-10 font-news text-[#F97316] text-center mb-12">
//         Choose By Category
//       </h1>

//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-7xl z-10">
//         {cards.map((card, idx) => (
//           <div
//             key={idx}
// className="tilt-card group relative h-[300px] min-w-[200px] sm:h-[450px] sm:min-w-[250px] ...
//             bg-white/60 dark:bg-white/10
//             backdrop-blur-sm rounded-3xl shadow-xl overflow-hidden flex items-end text-center transition-all duration-500"
//           >
//             <img
//               src={card.image}
//               alt={card.name}
//               className="absolute top-0 left-0 w-full h-full object-fit z-0"
//             />
//             <div className="absolute inset-0 bg-black/60 dark:bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
//             <div className="relative z-20 w-full px-6 py-8 text-white transform translate-y-32 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 ease-out">
//               <h2 className="text-2xl font-bold font-manrope mb-4">
//                 {card.name}
//               </h2>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

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
    <section className="bg-[#fef4f2] pt-5 pb-20 px-6 text-left md:text-center font-mono">
      <div className="mb-12 mt-6">
        <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full inline-block mb-4">
          Categories
        </span>
        <h2 className="text-2xl md:text-4xl font-bold capitalize text-gray-900">
          Choose from top <span className="text-orange-500">category</span>
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

                {/* Lottie on Left (desktop only) */}
                {showLeftLottie && (
                  <div className="w-24 h-24 sm:w-40 transition-all duration-300 hidden sm:block">
                    <Lottie animationData={getLottieAnimation()} />
                  </div>
                )}
              </div>

              {/* Lottie on Bottom (desktop only) */}
              {showBottomLottie && (
                <div className="w-full justify-center items-center mt-4 transition-all duration-300 hidden sm:flex">
                  <div className="w-24 h-24 sm:w-32">
                    <Lottie animationData={getLottieAnimation()} />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
