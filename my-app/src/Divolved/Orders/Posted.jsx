

// import React, { useEffect, useState } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const Posted = () => {
//   const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

//   const [works, setWorks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     description: "",
//     price: "",
//     image: "",
//   });

//   // Fetch user’s works
//   const fetchWorks = async () => {
//     try {
//       const token = await getAccessTokenSilently();
//       const res = await fetch(
//         `http://localhost:3000/api/art/user/${user.sub}`, // backend route expects auth0Id
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       if (!res.ok) throw new Error("Failed to fetch works");
//       const data = await res.json();
//       setWorks(data);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (isAuthenticated && user?.sub) {
//       fetchWorks();
//     }
//   }, [isAuthenticated, user]);

//   // Delete work
//   const handleDelete = async (id) => {
//     try {
//       const token = await getAccessTokenSilently();
//       const res = await fetch(`http://localhost:3000/api/art/${id}`, {
//         method: "DELETE",
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (!res.ok) throw new Error("Failed to delete");
//       setWorks((prev) => prev.filter((item) => item._id !== id));
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   // Start editing
//   const handleEdit = (item) => {
//     setEditingId(item._id);
//     setEditForm({
//       name: item.name,
//       description: item.description,
//       price: item.price,
//       image: item.image,
//     });
//   };

//   // Update work
//   const handleUpdate = async (id) => {
//     try {
//       const token = await getAccessTokenSilently();
//       const res = await fetch(`http://localhost:3000/api/art/${id}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(editForm),
//       });
//       if (!res.ok) throw new Error("Failed to update");
//       const updated = await res.json();
//       setWorks((prev) =>
//         prev.map((item) => (item._id === id ? updated : item))
//       );
//       setEditingId(null);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   if (!isAuthenticated) {
//     return (
//       <p className="text-center mt-10 text-lg text-gray-600">
//         Please log in to view your works.
//       </p>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
//       <h1 className="text-3xl font-bold text-center mb-8">🖼️ My Posted Works</h1>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {works.length > 0 ? (
//         <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {works.map((item) => (
//             <div
//               key={item._id}
//               className="bg-white rounded-lg shadow-md p-5 text-center"
//             >
//               {editingId === item._id ? (
//                 <>
//                   <input
//                     type="text"
//                     value={editForm.name}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, name: e.target.value })
//                     }
//                     className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                   />
//                   <textarea
//                     value={editForm.description}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, description: e.target.value })
//                     }
//                     className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                   />
//                   <input
//                     type="text"
//                     value={editForm.price}
//                     onChange={(e) =>
//                       setEditForm({ ...editForm, price: e.target.value })
//                     }
//                     className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
//                   />
//                   <div className="flex justify-between mt-4">
//                     <button
//                       className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
//                       onClick={() => handleUpdate(item._id)}
//                     >
//                       Save
//                     </button>
//                     <button
//                       className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
//                       onClick={() => setEditingId(null)}
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </>
//               ) : (
//                 <>
//                   <img
//                     src={item.image}
//                     alt={item.name}
//                     className="w-full h-40 object-cover rounded mb-4"
//                   />
//                   <h2 className="text-lg font-semibold">{item.name}</h2>
//                   <p className="text-gray-600">{item.description}</p>
//                   <p className="mt-2 font-bold">Price: {item.price}</p>
//                   <div className="flex justify-between mt-4">
//                     <button
//                       className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
//                       onClick={() => handleEdit(item)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
//                       onClick={() => handleDelete(item._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </>
//               )}
//             </div>
//           ))}
//         </div>
//       ) : (
//         !loading && (
//           <p className="text-center text-gray-500">No works posted yet.</p>
//         )
//       )}
//     </div>
//   );
// };

// export default Posted;
////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const Posted = () => {
  const { user, getAccessTokenSilently, isAuthenticated } = useAuth0();

  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Fetch user’s works
  const fetchWorks = async () => {
    try {
      const token = await getAccessTokenSilently();
      console.log("Fetching works for:", user.sub); // debug
      const res = await fetch(
        `https://unix.up.railway.app/api/art/user/${encodeURIComponent(user.sub)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Failed to fetch works: ${res.status} ${msg}`);
      }
      const data = await res.json();
      setWorks(data);
    } catch (err) {
      console.error("fetchWorks error:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      fetchWorks();
    }
  }, [isAuthenticated, user]);

  // Delete work
  const handleDelete = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`https://unix.up.railway.app/api/art/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to delete");
      setWorks((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  // Start editing
  const handleEdit = (item) => {
    setEditingId(item._id);
    setEditForm({
      name: item.name,
      description: item.description,
      price: item.price,
      image: item.image,
    });
  };

  // Update work
  const handleUpdate = async (id) => {
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`https://unix.up.railway.app/api/art/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });
      if (!res.ok) throw new Error("Failed to update works.");
      const updated = await res.json();
      setWorks((prev) =>
        prev.map((item) => (item._id === id ? updated : item))
      );
      setEditingId(null);
    } catch (err) {
      setError(err.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Please log in to view your works.
      </p>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-sans">
      <h1 className="text-3xl font-bold text-center mb-8"> Works Posted.</h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {works.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {works.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-lg shadow-md p-5 text-center"
            >
              {editingId === item._id ? (
                <>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <input
                    type="text"
                    value={editForm.price}
                    onChange={(e) =>
                      setEditForm({ ...editForm, price: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
                  />
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                      onClick={() => handleUpdate(item._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-40 object-cover rounded mb-4"
                  />
                  <h2 className="text-lg font-semibold">{item.name}</h2>
                  <p className="text-gray-600">{item.description}</p>
                  <p className="mt-2 font-bold">Price: {item.price}</p>
                  <div className="flex justify-between mt-4">
                    <button
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <p className="text-center text-gray-500">No works posted yet.</p>
        )
      )}
    </div>
  );
};

export default Posted;