import axios from "axios";
import { useEffect, useState } from "react";
import * as XLSX from "xlsx";

function AddTeacher() {
  const [showUploadOptions, setShowUploadOptions] = useState(false);
  const [uploadType, setUploadType] = useState(null);
  const [name, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [univ, setUniv] = useState("");
  const [phone, setPhone] = useState("");
  const [dept, setDept] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [course, setCourse] = useState([]);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [bulkUsers, setBulkUsers] = useState([]);
  const [sub, setSub] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const user_type = "Faculty";
  const Email = localStorage.getItem("userEmail");
  const uniName = localStorage.getItem("univName");

  const inputStyle = "w-full p-2 border rounded outline-none bg-white dark:bg-gray-700 dark:text-white";

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_UNIVERSITY_FACULTY, { params: { email: Email } })
      .then((res) => setTeachers(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    axios
      .get(import.meta.env.VITE_UNIVERSITY_COURSE, { params: { email: Email } })
      .then((res) => setCourse(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDelete = (Teach) => setTeacherToDelete(Teach);
  const cancelDelete = () => setTeacherToDelete(null);

  const confirmDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_FACULTY_DELETE}${teacherToDelete}`)
      .then(() => {
        setTeachers((prev) => prev.filter((t) => t.name !== teacherToDelete));
        setTeacherToDelete(null);
        setModalMessage("Teacher deleted successfully!");
        setShowModal(true);
      })
      .catch(() => {
        setTeacherToDelete(null);
        setModalMessage("Error deleting teacher.");
        setShowModal(true);
      });
  };

  const addTeacher = () => {
    axios
      .post(import.meta.env.VITE_REGISTER, {
        name,
        email,
        password: pass,
        user_type,
        university: univ,
        phone,
        department: dept,
      })
      .then(() => {
        setName("");
        setPassword("");
        setEmail("");
        setUniv("");
        setPhone("");
        setDept("");
        setShowUploadOptions(false);
        setTeachers((prev) => [...prev, { name, university: univ }]);
        setModalMessage("Teacher registered successfully!");
        setShowModal(true);
      })
      .catch(() => {
        setModalMessage("Error registering teacher.");
        setShowModal(true);
      });
  };

  const bulkFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (ev) => {
      const workbook = XLSX.read(ev.target.result, { type: "binary" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const detail = XLSX.utils.sheet_to_json(sheet, { header: "A" });
      const facultyDetails = detail
        .filter((item) => item.B && item.C && item.D && item.E && item.F && typeof item.A === "number")
        .map((item) => ({
          name: item.B,
          email: item.C,
          department: item.D,
          university: item.E,
          phone: String(item.F || ""),
          user_type: "Faculty",
          password: "defaultpass123",
        }));
      setBulkUsers(facultyDetails);
      setSub(true);
    };
    reader.readAsArrayBuffer(file);
  };

  const submitBulkUsers = async () => {
    if (!bulkUsers.length) {
      setModalMessage("No data to upload.");
      setShowModal(true);
      return;
    }
    try {
      await axios.post("https://lms.thirdvizion.com/api/bulkupload/", { users: bulkUsers });
      setBulkUsers([]);
      setSub(false);
      setModalMessage("Bulk faculty registration successful!");
      setShowModal(true);
    } catch {
      setModalMessage("Error in bulk upload.");
      setShowModal(true);
    }
  };

  const handleEdit = (teacher) => {
    setEditingTeacher(teacher);
    setSelectedCourses([]);
  };

  const addCourseToSelection = (courseName) => {
    if (courseName && !selectedCourses.includes(courseName)) {
      setSelectedCourses((prev) => [...prev, courseName]);
    }
  };
  const removeCourse = (courseName) => setSelectedCourses((prev) => prev.filter((c) => c !== courseName));

  const assignCoursesToTeacher = () => {
    if (!editingTeacher || !selectedCourses.length) {
      setModalMessage("Please select at least one course to assign.");
      setShowModal(true);
      return;
    }
    axios
      .post("https://lms.thirdvizion.com/api/assigncoursetofaculty/", {
        faculty_email: editingTeacher.email,
        course_name: selectedCourses,
        university: uniName,
      })
      .then(() => {
        setEditingTeacher(null);
        setSelectedCourses([]);
        setModalMessage("Courses assigned successfully!");
        setShowModal(true);
      })
      .catch(() => {
        setModalMessage("Failed to assign courses.");
        setShowModal(true);
      });
  };

  return (
    <div className="w-full min-h-screen bg-gray-50 dark:bg-gray-900 px-4 py-6 flex flex-col lg:flex-row gap-6">
      {/* Left Panel */}
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 w-full lg:max-w-md">
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Add Faculty</h2>
        <button
          onClick={() => setShowUploadOptions((s) => !s)}
          className="w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {showUploadOptions ? "Hide Options" : "Add Teacher"}
        </button>

        {showUploadOptions && (
          <>
            <div className="flex flex-col sm:flex-row gap-2 mb-4">
              <button
                onClick={() => setUploadType("single")}
                className={`flex-1 py-2 rounded ${
                  uploadType === "single" ? "bg-purple-600 text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-700"
                }`}
              >
                Single Upload
              </button>
              <button
                onClick={() => setUploadType("bulk")}
                className={`flex-1 py-2 rounded ${
                  uploadType === "bulk" ? "bg-green-600 text-white" : "bg-gray-100 dark:bg-gray-700 dark:text-white text-gray-700"
                }`}
              >
                Bulk Upload
              </button>
            </div>

            {uploadType === "single" && (
              <div className="flex flex-col gap-3">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className={inputStyle} />
                <input type="text" value={univ} onChange={(e) => setUniv(e.target.value)} placeholder="University Name" className={inputStyle} />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" className={inputStyle} />
                <input type="password" value={pass} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inputStyle} />
                <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className={inputStyle} />
                <input type="text" value={dept} onChange={(e) => setDept(e.target.value)} placeholder="Department" className={inputStyle} />
                <button onClick={addTeacher} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">Register</button>
              </div>
            )}

            {uploadType === "bulk" && (
              <div className="flex flex-col gap-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  Upload Excel with: <b>SrNo (A)</b>, <b>Name (B)</b>, <b>Email (C)</b>, <b>Department (D)</b>, <b>University (E)</b>, <b>Phone (F)</b>
                </p>
                <input type="file" onChange={bulkFile} className="border border-dashed border-blue-400 p-5 rounded cursor-pointer bg-white dark:bg-gray-700 hover:bg-blue-50 text-sm text-gray-700 dark:text-white transition" />
                <button onClick={submitBulkUsers} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">{sub ? "Submit" : "Upload"}</button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Faculty List */}
      <div className="flex-1">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 h-[60vh] lg:h-[80vh] overflow-y-auto">
          <h2 className="text-xl font-semibold text-center mb-4 dark:text-white">Faculty Members</h2>
          {teachers.length === 0 ? (
            <p className="text-gray-500 text-center dark:text-gray-300">No faculty data available.</p>
          ) : (
            teachers.map((t, i) => (
              <div key={i} className="flex justify-between items-center border-b pb-2 text-gray-800 dark:text-white text-sm sm:text-base">
                <div className="flex items-center gap-2">
                  <span className="text-blue-600 font-semibold">{i + 1}.</span>
                  <span className="font-medium">{t.name}</span>
                </div>
                <div className="flex gap-2">
                  <button className="bg-purple-600 text-white px-2 py-1 rounded hover:bg-purple-700" onClick={() => handleEdit(t)}>Assign</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700" onClick={() => handleDelete(t.name)}>Delete</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default AddTeacher;