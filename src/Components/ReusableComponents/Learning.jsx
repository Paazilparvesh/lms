// import image1 from "/src/assets/newImage/about1.png";
// import image2 from "/src/assets/newImage/about2.png";
// import image3 from "/src/assets/newImage/about3.png";

// function Learning() {
//   const learn = [
//     {
//       image: image1,
//       title: "Enrolling the Course",
//       para: "Easily sign up for your desired course with just a few clicks. Choose your topic, register online, and start learning right away.",
//     },
//     {
//       image: image2,
//       title: "Attend Assessments",
//       para: "Test your understanding with interactive assessments designed to reinforce key concepts and track your progress effectively.",
//     },
//     {
//       image: image3,
//       title: "Collect the Certificate",
//       para: "Receive a digital certificate upon course completion, showcasing your skills and achievements to employers or peers.",
//     },
//   ];

//   return (
//     <div className="w-full pb-10 px-4 sm:px-10 bg-white text-black dark:bg-black dark:text-white transition-colors duration-500">
//       <h2 className="text-3xl md:text-4xl xl:text-5xl font-news text-orange-500 dark:text-[#FF6A00] text-center mb-10">
//         Learning Process
//       </h2>

//       <div className="flex justify-center">
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl">
//           {learn.map((l, index) => (
//             <div
//               key={index}
//               className={`bg-white/80 dark:bg-white/5 border border-gray-200 dark:border-purple-300/20 text-black dark:text-white backdrop-blur-md rounded-2xl shadow-lg p-6 sm:p-8 hover:border-[#FF6A00] hover:shadow-[0_0_20px_4px_#FF6A00] hover:scale-105 transition-all duration-500 ${
//                 index === 2 ? "sm:col-span-2 sm:mx-auto lg:col-span-1 lg:mx-0" : ""
//               }`}
//             >
//               <img
//                 src={l.image}
//                 alt={l.title}
//                 className="w-20 h-20 mx-auto object-contain mb-6"
//               />
//               <h3 className="text-xl sm:text-2xl font-manrope font-semibold text-center text-black dark:text-white mb-3">
//                 {l.title}
//               </h3>
//               <p className="text-sm sm:text-base font-manrope text-center text-gray-700 dark:text-gray-300">
//                 {l.para}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Learning

import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-orange-100">
      <div className="w-full px-8 sm:px-12 md:px-20 lg:px-32 py-20 font-mono">
        <div className="mb-12">
          <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full inline-block mb-4">
            About Us
          </span>
          <h2 className="text-5xl font-bold text-black text-left">
            Get to Know About Us
          </h2>
        </div>

        {/* Horizontal layout - Stats on left, text on right */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12 w-full">
          {/* Stats Section - 2x2 grid */}
          <div className="flex flex-col gap-6 w-full md:w-1/2">
            <div className="flex w-full gap-5">
              <div className="bg-white/40 p-6 rounded-lg shadow-md text-left">
                <p className="text-6xl font-bold text-orange-600">100+</p>
                <p className="text-gray-600 text-xl">Courses Available</p>
              </div>
              <div className="bg-white/40 p-6 rounded-lg shadow-md text-left">
                <p className="text-6xl font-bold text-orange-600">98%</p>
                <p className="text-gray-600 text-lg">
                  Learner Satisfaction Rate
                </p>
              </div>
            </div>
            <div className="flex w-full gap-5">
              <div className="bg-white/40 p-6 rounded-lg shadow-md text-left">
                <p className="text-6xl font-bold text-orange-600">25</p>
                <p className="text-gray-600 text-xl">
                  Industry-Aligned Certifications
                </p>
              </div>
              <div className="bg-white/40 p-6 rounded-lg shadow-md text-left">
                <p className="text-6xl font-bold text-orange-600">10K+</p>
                <p className="text-gray-600 text-xl">
                  Active Learners in Our Community
                </p>
              </div>
            </div>
          </div>

          {/* Text Content - Right side */}
          <div className="w-full md:w-1/2 xl:-mt-24 flex flex-col justify-between ">
            <div className="mb-6">
              <p className="text-lg xl:text-3xl text-gray-700 mb-6">
                Unlock your potential, master new skills, and shape your future.
                Knowledge is our journey—let's make it limitless.
              </p>
            </div>
            <div className="bg-orange-100 rounded-lg h-full">
              <p className="text-gray-700 text-xs xl:text-lg leading-relaxed">
                At our core, we believe that learning should be accessible,
                engaging, and empowering. Our platform is designed to support
                learners, educators, and organizations by delivering
                high-quality, flexible, and technology-driven education
                solutions.Whether you're a student striving to improve your
                skills, a teacher adapting to digital tools, or a business
                seeking efficient training solutions, our LMS is built to meet
                your needs. With a wide range of features—from interactive
                lessons and real-time progress tracking to certification and
                collaboration tools—we make learning more effective and
                enjoyable.Driven by innovation and guided by a learner-first
                approach, we are committed to transforming education, one step
                at a time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
