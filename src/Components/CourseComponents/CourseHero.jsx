import { useState, useEffect } from "react";
// import { Search } from "lucide-react";
import axios from "axios";
import useTheme from "/src/Hooks/ThemeHook";

export default function HeroSection({
  categoryFilter,
  setCategoryFilter,
  setSearch, // final search text
}) {
  const [categories, setCategories] = useState([]);
  const [searchInput, setSearchInput] = useState(""); // temporary input
  const isDarkMode = useTheme();

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_View_Category)
      .then((res) => {
        const catNames = res.data?.map((cat) => cat.name) || [];
        setCategories(["All Categories", ...catNames]);
      })
      .catch((err) => {
        console.error("Failed to fetch course categories", err);
        setCategories(["All Categories"]);
      });
  }, []);

  const handleSearchClick = () => {
    setSearch(searchInput.trim()); // only apply filter now
  };

  return (
    <section className="flex flex-col items-center justify-center px-4 py-20 bg-white dark:bg-black text-center space-y-8">
      {/* Heading */}
      <div className="text-2xl md:text-3xl lg:text-5xl xl:text-6xl px-4 md:px-40 font-bold text-black dark:text-white leading-tight tracking-wide font-mono">
        <span className="text-orange-500">Unlock</span> New Possibilities
        Explore <span className="text-orange-500">Courses</span> That Transform
        You
      </div>

      {/* Search bar */}
      <div className="w-full max-w-md flex items-center rounded-full border border-gray-300 overflow-hidden shadow-sm md:scale-90  p-3">
        <input
          type="text"
          placeholder="Search your desired course"
          className="w-full px-3 text-sm md:text-base focus:outline-none bg-white dark:bg-gray-800 text-black dark:text-white"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          onClick={handleSearchClick}
          className="bg-orange-500 hover:bg-orange-600 px-6 py-1 rounded-full text-white font-medium text-sm md:text-base transition-colors"
        >
          Search
        </button>
      </div>

      {/* Category buttons */}
      {/* <div className="flex flex-wrap justify-center items-center gap-3 text-sm md:text-base px-4">
        <span className="font-semibold text-black dark:text-white">
          Choose by category:
        </span>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => {
              setCategoryFilter(cat);
              setSearch(""); // ← Reset search when changing category
              setSearchInput(""); // ← Also reset visible input
            }}
            className={`px-4 py-1.5 rounded-full border transition text-sm ${
              categoryFilter === cat
                ? "bg-orange-500 text-white border-orange-500"
                : isDarkMode
                ? "text-white border-gray-600 hover:bg-white/10"
                : "text-black border-gray-400 hover:bg-orange-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div> */}

      {/* Mobile Dropdown - visible only on mobile */}
      <div className="md:flex items-center lg:hidden px-4 mb-4">
        <label
          htmlFor="categoryDropdown"
          className="w-full text-sm font-semibold mb-1 text-black dark:text-white"
        >
          Choose by category:
        </label>
        <select
          id="categoryDropdown"
          value={categoryFilter}
          onChange={(e) => {
            setCategoryFilter(e.target.value);
            setSearch("");
            setSearchInput("");
          }}
          className={`w-full px-4 py-2 rounded-full border text-sm ${
            isDarkMode
              ? "bg-black text-white border-gray-600"
              : "bg-white text-black border-gray-400"
          }`}
        >
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      {/* Desktop Buttons - visible only on md+ screens */}
      <div className="hidden lg:flex flex-wrap justify-center items-center gap-3 text-sm md:text-base px-4">
        <span className="font-semibold text-black dark:text-white">
          Choose by category:
        </span>
        {categories.map((cat, index) => (
          <button
            key={index}
            onClick={() => {
              setCategoryFilter(cat);
              setSearch("");
              setSearchInput("");
            }}
            className={`px-4 py-1.5 rounded-full border transition text-sm ${
              categoryFilter === cat
                ? "bg-orange-500 text-white border-orange-500"
                : isDarkMode
                ? "text-white border-gray-600 hover:bg-white/10"
                : "text-black border-gray-400 hover:bg-orange-100"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </section>
  );
}
