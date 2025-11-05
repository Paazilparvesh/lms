// import { useState, useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { loginContext } from "/src/App";
// import { Eye, EyeOff } from "lucide-react";
// import illustratorImage from "/src/assets/loginIlustrator1.png";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [role, setRole] = useState("student"); // kept in case needed for backend
//   const [errors, setErrors] = useState({});
//   const [successMsg, setSuccessMsg] = useState("");

//   const navigate = useNavigate();
//   const { setLogin, setUserName, setUserEmail } = useContext(loginContext);

//   const validateInputs = () => {
//     const newErrors = {};
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

//     if (!email) {
//       newErrors.email = "Email is required";
//     } else if (!emailRegex.test(email)) {
//       newErrors.email = "Enter a valid email address";
//     }

//     if (!password) {
//       newErrors.password = "Password is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleLogin = async () => {
//     if (!validateInputs()) return;

//     try {
//       const login_time = new Date().toLocaleString();
//       const response = await fetch(import.meta.env.VITE_LOGIN, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           password,
//           user_type: role,
//           login_time,
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         setErrors({
//           api: errorData.error || "Login failed. Please try again.",
//         });
//         return;
//       }

//       const data = await response.json();
//       setSuccessMsg("Login Successful");

//       localStorage.setItem("access_token", data.access);
//       localStorage.setItem("refresh_token", data.refresh);
//       localStorage.setItem("userRole", role);
//       localStorage.setItem("login_time", login_time);

//       if (data.user) {
//         if (data.user.name) {
//           setUserName(data.user.name);
//           localStorage.setItem("userName", data.user.name);
//         }
//         if (data.user.email) {
//           setUserEmail(data.user.email);
//           localStorage.setItem("userEmail", data.user.email);
//           localStorage.setItem("userId", data.user.id);
//         }
//       }

//       setLogin(true);
//       setTimeout(() => {
//         navigate(role === "Faculty" ? "/faculty" : "/");
//       }, 1500);
//     } catch (err) {
//       console.error("Login Failed", err);
//       setErrors({ api: "An error occurred during login. Please try again." });
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center px-5 bg-[#fff4e6]">
//       <div className="bg-white w-full scale-90 rounded-2xl shadow-2xl flex overflow-hidden">
//         {/* Left Section */}
//         <div className="w-1/2 bg-[#fffaf5] px-10 pt-10 pb-6 flex flex-col justify-start">
//           <div className="flex items-center mb-4">
//             <div className="w-4 h-4 bg-orange-400 rounded-full mr-2" />
//             <span className="font-bold text-lg text-[#a05a00]">
//               Thirdvizion.
//             </span>
//           </div>

//           <h1 className="text-6xl font-bold text-[#a05a00] leading-snug mb-8">
//             Unlock Your <br />
//             <span className="text-5xl text-[#ff7f50]">Team Performance</span>
//           </h1>

//           <img
//             src={illustratorImage}
//             alt="Login Illustration"
//             className="w-[800px] h-auto mt-6 mx-auto"
//           />
//         </div>

//         {/* Right Section */}
//         <div className="w-1/2 px-10 pt-10 pb-6 flex flex-col justify-start mt-20 relative">
//           <h2 className="text-5xl font-bold text-[#a05a00] mb-4">
//             Welcome to Thirdvizion
//           </h2>
//           <p className="text-xl text-gray-600 mb-6">
//             Unlock Your Team Performance
//           </p>

//           {errors.api && (
//             <p className="text-center text-red-600 text-sm">{errors.api}</p>
//           )}
//           {successMsg && (
//             <p className="text-center text-green-600 text-sm">{successMsg}</p>
//           )}

//           {/* Email */}
//           <div className="mb-4">
//             <label className="text-sm text-gray-700 mb-2 block">
//               Email address
//             </label>
//             <input
//               type="email"
//               placeholder="yourname@email.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
//             />
//             {errors.email && (
//               <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//             )}
//           </div>

//           {/* Password */}
//           <div className="mb-4 relative">
//             <label className="text-sm text-gray-700 mb-2 block">Password</label>
//             <input
//               type={showPassword ? "text" : "password"}
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
//             />
//             <span
//               className="absolute top-9 right-3 cursor-pointer text-gray-600"
//               onClick={() => setShowPassword((prev) => !prev)}
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </span>
//             {errors.password && (
//               <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//             )}
//           </div>

//           {/* Forgot Password */}
//           <div className="text-right text-sm mb-6">
//             <button className="text-[#ff7f50] hover:underline">
//               Forgot password?
//             </button>
//           </div>

//           {/* Login Button */}
//           <button
//             onClick={handleLogin}
//             className="w-full bg-[#ff7f50] hover:bg-[#e76830] transition text-white font-semibold py-2 rounded-md mb-6"
//           >
//             Login
//           </button>

//           {/* Signup Link */}
//           <p className="text-sm text-center text-gray-600">
//             Don’t have an account?{" "}
//             <Link
//               to="/register"
//               className="text-[#ff7f50] hover:underline font-medium"
//             >
//               Register
//             </Link>
//           </p>

//           {/* Footer */}
//           <p className="text-xs text-center text-gray-400 mt-8">
//             ©2025 all rights reserved
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;







import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginContext } from "/src/App";
import { Eye, EyeOff } from "lucide-react";
import illustratorImage from "/src/assets/loginIlustrator1.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("student");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const navigate = useNavigate();
  const { setLogin, setUserName, setUserEmail } = useContext(loginContext);

  const validateInputs = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Enter a valid email address";

    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateInputs()) return;

    try {
      const login_time = new Date().toLocaleString();
      const response = await fetch(import.meta.env.VITE_LOGIN, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, user_type: role, login_time }),
      });
 
      if (!response.ok) {
        const errorData = await response.json();
        setErrors({ api: errorData.error || "Login failed. Please try again." });
        return;
      }

      const data = await response.json();
      setSuccessMsg("Login Successful");

      localStorage.setItem("access_token", data.access);
      localStorage.setItem("refresh_token", data.refresh);
      localStorage.setItem("userRole", role);
      localStorage.setItem("login_time", login_time);

      if (data.user) {
        if (data.user.name) {
          setUserName(data.user.name);
          localStorage.setItem("userName", data.user.name);
        }
        if (data.user.email) {
          setUserEmail(data.user.email);
          localStorage.setItem("userEmail", data.user.email);
          localStorage.setItem("userId", data.user.id);
        }
      }

      setLogin(true);
      setTimeout(() => {
        navigate(role === "Faculty" ? "/faculty" : "/");
      }, 1500);
    } catch (err) {
      console.error("Login Failed", err);
      setErrors({ api: "An error occurred during login. Please try again." });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#fff4e6] flex items-center justify-center overflow-hidden px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-h-[95vh] max-w-6xl 2xl:max-w-8xl flex flex-col md:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="w-full md:w-1/2 bg-[#fffaf5] p-6 md:p-10 hidden md:flex flex-col justify-center">
          <div className="flex items-center mb-4">
            <div className="w-4 h-4 bg-orange-400 rounded-full mr-2" />
            <span className="font-bold text-lg text-[#a05a00]">LMS</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-[#a05a00] leading-snug mb-6">
            Unlock Your <br />
            <span className="text-[#ff7f50]">Team Performance</span>
          </h1>
          <img
            src={illustratorImage}
            alt="Login Illustration"
            className="w-full max-w-md mx-auto mt-4 md:mt-6"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold text-orange-600 mb-4">
            Welcome to LMS
          </h2>
          <p className="text-sm md:text-base text-center md:text-left text-gray-600 mb-6">
            Unlock Your Performance
          </p>

          {errors.api && (
            <p className="text-center text-red-600 text-sm mb-2">{errors.api}</p>
          )}
          {successMsg && (
            <p className="text-center text-green-600 text-sm mb-2">{successMsg}</p>
          )}

          {/* Email Field */}
          <div className="mb-4">
            <label className="text-sm text-gray-700 mb-2 block">Email address</label>
            <input
              type="email"
              placeholder="yourname@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 relative">
            <label className="text-sm text-gray-700 mb-2 block">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-[#ff9f43]"
            />
            <span
              className="absolute top-[42px] right-3 cursor-pointer text-gray-600"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </span>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          {/* Forgot Password */}
          <div className="text-right text-xs mb-6">
            <button className="text-[#ff7f50] hover:underline">
              Forgot password?
            </button>
          </div>

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="w-full bg-[#ff7f50] hover:bg-[#e76830] transition text-white font-semibold py-2 rounded-md mb-6"
          >
            Login
          </button>

          {/* Register Link */}
          <p className="text-sm text-center text-gray-600">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-[#ff7f50] hover:underline font-medium"
            >
              Register
            </Link>
          </p>

          <p className="text-xs text-center text-gray-400 mt-6">
            ©2025 all rights reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
