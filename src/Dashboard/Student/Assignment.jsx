// /src/Dashboard/Student/Assignment.jsx

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const assignments = [
  {
    id: 1,
    title: "AI-Powered Chatbot for Customer Support",
    deadline: "24 Apr 20 12:20pm",
    confDate: "02 Mar 20",
    reviewDate: "22 Apr 20",
    status: "In Progress",
  },
  {
    id: 2,
    title: "Responsive Web Design Grant",
    deadline: "27 Apr 20 11:30am",
    confDate: "10 Mar 20",
    reviewDate: "22 Apr 20",
    status: "On Hold",
  },
  {
    id: 3,
    title: "SQL Database Management for E-Commerce",
    deadline: "29 Apr 20 02:30pm",
    confDate: "14 Mar 20",
    reviewDate: "25 Apr 20",
    status: "Needs Review",
  },
];

const statusFilters = ["All", "In Progress", "On Hold", "Needs Review"];

export default function Assignment() {
  const [filter, setFilter] = useState("All");
  const [assignmentAnswers, setAssignmentAnswers] = useState({});

  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("assignmentAnswers") || "{}");
    setAssignmentAnswers(storedAnswers);

    const handleStorageChange = () => {
      const updated = JSON.parse(localStorage.getItem("assignmentAnswers") || "{}");
      setAssignmentAnswers(updated);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const filteredAssignments = assignments
    .filter((assignment) => filter === "All" || assignment.status === filter)
    .sort((a, b) => a.id - b.id); // ensure ascending order

  return (
    <div className="p-6 md:p-8 bg-gradient-to-br from-orange-50 to-amber-50 min-h-screen font-sans">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-6">
          <div>
            <h1 className="text-3xl font-bold text-orange-800 mb-2">Assignment Board</h1>
            <p className="text-gray-600 mb-4">Track all your pending and completed assignments.</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
              {["Total Assignments", "In Progress", "Needs Review", "On Hold"].map((item, index) => (
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  key={item}
                  className="flex flex-col p-3 bg-white rounded-lg shadow-sm"
                >
                  <span className="text-xl font-bold text-orange-700">
                    {index === 0
                      ? assignments.length
                      : assignments.filter((a) => a.status === item).length}
                  </span>
                  <span className="text-gray-600">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-6 flex flex-wrap gap-2">
          {statusFilters.map((status) => (
            <motion.button
              key={status}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === status
                  ? "bg-orange-500 text-white shadow-md"
                  : "bg-white text-gray-700 shadow-sm hover:bg-gray-50"
              }`}
            >
              {status}
            </motion.button>
          ))}
        </div>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-orange-50">
                <tr>
                  {["Title", "Deadline", "Conf Date", "Review Date", "Assign", "Status", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-xs font-medium text-orange-800 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredAssignments.length > 0 ? (
                    filteredAssignments.map((assignment) => (
                      <motion.tr
                        key={assignment.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="hover:bg-orange-50/50"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
                              <span className="text-orange-600 font-medium">
                                {assignment.title.charAt(0)}
                              </span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {assignment.title}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {assignment.deadline}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {assignment.confDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          {assignment.reviewDate}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 whitespace-nowrap">
                          <div className="w-40 h-auto bg-white border border-gray-200 rounded shadow-sm p-2 text-xs overflow-auto">
                            {assignmentAnswers[assignment.id] || (
                              <span className="text-gray-400 italic">No answer</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-orange-600 font-semibold whitespace-nowrap">
                          {assignment.status}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                          {/* Action buttons can be placed here */}
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                        No assignments found
                      </td>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
