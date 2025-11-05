// import student from "/src/assets/profile/pic.png";
// import darkBG from "/src/assets/bg/BlackMap.png";
// import lightBG from "/src/assets/bg/WhiteMap.png";
// import { FaQuoteLeft } from "react-icons/fa";
// import useTheme from "/src/Hooks/ThemeHook.js";
// import { useEffect, useState } from "react";
// import axios from "axios";

// const TestimonialCarousel = () => {
//   const isDarkMode = useTheme();
//   const [testimonials,setTestimonials]=useState([])
//   const backgroundImage = isDarkMode ? darkBG : lightBG;

//   useEffect(()=>{
//     axios.get(`https://lmsdemo.thirdvizion.com/api/feedbacklistview/`).then((res)=>{
//       console.log(res.data)
//       setTestimonials(res.data)
//     }).catch((err)=>{
//       console.log("Error",err)
//     })

//   },[])

//   return (
//     <div
//       className="overflow-x-hidden bg-no-repeat bg-cover py-20 dark:bg-black transition-colors duration-500"
//       style={{ backgroundImage: `url(${backgroundImage})` }}
//     >
//       <div className="text-center px-4">
//         <h2
//           className={`text-4xl md:text-5xl xl:text-5xl font-news text-center ${
//             isDarkMode ? "text-white" : "text-black"
//           }`}
//         >
//           What our <span className="text-[#F97316]">Students</span> Say!
//         </h2>
//       </div>
//       <div className="relative w-full mt-20">
//         <div
//           className="flex animate-scroll whitespace-nowrap gap-6 sm:gap-8 px-6 sm:px-12"
//           onMouseEnter={(e) =>
//             (e.currentTarget.style.animationPlayState = "paused")
//           }
//           onMouseLeave={(e) =>
//             (e.currentTarget.style.animationPlayState = "running")
//           }
//         >
//           {testimonials.map((t, i) => (
//             <div
//               key={i}
//               className={`flex-shrink-0 w-[90%] sm:w-[65%] md:w-[50%] lg:w-[38%] xl:w-[30%] 2xl:w-[28%]
//                 ${
//                   isDarkMode
//                     ? "bg-white/5 border-white/10"
//                     : "bg-black/5 border-black/10"
//                 }
//                 backdrop-blur-sm border rounded-2xl shadow-md p-6 sm:p-8 text-start transition-all duration-300 hover:scale-105`}
//             >
//               <div className="text-[#FF8922] text-4xl font-serif mb-3">
//                 <FaQuoteLeft />
//               </div>

//               <p
//                 className={`italic text-sm font-manrope text-wrap sm:text-base mb-6 line-clamp-5 ${
//                   isDarkMode ? "text-gray-200" : "text-gray-700"
//                 }`}
//               >
//                 {t.feedback}
//               </p>

//               <div className="flex items-center gap-4">
//                 <img
//                   src={student}
//                   alt="Student"
//                   className="w-12 h-12 rounded-full"
//                 />
//                 <div>
//                   <h3
//                     className={`font-semibold text-base ${
//                       isDarkMode ? "text-white" : "text-black"
//                     }`}
//                   >
//                     {t.student}
//                   </h3>
//                   <p
//                     className={`text-xs ${
//                       isDarkMode ? "text-gray-400" : "text-gray-600"
//                     }`}
//                   >
//                     {t.course}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}

//           <style jsx>{`
//             @keyframes scroll {
//               0% {
//                 transform: translateX(0);
//               }
//               100% {
//                 transform: translateX(-50%);
//               }
//             }

//             .animate-scroll {
//               animation: scroll 20s linear infinite;
//             }
//           `}</style>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TestimonialCarousel

// import { useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import clsx from "clsx";

// const testimonials = [
//   {
//     quote:
//       "Our clinic has seen a significant improvement in efficiency since implementing this medical dashboard platform.",
//     name: "Lisa Rodriguez",
//     role: "Practice Administrator",
//     image: "https://randomuser.me/api/portraits/women/44.jpg",
//   },
//   {
//     quote:
//       "Our hospital system relies on the data-driven insights provided by this medical dashboard platform.",
//     name: "Dr. Sarah Martinez",
//     role: "Family Physician",
//     image: "https://randomuser.me/api/portraits/women/68.jpg",
//   },
//   {
//     quote:
//       "The user-friendly interface has reduced the administrative burden, allowing me to spend more time with my patients.",
//     name: "Mark Thompson",
//     role: "Hospital Administrator",
//     image: "https://randomuser.me/api/portraits/men/42.jpg",
//   },
//   {
//     quote:
//       "The user-friendly interface has reduced the administrative burden, allowing me to spend more time with my patients.",
//     name: "Mark Thompson",
//     role: "Hospital Administrator",
//     image: "https://randomuser.me/api/portraits/men/42.jpg",
//   },
//   {
//     quote:
//       "The user-friendly interface has reduced the administrative burden, allowing me to spend more time with my patients.",
//     name: "Mark Thompson",
//     role: "Hospital Administrator",
//     image: "https://randomuser.me/api/portraits/men/42.jpg",
//   },
// ];

