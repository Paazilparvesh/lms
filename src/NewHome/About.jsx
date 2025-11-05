// import React from "react";

// export default function AboutSection() {
//   return (
//     <section className="bg-gradient-to-b from-[#fffaf8] to-[#f8fbff] text-center py-20 px-6">
//       {/* Badge + Heading */}
//       <div className="max-w-5xl mx-auto mb-10">
//         <div className="inline-block bg-orange-500 text-white text-xs font-semibold px-4 py-1 rounded-full mb-4">
//           About Us
//         </div>
//         <h2 className="text-xl sm:text-2xl md:text-3xl font-medium font-mono text-gray-500 leading-relaxed md:px-12">
//           We are passionate about{" "}
//           <span className="font-semibold text-black">empowering learners</span>{" "}
//           Worldwide with high-quality, accessible & engaging education. Our
//           mission offering <br className="hidden sm:block" />a diverse range of
//           courses.
//         </h2>
//       </div>

//       {/* Stats */}
//       <div className="flex flex-col sm:flex-row justify-center items-center gap-10 text-gray-800 font-mono">
//         <div className="text-center flex flex-col lg:flex-row lg:gap-5">
//           <p className="text-3xl font-extrabold text-black">25+</p>
//           <p className="text-sm mt-1">
//             Years of eLearning
//             <br />
//             Education Experience
//           </p>
//         </div>

//         <div className="border-l border-gray-300 h-10 hidden sm:block" />

//         <div className="text-center flex flex-col lg:flex-row lg:gap-5">
//           <p className="text-3xl font-extrabold text-black">56k</p>
//           <p className="text-sm mt-1">
//             Students Enrolled in
//             <br />
//             LMSZONE Courses
//           </p>
//         </div>

//         <div className="border-l border-gray-300 h-10 hidden sm:block" />

//         <div className="text-center flex flex-col lg:flex-row lg:gap-5">
//           <p className="text-3xl font-extrabold text-black">170+</p>
//           <p className="text-sm mt-1">
//             Experienced Teacher's
//             <br />
//             service.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }




import React from "react";

export default function AboutSection() {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#fffaf8] via-[#fcf2e7] to-[#f8fbff] flex items-center justify-center px-6 py-20 text-center font-mono">
      <div className="w-full max-w-6xl">
        {/* Badge + Heading */}
        <div className="mb-16">
          <span className="inline-block bg-orange-500 text-white text-xs sm:text-sm font-semibold px-5 py-1.5 rounded-full mb-6 shadow-md">
            About Us
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-relaxed text-gray-800">
            We are passionate about{" "}
            <span className="text-black font-extrabold">empowering learners</span>{" "}
            worldwide with high-quality, accessible & engaging education.
          </h2>
          <p className="mt-4 text-gray-600 text-sm sm:text-base max-w-3xl mx-auto">
            Our mission is to offer a diverse range of courses tailored to help
            you grow in your career and passions — at your pace, on your terms.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-0 border-t border-b border-gray-200 py-10 text-gray-800">
          <div className="flex flex-col items-center">
            <p className="text-4xl font-extrabold text-black">25+</p>
            <p className="text-sm mt-2 text-gray-600">
              Years of eLearning <br className="hidden sm:block" />
              Education Experience
            </p>
          </div>

          <div className="hidden sm:flex justify-center">
            <div className="w-px bg-gray-300 h-full" />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-4xl font-extrabold text-black">56k</p>
            <p className="text-sm mt-2 text-gray-600">
              Students Enrolled in <br className="hidden sm:block" />
              LMSZONE Courses
            </p>
          </div>

          <div className="hidden sm:flex justify-center">
            <div className="w-px bg-gray-300 h-full" />
          </div>

          <div className="flex flex-col items-center">
            <p className="text-4xl font-extrabold text-black">170+</p>
            <p className="text-sm mt-2 text-gray-600">
              Experienced Teachers <br className="hidden sm:block" />
              Delivering Excellence
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
