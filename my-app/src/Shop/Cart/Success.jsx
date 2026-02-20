 import React from 'react'
 import { Link } from 'react-router-dom'

 const Success = () => {
   return (
     <div className='mt-20 text-center m-5'>
       <h1 className='text-2xl font-[700] leading-0.5 tracking-[1px] text-shadow-neutral-800 font-mono text-center'>Your Payment was Made Successfully.</h1>
        <p className='text-gray-700 mb-6 mt-7 font-[700] '>Thank you! Your payment has been confirmed.</p>
       <h1 className='m-5'><Link to="/" className='text-center underline text-blue-700 text-xl'>Continue Exploring more collections</Link></h1>
     </div>
   )
 }
 
 export default Success;
///////////////////////////////////////////////

// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";

// const BASE_URL = import.meta.env.VITE_API_BASE_URL; // adjust if needed

// const Success = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [verified, setVerified] = useState(false);

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const reference = params.get("reference");

//     if (!reference) {
//       navigate("/payment-failed");
//       return;
//     }

//     fetch(`${BASE_URL}/api/payments/paystack/verify/${reference}`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) {
//           setVerified(true);
//         } else {
//           navigate("/payment-failed");
//         }
//       })
//       .catch((err) => {
//         console.error("Verification error:", err);
//         navigate("/payment-failed");
//       })
//       .finally(() => setLoading(false));
//   }, [location.search, navigate]);

//   if (loading) {
//     return (
//       <div className="mt-20 text-center m-5">
//         <h1 className="text-xl font-bold">Verifying your payment...</h1>
//         <p className="text-gray-600">Please wait a moment.</p>
//       </div>
//     );
//   }

//   if (!verified) return null; // prevent showing success if not verified

//   return (
//     <div className="mt-20 text-center m-5">
//       <h1 className="text-2xl font-[700] leading-0.5 tracking-[1px] text-shadow-neutral-800 font-mono text-center">
//         Your Payment was Made Successfully.
//       </h1>
//       <p className="text-gray-700 mb-6 mt-7 font-[700]">
//         Thank you! Your payment has been confirmed.
//       </p>
//       <h1 className="m-5">
//         <Link
//           to="/Shop"
//           className="text-center underline text-blue-700 text-xl"
//         >
//           Continue Shopping
//         </Link>
//       </h1>
//     </div>
//   );
// };

// export default Success;