// export default function TestimonialsSlider() {
//   const [index, setIndex] = useState(0);

//   const handlePrev = () => setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
//   const handleNext = () => setIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));

//   return (
//     <section className="bg-gradient-to-br from-orange-100 to-orange-50 py-16 px-4 md:px-20 font-mono">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
//           <div>
//             <p className="text-sm text-orange-700 font-semibold uppercase tracking-wide mb-2">Testimonials</p>
//             <h2 className="text-3xl md:text-4xl font-extrabold text-orange-800 mb-3">
//               Our Platform's Impact in
//               <br className="hidden md:block" /> Their Own Words
//             </h2>
//           </div>
//           <p className="max-w-xl text-sm md:text-base text-orange-700">
//             Dive into inspiring success stories that showcase how our platform has empowered healthcare practices, improved
//             efficiency, and elevated patient satisfaction.
//           </p>
//         </div>

//         {/* Slider controls */}
//         <div className="flex justify-end items-center mb-4 gap-3">
//           <button
//             className="p-2 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100"
//             onClick={handlePrev}
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <span className="text-sm text-orange-700 font-semibold">
//             {String(index + 1).padStart(2, "0")}/{String(testimonials.length).padStart(2, "0")}
//           </span>
//           <button
//             className="p-2 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100"
//             onClick={handleNext}
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>

//         {/* Testimonials */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {testimonials.map((t, i) => (
//             <div
//               key={i}
//               className={clsx(
//                 "rounded-xl p-6 border border-orange-100 transition-all duration-300 shadow-sm bg-white hover:shadow-lg",
//                 i === index ? "scale-[1.03] border-orange-400 shadow-orange-200" : "opacity-60 hover:opacity-100"
//               )}
//             >
//               <p className="text-sm text-gray-800 italic mb-5">“{t.quote}”</p>
//               <div className="flex items-center gap-4 mt-auto">
//                 <img
//                   src={t.image}
//                   alt={t.name}
//                   className="w-10 h-10 rounded-full object-cover border-2 border-orange-300"
//                 />
//                 <div>
//                   <p className="text-sm font-semibold text-orange-700">{t.name}</p>
//                   <p className="text-xs text-gray-500">{t.role}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const testimonials = [
  {
    quote:
      "Our clinic has seen a significant improvement in efficiency since implementing this medical dashboard platform.",
    name: "Lisa Rodriguez",
    role: "Practice Administrator",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "Our hospital system relies on the data-driven insights provided by this medical dashboard platform.",
    name: "Dr. Sarah Martinez",
    role: "Family Physician",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    quote:
      "The user-friendly interface has reduced the administrative burden, allowing me to spend more time with my patients.",
    name: "Mark Thompson",
    role: "Hospital Administrator",
    image: "https://randomuser.me/api/portraits/men/42.jpg",
  },
  {
    quote:
      "We've optimized our scheduling system thanks to this intuitive dashboard. Great experience!",
    name: "Anna Kim",
    role: "Clinic Manager",
    image: "https://randomuser.me/api/portraits/women/20.jpg",
  },
  {
    quote:
      "This platform has become a vital tool in our day-to-day operations. Highly recommended.",
    name: "James Carter",
    role: "Health IT Lead",
    image: "https://randomuser.me/api/portraits/men/55.jpg",
  },
];

