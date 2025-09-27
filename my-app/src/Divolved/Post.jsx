

// import React, { useState } from "react";

// export default function ArtifactForm() {
//   const [formData, setFormData] = useState({
//     name: "",
//     personType: "author",
//     personName: "",
//     size: "",
//     weight: "",
//     type: "",
//     description: "",
//     price: "",
//     image: null,
//   });

//   const [preview, setPreview] = useState(null);
//   const [error, setError] = useState("");
//   const [status, setStatus] = useState(""); // "posting", "success", "error"

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (file.size > 1.5 * 1024 * 1024) {
//         setError("Image must be less than 1.5MB");
//         setFormData((prev) => ({ ...prev, image: null }));
//         setPreview(null);
//         return;
//       }
//       setError("");
//       setFormData((prev) => ({ ...prev, image: file }));
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setStatus("posting");
//     setError("");

//     const data = new FormData();

//     if (formData.image) {
//       data.append("image", formData.image); // 👈 must match backend
//     }

//     data.append("name", formData.name);
//     data.append("personType", formData.personType);
//     data.append("personName", formData.personName);
//     data.append("size", formData.size);
//     data.append("weight", formData.weight);
//     data.append("description", formData.description);
//     data.append("price", formData.price);

//     // 👇 Auto-tag inventions
//     if (formData.personType === "inventor") {
//       data.append("type", "invention");
//     } else {
//       data.append("type", formData.type || "artwork");
//     }

//     try {
//       const res = await fetch("http://localhost:3000/api/art", {
//         method: "POST",
//         body: data, // don't set Content-Type manually
//       });

//       if (!res.ok) throw new Error("Failed to submit");

//       setStatus("success");
//       setFormData({
//         name: "",
//         personType: "author",
//         personName: "",
//         size: "",
//         weight: "",
//         type: "",
//         description: "",
//         price: "",
//         image: null,
//       });
//       setPreview(null);
//     } catch (err) {
//       setStatus("error");
//       setError(err.message);
//     }
//   };

//   return (
//     <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
//       <h2 className="text-2xl font-bold mb-6 text-center">Upload Artifact</h2>

//       {status === "posting" && (
//         <p className="text-blue-500 mb-4">Posting...</p>
//       )}
//       {status === "success" && (
//         <p className="text-green-600 mb-4">✅ Posted successfully!</p>
//       )}
//       {status === "error" && error && (
//         <p className="text-red-500 mb-4">❌ {error}</p>
//       )}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         {/* Name */}
//         <input
//           type="text"
//           name="name"
//           placeholder="Name"
//           value={formData.name}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         {/* Author or Inventor */}
//         <div className="flex items-center space-x-4">
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="personType"
//               value="author"
//               checked={formData.personType === "author"}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             Author
//           </label>
//           <label className="flex items-center">
//             <input
//               type="radio"
//               name="personType"
//               value="inventor"
//               checked={formData.personType === "inventor"}
//               onChange={handleChange}
//               className="mr-2"
//             />
//             Inventor
//           </label>
//         </div>

//         {/* Person Name */}
//         <input
//           type="text"
//           name="personName"
//           placeholder={
//             formData.personType === "author" ? "Author Name" : "Inventor Name"
//           }
//           value={formData.personName}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//           required
//         />

//         {/* Other fields */}
//         <input
//           type="text"
//           name="size"
//           placeholder="Size"
//           value={formData.size}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//         />
//         {formData.personType === "inventor" && (
//           <input
//             type="text"
//             name="weight"
//             placeholder="Weight"
//             value={formData.weight}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         )}
//         {formData.personType !== "inventor" && (
//           <input
//             type="text"
//             name="type"
//             placeholder="Type"
//             value={formData.type}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2"
//           />
//         )}
//         <textarea
//           name="description"
//           placeholder="Description"
//           value={formData.description}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//         />
//         <input
//           type="text"
//           name="price"
//           placeholder="Price"
//           value={formData.price}
//           onChange={handleChange}
//           className="w-full border rounded px-3 py-2"
//         />

//         {/* Image Upload */}
//         <input type="file" accept="image/*" onChange={handleImageChange} />

//         {preview && (
//           <img
//             src={preview}
//             alt="Preview"
//             className="mt-2 w-40 h-40 object-cover rounded border"
//           />
//         )}

//         <button
//           type="submit"
//           disabled={status === "posting"}
//           className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
//         >
//           {status === "posting" ? "Posting..." : "Submit"}
//         </button>
//       </form>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import Navbar from "../Pages/Navbar";

export default function ArtifactForm() {
  const [formData, setFormData] = useState({
    name: "",
    personType: "author",
    personName: "",
    size: "",
    weight: "",
    type: "",
    description: "",
    price: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // "posting", "success", "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 1.5 * 1024 * 1024) {
        setError("Image must be less than 1.5MB");
        setFormData((prev) => ({ ...prev, image: null }));
        setPreview(null);
        return;
      }
      setError("");
      setFormData((prev) => ({ ...prev, image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("posting");
    setError("");

    const data = new FormData();

    if (formData.image) {
      data.append("image", formData.image);
    }

    data.append("name", formData.name);
    data.append("personType", formData.personType);
    data.append("personName", formData.personName);
    data.append("size", formData.size);
    data.append("weight", formData.weight);
    data.append("description", formData.description);
    data.append("price", formData.price);

    if (formData.personType === "inventor") {
      data.append("type", "invention");
    } else {
      data.append("type", formData.type || "artwork");
    }

    try {
      const res = await fetch("https://unix.up.railway.app/api/art", {
        method: "POST",
        body: data,
      });

      if (!res.ok) throw new Error("Failed to submit");

      setStatus("success");
      setFormData({
        name: "",
        personType: "author",
        personName: "",
        size: "",
        weight: "",
        type: "",
        description: "",
        price: "",
        image: null,
      });
      setPreview(null);
    } catch (err) {
      setStatus("error");
      setError(err.message);
    }
  };

  return (
    <>
    <Navbar/>
        <div className="max-w-2xl mx-auto  px-4 sm:px-6 lg:px-8 mt-20">
      <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
          Upload Your Collection
        </h2>

        {status === "posting" && (
          <p className="text-blue-500 mb-4 text-center">Posting...</p>
        )}
        {status === "success" && (
          <p className="text-green-600 mb-4 text-center">
            ✅ Posted successfully!
          </p>
        )}
        {status === "error" && error && (
          <p className="text-red-500 mb-4 text-center">❌ {error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Collection name..."
            value={formData.name}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* Author or Inventor */}
          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="radio"
                name="personType"
                value="author"
                checked={formData.personType === "author"}
                onChange={handleChange}
                className="mr-2"
              />
              Author
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="personType"
                value="inventor"
                checked={formData.personType === "inventor"}
                onChange={handleChange}
                className="mr-2"
              />
              Inventor
            </label>
          </div>

          {/* Person Name */}
          <input
            type="text"
            name="personName"
            placeholder={
              formData.personType === "author" ? "Author Name" : "Inventor Name"
            }
            value={formData.personName}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          {/* Other fields */}
          <input
            type="text"
            name="size"
            placeholder="Size"
            value={formData.size}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {formData.personType === "inventor" && (
            <input
              type="text"
              name="weight"
              placeholder="Weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          )}

          {formData.personType !== "inventor" && (
            <input
              type="text"
              name="type of collection.."
              placeholder="Type"
              value={formData.type}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
            />
          )}

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
          />

          <input
            type="text"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
          />

          {/* Image Upload */}
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                         file:rounded-full file:border-0 
                         file:text-sm file:font-semibold 
                         file:bg-blue-50 file:text-blue-700 
                         hover:file:bg-blue-100"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="mt-4 w-40 h-40 object-cover rounded border"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={status === "posting"}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          >
            {status === "posting" ? "Posting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

