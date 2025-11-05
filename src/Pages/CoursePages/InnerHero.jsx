import React, { useState, useEffect, useRef } from "react";
import { FaStar, FaCheck } from "react-icons/fa";

const InnerHero = ({
  rating = 5.0,
  reviewCount = 976,
  title = "Web Development",
  description = "Dive into the latest technologies, learn to build responsive websites, and master front-end and back-end development.",
  features = [
    "Comprehensive Curriculum",
    "Hands-On Projects",
    "Expert Instructors",
    "Career-Ready Skills",
  ],
  videoThumbnail = "https://via.placeholder.com/600x400",
  onEnroll,
}) => {
  const [activeTab, setActiveTab] = useState("Overview");

  const tabs = ["Overview", "Course info", "About", "Testimonials", "Faq"];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const targetId = tab.toLowerCase().replace(/\s/g, "");
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const sectionRefs = useRef({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            const tabLabel = tabs.find(
              (tab) => tab.toLowerCase().replace(/\s/g, "") === sectionId
            );
            if (tabLabel) {
              setActiveTab(tabLabel);
            }
          }
        });
      },
      {
        threshold: 0.6, // Trigger when 60% of the section is visible
      }
    );

    tabs.forEach((tab) => {
      const id = tab.toLowerCase().replace(/\s/g, "");
      const section = document.getElementById(id);
      if (section) {
        sectionRefs.current[id] = section;
        observer.observe(section);
      }
    });

    return () => {
      Object.values(sectionRefs.current).forEach((section) =>
        observer.unobserve(section)
      );
    };
  }, []);

  return (
    <>
      <div className="w-full min-h-screen bg-gradient-to-b from-orange-50 to-white font-mono flex flex-col-reverse md:flex-row justify-center items-center px-10">
        {/* <div className=" "> */}
        {/* Left Content */}
        <div className="relative w-full md:w-1/2 space-y-6">
          {/* Rating */}
          <div className="absolute -top-4 -left-10 flex items-center gap-3 bg-white p-2 px-4 rounded-full w-fit shadow text-orange-600 font-semibold text-xs scale-75">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400" />
              ))}
            </div>
            <span className="text-black ml-2 text-sm">
              {rating} ({reviewCount} reviews)
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl font-bold text-gray-900 leading-tight">
            {title}
          </h2>
          <p className="text-gray-600 text-lg">{description}</p>

          {/* Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-gray-800"
              >
                <FaCheck className="text-green-500" />
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap gap-4 pt-6">
            <button
              onClick={onEnroll}
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-md shadow transition"
            >
              Enroll Now
            </button>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full md:w-1/2 flex justify-center items-center overflow-hidden p-20">
          <img
            src={videoThumbnail}
            alt="Course Preview"
            className="object-fit"
          />
          {/* <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-white/80 backdrop-blur-sm rounded-full p-4 shadow-md cursor-pointer">
              <FiPlay className="text-orange-500 text-3xl" />
            </div>
          </div> */}
        </div>
        {/* </div> */}
      </div>

      {/* Navigation Tabs */}
      <div className="z-20 flex justify-center font-mono sticky top-12 bg-transparent py-2 -mt-28">
        <div className="bg-white p-3 px-3  rounded-full shadow-md flex flex-wrap gap-2 text-gray-600 font-medium">
          {tabs.map((item, idx) => (
            <button
              key={idx}
              onClick={() => handleTabClick(item)}
              className={`px-5 py-2 rounded-full transition-colors text-sm
          ${
            activeTab === item
              ? "bg-orange-500 text-white shadow"
              : "hover:bg-gray-100"
          }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default InnerHero;
