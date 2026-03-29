

// import React, { useState } from "react";
// import Navbar from "../Pages/Navbar";
// import Posted from "./Orders/Posted";

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
//       data.append("image", formData.image);
//     }

//     data.append("name", formData.name);
//     data.append("personType", formData.personType);
//     data.append("personName", formData.personName);
//     data.append("size", formData.size);
//     data.append("weight", formData.weight);
//     data.append("description", formData.description);
//     data.append("price", formData.price);

//     if (formData.personType === "inventor") {
//       data.append("type", "invention");
//     } else {
//       data.append("type", formData.type || "artwork");
//     }

//     try {
//       const res = await fetch("http://localhost:3000/api/art", {
//         method: "POST",
//         body: data,
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
//     <>
//     <Navbar/>
//         <div className="max-w-2xl mx-auto  px-4 sm:px-6 lg:px-8 mt-20">
//       <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
//         <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
//           Upload Your Collection
//         </h2>

//         {status === "posting" && (
//           <p className="text-blue-500 mb-4 text-center">Posting...</p>
//         )}
//         {status === "success" && (
//           <p className="text-green-600 mb-4 text-center">
//             ✅ Posted successfully!
//           </p>
//         )}
//         {status === "error" && error && (
//           <p className="text-red-500 mb-4 text-center">❌ {error}</p>
//         )}

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Name */}
//           <input
//             type="text"
//             name="name"
//             placeholder="Collection name..."
//             value={formData.name}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//             required
//           />

//           {/* Author or Inventor */}
//           <div className="flex items-center gap-6">
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="personType"
//                 value="author"
//                 checked={formData.personType === "author"}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               Author
//             </label>
//             <label className="flex items-center">
//               <input
//                 type="radio"
//                 name="personType"
//                 value="inventor"
//                 checked={formData.personType === "inventor"}
//                 onChange={handleChange}
//                 className="mr-2"
//               />
//               Inventor
//             </label>
//           </div>

//           {/* Person Name */}
//           <input
//             type="text"
//             name="personName"
//             placeholder={
//               formData.personType === "author" ? "Author Name" : "Inventor Name"
//             }
//             value={formData.personName}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//             required
//           />

//           {/* Other fields */}
//           <input
//             type="text"
//             name="size"
//             placeholder="Size"
//             value={formData.size}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//           />

//           {formData.personType === "inventor" && (
//             <input
//               type="text"
//               name="weight"
//               placeholder="Weight"
//               value={formData.weight}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//           )}

//           {formData.personType !== "inventor" && (
//             <input
//               type="text"
//               name="type of collection.."
//               placeholder="Type"
//               value={formData.type}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//             />
//           )}

//           <textarea
//             name="description"
//             placeholder="Description"
//             value={formData.description}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
//           />

//           <input
//             type="text"
//             name="price"
//             placeholder="Price"
//             value={formData.price}
//             onChange={handleChange}
//             className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//           />

//           {/* Image Upload */}
//           <div>
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImageChange}
//               className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
//                          file:rounded-full file:border-0 
//                          file:text-sm file:font-semibold 
//                          file:bg-blue-50 file:text-blue-700 
//                          hover:file:bg-blue-100"
//             />
//           </div>

//           {preview && (
//             <div className="flex justify-center">
//               <img
//                 src={preview}
//                 alt="Preview"
//                 className="mt-4 w-40 h-40 object-cover rounded border"
//               />
//             </div>
//           )}

//           <button
//             type="submit"
//             disabled={status === "posting"}
//             className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//           >
//             {status === "posting" ? "Posting..." : "Submit"}
//           </button>
//         </form>
//       </div>
//     </div>
//     <Posted />
//     </>
//   );
// }
////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";
// import Navbar from "../Pages/Navbar";
// import Posted from "./Orders/Posted";

// export default function ArtifactForm() {
//   const { getAccessTokenSilently, isAuthenticated } = useAuth0();

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
//       data.append("image", formData.image);
//     }

//     data.append("name", formData.name);
//     data.append("personType", formData.personType);
//     data.append("personName", formData.personName);
//     data.append("size", formData.size);
//     data.append("weight", formData.weight);
//     data.append("description", formData.description);
//     data.append("price", formData.price);

//     if (formData.personType === "inventor") {
//       data.append("type", "invention");
//     } else {
//       data.append("type", formData.type || "artwork");
//     }

//     try {
//       // ✅ Use Vite env variable for audience
//       const token = await getAccessTokenSilently({
//         authorizationParams: {
//           audience: import.meta.env.VITE_AUTH0_AUDIENCE,
//         },
//       });

