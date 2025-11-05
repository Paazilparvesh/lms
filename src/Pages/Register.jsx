import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import registerAnimation from "../assets/Login/login.json";

function Register() {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [emailError, setEmailError] = useState("");
  const [otpError, setOtpError] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});
  const [timer, setTimer] = useState(60);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [log, setLog] = useState("");
  const navigate = useNavigate();

  const password = "Scopik@admin126!";
  const role = "student";

  useEffect(() => {
    let countdown;
    if (step === "otp" && timer > 0 && !resendEnabled) {
      countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
    } else if (timer === 0) {
      setResendEnabled(true);
    }
    return () => clearInterval(countdown);
  }, [step, timer, resendEnabled]);

  const handleSendOtp = async () => {
    setEmailError("");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Enter a valid email address");
      return;
    }

    try {
      const res = await fetch(import.meta.env.VITE_SEND_OTP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setOtpSent(true);
        setStep("otp");
        setTimer(60);
        setResendEnabled(false);
      } else {
        setEmailError(data.error || "Failed to send OTP. Try again.");
      }
    } catch {
      setEmailError("Network error. Try again.");
    }
  };

  const handleVerifyOtp = async () => {
    setOtpError("");
    try {
      const res = await fetch(import.meta.env.VITE_VERIFY_OTP_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (res.ok) {
        setStep("form");
      } else {
        setOtpError(data.error || "Invalid OTP. Please try again.");
      }
    } catch {
      setOtpError("Error verifying OTP. Try again.");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = "Name is required";
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone))
      newErrors.phone = "Enter a valid 10-digit phone number";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      const response = await fetch(import.meta.env.VITE_REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, password, user_type: role }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({
          api: data.error || "Registration failed. Please try again.",
        });
        return;
      }

      setLog("Registration Successful");
      setTimeout(() => navigate("/login"), 1500);
    } catch {
      setErrors({
        api: "An error occurred during registration. Please try again.",
      });
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-5 bg-[#fff6ec]">
      <div className="bg-white w-full max-w-6xl rounded-2xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Illustration */}
        <div className="w-full md:w-1/2 bg-[#fffaf5] p-8 hidden md:flex flex-col justify-center items-center">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-orange-400 rounded-full mr-2" />
            <span className="font-bold text-lg text-[#a05a00]">LMS</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-[#a05a00] text-center leading-tight">
            Join the <br />
            <span className="text-3xl md:text-5xl text-[#ff7f50]">
              Next Generation
            </span>
          </h1>
          <Lottie
            animationData={registerAnimation}
            loop
            className="w-full max-w-[400px] mt-6"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 px-8 py-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-5xl font-bold text-[#a05a00] mb-4">
            Register
          </h2>
          <p className="text-xl text-gray-600 mb-6">
            {step === "email" && "Verify Email"}
            {step === "otp" && "Enter OTP"}
            {step === "form" && "Complete Registration"}
          </p>

          {log && (
            <p className="text-green-600 text-center text-sm mb-2">{log}</p>
          )}
          {errors.api && (
            <p className="text-red-500 text-center mb-2 text-sm">
              {errors.api}
            </p>
          )}

          {step === "email" && (
            <>
              <label className="text-sm text-gray-700 block">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
              />
              {emailError && (
                <p className="text-red-500 text-xs mt-1">{emailError}</p>
              )}

              <button
                onClick={handleSendOtp}
                className="mt-4 bg-[#ff7f50] hover:bg-[#e76830] text-white font-semibold py-2 rounded-md w-full"
              >
                Send OTP
              </button>
            </>
          )}

          {step === "otp" && (
            <>
              <label className="text-sm text-gray-700 block">
                Enter OTP sent to {email}
              </label>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
              />
              {otpError && (
                <p className="text-red-500 text-xs mt-1">{otpError}</p>
              )}

              <button
                onClick={handleVerifyOtp}
                className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md w-full"
              >
                Verify OTP
              </button>

              <p className="mt-2 text-sm text-gray-600">
                {resendEnabled ? (
                  <span
                    className="text-blue-700 underline cursor-pointer"
                    onClick={handleSendOtp}
                  >
                    Resend OTP
                  </span>
                ) : (
                  <>
                    Resend OTP in{" "}
                    <span className="font-semibold">{timer}s</span>
                  </>
                )}
              </p>
            </>
          )}

          {step === "form" && (
            <>
              <label className="text-sm text-gray-700 block">Full Name</label>
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
              />
              {errors.name && (
                <p className="text-red-500 text-xs mt-1">{errors.name}</p>
              )}

              <label className="text-sm text-gray-700 block mt-4">
                Phone Number
              </label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
              )}

              <button
                onClick={handleRegister}
                className="mt-6 bg-[#ff7f50] hover:bg-[#e76830] text-white font-semibold py-2 rounded-md w-full"
              >
                Register as Student
              </button>
            </>
          )}

          <p className="text-sm text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-[#ff7f50] hover:underline font-medium"
            >
              Login
            </Link>
          </p>

          <p className="text-xs text-center text-gray-400 mt-8">
            ©2025 all rights reserved
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