export default function TestimonialsSlider() {
  const [index, setIndex] = useState(0);

  const handlePrev = () => setIndex((prev) => (prev > 0 ? prev - 1 : prev));

  const handleNext = () =>
    setIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : prev));

  return (
    <section className="bg-gradient-to-br from-orange-100 to-orange-50 py-16 px-8 font-mono">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <p className="text-orange-500 font-semibold">Testimonials</p>
            <h2 className="text-2xl md:text-2xl lg:text-3xl xl:text-4xl max-w-sm lg:max-w-md xl:max-w-lg mb-4 font-bold font-mono">
              Our Platform's Impact in Their{" "}
              <span className="text-orange-500">Own Words</span>
            </h2>
          </div>
          <p className="max-w-xs lg:max-w-sm text-xs text-start md:text-right leading-relaxed text-gray-700">
            Dive into inspiring success stories that showcase how our platform
            has empowered healthcare practices, improved efficiency, and
            elevated patient satisfaction.
          </p>
        </div>

        {/* Controls */}
        <div className="flex justify-center md:justify-end items-center mb-6 gap-3">
          <button
            className="p-2 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100"
            onClick={handlePrev}
          >
            <ChevronLeft size={20} />
          </button>
          <span className="text-sm text-orange-700 font-semibold">
            {String(index + 1).padStart(2, "0")}/
            {String(testimonials.length).padStart(2, "0")}
          </span>
          <button
            className="p-2 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100"
            onClick={handleNext}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Carousel */}
        <div className="relative overflow-hidden max-w-[1020px] mx-auto">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(calc(-${
                index * 340 - (1020 - 340) / 2
              }px))`,
            }}
          >
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={clsx(
                  "w-[300px] md:w-[320px] lg:w-[340px] shrink-0 transition-all duration-300",
                  i === index
                    ? "scale-105 opacity-100 z-10"
                    : "scale-95 opacity-60 z-0"
                )}
              >
                <div className="rounded-xl p-6 border border-orange-100 shadow-sm bg-white hover:shadow-lg">
                  <p className="text-sm text-gray-800 italic mb-5">
                    “{t.quote}”
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-orange-300"
                    />
                    <div>
                      <p className="text-sm font-semibold text-orange-700">
                        {t.name}
                      </p>
                      <p className="text-xs text-gray-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// import { useEffect, useState } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import clsx from "clsx";
// import useTheme from "/src/Hooks/ThemeHook";
// import student from "/src/assets/profile/pic.png";

// export default function TestimonialsSlider() {
//   const [index, setIndex] = useState(0);
//   const [testimonials, setTestimonials] = useState([]);
//   const isDarkMode = useTheme();

//   useEffect(() => {
//     fetch("https://lmsdemo.thirdvizion.com/api/feedbacklistview/")
//       .then((res) => res.json())
//       .then((data) => setTestimonials(data))
//       .catch((err) => console.error("Error fetching testimonials:", err));
//   }, []);

//   const handlePrev = () =>
//     setIndex((prev) => (prev > 0 ? prev - 1 : prev));
//   const handleNext = () =>
//     setIndex((prev) => (prev < testimonials.length - 1 ? prev + 1 : prev));

//   return (
//     <section className="bg-gradient-to-br from-orange-100 to-orange-50 py-16 px-4 md:px-20 font-mono">
//       <div className="max-w-6xl mx-auto">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
//           <div>
//             <p className="text-orange-500 font-semibold">Testimonials</p>
//             <h2 className="text-2xl md:text-4xl font-bold font-mono">
//               What our <span className="text-orange-600">Students</span> Say!
//             </h2>
//           </div>
//           <p className="max-w-xl text-sm md:text-base text-orange-700">
//             Dive into inspiring success stories that showcase how our platform
//             has empowered learners, improved outcomes, and fostered growth.
//           </p>
//         </div>

//         {/* Controls */}
//         <div className="flex justify-end items-center mb-6 gap-3">
//           <button
//             className="p-2 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100"
//             onClick={handlePrev}
//             disabled={index === 0}
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <span className="text-sm text-orange-700 font-semibold">
//             {String(index + 1).padStart(2, "0")}/
//             {String(testimonials.length).padStart(2, "0")}
//           </span>
//           <button
//             className="p-2 rounded-full border border-orange-300 text-orange-500 hover:bg-orange-100"
//             onClick={handleNext}
//             disabled={index === testimonials.length - 1}
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>

//         {/* Carousel */}
//         <div className="relative overflow-hidden max-w-[1020px] mx-auto">
//           <div
//             className="flex gap-6 transition-transform duration-500 ease-in-out"
//             style={{
//               transform: `translateX(calc(-${
//                 index * 340 - (1020 - 340) / 2
//               }px))`,
//             }}
//           >
//             {testimonials.map((t, i) => (
//               <div
//                 key={i}
//                 className={clsx(
//                   "w-[300px] md:w-[320px] lg:w-[340px] shrink-0 transition-all duration-300",
//                   i === index
//                     ? "scale-105 opacity-100 z-10"
//                     : "scale-95 opacity-60 z-0"
//                 )}
//               >
//                 <div
//                   className={clsx(
//                     "rounded-xl p-6 shadow-sm hover:shadow-lg",
//                     isDarkMode
//                       ? "bg-white/5 border border-white/10 text-gray-200"
//                       : "bg-white border border-orange-100 text-gray-800"
//                   )}
//                 >
//                   <p className="text-sm italic mb-5 line-clamp-5">
//                     “{t.feedback}”
//                   </p>
//                   <div className="flex items-center gap-4 mt-auto">
//                     <img
//                       src={student}
//                       alt={t.student}
//                       className="w-10 h-10 rounded-full object-cover border-2 border-orange-300"
//                     />
//                     <div>
//                       <p className="text-sm font-semibold text-orange-700">
//                         {t.student}
//                       </p>
//                       <p className="text-xs text-gray-500">{t.course}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
