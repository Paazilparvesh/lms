// import axios from "axios";
// import { useEffect, useState } from "react";

// function Addblog() {
//   const [add, setAdd] = useState(false);
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);
//   const [viewcat, setViewcat] = useState([]);
//   const [popupMessage, setPopupMessage] = useState("");
//   const [blogs, setBlogs] = useState([]);
//   const [editMode, setEditMode] = useState(false);
//   const [editData, setEditData] = useState(null);
//   const [blogToDelete, setBlogToDelete] = useState(null);

//   const fetchBlogs = () => {
//     axios.get(import.meta.env.VITE_BLOG_VIEW).then((res) => {
//       setBlogs(res.data);
//     });
//   };

//   useEffect(() => {
//     axios.get(import.meta.env.VITE_View_Category).then((res) => {
//       setViewcat(res.data);
//     });
//     fetchBlogs();
//   }, []);

//   const handleEdit = (blog) => {
//     setEditData(blog);
//     setTitle(blog.title);
//     setContent(blog.content);
//     setImage(blog.image);
//     setCategory(blog.category?.name || ""); // If category is an object
//     setEditMode(true);
//   };

//   const handleUpdate = () => {
//     if (!title || !content || !category || !image) {
//       setPopupMessage("Please fill in all fields.");
//       return;
//     }

//     axios
//       .put(
//         `https://lmsdemo.thirdvizion.com/api/editblog/${editData.id}/`,
//         null,
//         {
//           params: {
//             title,
//             content,
//             image,
//             category,
//           },
//         }
//       )
//       .then(() => {
//         setPopupMessage("Blog updated successfully!");
//         setEditMode(false);
//         fetchBlogs();
//         setTitle("");
//         setContent("");
//         setImage(null);
//         setCategory("");
//       })
//       .catch(() => {
//         setPopupMessage("Failed to update blog");
//       });
//   };

//   const handleSubmit = () => {
//     if (!title || !content || !category || !image) {
//       setPopupMessage("Please fill in all fields including image and category");
//       return;
//     }

//     axios
//       .post(import.meta.env.VITE_BLOG_UPLOAD, {
//         title,
//         content,
//         image,
//         category,
//       })
//       .then(() => {
//         setPopupMessage("Blog added successfully!");
//         setTitle("");
//         setContent("");
//         setCategory("");
//         setImage(null);
//         setAdd(false);
//         fetchBlogs();
//       })
//       .catch((err) => {
//         console.log("There is an error", err);
//         setPopupMessage("Blog upload failed. Please try again.");
//       });
//   };

//   const handleImageChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("upload_preset", "Scopik");

//     try {
//       const response = await fetch(
//         "https://api.cloudinary.com/v1_1/dm8wceqw2/image/upload",
//         {
//           method: "POST",
//           body: formData,
//         }
//       );

//       const data = await response.json();
//       if (data.secure_url) {
//         setImage(data.secure_url);
//       } else {
//         setPopupMessage("Image upload failed.");
//       }
//     } catch (err) {
//       console.error("Image upload error:", err);
//       setPopupMessage("Image upload failed.");
//     }
//   };

//   const handleDelete = (name) => {
//     axios
//       .delete(`${import.meta.env.VITE_BLOG_DELETE}${name}`)
//       .then(() => {
//         fetchBlogs();
//         setPopupMessage("Blog deleted successfully");
//       })
//       .catch(() => {
//         setPopupMessage("Failed to delete blog");
//       });
//   };

//   return (
//     <div className="relative max-w-7xl mx-auto p-6 space-y-10 bg-white rounded-xl shadow">
//       {/* ✅ Popup Modal */}
//       {popupMessage && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
//             <h2 className="text-lg font-semibold text-gray-800 mb-4">
//               {popupMessage}
//             </h2>
//             <button
//               onClick={() => setPopupMessage("")}
//               className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
//             >
//               OK
//             </button>
//           </div>
//         </div>
//       )}