//       const res = await fetch("http://localhost:3000/api/art", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: data,
//       });

//       if (!res.ok) {
//         const msg = await res.text();
//         throw new Error(`Failed to submit: ${res.status} ${msg}`);
//       }

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
//       console.error("❌ Submission error:", err);
//       setStatus("error");
//       setError(err.message);
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <>
//         <Navbar />
//         <p className="text-center mt-20 text-lg text-gray-600">
//           Please log in to upload your collection.
//         </p>
//       </>
//     );
//   }

//   return (
//     <>
//       <Navbar />
//       <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
//         <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
//           <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
//             Upload Your Collection
//           </h2>

//           {status === "posting" && (
//             <p className="text-blue-500 mb-4 text-center">Posting...</p>
//           )}
//           {status === "success" && (
//             <p className="text-green-600 mb-4 text-center">
//               ✅ Posted successfully!
//             </p>
//           )}
//           {status === "error" && error && (
//             <p className="text-red-500 mb-4 text-center">❌ {error}</p>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-5">
//             {/* Name */}
//             <input
//               type="text"
//               name="name"
//               placeholder="Collection name..."
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               required
//             />

//             {/* Author or Inventor */}
//             <div className="flex items-center gap-6">
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="personType"
//                   value="author"
//                   checked={formData.personType === "author"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Author
//               </label>
//               <label className="flex items-center">
//                 <input
//                   type="radio"
//                   name="personType"
//                   value="inventor"
//                   checked={formData.personType === "inventor"}
//                   onChange={handleChange}
//                   className="mr-2"
//                 />
//                 Inventor
//               </label>
//             </div>

//             {/* Person Name */}
//             <input
//               type="text"
//               name="personName"
//               placeholder={
//                 formData.personType === "author" ? "Author Name" : "Inventor Name"
//               }
//               value={formData.personName}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               required
//             />

//             {/* Other fields */}
//             <input
//               type="text"
//               name="size"
//               placeholder="Size"
//               value={formData.size}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//             />

//             {formData.personType === "inventor" && (
//               <input
//                 type="text"
//                 name="weight"
//                 placeholder="Weight"
//                 value={formData.weight}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               />
//             )}

//             {formData.personType !== "inventor" && (
//               <input
//                 type="text"
//                 name="type"   // ✅ fixed name
//                 placeholder="Type"
//                 value={formData.type}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//               />
//             )}

//             <textarea
//               name="description"
//               placeholder="Description"
//               value={formData.description}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
//             />

//             <input
//               type="text"
//               name="price"
//               placeholder="Price"
//               value={formData.price}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
//             />

//             {/* Image Upload */}
//             <div>
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleImageChange}
//                 className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
//                            file:rounded-full file:border-0 
//                            file:text-sm file:font-semibold 
//                            file:bg-blue-50 file:text-blue-700 
//                            hover:file:bg-blue-100"
//               />
//             </div>

//             {preview && (
//               <div className="flex justify-center">
//                 <img
//                   src={preview}
//                   alt="Preview"
//                   className="mt-4 w-40 h-40 object-cover rounded border"
//                 />
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={status === "posting"}
//               className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
//             >
//               {status === "posting" ? "Posting..." : "Submit"}
//             </button>
//           </form>
//         </div>
//       </div>
//       <Posted />
//     </>
//   );
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "../Pages/Navbar";
import Posted from "./Orders/Posted";

