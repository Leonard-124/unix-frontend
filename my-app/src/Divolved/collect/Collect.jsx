
// import React from 'react'
// import Navbar from '../../Pages/Navbar'
// import { useParams } from 'react-router-dom'
// import { Link } from 'react-router-dom'

// const Collect = () => {
//     const { id } = useParams()
//     const data = artdata.find(d => d.id === Number(id))
//     if(!data) {
//         return <h1>Collectible Not Found</h1>
//     }
//     const numericPrice = Number(data.price.replace("$", ""));

//     const fee =  0.05 * numericPrice
//     const total = fee + numericPrice
//   return (
//     <>
//     <Navbar/>
//     <div className='mt-24'>
//         <div>
//             <p className='text-center text-xl font-bold tracking-tight'>Order details</p>
//             <div className='mt-5'>
//                 <hr />
//                 <div className='flex justify-between mb-5 pb-5 m-1'>
//                     <div>
//                         <p>Price</p>
//                         <p className='text-xl text-gray-600 font-mono'>{data.price}</p>
//                     </div>
//                     <div>
//                         <p>Size</p>
//                         <p>{data.size}</p>
//                     </div>
//                     <div className='w-[200px] h-[200px]'>
//                         <p>Item</p>
//                         <img src={data.src} alt="" 
//                         className='w-full h-full object-cover m-1'
//                         />
//                     </div>
//                 </div>
//                 <hr />
//                 <div className='flex flex-col gap-2 mb-2'>
//                     <p className='text-gray-500'>Subtotal: {data.price}</p>
//                     <p className='text-gray-500'>Delivery fee ${fee}</p>
//                     <p className='text-gray-500'>Price to pay: ${total}</p>
//                 </div>
//                 <div>
//                     <Link to={`/paystack-redirect/?id=${id}`} className='bg-red-500 text-white py-2 px-4 rounded m-2 hover:bg-red-400 '>Check out</Link>
//                 </div>
//             </div>
//         </div>
//     </div>
//     </>
//   )
// }

// export default Collect

////////////////////////////////////////////////////////////////


import React, { useEffect, useState } from "react";
import Navbar from "../../Pages/Navbar";
import { useParams, Link } from "react-router-dom";

const Collect = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCollectible = async () => {
      try {
        const res = await fetch(`https://unix.up.railway.app/api/art/${id}`);
        if (!res.ok) throw new Error(`Error: ${res.status}`);
        const result = await res.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCollectible();
  }, [id]);

  if (loading)
    return <p className="text-center mt-24 text-gray-500">Loading...</p>;
  if (error)
    return <p className="text-center mt-24 text-red-500">❌ {error}</p>;
  if (!data)
    return (
      <p className="text-center mt-24 text-gray-500">Collectible Not Found</p>
    );

  // Ensure price is numeric for calculations
  const numericPrice = Number(String(data.price).replace("$", ""));
  const fee = 0.05 * numericPrice;
  const total = fee + numericPrice;

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12">
        <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
            Order Details
          </h1>

          {/* Item + Info */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-6">
            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-600 font-medium">Price</p>
              <p className="text-xl text-gray-800 font-mono">{data.price}</p>
            </div>

            <div className="flex-1 text-center md:text-left">
              <p className="text-gray-600 font-medium">Size</p>
              <p className="text-lg text-gray-800">{data.size}</p>
            </div>

            <div className="w-48 h-48 rounded-lg overflow-hidden shadow">
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <hr className="my-4" />

          {/* Price Breakdown */}
          <div className="flex justify-between">
            <div className="space-y-2 text-gray-600 mb-6">
            <p>
              <span className="font-medium">Subtotal:</span> {data.price}
            </p>
            <p>
              <span className="font-medium">Delivery fee:</span> $
              {fee.toFixed(2)}
            </p>
            <p className="text-lg font-semibold text-gray-800">
              Price to pay: ${total.toFixed(2)}
            </p>
          </div>
          
          {/* Checkout Button */}
          <div className="text-center">
            <Link
              to={`/paystack-redirect/?id=${id}`}
              className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition mt-8"
            >
              Check Out
            </Link>
          </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collect;
