import React from 'react';
import Hero from "/src/NewHome/Hero.jsx";
import CourseList from './CourseList';
import About from "/src/NewHome/About.jsx";
import Category from "/src/NewHome/Category.jsx";
import Contact from "/src/NewHome/Contact.jsx";
import Blog from '/src/NewHome/Blog.jsx';
import About2 from '/src/NewHome/About2.jsx';
import Chatbot from "/src/NewHome/Chatbot.jsx"; // ✅ new import

const NewHome = () => {
  return (
    <>
      <Hero />
      <Category />
      <About />
      <CourseList />
      <Contact />
      <Blog />
      <About2 />
      <Chatbot /> {/* ✅ floating chat bubble */}
    </>
  );
};

export default NewHome;