export default function ArtifactForm() {
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();

  const [formData, setFormData] = useState({
    name: "",
    personType: "artist",
    personName: "",
    size: "",
    weight: "",
    type: "",
    description: "",
    price: "",
    quantity: "1",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
  const [status, setStatus] = useState(""); // "posting", "success", "error"

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Validate price field - only allow numbers and decimals
    if (name === "price") {
      // Remove any non-numeric characters except decimal point
      const numericValue = value.replace(/[^0-9.]/g, "");
      
      // Prevent multiple decimal points
      const decimalCount = (numericValue.match(/\./g) || []).length;
      if (decimalCount > 1) return;
      
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else if (name === "quantity") {
      // Only allow positive integers for quantity
      const numericValue = value.replace(/[^0-9]/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue || "0" })); //or null
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file size (1MB = 1024 * 1024 bytes)
      if (file.size > 1024 * 1024) {
        setError("Image must be less than 1MB");
        setFormData((prev) => ({ ...prev, image: null }));
        setPreview(null);
        return;
      }
      
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setError("Please upload an image file");
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

    // Validate price
    if (!formData.price || parseFloat(formData.price) <= 0) {
      setError("Please enter a valid price in dollars (e.g., 50.00)");
      setStatus("error");
      return;
    }

    // Validate image
    if (!formData.image) {
      setError("Please select an image");
      setStatus("error");
      return;
    }

    const data = new FormData();

    data.append("image", formData.image);
    data.append("name", formData.name);
    data.append("personType", formData.personType);
    data.append("personName", formData.personName);
    data.append("size", formData.size);
    data.append("weight", formData.weight);
    data.append("description", formData.description);
    data.append("price", `$${parseFloat(formData.price).toFixed(2)}`);
    data.append("quantity", formData.quantity || "0");
    
    // Add auth0Id from the authenticated user
    data.append("auth0Id", user.sub); //why?

    if (formData.personType === "inventor") {
      data.append("type", "invention");
    } else {
      data.append("type", formData.type || "artwork");
    }

    // Set artist or inventor based on personType
    if (formData.personType === "artist") {
      data.append("artist", formData.personName);
    } else {
      data.append("inventor", formData.personName);
    }

    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      console.log("Submitting with auth0Id:", user.sub);
      console.log("Token (first 20 chars):", token.substring(0, 20) + "...");

      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/art`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Failed to submit: ${res.status} ${msg}`);
      }

      setStatus("success");
      setFormData({
        name: "",
        personType: "artist",
        personName: "",
        size: "",
        weight: "",
        type: "",
        description: "",
        price: "",
        quantity: "1",
        image: null,
      });
      setPreview(null);
      
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setError(err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <p className="text-center mt-20 text-lg text-gray-600">
          Please log in to upload your collection.
        </p>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="bg-white shadow-lg rounded-lg p-6 sm:p-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-gray-800">
            Upload Your Collection
          </h2>

          {status === "posting" && (
            <div className="bg-blue-50 border border-blue-200 rounded p-4 mb-4">
              <p className="text-blue-600 text-center">Posting...</p>
            </div>
          )}
          {status === "success" && (
            <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
              <p className="text-green-600 text-center font-medium">
                ✅ Posted successfully!
              </p>
            </div>
          )}
          {status === "error" && error && (
            <div className="bg-red-50 border border-red-200 rounded p-4 mb-4">
              <p className="text-red-500 text-center"> {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Collection Name *
              </label>
              <input
                type="text"
                name="name"
                placeholder="Collection name..."
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Author or Inventor */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              <div className="flex items-center gap-6">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="personType"
                    value="artist"
                    checked={formData.personType === "artist"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Artwork (Artist)
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="personType"
                    value="inventor"
                    checked={formData.personType === "inventor"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  Invention (Inventor)
                </label>
              </div>
            </div>

            {/* Person Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {formData.personType === "artist" ? "Artist Name" : "Inventor Name"} *
              </label>
              <input
                type="text"
                name="personName"
                placeholder={
                  formData.personType === "artist" ? "Artist Name" : "Inventor Name"
                }
                value={formData.personName}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
            </div>

            {/* Size */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Size
              </label>
              <input
                type="text"
                name="size"
                placeholder="e.g., 24x36 inches"
                value={formData.size}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Weight (for inventions) */}
            {formData.personType === "inventor" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  name="weight"
                  placeholder="e.g., 5 kg"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            )}

            {/* Type (for artworks) */}
            {formData.personType !== "inventor" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  placeholder="e.g., Painting, Sculpture, Photography"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                />
              </div>
            )}

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                placeholder="Describe your collection..."
                value={formData.description}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 h-28 resize-none focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price (USD) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-gray-500 text-lg">$</span>
                <input
                  type="text"
                  name="price"
                  placeholder="0.00"
                  value={formData.price}
                  onChange={handleChange}
                  className="w-full border rounded pl-8 pr-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                  required
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Enter price in dollars (e.g., 50.00)</p>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Quantity Available *
              </label>
              <input
                type="text"
                name="quantity"
                placeholder="default 1"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-400 outline-none"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Number of items available for sale</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image * (Max 1MB)
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 
                           file:rounded-full file:border-0 
                           file:text-sm file:font-semibold 
                           file:bg-blue-50 file:text-blue-700 
                           hover:file:bg-blue-100 cursor-pointer"
                required
              />
              <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 1MB</p>
            </div>

            {preview && (
              <div className="flex justify-center">
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="mt-4 w-64 h-64 object-cover rounded border-2 border-gray-300"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setFormData((prev) => ({ ...prev, image: null }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
                  >
                    ×
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={status === "posting"}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "posting" ? "Posting..." : "Submit Collection"}
            </button>
          </form>
        </div>
      </div>
      <Posted />
    </>
  );
}