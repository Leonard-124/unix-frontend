

// import React, { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import Navbar from '../../Pages/Navbar'

// const Artcard = () => {
//   const { id } = useParams()
//   const [item, setItem] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchArt = async () => {
//       try {
//         const res = await fetch(`http://localhost:3000/api/art/${id}`)
//         if (!res.ok) throw new Error(`Error: ${res.status}`)
//         const data = await res.json()
//         setItem(data)
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchArt()
//   }, [id])

//   if (loading) return <h1>Loading...</h1>
//   if (error) return <h1>{error}</h1>
//   if (!item) return <h1>Item not found</h1>

//   return (
//     <>
//       <Navbar />
//       <div className='mt-24'>
//         <div className='flex max-h-[400px] '>
//           <div className='w-full h-96 m-4'>
//             <img
//               src={item.image}
//               alt={item.name}
//               className='w-full h-full object-cover'
//             />
//             <div className='flex text-sm gap-3'>
//               <p>Likes ❤️</p>
//               <Link to="/">View in room</Link>
//               <Link to="/">Share</Link>
//             </div>
//             <p>About the Art</p>
//             <p className='font-mono text-xl tracking-[1px]'>
//               {item.description}
//             </p>
//           </div>
//           <div className='w-full flex flex-col gap-8 text-center'>
//             <p className='font-light text-black text-xl'>{item.name}</p>
//             <p className='text-2xl text-gray-500 '>By {item.inventor}</p>
//             <p className='text-xl text-gray font-mono'>Size: {item.size}</p>
//             <p className='text-xl text-gray font-mono'>Price: {item.price}</p>
//             <Link
//               to={`/buy/${item._id}`}
//               className='text-white bg-black rounded p-4 text-xl mr-5 ml-5 hover:bg-[#535353]'
//             >
//               Buy Now
//             </Link>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Artcard
/////////////////////////////////////////////////////////////////////////

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../../Pages/Navbar";

const Artcard = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(`https://unix.up.railway.app/api/art/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArt();
  }, [id]);

  if (loading)
    return <p className="text-center mt-24 text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center mt-24 text-red-500">❌ {error}</p>;
  if (!item)
    return <p className="text-center mt-24 text-gray-500">Item not found</p>;

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12">
        <div className="bg-white rounded-lg  overflow-hidden flex flex-col md:flex-row gap-6 p-6">
          {/* Left: Image + Description */}
          <div className="md:w-1/2 flex flex-col gap-4">
            <div className="w-full h-72 sm:h-96 overflow-hidden rounded-lg">
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="flex gap-4 text-sm text-gray-600">
              <p className="cursor-pointer hover:text-red-500">❤️ Likes</p>
              <Link to="/#" className="hover:underline">
                View in room
              </Link>
              <Link to="/#" className="hover:underline">
                Share
              </Link>
            </div>

            <div>
              <h2 className="text-lg font-semibold mb-2">About the Art</h2>
              <p className="font-light text-gray-700 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>

          {/* Right: Details */}
          <div className="md:w-1/2 flex flex-col justify-center items-center gap-6 text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {item.name}
            </h1>
            <p className="text-lg sm:text-xl text-gray-500">
              By {item.inventor}
            </p>
            <p className="text-md sm:text-lg text-gray-600 font-mono">
              Size: {item.size}
            </p>
            <p className="text-md sm:text-lg text-gray-600 font-mono">
              Price: {item.price}
            </p>

            <Link
              to={`/buy/${item._id}`}
              className="w-full sm:w-auto px-6 py-3 bg-black text-white rounded-lg text-lg hover:bg-gray-800 transition"
            >
              Buy Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Artcard;