import { Link } from "react-router-dom";

const BlogCard = ({ blog, isDarkMode }) => {
  const imageUrl =
    blog.image_urls?.[0] ||
    "https://placehold.co/600x400/E0E0E0/333333?text=No+Image";

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105 dark:bg-[#1a1a1a] dark:text-white">
      <img
        src={imageUrl}
        alt={blog.title}
        className="w-full h-40 md:h-48 object-cover rounded-t-xl"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src =
            "https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found";
        }}
      />

      <div className="p-3">
        <span className="inline-block scale-90 -ml-3 bg-orange-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {blog.category || "General"}
        </span>

        <h3 className="text-md font-semibold text-gray-800 dark:text-white mb-3 leading-tight">
          {blog.title}
        </h3>

        <div className="flex items-center text-gray-500 dark:text-gray-400 text-xs">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span>{blog.date || "Unknown Date"}</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-4 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{blog.readTime || "3 min read"}</span>
        </div>

        <Link
          to={`/blogs/${blog.id}`}
          className={`block mt-4 font-medium text-sm ${
            isDarkMode
              ? "text-orange-500 hover:underline"
              : "text-orange-600 hover:underline"
          }`}
        >
          Read more →
        </Link>
      </div>
    </div>
  );
};

export default BlogCard;
