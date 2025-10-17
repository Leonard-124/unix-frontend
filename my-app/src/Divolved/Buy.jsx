

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../Pages/Navbar";

// const Buy = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true); // start as loading
//   const [error, setError] = useState(null);

//   const Getdata = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await fetch("http://localhost:3000/api/art");
//       if (!res.ok) {
//         throw new Error(`HTTP ${res.status}`);
//       }

//       const result = await res.json();
//       setData(result);
//     } catch (err) {
//       console.error("Failed to fetch:", err.message);
//       setError("Failed to load data. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     Getdata();
//   }, []);

//   return (
//     <>
//     <Navbar />
//         <div className="p-6 mt-20">
//       <h1 className="text-2xl font-bold mb-4">Available for You</h1>

//       {loading && <div>Loading...</div>}

//       {error && <div className="text-red-500">{error}</div>}

//       {!loading && !error && data.length === 0 && (
//         <div>No artworks available right now.</div>
//       )}

//       {!loading && !error && data.length > 0 && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {data.map((item, index) => (
//             <Link to={`/art/${item._id}`}
//               key={index}
//               className="border rounded-lg shadow hover:shadow-lg transition p-0.5"
//             >
//               <img
//                 src={item.image}
//                 alt={item.name}
//                 className="w-full h-48 object-cover rounded"
//               />
//               <p className="mt-2 font-semibold">{item.name}</p>
//               <p>Type {item.type}</p>
//               <p>From: {item.price}</p>
//             </Link>
//           ))}
//         </div>
//       )}
//     </div>
//     </>
//   );
// };

// export default Buy;
///////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Pages/Navbar";
import Footer from "../Components/Footer";
import LoadingSpinner from "../LoadingSpinner";

const Buy = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const Getdata = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch("http://localhost:3000/api/art");
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error("Failed to fetch:", err.message);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    Getdata();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12 mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 text-center mb-6">
          Available for You
        </h1>

        {loading && (
          <p className="text-center text-gray-500 mt-6"><LoadingSpinner/> </p>
        )}

        {error && (
          <p className="text-center text-red-500 mt-6">❌ {error}</p>
        )}

        {!loading && !error && data.length === 0 && (
          <p className="text-center text-gray-500 mt-6 text-lg">
            No artworks available right now.
          </p>
        )}

        {!loading && !error && data.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item) => (
              <Link
                to={`/art/${item._id}`}
                key={item._id}
                className="rounded-lg bg-[#f7f4f4]  transition transform border hover:border-red-400/60 border-gray-300 overflow-hidden flex flex-col"
              >
                <div className="h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div className="font-light tracking-tight text-gray-600 space-y-1">
                    <p className="text-xl text-red-500 font-bold">{item.name}</p>
                    <p className="text-sm">Size: {item.size}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base font-medium mt-3">
                    <p className="text-gray-600 text-lg">Type: {item.type}</p>
                    <span className="text-green-500">From: {item.price}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Buy;