//       {/* ✅ Header */}
//       <div className="flex justify-between items-center">
//         <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
//         <button
//           onClick={() => setAdd(true)}
//           className="bg-green-600 hover:bg-green-700 px-5 py-2 text-white rounded-lg font-medium shadow"
//         >
//           + Add Blog
//         </button>
//       </div>

//       {/* ✅ Blog Form */}
//       {add && (
//         <div className="bg-gray-100 p-6 rounded-lg shadow space-y-6">
//           <div className="flex justify-between items-center">
//             <h2 className="text-xl font-semibold text-gray-700">Add Blog</h2>
//             <button
//               onClick={() => setAdd(false)}
//               className="text-gray-500 hover:text-gray-700 text-xl font-bold"
//             >
//               &times;
//             </button>
//           </div>

//           <div className="grid md:grid-cols-2 gap-6">
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 font-medium mb-1">
//                 Blog Title <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="text"
//                 placeholder="Enter blog title"
//                 className="border border-gray-300 rounded-lg p-3 text-gray-800"
//                 value={title}
//                 onChange={(e) => setTitle(e.target.value)}
//               />
//             </div>

//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 font-medium mb-1">
//                 Category <span className="text-red-500">*</span>
//               </label>
//               <select
//                 className="border border-gray-300 rounded-lg p-3 text-gray-800"
//                 value={category}
//                 onChange={(e) => setCategory(e.target.value)}
//               >
//                 <option value="">Select category</option>
//                 {viewcat.map((item, index) => (
//                   <option key={index}>{item.name}</option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex flex-col md:col-span-2">
//               <label className="text-sm text-gray-600 font-medium mb-1">
//                 Blog Content <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 rows={5}
//                 placeholder="Write blog content..."
//                 className="border border-gray-300 rounded-lg p-3 text-gray-800"
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//               ></textarea>
//             </div>

//             <div className="flex flex-col md:col-span-2">
//               <label className="text-sm text-gray-600 font-medium mb-1">
//                 Upload Image <span className="text-red-500">*</span>
//               </label>
//               <div className="border-2 border-dashed border-gray-400 p-4 rounded-lg">
//                 <input
//                   type="file"
//                   accept="image/*"
//                   onChange={handleImageChange}
//                   className="cursor-pointer"
//                 />
//               </div>

//               {image && (
//                 <div className="mt-4">
//                   <img
//                     src={image}
//                     alt="Uploaded Preview"
//                     className="w-[300px] h-[300px] object-cover rounded-lg border"
//                   />
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="flex justify-end mt-4">
//             <button
//               onClick={handleSubmit}
//               className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-lg font-semibold"
//             >
//               Save Blog
//             </button>
//           </div>
//         </div>
//       )}

//       {/* {editMode && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
//           <div className="bg-white p-6 rounded-lg w-full max-w-2xl shadow space-y-4">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Edit Blog</h2>
//             <input
//               type="text"
//               placeholder="Blog Title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full border p-3 rounded-lg"
//             />
//             <select
//               value={category}
//               onChange={(e) => setCategory(e.target.value)}
//               className="w-full border p-3 rounded-lg"
//             >
//               <option value="">Select Category</option>
//               {viewcat.map((cat, i) => (
//                 <option key={i}>{cat.name}</option>
//               ))}
//             </select>
//             <textarea
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               rows={4}
//               className="w-full border p-3 rounded-lg"
//               placeholder="Blog Content"
//             />
//             <input type="file" onChange={handleImageChange} />
//             {image && (
//               <img
//                 src={image}
//                 className="w-[200px] h-[200px] rounded object-cover mt-2"
//                 alt="Preview"
//               />
//             )}

//             <div className="flex justify-end space-x-4">
//               <button
//                 className="bg-gray-400 px-4 py-2 rounded-lg text-white"
//                 onClick={() => setEditMode(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="bg-blue-600 px-4 py-2 rounded-lg text-white"
//                 onClick={handleUpdate}
//               >
//                 Update Blog
//               </button>
//             </div>
//           </div>
//         </div>
//       )} */}
//       {editMode && (
//         <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 overflow-y-auto ">
//           <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow space-y-6 relative">
//             {/* ❌ Close button */}
//             <button
//               onClick={() => setEditMode(false)}
//               className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
//             >
//               &times;
//             </button>

