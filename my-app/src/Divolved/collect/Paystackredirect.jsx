
// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PaystackRedirect = () => {
//   const [cardDetails, setCardDetails] = useState({ email: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ⚠️ Ensure there are no spaces at the end of your BASE_URL
//   const BASE_URL = "https://5ce783e47e64.ngrok-free.app"; // replace with your ngrok url

//   const total = 6000;

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const reference = params.get('reference');

//     if (reference) {
//       verifyPaystackPayment(reference);
//       return;
//     }

//     const paymentId =
//       params.get('paymentId') ||
//       params.get('paymentID') ||
//       params.get('payment_id');

//     if (paymentId) {
//       navigate(`/success?paymentId=${paymentId}`);
//       return;
//     }

//     const success = params.get('success');
//     if (success === 'true') navigate('/success');
//     else if (success === 'false') navigate('/failure');
//   }, [location]);

//   const handleCardChange = (e) => {
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayNow = async (e) => {
//     e.preventDefault();
//     setError('');

//     const { email } = cardDetails;
//     if (!email) {
//       setError('Please enter your email.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           amount: total,
//           callback_url: 'http://localhost:5173/paystack-redirect',
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.authorization_url) {
//         window.location.href = data.authorization_url;
//       } else {
//         setError(data.error || 'Paystack initialization failed.');
//       }
//     } catch (err) {
//       setError('Network error, please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyPaystackPayment = async (reference) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/payments/paystack/verify/${reference}`);
//       const data = await res.json();

//       if (res.ok && data.success) {
//         navigate('/success');
//       } else {
//         navigate('/failure');
//       }
//     } catch (err) {
//       navigate('/failure');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="text-center mt-20 h-screen flex flex-col justify-center items-center">
//       <div className="bg-[#eeeeee] w-[700px] h-[300px] flex flex-col justify-center p-6 rounded-lg shadow-md">
//         <h1 className="text-lg font-bold mb-2">You are about to be redirected to a secure payment platform</h1>
//         <p className="mb-4">Enter your Email below to continue</p>

//         <form onSubmit={handlePayNow}>
//           <div className="mb-4 px-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={cardDetails.email}
//               onChange={handleCardChange}
//               className="border rounded px-3 py-2 w-full mb-2"
//             />
//           </div>

//           {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//           {loading && <p className="text-blue-500 text-center mb-2">Processing...</p>}

//           <button
//             type="submit"
//             disabled={loading}
//             className={`px-6 py-2 rounded text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
//           >
//             {loading ? 'Please wait...' : `Pay now ₦${total.toFixed(2)}`}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaystackRedirect;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// const PaystackRedirect = () => {
//   const [cardDetails, setCardDetails] = useState({ email: '' });
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const [total, setTotal] = useState(null); // dynamic amount
//   const navigate = useNavigate();
//   const location = useLocation();

//   // ⚠️ Ensure there are no spaces at the end of your BASE_URL
//   const BASE_URL = "https://5ce783e47e64.ngrok-free.app"; // replace with your ngrok url

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const reference = params.get('reference');
//     const id = params.get('id'); // collectible/art id

//     // 1. If redirected back from Paystack with reference → verify
//     if (reference) {
//       verifyPaystackPayment(reference);
//       return;
//     }

//     // 2. If success/failure flags
//     const paymentId =
//       params.get('paymentId') ||
//       params.get('paymentID') ||
//       params.get('payment_id');

//     if (paymentId) {
//       navigate(`/success?paymentId=${paymentId}`);
//       return;
//     }

//     const success = params.get('success');
//     if (success === 'true') navigate('/success');
//     else if (success === 'false') navigate('/failure');

//     // 3. Otherwise, fetch the art item to get its price
//     if (id) {
//       fetchArtPrice(id);
//     }
//   }, [location]);

//   const fetchArtPrice = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/art/${id}`);
//       if (!res.ok) throw new Error(`Error fetching art: ${res.status}`);
//       const data = await res.json();

//       // Ensure numeric price (strip $ if present)
//       const numericPrice = Number(String(data.price).replace(/[^0-9.]/g, ''));
//       const fee = 0.05 * numericPrice;
//       setTotal(numericPrice + fee);
//     } catch (err) {
//       setError(err.message);
//     }
//   };

//   const handleCardChange = (e) => {
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayNow = async (e) => {
//     e.preventDefault();
//     setError('');

//     const { email } = cardDetails;
//     if (!email) {
//       setError('Please enter your email.');
//       return;
//     }
//     if (!total) {
//       setError('Unable to fetch amount. Please try again.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({
//           email,
//           amount: total * 128, // Paystack expects amount in kobo (₦1 = 100 kobo)
//           callback_url: 'http://localhost:5173/paystack-redirect',
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.authorization_url) {
//         window.location.href = data.authorization_url;
//       } else {
//         setError(data.error || 'Paystack initialization failed.');
//       }
//     } catch (err) {
//       setError('Network error, please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyPaystackPayment = async (reference) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/payments/paystack/verify/${reference}`);
//       const data = await res.json();

//       if (res.ok && data.success) {
//         navigate('/success');
//       } else {
//         navigate('/failure');
//       }
//     } catch (err) {
//       navigate('/failure');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="text-center mt-20 h-screen flex flex-col justify-center items-center">
//       <div className="bg-[#eeeeee] w-[700px] h-[300px] flex flex-col justify-center p-6 rounded-lg shadow-md">
//         <h1 className="text-lg font-bold mb-2">
//           You are about to be redirected to a secure payment platform
//         </h1>
//         <p className="mb-4">Enter your Email below to continue</p>

//         <form onSubmit={handlePayNow}>
//           <div className="mb-4 px-4">
//             <input
//               type="email"
//               name="email"
//               placeholder="Email"
//               value={cardDetails.email}
//               onChange={handleCardChange}
//               className="border rounded px-3 py-2 w-full mb-2"
//             />
//           </div>

//           {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//           {loading && <p className="text-blue-500 text-center mb-2">Processing...</p>}

//           <button
//             type="submit"
//             disabled={loading || !total}
//             className={`px-6 py-2 rounded text-white ${
//               loading || !total
//                 ? 'bg-gray-400 cursor-not-allowed'
//                 : 'bg-blue-600 hover:bg-blue-700'
//             }`}
//           >
//             {loading
//               ? 'Please wait...'
//               : total
//               ? `Pay now $ ${total.toFixed(2)}`
//               : 'Fetching amount...'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaystackRedirect;

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////


import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaystackRedirect = () => {
  const [cardDetails, setCardDetails] = useState({ email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = "http://localhost:3000"; // replace with your ngrok url

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reference = params.get("reference");
    const id = params.get("id");

    if (reference) {
      verifyPaystackPayment(reference);
      return;
    }

    const paymentId =
      params.get("paymentId") ||
      params.get("paymentID") ||
      params.get("payment_id");

    if (paymentId) {
      navigate(`/success?paymentId=${paymentId}`);
      return;
    }

    const success = params.get("success");
    if (success === "true") navigate("/success");
    else if (success === "false") navigate("/failure");

    if (id) {
      fetchArtPrice(id);
    }
  }, [location]);

  const fetchArtPrice = async (id) => {
    try {
      const res = await fetch(`http://localhost:3000/api/art/${id}`);
      if (!res.ok) throw new Error(`Error fetching art: ${res.status}`);
      const data = await res.json();

      const numericPrice = Number(String(data.price).replace(/[^0-9.]/g, ""));
      const fee = 0.05 * numericPrice;
      setTotal(numericPrice + fee);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    setError("");

    const { email } = cardDetails;
    if (!email) {
      setError("Please enter your email.");
      return;
    }
    if (!total) {
      setError("Unable to fetch amount. Please try again.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          amount: total * 128, // Paystack expects amount in kobo
          callback_url: "http://localhost:5173/paystack-redirect",
        }),
      });

      const data = await res.json();

      if (res.ok && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError(data.error || "Paystack initialization failed.");
      }
    } catch (err) {
      setError("Network error, please try again.");
    } finally {
      setLoading(false);
    }
  };

  const verifyPaystackPayment = async (reference) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/api/payments/paystack/verify/${reference}`
      );
      const data = await res.json();

      if (res.ok && data.success) {
        navigate("/success");
      } else {
        navigate("/failure");
      }
    } catch (err) {
      navigate("/failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
          Secure Payment Redirect
        </h1>
        <p className="text-gray-600 text-center mb-6">
          Enter your email to continue to Paystack
        </p>

        <form onSubmit={handlePayNow} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={cardDetails.email}
            onChange={handleCardChange}
            className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {loading && (
            <p className="text-blue-500 text-sm text-center">Processing...</p>
          )}

          <button
            type="submit"
            disabled={loading || !total}
            className={`w-full py-2 rounded text-white font-medium transition ${
              loading || !total
                ? "bg-black cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            {loading
              ? "Please wait..."
              : total
              ? `Pay now $${total.toFixed(2)}`
              : "Fetching amount..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaystackRedirect;
