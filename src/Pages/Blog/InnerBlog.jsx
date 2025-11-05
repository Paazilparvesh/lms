// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import useTheme from "/src/Hooks/ThemeHook.js";

// function BlogDetails() {
//   const { id } = useParams();
//   const [blog, setBlog] = useState(null);
//   const isDarkMode = useTheme();

//   useEffect(() => {
//     axios
//       .get(import.meta.env.VITE_BLOG_VIEW)
//       .then((res) => {
//         const blogById = res.data.find((b) => b.id.toString() === id);
//         setBlog(blogById);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch blog:", err);
//       });
//   }, [id]);

//   if (!blog)
//     return (
//       <div className="text-center mt-10 text-gray-500 dark:text-gray-300">
//         Loading...
//       </div>
//     );

//   return (
//     <div
//       className={`min-h-screen  transition-colors duration-500 px-4 py-10 ${
//         isDarkMode ? "bg-black text-white" : "bg-white text-black"
//       }`}
//     >
//       <div className="max-w-3xl mt-20 mx-auto">
//         <img
//           src={blog.image}
//           alt={blog.title}
//           className="w-full rounded-xl mb-6 shadow-lg"
//         />
//         <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-4">
//           {blog.title}
//         </h1>
//         <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
//           {blog.date}
//         </p>
//         <p className="text-lg leading-7 text-gray-800 dark:text-gray-300 whitespace-pre-line">
//           {blog.content}
//         </p>
//       </div>
//     </div>
//   );
// }

// export default BlogDetails;

import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import useTheme from "/src/Hooks/ThemeHook.js";
import { ChevronLeft, ChevronRight } from "lucide-react";


function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [currentImage, setCurrentImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isDarkMode = useTheme();

  const codingImages = [
    "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
    "https://images.unsplash.com/photo-1547658719-da2b51169166",
    "https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2",
    "https://images.unsplash.com/photo-1619410283995-43d9134e7656",
    "https://images.unsplash.com/photo-1580927752452-89d86da3fa0a"
  ];

  useEffect(() => {
    axios.get(import.meta.env.VITE_BLOG_VIEW).then((res) => {
      const selectedBlog = res.data.find((item) => String(item.id) === id);
      setBlog(selectedBlog);
      setCurrentImage(selectedBlog?.image_urls?.[0] || codingImages[0]);
    });
  }, [id]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalOpen]);

  if (!blog)
    return (
      <div className="text-center mt-10 text-gray-500 dark:text-gray-300">
        Loading...
      </div>
    );

  return (
    <div
      className={`min-h-screen px-4 py-10 transition-colors duration-500 ${
        isDarkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-6xl mt-20 mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold text-orange-500 mb-6 text-center">
          {blog.title}
        </h1>

        <div className="flex flex-col md:flex-row gap-6 items-start">
          {/* Main Image */}
          <div className="md:w-[80%] w-full">
            <img
              src={currentImage}
              alt="Selected blog"
              className="w-full h-[30px] md:h-[633px] object-cover rounded-xl shadow-md cursor-pointer transition-transform duration-500 ease-in-out hover:scale-105 animate-fadeIn"
              onClick={() => setIsModalOpen(true)}
            />
          </div>

          {/* Thumbnails */}
          <div className="md:w-[20%] w-full flex flex-row md:flex-col gap-4">
            {codingImages.slice(0, 3).map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Coding thumbnail ${index + 1}`}
                className={`w-full h-[100px] md:h-[200px] object-cover rounded-md border-2 cursor-pointer transition duration-300 transform hover:scale-105 hover:opacity-80 ${
                  url === currentImage
                    ? "border-orange-500"
                    : "border-transparent"
                }`}
                onClick={() => setCurrentImage(url)}
              />
            ))}
          </div>
        </div>

        {/* Date & Content */}
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-6 mb-3">
          {blog.date}
        </p>
        <p className="text-lg leading-7 text-gray-800 dark:text-gray-300 whitespace-pre-line">
          {blog.content}
        </p>
      </div>

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-3xl w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={currentImage}
              alt="Full view"
              className="w-full max-h-[80vh] object-contain rounded-xl animate-fadeIn"
            />
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 bg-white text-black p-1 rounded-full hover:bg-gray-200"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BlogDetails;
