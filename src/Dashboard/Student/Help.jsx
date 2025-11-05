import React, { useState } from "react";

export default function Help() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    issue: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Support request submitted successfully!");
    setFormData({ name: "", email: "", issue: "", message: "" });
  };

  return (
    <div className="bg-orange-50 min-h-screen font-mono p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 border border-orange-100">
        <h2 className="text-2xl font-bold text-orange-700 mb-4">Need Help?</h2>
        <p className="text-sm text-orange-600 mb-6">
          Fill out the form below and our support team will get back to you shortly.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-orange-600 text-sm mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-orange-600 text-sm mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
          </div>

          <div>
            <label className="block text-orange-600 text-sm mb-1">Issue</label>
            <select
              name="issue"
              value={formData.issue}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            >
              <option value="">Select an issue</option>
              <option value="login">Login Issue</option>
              <option value="course">Course Not Loading</option>
              <option value="payment">Payment Issue</option>
              <option value="bug">Found a Bug</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-orange-600 text-sm mb-1">Message</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              className="w-full px-4 py-2 border border-orange-200 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
              placeholder="Describe your issue..."
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-md shadow"
          >
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
} 
