import { useEffect, useState } from "react";
import axios from "axios";
import useTheme from "/src/Hooks/ThemeHook.js";
import { ChevronDown } from "lucide-react";
import Lottie from "lottie-react";
import blogAnimation from "/src/assets/blogs/Blogs.json";
import BlogCard from "/src/Components/ReusableComponents/BlogCard.jsx";

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [blogData, setBlog] = useState([]);
  const [categories, setCategory] = useState([]);
  const isDarkMode = useTheme();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_View_Category)
      .then((res) => {
        console.log("Category API Response:", res.data);
        setCategory(
          Array.isArray(res.data) ? res.data : res.data.categories || []
        );
      })
      .catch((err) => console.error("Category API Error:", err));
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BLOG_VIEW)
      .then((res) => {
        console.log("Blog API Response:", res.data);
        setBlog(Array.isArray(res.data) ? res.data : res.data.blogs || []);
      })
      .catch((err) => console.error("Blog API Error:", err));
  }, []);

  const filteredBlogs = blogData
    .filter((blog) => {
      if (selectedCategory === "All") return true;
      const selectedCatObj = categories.find(
        (c) => c.name === selectedCategory || c.id === selectedCategory
      );
      return (
        blog.category === selectedCategory ||
        blog.category === selectedCatObj?.id ||
        blog.categoryName === selectedCategory
      );
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-500 min-h-screen">
      {/* Banner */}
      <div className="text-center py-10 relative">
        <h1 className="text-[120px] md:text-[240px] lg:text-[350px] xl:text-[400px] font-extrabold text-orange-500 opacity-40 absolute inset-0 flex items-center justify-center z-0">
          BLOGS
        </h1>
        <div className="relative z-10">
          <Lottie
            animationData={blogAnimation}
            loop
            className="mx-auto w-2/3 max-w-md md:max-w-lg rounded-xl"
          />
        </div>
      </div>

      {/* Category Filter (Desktop & Mobile) */}
      {/* <div className="sticky top-[62px] z-30 backdrop-blur-md bg-white/80 dark:bg-black/10 rounded-xl mx-4 px-4 py-3 flex justify-center flex-wrap gap-4 mb-10 shadow-">
        {["All", ...categories.map((c) => c.name)].map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedCategory(cat)}
            className={`text-sm md:text-base px-5 py-2 rounded-full border-2 font-semibold transition duration-300 ${
              selectedCategory === cat
                ? "bg-orange-500 border-orange-500 text-white dark:text-black"
                : "border-gray-300 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-transparent hover:border-orange-500"
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}

      {/* Category Filter - Mobile Dropdown */}
<div className="block lg:hidden px-4 mb-6">
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-black text-black dark:text-white"
  >
    {["All", ...categories.map((c) => c.name)].map((cat, idx) => (
      <option key={idx} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>

{/* Category Filter - Desktop Buttons */}
<div className="hidden lg:flex sticky top-[60px] z-30 backdrop-blur-md bg-white/80 dark:bg-black/10 rounded-xl mx-4 px-4 py-3 justify-center flex-wrap gap-4 mb-10">
  {["All", ...categories.map((c) => c.name)].map((cat, idx) => (
    <button
      key={idx}
      onClick={() => setSelectedCategory(cat)}
      className={`text-xs px-5 py-2 rounded-full border-2 font-semibold transition duration-300 ${
        selectedCategory === cat
          ? "bg-orange-500 border-orange-500 text-white dark:text-black"
          : "border-gray-300 dark:border-gray-700 text-black dark:text-white bg-white dark:bg-transparent hover:border-orange-500"
      }`}
    >
      {cat}
    </button>
  ))}
</div>


      {/* Blog Cards */}
      <div className="flex justify-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full px-4 sm:px-6 lg:px-8 pb-20">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post) => (
              <BlogCard key={post.id} blog={post} isDarkMode={isDarkMode} />
            ))
          ) : (
            <div className="col-span-full text-center text-gray-500">
              No blogs found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
