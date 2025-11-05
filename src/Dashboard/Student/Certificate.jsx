// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FiDownload, FiImage } from "react-icons/fi"; // Download & Placeholder Icon
// import useTheme from "/src/Hooks/ThemeHook";

// function Certificate() {
//   const [certificates, setCertificates] = useState([]);
//   const Uemail = localStorage.getItem("userEmail");
//   const isDarkMode = useTheme();

//   // ✅ Backend base URL for relative paths
//   const BASE_URL = import.meta.env.VITE_BACKEND_BASE_URL;

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_CERTIFICATE_USER}${Uemail}`)
//       .then((res) => {
//         console.log(res.data.certificates);
//         setCertificates(res.data.certificates);
//       })
//       .catch((err) => console.error("Error fetching certificates:", err));
//   }, [Uemail]);

//   const handleDownload = (path) => {
//     const fullUrl = BASE_URL + path;
//     const fileName = path.split("/").pop();

//     const link = document.createElement("a");
//     link.href = fullUrl;
//     link.download = fileName;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <div
//       className={`w-full max-w-[1200px] mx-auto p-6 rounded-xl shadow-xl h-[700px] overflow-y-auto transition-colors duration-300 ${
//         isDarkMode
//           ? "bg-slate-800 text-white"
//           : "bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800"
//       }`}
//     >
//       <h1 className="text-3xl font-bold mb-6 text-center">🎓 Certificates</h1>

//       {certificates.length === 0 ? (
//         <p className="text-center text-gray-500 dark:text-gray-300">
//           No certificates found.
//         </p>
//       ) : (
//         <div className="flex flex-wrap gap-6 justify-center">
//           {certificates.map((item, index) => (
//             <div
//               key={index}
//               className={`w-72 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center ${
//                 isDarkMode ? "bg-slate-700" : "bg-white"
//               }`}
//             >
//               {/* Certificate Image */}
//               {item.certificate ? (
//                 <img
//                   src={BASE_URL + item.certificate}
//                   alt={`Certificate ${index + 1}`}
//                   className="w-full h-48 object-cover"
//                 />
//               ) : (
//                 <div className="w-full h-48 flex items-center justify-center bg-gray-200 dark:bg-slate-600">
//                   <FiImage
//                     size={50}
//                     className="text-gray-500 dark:text-gray-300"
//                   />
//                 </div>
//               )}

//               {/* Download Button */}
//               <div className="w-full p-4 flex justify-center">
//                 <button
//                   onClick={() => handleDownload(item.certificate)}
//                   className="flex items-center gap-2 px-4 py-2 rounded-md bg-gradient-to-r from-blue-500 to-blue-700 text-white text-sm font-medium hover:opacity-90 transition"
//                 >
//                   <FiDownload /> Download
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default Certificate;


import axios from "axios";
import { useEffect, useState } from "react";
import { FiDownload, FiImage } from "react-icons/fi";
import useTheme from "/src/Hooks/ThemeHook";

function Certificate() {
  const [certificates, setCertificates] = useState([]);
  const Uemail = localStorage.getItem("userEmail");
  const isDarkMode = useTheme();
  const BASE_URL = "https://lms.thirdvizion.com";

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_CERTIFICATE_USER}${Uemail}`)
      .then((res) => {
        setCertificates(res.data.certificates);
      })
      .catch((err) => console.error("Error fetching certificates:", err));
  }, [Uemail]);

const handleDownload = async (path) => {
  try {
    const fullUrl = BASE_URL + path;
    const fileName = path.split("/").pop();

    const response = await axios.get(fullUrl, {
      responseType: "blob", // Force binary download
    });

    const blobUrl = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    link.remove();

    window.URL.revokeObjectURL(blobUrl); // Clean up
  } catch (error) {
    console.error("Download failed:", error);
    alert("Failed to download certificate.");
  }
};


  return (
    <div
      className={`font-mono w-full max-w-[1200px] mx-auto p-6 rounded-xl  h-[700px] overflow-y-auto transition-colors duration-300 ${
        isDarkMode ? "bg-zinc-900 text-white" : ""
      }`}
    >
      <h1 className="text-3xl font-bold mb-8 text-center text-orange-600">
        Your Certificates
      </h1>

      {certificates.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-300">
          No certificates found.
        </p>
      ) : (
        <div className="flex flex-wrap gap-6 justify-center">
          {certificates.map((item, index) => (
            <div
              key={index}
              className={`w-72 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col items-center border ${
                isDarkMode
                  ? "bg-zinc-800 border-zinc-700"
                  : "bg-white border-orange-200"
              }`}
            >
              {/* Certificate Image */}
              {item.certificate ? (
                <img
  src={`${BASE_URL}${item.certificate}`}
  onError={() => console.error("Failed to load:", BASE_URL + item.certificate)}
  alt={`Certificate ${index + 1}`}
  className="w-full h-48 object-cover"
/>

              ) : (
                <div className="w-full h-48 flex items-center justify-center bg-orange-100 dark:bg-zinc-700">
                  <FiImage
                    size={50}
                    className="text-orange-400 dark:text-orange-300"
                  />
                </div>
              )}

              {/* Download Button */}
              <div className="w-full p-4 flex justify-center">
                <button
                  // onClick={() => handleDownload(item.certificate)}
                  onClick={() =>
                    window.open(`${BASE_URL}${item.certificate}`, "_blank")
                  }
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm font-semibold hover:opacity-90 transition"
                >
                  <FiDownload /> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Certificate;
