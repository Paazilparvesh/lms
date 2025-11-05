import { FaStar } from "react-icons/fa";
import { PiGraphFill } from "react-icons/pi";
import { BsClock } from "react-icons/bs";
import { LuBookOpen } from "react-icons/lu";

import image1 from "/src/assets/blogs/img1.png";
import image2 from "/src/assets/blogs/img2.png";
import image3 from "/src/assets/blogs/img3.png";

const dummyCourses = [
  {
    id: 1,
    title: "Graphic Design for Beginners Adobe Mastery",
    image: image1,
    level: "Beginner",
    duration: "15h,30min",
    lessons: 70,
    price: "$104.00",
    rating: 5.0,
  },
  {
    id: 2,
    title: "Public Speaking and Presentation Mastery",
    image: image2,
    level: "Beginner",
    duration: "07h,50min",
    lessons: 40,
    price: "$48.00",
    rating: 5.0,
  },
  {
    id: 3,
    title: "Full-Stack Web Development Bootcamp",
    image: image3,
    level: "Advanced",
    duration: "10h,30min",
    lessons: 50,
    price: "$67.00",
    rating: 5.0,
  },
  {
    id: 3,
    title: "Full-Stack Web Development Bootcamp",
    image: image3,
    level: "Advanced",
    duration: "10h,30min",
    lessons: 50,
    price: "$67.00",
    rating: 5.0,
  },
];

export default function CourseList() {
  return (
    <section className="py-16 px-4 sm:px-10 md:px-20 bg-white text-black">
      {/* Header */}
      <div className="text-left mb-12 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-orange-500 font-semibold">Our Courses</p>
          <h2 className="text-2xl md:text-4xl font-bold font-mono">
            Explore Our Popular Course{" "}
            <span className="text-orange-500 inline-block relative">
              Offerings
              <span className="hidden absolute top-9 -right-3 transform -translate-x-1/2 text-black text-3xl 2xl:scale-[10] font-semibold rotate-45">
                ↑
              </span>
            </span>
          </h2>
        </div>

        <div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-mono font-semibold px-6 py-2 rounded-full text-sm sm:text-base transition duration-300">
            View All Courses
          </button>
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {dummyCourses.map((course) => (
          <div
            key={course.id}
            className="bg-white rounded-3xl overflow-hidden font-mono flex flex-col justify-between hover:shadow-lg border-orange-500"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-52 sm:h-60 object-cover rounded-3xl"
              />
              <div className="absolute top-3 right-3 flex gap-2">
                {/* Optional: Heart Icon */}
                {/* <div className="bg-white p-2 rounded-full shadow-md">
                  <FaRegHeart className="text-orange-500" />
                </div> */}
                <div className="bg-white py-1 px-3 rounded-full font-semibold text-sm flex items-center gap-1 text-orange-500">
                  <FaStar /> {course.rating}
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="p-5 flex flex-col justify-between h-full">
              <h3 className="font-semibold text-lg mb-3">{course.title}</h3>

              <div className="flex flex-wrap items-center text-sm text-gray-600 gap-4 mb-4">
                <span className="flex items-center gap-1">
                  <PiGraphFill className="text-orange-500" />
                  {course.level}
                </span>
                <span className="flex items-center gap-1">
                  <BsClock className="text-orange-500" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1">
                  <LuBookOpen className="text-orange-500" />
                  {course.lessons} Lessons
                </span>
              </div>

              <div className="flex justify-between items-center mt-auto">
                <span className="font-bold text-lg">{course.price}</span>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full text-sm ml-4 w-full max-w-[140px]">
                  Enroll Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
