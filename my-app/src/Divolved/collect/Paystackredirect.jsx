
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// const PaystackRedirect = () => {
//   const [cardDetails, setCardDetails] = useState({ email: "" });
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [total, setTotal] = useState(null);
//   const navigate = useNavigate();
//   const location = useLocation();

//   const BASE_URL = "https://2564dc54fb18.ngrok-free.app"; // replace with your ngrok url

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const reference = params.get("reference");
//     const id = params.get("id");

//     if (reference) {
//       verifyPaystackPayment(reference);
//       return;
//     }

//     const paymentId =
//       params.get("paymentId") ||
//       params.get("paymentID") ||
//       params.get("payment_id");

//     if (paymentId) {
//       navigate(`/success?paymentId=${paymentId}`);
//       return;
//     }

//     const success = params.get("success");
//     if (success === "true") navigate("/success");
//     else if (success === "false") navigate("/failure");

//     if (id) {
//       fetchArtPrice(id);
//     }
//   }, [location]);

//   const fetchArtPrice = async (id) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/art/${id}`);
//       if (!res.ok) throw new Error(`Error fetching art: ${res.status}`);
//       const data = await res.json();

//       const numericPrice = Number(String(data.price).replace(/[^0-9.]/g, ""));
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
//     setError("");

//     const { email } = cardDetails;
//     if (!email) {
//       setError("Please enter your email.");
//       return;
//     }
//     if (!total) {
//       setError("Unable to fetch amount. Please try again.");
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           amount: total * 128, // Paystack expects amount in kobo
//           callback_url: "http://localhost:5173/paystack-redirect",
//         }),
//       });

//       const data = await res.json();

//       if (res.ok && data.authorization_url) {
//         window.location.href = data.authorization_url;
//       } else {
//         setError(data.error || "Paystack initialization failed.");
//       }
//     } catch (err) {
//       setError("Network error, please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyPaystackPayment = async (reference) => {
//     setLoading(true);
//     try {
//       const res = await fetch(
//         `${BASE_URL}/api/payments/paystack/verify/${reference}`
//       );
//       const data = await res.json();

//       if (res.ok && data.success) {
//         navigate("/success");
//       } else {
//         navigate("/failure");
//       }
//     } catch (err) {
//       navigate("/failure");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <div className="bg-white w-full max-w-md rounded-lg shadow-lg p-6">
//         <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2 text-center">
//           Secure Payment Redirect
//         </h1>
//         <p className="text-gray-600 text-center mb-6">
//           Enter your email to continue to Paystack
//         </p>

//         <form onSubmit={handlePayNow} className="space-y-4">
//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             value={cardDetails.email}
//             onChange={handleCardChange}
//             className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
//           />

//           {error && (
//             <p className="text-red-500 text-sm text-center">{error}</p>
//           )}
//           {loading && (
//             <p className="text-blue-500 text-sm text-center">Processing...</p>
//           )}

//           <button
//             type="submit"
//             disabled={loading || !total}
//             className={`w-full py-2 rounded text-white font-medium transition ${
//               loading || !total
//                 ? "bg-gray-400 cursor-not-allowed"
//                 : "bg-red-600 hover:bg-red-700"
//             }`}
//           >
//             {loading
//               ? "Please wait..."
//               : total
//               ? `Pay now $${total.toFixed(2)}`
//               : "Fetching amount..."}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PaystackRedirect;
/////////////////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const PaystackRedirect = () => {
  const [cardDetails, setCardDetails] = useState({ email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(null);
  const [artDetails, setArtDetails] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, getAccessTokenSilently } = useAuth0();

  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  //const BASE_URLL = "https://2564dc54fb18.ngrok-free.app";
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
      const res = await fetch(`${BASE_URL}/api/art/${id}`);
      if (!res.ok) throw new Error(`Error fetching art: ${res.status}`);
      const data = await res.json();

      setArtDetails(data);

      // const numericPrice = Number(String(data.price).replace(/[^0-9.]/g, ""));
      const numericPrice = Number(String(data.price).replace(/[^0-9.]/g, ""));
      const fee = 0.05 * (numericPrice);
      setTotal(numericPrice + fee);

      // Pre-fill email if user is logged in
      if (user?.email) {
        setCardDetails({ email: user.email });
      }
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
    if (!artDetails) {
      setError("Art details not found.");
      return;
    }

    setLoading(true);
    try {
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });

      const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          email,
          amount: total * 128,
          artId: artDetails._id,
          quantity: 1, // You can make this dynamic if needed
        }),
      });

      const data = await res.json();

      if (res.ok && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        setError(data.error || "Paystack initialization failed.");
      }
    } catch (err) {
      console.error("Payment initialization error:", err);
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

        {artDetails && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex gap-4">
              <img
                src={artDetails.image}
                alt={artDetails.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{artDetails.name}</h3>
                <p className="text-sm text-gray-600">
                  {artDetails.author && `Artist: ${artDetails.author}`}
                  {artDetails.inventor && `Inventor: ${artDetails.inventor}`}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  Price: {artDetails.price}
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handlePayNow} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={cardDetails.email}
            onChange={handleCardChange}
            className="border rounded px-3 py-2 w-full focus:ring-2 focus:ring-red-500 outline-none"
            required
          />

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}
          {loading && (
            <p className="text-blue-500 text-sm text-center">Processing...</p>
          )}

          {total && (
            <div className="bg-blue-50 p-3 rounded text-sm">
              <div className="flex justify-between mb-1">
                <span>Item Price:</span>
                <span>${(total / 1.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-1">
                <span>Service Fee (5%):</span>
                <span>${(total - total / 1.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={loading || !total}
            className={`w-full py-2 rounded text-white font-medium transition ${
              loading || !total
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {loading
              ? "Please wait..."
              : total
              ? `Pay $${total.toFixed(2)}`
              : "Fetching amount..."}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PaystackRedirect;
