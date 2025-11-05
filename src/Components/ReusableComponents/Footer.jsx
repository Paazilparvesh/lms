// import { Link } from "react-router-dom";
// import pic from "/src/assets/Footer/girl.png";
// import Logo from "/src/assets/logo/NewLogo.png";
// import useTheme from "/src/Hooks/ThemeHook.js";

// function Footer() {
//   const isDarkMode = useTheme();

//   const backgroundStyle = {
//     backgroundColor: isDarkMode ? "#000000" : "#ffffff",
//   };

//   const textColor = isDarkMode ? "text-gray-400" : "text-gray-800";
//   const mutedText = isDarkMode ? "text-gray-400" : "text-gray-600";
//   const hoverColor = "hover:text-orange-500";

//   return (
//     <div className="relative z-20" style={backgroundStyle}>

//       {/* Footer Content */}
//       <div className="relative pt-10 md:pt-[13px] pb-8 pl-5 md:px-20 z-10">
//         <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
//           {/* Left Column */}
//           <div className="w-full lg:w-1/2 flex flex-col gap-2">
//             <Link to="/">
//               {/* <img src={Logo} className="w-20 md:w-24" alt="Logo" /> */}
//               <h1 className="xl:text-3xl mx-10 text-orange-400">LMS</h1>
//             </Link>
//             <p
//               className={`mt-5 text-sm xl:text-xl ${mutedText} max-w-xl leading-relaxed`}
//             >
//               Unlock your learning journey with Scopik. Quality education,
//               anytime, anywhere. Designed to inspire, built for the future.
//             </p>
//           </div>

//           {/* Right Column */}
//           <div className="w-full lg:w-1/2">
//             <div className="flex flex-col sm:flex-row md:flex-wrap mb-4">
//               <div className="flex flex-col md:flex-row items-start justify-center w-full gap-0">
//                 {/* Links */}
//                 <div className="w-1/2 flex flex-col gap-2 text-sm pb-2">
//                   <h1 className="text-[#F97316] font-semibold text-xl pb-2">
//                     Links
//                   </h1>
//                   <Link
//                     to="/"
//                     className={`${hoverColor} ${textColor} transition`}
//                   >
//                     Home
//                   </Link>
//                   <Link
//                     to="/about"
//                     className={`${hoverColor} ${textColor} transition`}
//                   >
//                     About Us
//                   </Link>
//                   <Link
//                     to="/course"
//                     className={`${hoverColor} ${textColor} transition`}
//                   >
//                     Courses
//                   </Link>
//                   <Link
//                     to="/contact"
//                     className={`${hoverColor} ${textColor} transition`}
//                   >
//                     Contact
//                   </Link>
//                   <Link
//                     to="/blog"
//                     className={`${hoverColor} ${textColor} transition`}
//                   >
//                     Blog
//                   </Link>
//                 </div>

//                 {/* Contact */}
//                 <div className="w-1/2 flex flex-col text-sm gap-2 pb-2">
//                   <h1 className="text-[#F97316] font-semibold text-xl pb-2">
//                     Contact
//                   </h1>
//                   <h2 className={`${mutedText} py-1`}>044-2842 2843</h2>
//                   <h2 className={`${mutedText} py-1`}>+91 23744 29424</h2>

//                   <div className="w-1/2 md:w-full text-lg pb-2">
//                     <h1 className="text-[#F97316] font-semibold text-xl pb-2">
//                       Email
//                     </h1>
//                     <h1 className={`${mutedText} py-1`}>support@scopik.in</h1>
//                   </div>
//                 </div>

//                 {/* Address */}
//                 <div className="flex flex-col w-full text-md md:w-1/2">
//                   <h1 className="text-[#F97316] font-semibold text-xl pb-2">
//                     Address
//                   </h1>
//                   <h1 className={`py-1 max-w-sm ${mutedText}`}>
//                     1st Floor, Amalpavi Office Complex Opp to National College,
//                     Trichy-Dindigul RdC Block, Karumandapam, Tiruchirappalli,
//                     Tamil Nadu 620001
//                   </h1>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Divider */}
//         <div
//           className={`border-t mt-1 pt-4 flex flex-col md:flex-row justify-center md:justify-between items-center text-sm ${
//             isDarkMode
//               ? "border-gray-700 text-gray-500"
//               : "border-gray-300 text-gray-500"
//           }`}
//         >
//           <span>&copy; 2025 Scopik. All rights reserved.</span>
//           <a
//             href="https://thirdvizion.com/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="mt-2 md:mt-0 text-gray-400 dark:text-orange-500 hover:text-orange-500 dark:hover:text-gray-400 transition"
//           >
//             Developed by Thirdvizion.com
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Footer;




import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaGooglePlusG,
  FaYoutube,
} from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-black text-white px-6 py-10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8">
        {/* Newsletter */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Subscribe to our Newsletter</h2>
          <p className="text-gray-400 mb-4 text-sm">
            Stay updated with our latest news and offers
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-md text-black w-full sm:w-auto"
            />
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md">
              Subscribe
            </button>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-6 mb-6">
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <FaGooglePlusG size={20} />
            </a>
            <a href="#" className="bg-white text-black p-2 rounded-full">
              <FaYoutube size={20} />
            </a>
          </div>
          <div className="flex flex-wrap gap-6 text-sm text-gray-300 justify-center">
            <Link to={"/"}>Home</Link>
            <Link to={"/about"}>About</Link>
            <Link to={"/course"}>Course</Link>
            <Link to={"/contact"}>Contact Us</Link>
            <Link to={"/blog"}>Blog</Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-10 border-t border-gray-700 pt-4 text-center text-sm text-gray-400">
        Copyright ©2025; Developed by{" "}
        <a href="https://thirdvizion.com/" className="text-white font-semibold">Thirdvizion</a>
      </div>
    </footer>
  );
}
