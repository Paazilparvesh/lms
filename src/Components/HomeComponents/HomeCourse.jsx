// import React, { useContext } from "react";
// import { CourseContext } from "/src/App";
// import { Link } from "react-router-dom";
// import { Star } from "lucide-react";

// export default function DigitalDreamsCard() {
//   const { Course = [] } = useContext(CourseContext);

//   const baseCourses = Course.slice(0, 5);
//   const scrollingCourses = [...baseCourses, ...baseCourses];

//   const handleMouseEnter = (e) => {
//     e.currentTarget.style.animationPlayState = "paused";
//   };

//   const handleMouseLeave = (e) => {
//     e.currentTarget.style.animationPlayState = "running";
//   };

//   return (
//     <div className="w-full bg-white dark:bg-black flex flex-col items-center justify-center overflow-hidden px-4 py-16 transition-colors duration-500">
//       {/* Title */}
//       <h1 className="text-3xl md:text-4xl xl:text-5xl mb-16 text-center text-[#F97316] font-news">
//         Trending Courses
//       </h1>

//       {/* Marquee wrapper */}
//       <div className="w-full relative mt-4 mb-10">
//         <div
//           className="flex gap-10 items-center w-max scroll"
//           onMouseEnter={handleMouseEnter}
//           onMouseLeave={handleMouseLeave}
//         >
//           {scrollingCourses.map((course, index) => (
//             <div
//               key={`course-${index}-${course.id}`}
//               className="relative group w-[300px] h-[220px] sm:w-[300px] rounded-3xl overflow-hidden transition-all duration-500 hover:h-[320px] text-black dark:text-white bg-white dark:bg-transparent 
//               hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
//             >
//               {/* Image */}
//               <img
//                 src={course.image}
//                 alt={course.name}
//                 className="w-full h-[180px] object-cover rounded-2xl shadow-md z-10 transition-transform duration-500"
//               />

//               {/* Hidden Content */}
//               <div className="absolute top-[160px] px-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 delay-200 w-full">
//                 <div className="flex flex-col items-center text-center">
//                   {/* TRENDING Badge */}
//                   <span className="inline-block bg-[#F97316] text-xs font-semibold px-3 py-1 rounded-full mb-2 text-white">
//                     TRENDING
//                   </span>

//                   {/* Ratings */}
//                   <div className="flex items-center space-x-1 mb-1">
//                     {[1, 2, 3, 4, 5].map((star) =>
//                       star <= Math.round(course.ratings) ? (
//                         <Star
//                           key={star}
//                           size={14}
//                           className="text-yellow-400 fill-yellow-400"
//                           strokeWidth={1.5}
//                         />
//                       ) : (
//                         <Star
//                           key={star}
//                           size={14}
//                           className="text-gray-400"
//                           strokeWidth={1.5}
//                           fill="none"
//                         />
//                       )
//                     )}
//                     <span className="text-xs text-[#F97316] ml-1">
//                       {course.ratings}
//                     </span>
//                   </div>

//                   {/* Course Name */}
//                   <h2 className="text-lg xl:text-xl font-bold font-news leading-tight group-hover:text-[#F97316]">
//                     {course.name}
//                   </h2>

//                   {/* View Course Button */}
//                   <div className="mt-4">
//                     <Link to={`/course/${course.id}`}>
//                       <button className="py-2 px-6 border-2 border-[#F97316] text-[#F97316] rounded-full text-sm md:text-base font-semibold transition-all duration-300 hover:bg-[#F97316] hover:text-white dark:hover:text-[#0B1C3F]">
//                         View Course
//                       </button>
//                     </Link>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Keyframes */}
//       <style>{`
//         @keyframes scroll {
//           0% {
//             transform: translateX(0%);
//           }
//           100% {
//             transform: translateX(-50%);
//           }
//         }

//         .scroll {
//           animation: scroll 40s linear infinite;
//         }
//       `}</style>
//     </div>
//   );
// }



import { useContext } from "react";
import { CourseContext } from "/src/App";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { PiGraphFill } from "react-icons/pi";
import { BsClock } from "react-icons/bs";
import { LuBookOpen } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function CourseShowcase() {
  const { Course = [] } = useContext(CourseContext);
  const displayedCourses = Course.slice(0, 4);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <FaStar
          key={`star-full-${i}`}
          className="text-orange-500 animate-pop-in"
        />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <FaStarHalfAlt
          key="star-half"
          className="text-orange-500 animate-pop-in"
        />
      );
    }

    while (stars.length < 5) {
      stars.push(
        <FaRegStar
          key={`star-empty-${stars.length}`}
          className="text-orange-300 animate-pop-in"
        />
      );
    }

    return stars;
  };

  const customDurations = ["28.4 hours", "20.3 hours", "18.2 hours", "12.5 hours"];
  const learnerCounts = ["14.3L+", "9.2L+", "7.8L+", "4.1L+"];
  const customPrices = [899, 990, 899, 990];

  return (
    <section className="py-20 px-4 sm:px-10 md:px-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300 font-mono">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 gap-4">
        <div>
          <p className="text-orange-500 font-semibold tracking-wide">Our Courses</p>
          <h2 className="text-3xl md:text-4xl font-bold leading-tight">
            Explore Our Popular <br className="sm:hidden" />
            <span className="text-orange-500">Course Offerings</span>
          </h2>
        </div>
        <Link to="/course">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full transition duration-300 shadow-md text-sm sm:text-base">
            View All Courses
          </button>
        </Link>
      </div>

      {/* Course Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {displayedCourses.map((course, index) => (
          <div
            key={course.id}
            className="bg-white dark:bg-[#111] rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 flex flex-col justify-between group"
          >
            {/* Image */}
            <div className="relative overflow-hidden">
              <img
                src={course.image}
                alt={course.name}
                className="w-full h-52 sm:h-40 object-cover transform group-hover:scale-105 transition-transform duration-300 rounded-t-3xl"
              />
              <div className="absolute top-3 right-3">
                <div className="bg-white text-orange-500 font-bold text-xs px-3 py-1 rounded-full shadow-md">
                  Free Course
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col gap-4 flex-grow">
              <h3 className="text-lg font-semibold line-clamp-2">{course.name}</h3>

              {/* Rating Stars Line */}
              <div className="flex items-center gap-2 text-base">
                <span className="text-gray-700 dark:text-gray-300 text-[17px] font-semibold transition-all duration-300">
                  Rating:
                </span>
                <div className="flex text-[18px] gap-[2px]">{renderStars(course.ratings)}</div>
              </div>

              {/* Info Row */}
              <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-400">
                {course.level && (
                  <span className="flex items-center gap-1">
                    <PiGraphFill className="text-orange-500" />
                    {course.level}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <BsClock className="text-orange-500" />
                  {customDurations[index]} - {learnerCounts[index]} learners
                </span>
                {course.lessons && (
                  <span className="flex items-center gap-1">
                    <LuBookOpen className="text-orange-500" />
                    {course.lessons} Lessons
                  </span>
                )}
              </div>

              {/* Price and Button */}
              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-base sm:text-lg">
                  Get this course for ₹{customPrices[index]}
                </span>
                <Link to={`/course/${course.id}`}>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm transition duration-300 shadow-md">
                    View Course
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
