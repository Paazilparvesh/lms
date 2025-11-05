import React from "react";
import illustration from "/src/assets/newImage/ContactUs.jpg"; // Replace with correct image path

const LearnInScopik = () => {
  return (
    <section className="w-full py-10 px-4 sm:px-6 lg:px-20 bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-news font-semibold text-center mb-10">
        <span className="text-[#F97316]">OUR HIRING POLICY</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        {/* Left Column */}
        <div className="space-y-6">
          <Box>
            Maximum number of students get on/off campus placement while
            maintaining a minimum of 70% in every batch.
          </Box>
          <Box>
            Onsite course completion is required for the award of the
            University degree.
          </Box>
          <Box>Students will be assessed by the company.</Box>
        </div>

        {/* Center Illustration */}
        <div className="flex justify-center">
          <img
            src={illustration}
            alt="Interview Illustration"
            className="max-w-[300px] md:max-w-[400px]"
          />
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Box>
            To ensure that the whole team works according to the defined
            processes to achieve the common objective.
          </Box>
          <Box>
            Students should get a course completion batch on the platform.
          </Box>
          <Box>
            To maintain the quality standards of the jobs offered.
          </Box>
        </div>
      </div>

      {/* Bottom Box */}
      <div className="mt-10 max-w-4xl mx-auto">
        <Box>
          Deserving candidates can have the opportunity to start their career
          with their preferred company and shall be allowed for up to 3
          companies.
        </Box>
      </div>
    </section>
  );
};

// Reusable Box with Dark Mode Support
const Box = ({ children }) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 text-black dark:text-white shadow-sm rounded-lg p-4 text-sm sm:text-base leading-relaxed transition-all duration-300 hover:border-[#F97316] dark:hover:border-[#F97316] hover:shadow-md hover:scale-[1.02] text-center">
    {children}
  </div>
);

export default LearnInScopik;
