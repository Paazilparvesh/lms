// BlogCard component to display individual blog posts
const BlogCard = ({ image, category, title, date, readTime }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105">
      {/* Blog post image */}
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover rounded-t-xl"
        // Fallback for image loading errors
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = `https://placehold.co/600x400/E0E0E0/333333?text=Image+Not+Found`;
        }}
      />
      <div className="p-5">
        {/* Category tag */}
        <span className="inline-block bg-orange-100 text-gray-500 text-xs font-semibold px-3 py-1 rounded-full mb-3">
          {category}
        </span>
        {/* Blog title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-3 leading-tight">
          {title}
        </h3>
        <div className="flex items-center text-gray-500 text-sm">
          {/* Date icon (inline SVG) */}
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
          <span>{date}</span>
          {/* Read time icon (inline SVG) */}
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
          <span>{readTime}</span>
        </div>
      </div>
    </div>
  );
};

// Main App component
const Blog = () => {
  // Sample data for blog posts
  const blogPosts = [
    {
      id: 1,
      image: "https://placehold.co/600x400/FEF4F2/333333?text=Design",
      category: "Design",
      title: "New Design System Launch In The Design Field",
      date: "Dec 20, 2023",
      readTime: "05 min read",
    },
    {
      id: 2,
      image: "https://placehold.co/600x400/FEF4F2/444444?text=Tech",
      category: "Tech",
      title: "New Design System Launch In The Design Field",
      date: "Dec 20, 2023",
      readTime: "05 min read",
    },
    {
      id: 3,
      image: "https://placehold.co/600x400/FEF4F2/555555?text=Marketing",
      category: "Marketing",
      title: "New Design System Launch In The Design Field",
      date: "Dec 20, 2023",
      readTime: "05 min read",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 font-mono">
      {/* Main title section */}
      <div className="text-center mb-12">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight">
          Explore Our Exclusive
          <br />
          <span className="text-orange-500">Blogs & Article</span>
        </h1>
      </div>

      {/* Blog cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl w-full">
        {blogPosts.map((post) => (
          <BlogCard
            key={post.id}
            image={post.image}
            category={post.category}
            title={post.title}
            date={post.date}
            readTime={post.readTime}
          />
        ))}
      </div>

      {/* "All Blogs" button */}
      <div className="mt-12">
        <button className="flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-red-500 hover:bg-red-600 md:py-4 md:text-lg md:px-10 transition-colors duration-300 shadow-lg">
          All Blogs
          {/* Arrow Right icon (inline SVG) */}
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
      </div>
    </div>
  );
};

export default Blog;
