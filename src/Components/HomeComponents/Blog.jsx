// import { useEffect, useState } from "react";
// import useTheme from "/src/Hooks/ThemeHook.js";
// import { Link } from "react-router-dom";
// import axios from "axios";

// function Blog() {
//   const isDarkMode = useTheme();
//   const [blogData, setBlog] = useState([]);
//   const [blog_image, setBlogImage] = useState([]);
//   const filteredBlog = blogData.slice(0, 3);

//   useEffect(() => {
//     axios.get(import.meta.env.VITE_BLOG_VIEW).then((res) => {
//       setBlog(res.data);
//       console.log("All blogs:", res.data);

//       res.data.forEach((blog, idx) => {
//         console.log(blog.image_urls);
//         setBlogImage(blog.image_urls);
//       });
//     });
//   }, []);

//   return (
//     <div className="py-20">
//       <div className="text-center font-[Newsreader]">
//         <h1
//           className={`text-3xl md:text-4xl xl:text-5xl font-news text-center ${
//             isDarkMode ? "text-orange-400" : "text-[#F97316]"
//           }`}
//         >
//           Latest Blogs
//         </h1>
//       </div>
//       <div className="flex flex-wrap justify-center gap-5 mt-1 p-10 overflow-hidden">
//         {filteredBlog.map((blog, index) => (
//           <div
//             key={index}
//             className={`md:w-[400px] w-[350px] rounded-2xl transition-all duration-300 overflow-hidden ${
//               isDarkMode
//                 ? "bg-white text-black hover:shadow-xl"
//                 : "bg-[#f1f1f1] shadow-[10px_10px_30px_#d1d1d1,_-10px_-10px_30px_#ffffff]"
//             } hover:scale-105`}
//           >
//             <img
//               className="w-full h-48 object-fit rounded-t-2xl"
//               src={blog.image_urls?.[0] || "/placeholder.jpg"}
//               alt="Blog"
//             />

//             <div className="p-4">
//               <h3
//                 className={`text-lg font-medium font-manrope ${
//                   isDarkMode ? "text-black" : "text-gray-900"
//                 }`}
//               >
//                 {blog.title}
//               </h3>
//               <p
//                 className={`text-sm mt-2 ${
//                   isDarkMode ? "text-gray-600" : "text-gray-500"
//                 }`}
//               >
//                 {blog.date}
//               </p>
//               <Link
//                 to={`/blogs/${blog.id}`}
//                 className={`text-lg font-medium mt-2 inline-block hover:underline ${
//                   isDarkMode ? "text-orange-500" : "text-blue-600"
//                 }`}
//               >
//                 Read more
//               </Link>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default Blog;





import { useEffect, useState } from "react";
import useTheme from "/src/Hooks/ThemeHook.js";
import { Link } from "react-router-dom";
import axios from "axios";
import BlogCard from "/src/Components/ReusableComponents/BlogCard.jsx";

// function BlogCard({ blog, isDarkMode }) {
//   const imageUrl = blog.image_urls?.[0] || "https://placehold.co/600x400/E0E0E0/333333?text=No+Image";

//   return (
//     <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 dark:bg-[#1a1a1a] dark:text-white">
//       {/* Blog Image */}
//       <img
//         src={imageUrl}
//         alt={blog.title}
//         className="w-full h-48 object-cover rounded-t-xl"
//         onError={(e) => {
//           e.target.onerror = null;
//           e.target.src = `https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found`;
//         }}
//       />

//       <div className="p-5">
//         {/* Category */}
//         <span className="inline-block bg-orange-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full mb-3">
//           {blog.category || "General"}
//         </span>

//         {/* Title */}
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3 leading-tight">
//           {blog.title}
//         </h3>

//         {/* Date + Read Time */}
//         <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm">
//           {/* Date Icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//             />
//           </svg>
//           <span>{blog.date || "Unknown Date"}</span>

//           {/* Read Time Icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-4 w-4 ml-4 mr-2"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <span>{blog.readTime || "3 min read"}</span>
//         </div>

//         {/* Read More Link */}
//         <Link
//           to={`/blogs/${blog.id}`}
//           className={`block mt-4 font-medium text-sm ${
//             isDarkMode ? "text-orange-500 hover:underline" : "text-orange-600 hover:underline"
//           }`}
//         >
//           Read more →
//         </Link>
//       </div>
//     </div>
//   );
// }

function Blog() {
  const isDarkMode = useTheme();
  const [blogData, setBlog] = useState([]);

  useEffect(() => {
    axios.get(import.meta.env.VITE_BLOG_VIEW).then((res) => {
      setBlog(res.data || []);
    });
  }, []);

  const filteredBlog = blogData.slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-mono transition-colors duration-500">
      {/* Title */}
      <div className="text-center mb-12">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-gray-900 dark:text-white">
          Explore Our Exclusive
          <br />
          <span className="text-orange-500">Blogs & Article</span>
        </h1>
      </div>

      {/* Blog Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {filteredBlog.map((blog, index) => (
          <BlogCard key={index} blog={blog} isDarkMode={isDarkMode} />
        ))}
      </div>

      {/* All Blogs Button */}
      <div className="mt-5 ">
        <Link to="/blog">
          <button className="flex items-center justify-center px-8 py-3 border border-transparent text-xs font-medium rounded-full text-white bg-orange-500 hover:bg-orange-600 md:py-4 xl:text-lg md:px-10 transition-colors duration-300 shadow-lg">
            All Blogs
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Blog;
