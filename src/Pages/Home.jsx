import useTheme from "/src/Hooks/ThemeHook.js";
import HeroSlider from "/src/NewHome/Hero.jsx";
import HomeCourse from "/src/Components/HomeComponents/HomeCourse.jsx";
import Learning from "/src/NewHome/About2.jsx";
import CourseCard from "/src/Components/HomeComponents/CourseCard.jsx";

import Blog from "/src/Components/HomeComponents/Blog.jsx";
import Student from "/src/Components/HomeComponents/Student.jsx";
import FaqSection from "/src/Components/HomeComponents/FAQ.jsx";
import Future from "/src/Components/HomeComponents/LearningFuture";

import Partners from "/src/Components/HomeComponents/Partners.jsx";

import HomeBanner from "/src/Components/HomeComponents/HomeBanner.jsx";

export default function DarkHome() {
  const isDarkMode = useTheme();
  return (
    <>
      <HeroSlider />

      <HomeCourse />

      <Learning />

      <CourseCard />

      {/* <Future /> */}

      <HomeCourse />
{/* 
      <div className="hidden sm:block">
        <HomeBanner />
      </div> */}

      {/* <Partners /> */}

      <div className={isDarkMode ? "bg-black" : "bg-white"}>
        <Blog />
      </div>

      <Student />

      <FaqSection />
    </>
  );
}
