import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import useTheme from "/src/Hooks/ThemeHook";
import { FaUserPlus, FaUserEdit } from "react-icons/fa";
import { FiUpload } from "react-icons/fi";

function Teacherthird() {
  const [search, setSearch] = useState("");
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [student, setStudent] = useState([]);
  const [uploadType, setUploadType] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [registerNo, setRegisterNo] = useState("");
  const [universityName, setUniversityName] = useState("");
  const [academic, setAcademic] = useState("");
  const [bulkUsers, setBulkUsers] = useState([]);
  const [user_type] = useState("student");
  const [selectedYear, setSelectedYear] = useState("all");
  const [sub, setSub] = useState(false);

  const isDarkMode = useTheme();
  const Email = localStorage.getItem("userEmail");

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_UNIVERSITY_STUDENT, {
        params: { email: Email },
      })
      .then((res) => setStudent(res.data))
      .catch((err) => console.log("Error", err));
  }, []);

  const filteredStudents = student
    .filter((s) => selectedYear === "all" || s.academic_year === parseInt(selectedYear))
    .filter((s) => s.name.toLowerCase().includes(search.toLowerCase()));

  const bulkFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function (e) {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const detail = XLSX.utils.sheet_to_json(worksheet, { header: "A" });

      const studentDetails = detail
        .filter(
          (item) =>
            item.B && item.C && item.D && item.E && item.F && typeof item.A === "number"
        )
        .map((item) => ({
          name: item.C,
          email: item.D,
          phone: String(item.G || ""),
          registerno: item.B,
          university: item.E,
          academicYear: item.F,
          user_type: "student",
        }));

      setBulkUsers(studentDetails);
      setSub(true);
    };

    reader.readAsArrayBuffer(file);
  };

  const submitBulkUsers = async () => {
    if (!bulkUsers.length) {
      alert("No data to upload.");
      return;
    }

    try {
      await axios.post(import.meta.env.VITE_BULK_UPLOAD, { users: bulkUsers });
      alert("Bulk registration successful.");
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error in bulk upload.");
    }
  };

  const singleUpload = () => {
    axios
      .post(import.meta.env.VITE_REGISTER, {
        name,
        email,
        user_type,
        registerno: registerNo,
        university: universityName,
        academicYear: academic,
        phone,
      })
      .then(() => alert("Student registered successfully"))
      .catch((err) => console.error("Error", err));

    setName("");
    setPhone("");
    setAcademic("");
    setEmail("");
    setRegisterNo("");
  };

  return (
    <div
      className={`w-full min-h-screen p-4 sm:p-6 flex flex-col lg:flex-row gap-6 transition-colors duration-300 ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Left Panel */}
      <div
        className={`rounded-xl p-4 sm:p-6 w-full lg:max-w-md shadow-lg ${
          isDarkMode
            ? "bg-slate-800"
            : "bg-gradient-to-br from-blue-50 via-blue-100 to-white"
        }`}
      >
        <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center gap-2">
          <FaUserPlus /> Add Student
        </h2>
        <button
          onClick={() => {
            setShowUploadOptions(!showUploadOptions);
            setUploadType(null);
          }}
          className="w-full mb-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {showUploadOptions ? "Hide Options" : "Add Student"}
        </button>

        {showUploadOptions && (
          <>
            <div className="flex gap-2 mb-4 flex-col sm:flex-row">
              <button
                onClick={() => setUploadType("single")}
                className={`w-full py-2 rounded flex items-center justify-center gap-2 ${
                  uploadType === "single"
                    ? "bg-purple-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FaUserEdit /> Single Upload
              </button>
              <button
                onClick={() => setUploadType("bulk")}
                className={`w-full py-2 rounded flex items-center justify-center gap-2 ${
                  uploadType === "bulk"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <FiUpload /> Bulk Upload
              </button>
            </div>

            {uploadType === "single" && (
              <div className="rounded-md shadow p-4 mt-4 flex flex-col gap-3 bg-white dark:bg-slate-700">
                {[
                  { placeholder: "Student Name", value: name, set: setName },
                  { placeholder: "Email ID", value: email, set: setEmail },
                  { placeholder: "Academic Year", value: academic, set: setAcademic },
                  { placeholder: "Phone", value: phone, set: setPhone },
                  { placeholder: "Register Number", value: registerNo, set: setRegisterNo },
                  { placeholder: "University Name", value: universityName, set: setUniversityName },
                ].map((field, idx) => (
                  <input
                    key={idx}
                    type={field.placeholder === "Email ID" ? "email" : "text"}
                    value={field.value}
                    onChange={(e) => field.set(e.target.value)}
                    placeholder={field.placeholder}
                    className="p-2 border rounded bg-white dark:bg-slate-800"
                  />
                ))}
                <button
                  className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  onClick={singleUpload}
                >
                  Register
                </button>
              </div>
            )}

            {uploadType === "bulk" && (
              <div className="rounded-md shadow p-4 mt-4 flex flex-col gap-4 bg-white dark:bg-slate-700">
                <p className="text-sm font-medium">
                  Upload Excel with columns: B (Reg No), C (Name), D (Email), E (University), F (Year), G (Phone)
                </p>
                <input
                  type="file"
                  onChange={bulkFile}
                  className="border border-dashed border-blue-400 p-4 rounded bg-white hover:bg-blue-50 dark:bg-slate-800 cursor-pointer"
                />
                <button
                  className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                  onClick={submitBulkUsers}
                >
                  {sub ? "Submit" : "Upload"}
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Right Panel */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-1/3 p-2 rounded border dark:text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2 flex-wrap justify-center">
            {["all", "1", "2", "3"].map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1 rounded ${
                  selectedYear === year
                    ? "bg-blue-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {year === "all" ? "All" : `${year} Year`}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-lg w-full h-[65vh] overflow-y-auto p-4 sm:p-6 shadow bg-white dark:bg-slate-800">
          <h2 className="text-lg sm:text-xl font-semibold text-center mb-4">
            {selectedYear === "all" ? "All Students" : `${selectedYear} Year Students`}
          </h2>

          {filteredStudents.length === 0 ? (
            <p className="text-center mt-10 text-gray-500 dark:text-gray-300">
              No students found.
            </p>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredStudents.map((stu, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 border-b py-2 text-gray-800 dark:text-gray-100"
                >
                  <span className="text-blue-600 font-semibold">{index + 1}.</span>
                  <span className="text-sm font-medium">{stu.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Teacherthird;