//             <h2 className="text-xl font-bold text-gray-800 mb-2">Edit Blog</h2>

//             {/* ✨ Flex row for Title + Category */}
//             <div className="flex flex-col md:flex-row gap-6">
//               <div className="flex flex-col w-full">
//                 <label className="text-sm text-gray-600 font-medium mb-1">
//                   Blog Title <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="Enter blog title"
//                   value={title}
//                   onChange={(e) => setTitle(e.target.value)}
//                   className="border p-3 rounded-lg"
//                 />
//               </div>

//               <div className="flex flex-col w-full">
//                 <label className="text-sm text-gray-600 font-medium mb-1">
//                   Category <span className="text-red-500">*</span>
//                 </label>
//                 <select
//                   value={category}
//                   onChange={(e) => setCategory(e.target.value)}
//                   className="border p-3 rounded-lg"
//                 >
//                   <option value="">Select Category</option>
//                   {viewcat.map((cat, i) => (
//                     <option key={i}>{cat.name}</option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             {/* ✨ Content */}
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 font-medium mb-1">
//                 Blog Content <span className="text-red-500">*</span>
//               </label>
//               <textarea
//                 value={content}
//                 onChange={(e) => setContent(e.target.value)}
//                 rows={5}
//                 placeholder="Write blog content..."
//                 className="border p-3 rounded-lg"
//               />
//             </div>

//             {/* ✨ Image Upload */}
//             <div className="flex flex-col">
//               <label className="text-sm text-gray-600 font-medium mb-1">
//                 Upload Image <span className="text-red-500">*</span>
//               </label>
//               <input type="file" onChange={handleImageChange} />
//               {image && (
//                 <img
//                   src={image}
//                   className="w-[200px] h-[200px] rounded object-cover mt-3 border"
//                   alt="Preview"
//                 />
//               )}
//             </div>

