import axios from "axios";
import { useEffect, useState } from "react";

function AddTeacher() {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [pass, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [univ, setUniv] = useState("");
  const [phone, setPhone] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [user_type] = useState("Faculty");

  useEffect(() => {
    axios
      .get(`https://lmsdemo.thirdvizion.com/api/teacher/`)
      .then((res) => {
        setTeachers(res.data);
      })
      .catch((err) => console.log("Error", err));
  }, []);

  const addTeacher = () => {
    axios
      .post("https://lmsdemo.thirdvizion.com/api/register/", {
        name,
        email,
        password: pass,
        user_type,
        university: univ,
        phone,
      })
      .then(() => {
        alert("Teacher registered successfully");
        setName("");
        setPassword("");
        setEmail("");
        setUniv("");
        setPhone("");
        setShowForm(false);
        setTeachers((prev) => [...prev, { name, university: univ }]);
      })
      .catch((err) => {
        console.log("Error", err);
      });
  };

  const inputStyle = "p-2 border rounded outline-none bg-white";

  return (
    <div className="w-full min-h-screen bg-gray-50 px-4 py-8 flex gap-6 rounded-xl">
      {/* Left Panel - Add Teacher */}
      <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-white shadow-lg rounded-xl p-6 w-full max-w-md h-fit">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Add Faculty</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="w-full mb-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          {showForm ? "Close" : "Add Teacher"}
        </button>

        {showForm && (
          <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-white rounded-md shadow p-4 mt-4 flex flex-col gap-3">
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" className={inputStyle} />
            <input type="text" value={univ} onChange={(e) => setUniv(e.target.value)} placeholder="University Name" className={inputStyle} />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email ID" className={inputStyle} />
            <input type="password" value={pass} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className={inputStyle} />
            <input type="tel" maxLength={10} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone Number" className={inputStyle} />
            <button onClick={addTeacher} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Register
            </button>
          </div>
        )}
      </div>

      {/* Right Panel - List Teachers */}
      <div className="flex-1 bg-white rounded-lg shadow p-6 h-[80vh] overflow-y-auto">
        <h2 className="text-xl font-semibold text-center text-gray-800 mb-4">Faculty Members</h2>
        {teachers.length === 0 ? (
          <p className="text-gray-500 text-center">No faculty data available.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {teachers.map((t, index) => (
              <div key={index} className="flex items-center gap-2 border-b pb-2 text-gray-800">
                <span className="text-blue-600 font-semibold">{index + 1}.</span>
                <span className="font-medium">{t.name}</span>
                <span className="text-sm text-gray-600">({t.university})</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddTeacher;
