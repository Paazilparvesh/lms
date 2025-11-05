import axios from "axios";
import { useEffect, useState } from "react";

function AddUniversity() {
  const [university, addUniversity] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [pass, setPass] = useState("");
  const [logo, setLogo] = useState("");
  const [campus, setCampus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [assign, setAssign] = useState(false);
  const [newCourse, setNewcourse] = useState([]);
  const [uniName, setuniName] = useState("");
  const [course, setCourse] = useState("");
  const [errors, setErrors] = useState({});

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUniversity, setSelectedUniversity] = useState(null);

  useEffect(() => {
    axios.get(import.meta.env.VITE_VIEW_UNIVERSITY).then((data) => {
      setCampus(data.data);
    });
  }, []);

  const username = "admin";
  const password = "admin@123";
  const token = btoa(`${username}:${password}`);

  useEffect(() => {
    axios
      .get("https://lmsdemo.thirdvizion.com/api/course/", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      })
      .then((res) => {
        setNewcourse(res.data);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  }, []);

  function AssignCourse() {
    axios
      .post("https://lmsdemo.thirdvizion.com/api/assigntouni/", {
        university: uniName,
        course: course,
      })
      .then(() => {
        alert("Course Assigned Successfuly");
        setAssign(false);
      });
  }

  //   function handleDelete(Uniname) {
  //     axios
  //       .delete(`https://lmsdemo.thirdvizion.com/api/deleteuniversity/${Uniname}`)
  //       .then(() => {
  //         setCampus((prev) => prev.filter((item) => item.name !== Uniname));
  //         console.log("Course Deleted:", Uniname);
  //       });
  //   }

  function handleDeleteConfirmed() {
    if (!selectedUniversity) return;

    axios
      .delete(
        `https://lmsdemo.thirdvizion.com/api/deleteuniversity/${selectedUniversity}`
      )
      .then(() => {
        setCampus((prev) =>
          prev.filter((item) => item.name !== selectedUniversity)
        );
        console.log("Deleted:", selectedUniversity);
        setShowDeleteModal(false);
        setSelectedUniversity(null);
      });
  }

  async function handleLogo(e) {
    const uniLogo = e.target.files[0];
    if (!uniLogo) return;

    const data = new FormData();
    data.append("file", uniLogo);
    data.append("upload_preset", "Scopik");
    data.append("cloud_name", "dm8wceqw2");

    const Response = await fetch(
      "https://api.cloudinary.com/v1_1/dm8wceqw2/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const convertedUrl = await Response.json();
    console.log(convertedUrl.url);
    setLoading(true);
    setLogo(convertedUrl.url);
  }

  function newUniversity() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const newErrors = {};

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!emailRegex.test(email)) newErrors.email = "Invalid email format";
    if (!address) newErrors.address = "Address is required";
    if (!pass) newErrors.pass = "Password is required";
    if (!logo) newErrors.logo = "Logo is required";

    // If any errors exist, set them and return early
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // No errors, continue with API
    setErrors({}); // Clear errors if valid

    axios
      .post(import.meta.env.VITE_UNIVERSITY, {
        name,
        email,
        address,
        password: pass,
        logo,
      })
      .then(() => {
        console.log("Data sent successfully");
        addUniversity(false);
        setName("");
        setEmail("");
        setAddress("");
        setPass("");
        setLogo("");
        setCampus((prev) => [...prev, { name, email, address, logo }]);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  }

  return (
    <>
      <div className="p-5 border border-[#071f36c3] bg-white shadow-xl rounded-xl">
        <div className="w-full flex justify-between items-center">
          <h1 className="text-2xl font-news font-bold">Universities</h1>
          <button
            onClick={() => {
              addUniversity(!university);
            }}
            className="bg-green-500 p-2 rounded-md text-white"
          >
            Add University
          </button>
        </div>
      </div>
      <>
        {university ? (
          <>
            <div className="flex items-center justify-center mt-10">
              <div className="relative bg-white p-6 w-full max-w-5xl rounded-lg shadow-lg">
                {/* ❌ Close Button */}
                <button
                  className="absolute top-4 right-6 text-gray-500 hover:text-red-600 text-4xl"
                  onClick={() => addUniversity(false)}
                  title="Close"
                >
                  &times;
                </button>
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6 font-news">
                  University Registration
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-news text-gray-700 text-lg">
                      Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : ""
                      }`}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-news text-gray-700 text-lg">
                      E-mail
                    </label>
                    {/* Email */}
                    <input
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : ""
                      }`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-news text-gray-700 text-lg">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col">
                    <label className="mb-1 font-news text-gray-700 text-lg">
                      Password
                    </label>
                    <input
                      type="text"
                      value={pass}
                      onChange={(e) => setPass(e.target.value)}
                      className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {errors.pass && (
                      <p className="text-red-500 text-sm mt-1">{errors.pass}</p>
                    )}
                  </div>

                  {/* Logo Upload */}
                  <div className="flex flex-col md:col-span-2">
                    <label className="mb-1 font-news text-gray-700 text-lg">
                      Logo
                    </label>
                    <input
                      type="file"
                      onChange={handleLogo}
                      accept=".jpeg,.jpg,.png"
                      className="p-2 border rounded focus:outline-none"
                    />
                    {errors.logo && (
                      <p className="text-red-500 text-sm mt-1">{errors.logo}</p>
                    )}
                    <p className="text-sm font-news text-red-500 mt-1">
                      Only jpeg, jpg, and png formats allowed.
                    </p>
                  </div>
                </div>

                {/* Save Button */}
                {loading ? (
                  <button
                    onClick={newUniversity}
                    className="mt-6 w-full bg-green-600 text-white text-lg py-2 rounded hover:bg-green-700 transition"
                  >
                    Save
                  </button>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          ""
        )}
      </>
      <div>
        {assign ? (
          <div className="relative bg-white p-6 mt-6 rounded-lg shadow-lg text-base sm:text-lg font-news">
            {/* ❌ Close Button */}
            <button
              className="absolute top-4 right-8 text-gray-500 hover:text-red-600 text-5xl"
              onClick={() => setAssign(false)}
              title="Close"
            >
              &times;
            </button>
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
              Assign Course to University
            </h2>

            <div className="flex gap-5 mb-10">
              {/* University Selection */}
              <div className="w-full flex flex-col items-start gap-2 sm:gap-0">
                <label className="w-[150px] font-medium text-gray-700">
                  University
                </label>
                <select
                  value={uniName}
                  onChange={(e) => setuniName(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option disabled>Choose Your University</option>
                  {campus.map((item, index) => (
                    <option key={index}>{item.name}</option>
                  ))}
                </select>
              </div>

              {/* Course Selection */}
              <div className="w-full flex flex-col items-start gap-2 sm:gap-0">
                <label className="w-[150px] font-medium text-gray-700">
                  Courses
                </label>
                <select
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                >
                  <option disabled>Choose Course</option>
                  {newCourse.map((item, index) => (
                    <option key={index}>{item.name}</option>
                  ))}
                </select>
              </div>
            </div>
            {/* Save Button */}
            <div className="flex justify-center">
              <button
                className="bg-green-700 hover:bg-green-800 w-full text-white px-6 py-2 rounded-md shadow-md transition"
                onClick={AssignCourse}
              >
                Save
              </button>
            </div>
            {/* </div> */}
          </div>
        ) : (
          ""
        )}
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-md shadow-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-red-600">
                {selectedUniversity}
              </span>
              ?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
                onClick={() => {
                  setShowDeleteModal(false);
                  setSelectedUniversity(null);
                }}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                onClick={handleDeleteConfirmed}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="w-full h-[450px] bg-white mt-3 rounded-xl p-5 space-y-4">
        <div className="overflow-auto">
          {campus.map((item, index) => {
            return (
              <>
                <div
                  className={`flex items-center justify-between gap-4 p-2 ${
                    index % 2 == 0
                      ? "bg-white rounded-md"
                      : "bg-[#EDF8FD] rounded-md"
                  }`}
                >
                  <div>
                    <img
                      src={item.logo}
                      alt="failed to load"
                      className="w-[75px] h-[75px] object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="font-medium text-xl">{item.name}</h1>
                  </div>
                  <div className="flex gap-10">
                    <button
                      className="bg-blue-600 text-white p-2 font-medium rounded-md"
                      onClick={() => {
                        setAssign(true);
                      }}
                    >
                      Assign Course
                    </button>
                    <button
                      onClick={() => {
                        setSelectedUniversity(item.name);
                        setShowDeleteModal(true);
                      }}
                      class="inline-flex items-center px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                    >
                      <svg
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        fill="none"
                        class="h-5 w-5 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          stroke-width="2"
                          stroke-linejoin="round"
                          stroke-linecap="round"
                        ></path>
                      </svg>
                      Delete
                    </button>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
export default AddUniversity;