//             {/* ✨ Update Button */}
//             <div className="flex justify-end">
//               <button
//                 className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg text-white font-semibold"
//                 onClick={handleUpdate}
//               >
//                 Update Blog
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {blogToDelete && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl space-y-4 text-center">
//             <h2 className="text-lg font-semibold text-gray-800">
//               Are you sure you want to delete{" "}
//               <span className="font-bold">{blogToDelete.title}</span>?
//             </h2>
//             <div className="flex justify-center gap-4 mt-6">
//               <button
//                 onClick={() => {
//                   handleDelete(blogToDelete.title);
//                   setBlogToDelete(null);
//                 }}
//                 className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white font-semibold"
//               >
//                 Yes, Delete
//               </button>
//               <button
//                 onClick={() => setBlogToDelete(null)}
//                 className="bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded text-gray-800 font-semibold"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* ✅ Blog Content Display Section */}
//       <div className="bg-white rounded-xl shadow p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//           Blog Content
//         </h2>
//         <div className="grid md:grid-cols-3 gap-6 h-[400px] overflow-y-scroll pr-2">
//           {blogs.map((blog, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow-md border p-4 flex flex-col justify-between"
//             >
//               <img
//                 src={blog.image}
//                 alt={blog.title}
//                 className="h-48 w-full object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-bold text-gray-800 mb-2">
//                 {blog.title}
//               </h3>
//               <div className="flex justify-between items-center gap-5">
//                 <button
//                   onClick={() => handleEdit(blog)}
//                   className="w-full bg-blue-500 text-white px-4 py-2 rounded-full font-medium mt-2"
//                 >
//                   Edit
//                 </button>

//                 <button
//                   // onClick={() => handleDelete(blog.title)}
//                   onClick={() => setBlogToDelete(blog)}
//                   className="w-full mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full font-medium"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Addblog;


import axios from "axios";
import { useEffect, useState } from "react";

function Addblog() {
  const [add, setAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = () => {
    axios.get(import.meta.env.VITE_BLOG_VIEW).then((res) => {
      setBlogs(res.data);
    });
  };

  const handleSubmit = () => {
    if (!title || !category || imageUrls.length === 0) {
      setPopupMessage("Please fill in all fields and upload at least one image.");
      return;
    }

    axios
      .post(import.meta.env.VITE_BLOG_UPLOAD, {
        title,
        content,
        category,
        image_urls: imageUrls,
      })
      .then(() => {
        setPopupMessage("Blog added successfully!");
        setTitle("");
        setContent("");
        setCategory("");
        setImageUrls([]);
        setAdd(false);
        fetchBlogs();
      })
      .catch((err) => {
        console.log("There is an error", err);
        setPopupMessage("Blog upload failed. Please try again.");
      });
  };

  const handleImageChange = async (e) => {
    const files = Array.from(e.target.files);
    const uploadedUrls = [];

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Scopik");

      try {
        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dm8wceqw2/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();
        if (data.secure_url) {
          uploadedUrls.push(data.secure_url);
        } else {
          setPopupMessage("One or more image uploads failed.");
        }
      } catch (err) {
        console.error("Image upload error:", err);
        setPopupMessage("Image upload failed.");
      }
    }

    setImageUrls((prev) => [...prev, ...uploadedUrls]);
  };

  const handleDelete = (name) => {
    axios
      .delete(`${import.meta.env.VITE_BLOG_DELETE}${name}`)
      .then(() => {
        fetchBlogs();
        setPopupMessage("Blog deleted successfully");
      })
      .catch(() => {
        setPopupMessage("Failed to delete blog");
      });
  };

  const removeImage = (urlToRemove) => {
    setImageUrls((prev) => prev.filter((url) => url !== urlToRemove));
  };

  return (
    <div className="relative max-w-7xl mx-auto p-6 space-y-10 bg-white rounded-xl shadow">
      {/* ✅ Popup Modal */}
      {popupMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              {popupMessage}
            </h2>
            <button
              onClick={() => setPopupMessage("")}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* ✅ Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Blogs</h1>
        <button
          onClick={() => setAdd(true)}
          className="bg-green-600 hover:bg-green-700 px-5 py-2 text-white rounded-lg font-medium shadow"
        >
          + Add Blog
        </button>
      </div>

      {/* ✅ Blog Form */}
      {add && (
        <div className="bg-gray-100 p-6 rounded-lg shadow space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">
                Blog Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter blog title"
                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-gray-600 font-medium mb-1">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Enter blog category"
                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm text-gray-600 font-medium mb-1">
                Blog Content <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={5}
                placeholder="Write blog content..."
                className="border border-gray-300 rounded-lg p-3 text-gray-800"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>

            <div className="flex flex-col md:col-span-2">
              <label className="text-sm text-gray-600 font-medium mb-1">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="cursor-pointer border-2 border-dashed border-gray-400 p-4 rounded-lg"
              />

              {/* Show uploaded images */}
              {imageUrls.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                  {imageUrls.map((img, i) => (
                    <div key={i} className="relative">
                      <img
                        src={img}
                        alt={`Uploaded ${i}`}
                        className="w-full h-[150px] object-cover rounded-lg border"
                      />
                      <button
                        onClick={() => removeImage(img)}
                        className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs"
                      >
                        X
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 text-white rounded-lg font-semibold"
            >
              Save Blog
            </button>
          </div>
        </div>
      )}

      {/* ✅ Blog Display Section */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Blog Content</h2>

        <div className="grid md:grid-cols-3 gap-6 h-[400px] overflow-y-scroll pr-2">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border p-4 flex flex-col justify-between"
            >
              <img
                src={blog.image_urls?.[0]}
                alt={blog.title}
                className="h-48 w-full object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {blog.title}
              </h3>
              <button
                onClick={() => handleDelete(blog.title)}
                className="mt-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        {/* ✅ Image Link List */}
        <div className="mt-10">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Image Links
          </h3>
          <ul className="list-disc list-inside space-y-2 text-blue-700">
            {blogs.flatMap((blog) =>
              blog.image_urls?.map((url, i) => (
                <li key={`${blog.title}-${i}`}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline"
                  >
                    {url}
                  </a>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Addblog;