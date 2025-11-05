import { useEffect, useState } from "react";
import bg from "../../assets/SuperAdmin/adminBg.png";
import axios from "axios";
import AddCourse from "./Course_Add/Addcourse";
import AddChapter from "./Course_Add/AddChapter";
import Documents from "./Course_Add/Documents";
import AddQuiz from "./Course_Add/AddQuiz";
import AddUniversity from "./AddUniversity";
import AddTeacher from "./AddTeacher";
import AddStudent from "./AddStudents";
import CertificateTemplate from "./CertificateTemplate";
import Addblog from "./AddBlog";
import SemesterList from "./SemesterList";

function Element() {
  const [course, setCourse] = useState();
  const [students, setStudents] = useState();
  const [college, setCollege] = useState();

  const [showModal, setShowModal] = useState(false);
  const [showUniversityModal, setShowUniversityModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [showSemesterModal, setShowSemesterModal] = useState(false);

  const [step, setStep] = useState(1);
  const [currentStepCompleted, setCurrentStepCompleted] = useState(false);

  const steps = ["Course", "Chapter", "Resource", "Quiz"];

  useEffect(() => {
    axios.get(import.meta.env.VITE_COUNT).then((json) => {
      setCollege(json.data.total_university);
      setStudents(json.data.total_student);
      setCourse(json.data.total_course);
    });
  }, []);

  const handleNext = () => {
    if (step < steps.length) {
      setStep(step + 1);
      setCurrentStepCompleted(false);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      setCurrentStepCompleted(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setStep(1);
    setCurrentStepCompleted(false);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return <AddCourse onSuccess={() => setCurrentStepCompleted(true)} />;
      case 2:
        return <AddChapter onSuccess={() => setCurrentStepCompleted(true)} />;
      case 3:
        return <Documents onSuccess={() => setCurrentStepCompleted(true)} />;
      case 4:
        return (
          <AddQuiz onSuccess={closeModal} goToChapterStep={() => setStep(2)} />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-cover rounded-xl gap-4 p-6"
        style={{ backgroundImage: `url(${bg})` }}
      >
        {/* Welcome Banner */}
        <div className=" w-full col-span-1 md:col-span-2 bg-white/60 backdrop-blur-md rounded-xl shadow-md p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-semibold text-gray-800">Welcome</h1>
          <h2 className="text-4xl font-bold text-[#084D90] mt-2">
            Scopik Admin
          </h2>
        </div>

        {/* Action Buttons - 1 per grid cell */}
        <div className="flex justify-center items-center bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-3">
          <ActionButton
            text="+ Create Course"
            color="#42a3ff"
            onClick={() => setShowModal(true)}
          />
        </div>

        <div className="flex justify-center items-center bg-white/70 backdrop-blur-lg rounded-xl p-3">
          <ActionButton
            text="+ Add University"
            color="#FF8816"
            onClick={() => setShowUniversityModal(true)}
          />
        </div>

        <div className="flex justify-center items-center bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-3">
          <ActionButton
            text="+ Add Faculty"
            color="#42a3ff"
            onClick={() => setShowFacultyModal(true)}
          />
        </div>

        <div className="flex justify-center items-center bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-3">
          <ActionButton
            text="+ Add Student"
            color="#FF8816"
            onClick={() => setShowStudentModal(true)}
          />
        </div>

        <div className="bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-3">
          <ActionButton
            text="+ Certificate Template"
            color="#42a3ff"
            onClick={() => setShowCertificateModal(true)}
          />
        </div>

        <div className="flex justify-center items-center bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-3">
          <ActionButton
            text="+ Add Blog"
            color="#FF8816"
            onClick={() => setShowBlogModal(true)}
          />
        </div>

        <div className="flex justify-center items-center bg-white/70 backdrop-blur-lg rounded-xl shadow-md p-3">
          <ActionButton
            text="+ Semester List"
            color="#42a3ff"
            onClick={() => setShowSemesterModal(true)}
          />
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        <StatCard count={course} label="Courses" />
        <StatCard count={students} label="Students" />
        <StatCard count={college} label="Colleges" />
      </div>

      {/* Modals */}
      {showModal && (
        <Modal
          onClose={closeModal}
          width="max-w-4xl"
          height="h-[90vh]"
          scrollable
        >
          <div className="mb-6">
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div
                className="bg-[#084D90] h-full transition-all duration-500"
                style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
              ></div>
            </div>
            <div className="mt-2 text-center text-gray-600 font-medium">
              Step {step} of {steps.length}: {steps[step - 1]}
            </div>
          </div>

          <div className="flex-1">{renderStepContent()}</div>

          <div className="mt-6 flex justify-between">
            <button
              onClick={handleBack}
              disabled={step === 1}
              className={`px-5 py-2 rounded-md font-medium transition ${
                step === 1
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-200 hover:bg-gray-300"
              }`}
            >
              Back
            </button>

            {step < steps.length && (
              <button
                onClick={handleNext}
                disabled={!currentStepCompleted}
                className={`px-5 py-2 rounded-md font-medium transition ${
                  currentStepCompleted
                    ? "bg-[#084D90] text-white hover:bg-blue-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            )}
          </div>
        </Modal>
      )}
      {/* University Modal */}
      {showUniversityModal && (
        <Modal
          onClose={() => setShowUniversityModal(false)}
          width="max-w-7xl"
          height="h-[90vh]"
        >
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-[#084D90] mb-4">
              Universities
            </h2>
            <div className="flex-1 overflow-auto">
              <AddUniversity />
            </div>
          </div>
        </Modal>
      )}

      {/* Faculty (Teacher) Modal - FIXED height */}
      {showFacultyModal && (
        <Modal
          onClose={() => setShowFacultyModal(false)}
          width="max-w-5xl"
          height="h-[90vh]"
        >
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-[#084D90] mb-4">
              Add Faculty
            </h2>
            <div className="flex-1 overflow-auto">
              <AddTeacher />
            </div>
          </div>
        </Modal>
      )}

      {/* Student Modal - FIXED height */}
      {showStudentModal && (
        <Modal
          onClose={() => setShowStudentModal(false)}
          width="max-w-4xl"
          height="h-[90vh]"
        >
          <div className="p-6 flex flex-col h-full">
            <h2 className="text-2xl font-bold text-[#084D90] mb-4">
              Add Student
            </h2>
            <div className="flex-1 overflow-auto">
              <AddStudent />
            </div>
          </div>
        </Modal>
      )}

      {/* Scrollable Modals */}
      {showCertificateModal && (
        <Modal
          onClose={() => setShowCertificateModal(false)}
          width="max-w-2xl"
          height="h-[70vh]"
          scrollable
        >
          <CertificateTemplate />
        </Modal>
      )}
      {showBlogModal && (
        <Modal
          onClose={() => setShowBlogModal(false)}
          width="max-w-2xl"
          height="h-[70vh]"
          scrollable
        >
          <Addblog />
        </Modal>
      )}
      {showSemesterModal && (
        <Modal
          onClose={() => setShowSemesterModal(false)}
          width="max-w-2xl"
          height="h-[70vh]"
          scrollable
        >
          <SemesterList />
        </Modal>
      )}
    </>
  );
}

function Modal({
  onClose,
  children,
  width = "max-w-2xl",
  height = "h-[80vh]",
  scrollable = false,
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center px-4">
      <div
        className={`bg-white w-full ${width} ${height} rounded-xl shadow-xl relative flex flex-col`}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-400 hover:text-red-500 text-2xl font-bold z-10"
        >
          &times;
        </button>
        <div className={`${scrollable ? "p-6 overflow-y-auto" : "p-6"} flex-1`}>
          {children}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ text, color, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full h-full px-5 py-2 rounded-md hover:brightness-90 transition font-medium shadow`}
      style={{ backgroundColor: color, color: "#fff" }}
    >
      {text}
    </button>
  );
}

function StatCard({ count, label }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 text-center">
      <p className="text-4xl font-bold text-[#084D90]">{count}</p>
      <h3 className="text-xl font-medium text-[#084D90]">{label}</h3>
    </div>
  );
}

export default Element;
