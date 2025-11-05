// import { useState, useRef, useEffect } from "react";

// export function UserButton({ onNavigate }) {
//   const [open, setOpen] = useState(false);
//   const dropdownRef = useRef();

//   const user = {
//     name: "AYUSH KESARWANI",
//     email: "ayushkesarwani299@gmail.com",
//     level: 12,
//     points: 2450,
//     image: "/placeholder.svg",
//   };

//   // Close dropdown when clicking outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <div className="relative" ref={dropdownRef}>
//       {/* Trigger */}
//       <button
//         onClick={() => setOpen(!open)}
//         className="flex items-center gap-2 rounded-full border p-1 pr-4 bg-white hover:bg-gray-100 transition-colors"
//       >
//         <img
//           src={user.image}
//           alt="avatar"
//           className="h-8 w-8 rounded-full object-cover"
//         />
//         <div className="hidden md:flex flex-col text-left">
//           <span className="text-sm font-medium">{user.name}</span>
//           <div className="flex items-center gap-1 text-xs text-gray-500">
//             <span>Level {user.level}</span>
//             <span>•</span>
//             <span>{user.points} XP</span>
//           </div>
//         </div>
//       </button>

//       {/* Dropdown */}
//       {open && (
//         <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 shadow-lg rounded-md z-50">
//           <div className="px-4 py-2 text-sm font-semibold text-gray-700 border-b">
//             My Account
//           </div>
//           <ul className="text-sm text-gray-600">
//             <li>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => {
//                   onNavigate("dashboard");
//                   setOpen(false);
//                 }}
//               >
//                 Dashboard
//               </button>
//             </li>
//             <li>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => {
//                   onNavigate("statistics");
//                   setOpen(false);
//                 }}
//               >
//                 Statistics
//               </button>
//             </li>
//             <li>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => {
//                   onNavigate("Semesters");
//                   setOpen(false);
//                 }}
//               >
//                 Semester Details
//               </button>
//             </li>
//             <li>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => {
//                   onNavigate("certificates");
//                   setOpen(false);
//                 }}
//               >
//                 Certificates
//               </button>
//             </li>
//             <li>
//               <button
//                 className="w-full text-left px-4 py-2 hover:bg-gray-100"
//                 onClick={() => {
//                   onNavigate("settings");
//                   setOpen(false);
//                 }}
//               >
//                 Settings
//               </button>
//             </li>
//           </ul>
//           <div className="border-t px-4 py-2">
//             <button className="text-sm text-red-600 hover:underline">
//               Log out
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// src/Components/ReusableComponents/UserButton.jsx

import { useState, useRef, useEffect } from "react";

export function UserButton({ name = "User", email, onLogout, getProfileRoute }) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="w-10 h-10 rounded-full bg-[#FF6A00] text-white flex items-center justify-center text-lg font-semibold cursor-pointer hover:scale-105 transition"
      >
        {name.charAt(0).toUpperCase()}
      </button>

      {open && (
        <div className="absolute right-0 top-12 w-44 bg-white dark:bg-gray-900 rounded-md shadow-lg z-50 py-2">
          <div className="px-4 py-2 text-sm font-semibold text-gray-800 dark:text-white border-b border-gray-200 dark:border-gray-700">
            {name}
          </div>
          <a
            href={getProfileRoute()}
            onClick={() => setOpen(false)}
            className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Dashboard
          </a>
          <button
            onClick={() => {
              setOpen(false);
              onLogout();
            }}
            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}
