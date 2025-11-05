// import { useEffect, useState } from "react";
// import contactHeroImage from "/src/assets/newImage/ContactHeroimg.png";
// export default function ScopikBanner() {
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   useEffect(() => {
//     const observer = new MutationObserver(() => {
//       setTheme(localStorage.getItem("theme") || "light");
//     });
//     observer.observe(document.documentElement, {
//       attributes: true,
//       attributeFilter: ["class"],
//     });

//     return () => observer.disconnect();
//   }, []);

//   // const isDark = theme === "dark";

//   return (
//     <div className="relative w-full">
//       {/* Top Image Section */}
//       <div className="relative w-full h-[500px] overflow-hidden">
//         <img
//           src={contactHeroImage} // Use the imported image
//           alt="Scopik VR"
//           className="w-full h-full object-cover object-top"
//         />

//         {/* Updated forward wave format */}
//         {/* <svg
//           className="absolute bottom-0 w-full"
//           viewBox="0 0 1440 220"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill={isDark ? "#000000" : "#ffffff"}
//             d="M0,160 C360,260 1080,60 1440,160 L1440,320 L0,320 Z"
//           />
//         </svg> */}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaTwitter,
  FaInstagram,
  FaFacebookF,
} from "react-icons/fa";
import Lottie from "lottie-react";
import blogAnimation from "/src/assets/contact us.json";

export default function ScopikBanner() {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setTheme(localStorage.getItem("theme") || "light");
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="w-full bg-[#fffaf2] dark:bg-gray-900 py-12 px-6 md:px-16 xl:h-screen flex items-center relative overflow-hidden mt-10 font-mono">
      <div className="flex flex-col-reverse md:flex-row items-center justify-between w-full">
        {/* Left Text Section */}
        <div className="w-full md:w-[50%] text-center md:text-left h-full flex flex-col justify-start">
          <div className="mb-10">
            <h1 className="text-5xl md:text-4xl xl:text-8xl font-bold text-orange-500 pt-10 dark:text-yellow-400 mb-6 font-mono">
              CONTACT US
            </h1>
            <p className="text-gray-700 dark:text-gray-300 pt-15 text-md md:text-sm xl:text-2xl">
              Our team is ready to assist you with course details, services, or
              support. Don’t hesitate to connect—we’re just a message away!
            </p>
          </div>

          {/* Contact Icon Links - Fixed Bottom Left */}
          <div className="absolute bottom-6 left-0 md:left-16 lg:bottom-20 flex justify-center md:justify-start w-full items-center gap-4 mt-5">
            <a
              href="mailto:support@example.com"
              className="bg-yellow-50 p-3 rounded-full shadow-lg hover:scale-105 transition"
              title="Email Us"
            >
              <FaEnvelope className="text-orange-500 text-xl" />
            </a>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-50 p-3 rounded-full shadow-lg hover:scale-105 transition"
              title="Chat on WhatsApp"
            >
              <FaWhatsapp className="text-orange-500 text-xl" />
            </a>

            <a
              href="https://twitter.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-50 p-3 rounded-full shadow-lg hover:scale-105 transition"
              title="Follow on Twitter"
            >
              <FaTwitter className="text-orange-500 text-xl" />
            </a>

            <a
              href="https://instagram.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-50 p-3 rounded-full shadow-lg hover:scale-105 transition"
              title="Follow on Instagram"
            >
              <FaInstagram className="text-orange-500 text-xl" />
            </a>

            <a
              href="https://facebook.com/yourhandle"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-50 p-3 rounded-full shadow-lg hover:scale-105 transition"
              title="Follow on Facebook"
            >
              <FaFacebookF className="text-orange-500 text-xl" />
            </a>
          </div>
        </div>

        {/* Right Lottie Animation */}
        <div className="w-full md:w-1/2 relative">
          <Lottie
            animationData={blogAnimation}
            loop={true}
            className="max-w-5xl scale-[1.2] w-full mx-auto"
          />
        </div>
      </div>
    </div>
  );
}
