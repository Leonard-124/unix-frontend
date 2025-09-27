

// import React, { useState, useEffect } from "react";
// import {Link} from 'react-router-dom'

// const Artworks = () => {
//   const [artworks, setArtworks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchArtworks = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/api/art"); // adjust if deployed
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const result = await res.json();

//       // ✅ Only include non-inventions
//       const artworksOnly = result.filter(
//         (item) => !item.type || item.type.toLowerCase() !== "invention"
//       );

//       setArtworks(artworksOnly);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchArtworks();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-6">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500">❌ {error}</div>;
//   }

//   return (
//     <div className="mt-10">
//       <h1 className="text-2xl font-bold text-center mb-6">Artworks</h1>
//       {artworks.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//           {artworks.map((item) => (
//             <Link to={`/artworks/${item._id}`}
//               key={item._id}
//               className="w-[300px] h-[350px] rounded p-2 bg-[#f7f4f4] shadow relative mx-auto"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-52 object-cover rounded"
//               />
//               <div className="font-light tracking-[-1px] text-gray-600 mt-2">
//                 <p className="font-semibold">{item.name}</p>
//                 {item.author && <p>Artist: {item.author}</p>}
//               </div>
//               <div className="flex justify-between text-blue-500 font-[500] mt-2">
//                 <p>
//                   <span className="font-light text-gray-400">Type: </span>
//                   {item.type || "Artwork"}
//                 </p>
//                 <p>From: {item.price}</p>
//               </div>
//             </Link>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-6 text-lg">
//           No artworks found.
//         </p>
//       )}
//     </div>
//   );
// };

// export default Artworks;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Pages/Navbar";

const Artworks = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchArtworks = async () => {
    try {
      const res = await fetch("https://unix.up.railway.app/api/art"); // adjust if deployed
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();

      // ✅ Only include non-inventions
      const artworksOnly = result.filter(
        (item) => !item.type || item.type.toLowerCase() !== "invention"
      );

      setArtworks(artworksOnly);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">❌ {error}</div>;
  }

  return (
    <>
    <Navbar/>
        <div className=" px-4 sm:px-6 lg:px-12 mt-24 mb-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10">
        Artworks
      </h1>

      {artworks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {artworks.map((item) => (
            <Link
              to={`/artworks/${item._id}`}
              key={item._id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div className="text-gray-700 space-y-1">
                  <p className="font-semibold text-lg">{item.name}</p>
                  {item.author && (
                    <p className="text-sm text-gray-500">Artist: {item.author}</p>
                  )}
                </div>

                <div className="flex justify-between items-center text-sm sm:text-base font-medium mt-3">
                  <p className="text-gray-600">
                    <span className="font-light text-gray-400">Type: </span>
                    {item.type || "Artwork"}
                  </p>
                  <p className="text-blue-600">From: {item.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-10 text-lg">
          No artworks found.
        </p>
      )}
    </div>
    <Footer/>
    </>

  );
};

export default Artworks;