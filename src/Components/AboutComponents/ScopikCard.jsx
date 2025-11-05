// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import heroImage from "../../assets/newImage/About4.png";

// export default function ScopikBanner() {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setTheme(localStorage.getItem("theme") || "light");
//     });
//     observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

//     return () => observer.disconnect();
//   }, []);

//   const isDark = theme === "dark";

//   return (
//     <div className="relative w-full">
//       {/* Top Image Section */}
//       <div className="relative w-full h-[500px] overflow-hidden">
//         <img
//           src={heroImage}
//           alt="Scopik VR"
//           className="w-full h-full object-cover object-top"
//         />

//         {/* Centered Text
//         <div className="absolute bottom-[40px] left-1/2 transform -translate-x-1/2 z-10 text-white text-center">
//           <h2
//             className={`text-3xl sm:text-4xl md:text-5xl font-semibold font-serif drop-shadow-lg ${
//               isDark ? "text-white" : "text-black"
//             }`}
//           >
//             Learn in{" "}
//             <span className={`${isDark ? "text-orange-400" : "text-[#FF6A00]"}`}>
//               Scopik
//             </span>
//           </h2>
//         </div> */}

//         {/* Updated forward wave format */}
//         <svg
//           className="absolute bottom-0 w-full"
//           viewBox="0 0 1440 220"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill={isDark ? "#000000" : "#ffffff"}
//             d="M0,160 C360,260 1080,60 1440,160 L1440,320 L0,320 Z"
//           />
//         </svg>
//       </div>

//       {/* Main Content Section */}
//       <div className="w-full bg-white dark:bg-black text-black dark:text-white py-16 px-6 md:px-12 lg:px-20 flex items-center justify-center transition-colors duration-500">
//         <div className="w-full max-w-3xl text-center">
//           {/* Move the heading above the paragraph */}
//           <h2 className={`text-3xl sm:text-4xl md:text-5xl font-semibold font-serif drop-shadow-lg ${isDark ? "text-white" : "text-black"}`}>
//             Learn in{" "}
//             <span className={`${isDark ? "text-orange-400" : "text-[#FF6A00]"}`}>
//               Scopik
//             </span>
//           </h2>
//           <p className="text-base sm:text-lg lg:text-xl text-gray-700 dark:text-gray-300 pt-6 leading-relaxed text-justify">
//             SCOPIK is deeply focused on AR/VR skill development, offering a NSQF,
//             NSDC, and MESC-recognized curriculum tailored to the needs of Industry
//             4.0. As an authorized Unity Education reseller, SCOPIK emphasizes
//             project-based learning backed by strong industry tie-ups. The
//             organization supports institutions with immersive lab setups and
//             delivers AICTE-aligned undergraduate programs to ensure academic
//             excellence. With robust placement support, regular guest lectures, and
//             meaningful academic partnerships, SCOPIK bridges the gap between
//             education and employability.
//           </p>
//           <div className="pt-8">
//             <Link to="/course">
//               <button className="bg-[#F97316] hover:bg-orange-600 text-white dark:text-black font-news text-lg px-6 py-3 rounded transition-all duration-300 border-2 border-transparent hover:border-orange-500 dark:hover:border-orange-400">
//                 Explore Course
//               </button>
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





import image from "/src/assets/Union.png";

function About() {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto px-6 py-16 flex flex-col-reverse md:flex-row items-center justify-between gap-12">
      {/* Left Content */}
      <div className="md:w-1/2 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl md:text-5xl scale-150 transition-all transform translate-x-40 -mt-32 font-semibold text-gray-900 leading-tight">
          Our Story the Journey <br />
          That’s Shapped <span className="text-orange-500">Our Success</span>
        </h1>
        <p className="text-gray-600 text-sm md:text-base max-w-md mx-auto md:mx-0 transition-all transform translate-y-16 translate-x-4">
          SHIFT is an agency studio that brings an innovative approach to the
          world of UI/UX design. We are committed to infusing the future into
          every project we undertake.
        </p>
        <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-lg font-medium transition-all transform translate-y-16 translate-x-4 w-fit mx-auto md:mx-0">
          Get Started with your Learning
        </button>
      </div>

      {/* Right Section */}
      <div className="md:w-1/2 w-full flex justify-center relative">
        <div className="relative w-fit">
          {/* Rounded Image */}
          <img
            src={image}
            alt="Success Journey"
            className="w-[300px] md:w-full scale-110 transition-all transform -translate-x-10 rounded-[0px_40px_0px_40px] object-cover"
          />

          {/* Review Box Overlay */}
          <div className="absolute -bottom-6 right-2 bg-white shadow-xl rounded-2xl p-4 w-[250px] md:w-[260px]">
            <h2 className="text-xl font-bold text-black">4.9/5</h2>
            <p className="text-sm text-gray-500">
              <span className="text-orange-500 text-base">★</span>{" "}
              <span className="font-medium text-gray-700">18,921</span>{" "}
              <span className="text-xs">(reviews)</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              Discover Our TrustScore & Customer Reviews
            </p>
            <div className="flex gap-1 mt-2">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-orange-500 text-lg">★</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
