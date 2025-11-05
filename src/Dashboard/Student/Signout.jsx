import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginContext } from "/src/App.jsx";

export default function LogoutModal({ isOpen, onClose }) {
  const { setLogin, userEmail, setUserEmail } = useContext(loginContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const logout_time = new Date().toLocaleString();
    const student_email = userEmail;
    const storedLoginTime = localStorage.getItem("login_time");

    try {
      await axios.post(import.meta.env.VITE_LOGOUT, {
        logout_time,
        student_email,
        storedLoginTime,
      });

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("userEmail");

      setUserEmail(null);
      setLogin(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg w-96 h-[150px] flex flex-col justify-center items-center font-mono">
        <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">
          Are you sure you want to logout?
        </h2>
        <div className="flex justify-center gap-5">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg bg-[#F97316] text-white hover:bg-orange-600"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
