import axios from "axios";

// ✅ 1. Build conversation context (keep last 5 exchanges)
export const buildConversationContext = (messages) => {
  if (!Array.isArray(messages)) return "";

  const recentMessages = messages.slice(-5);
  return recentMessages
    .map((m) => `${m.type === "user" ? "User" : "Assistant"}: ${m.text}`)
    .join("\n");
};

// ✅ 2. Format time safely for message timestamps
export const formatTime = (date) => {
  try {
    const dateObj = date instanceof Date ? date : new Date(date);
    if (isNaN(dateObj)) return "";
    return dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "";
  }
};

// ✅ 3. Fetch LMS course data securely
export const fetchLMSData = async () => {
  try {
    const username = import.meta.env.VITE_LMS_USER;
    const password = import.meta.env.VITE_LMS_PASS;
    const courseUrl = import.meta.env.VITE_COURSE_NAME;

    const token = btoa(`${username}:${password}`);

    const res = await axios.get(courseUrl, {
      headers: { Authorization: `Basic ${token}` },
    });

    const courses = res.data || [];
    if (!courses.length) return "No courses available right now.";

    const context = courses
      .slice(0, 10)
      .map(
        (c) =>
          `• ${c.name || c.title} — ${c.description?.slice(0, 80) || "No description."}`
      )
      .join("\n");

    return `Here are some available courses from EduMaster LMS:\n${context}`;
  } catch (err) {
    console.error("Error fetching LMS data:", err);
    return "No course data available right now.";
  }
};
