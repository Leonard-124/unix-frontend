
import React, { useContext, useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import visa from '../../../assets/images/visa.png';
import paypalImg from '../../../assets/images/paypal.png';
import mpesa_icon from '../../../assets/images/mpesa_icon.png';
import mastercard from '../../../assets/images/mastercard.png';
import { CartContext } from '../../../Context/Context.jsx';

const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({ email: '' });
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();
  const location = useLocation();

  const BASE_URL = "https://aba7998467c1.ngrok-free.app"; // replace with your ngrok url

  const subtotal = cart.reduce(
    (sum, item) => sum + ((item.newPrice !== undefined ? item.newPrice : item.new_price) * item.quantity),
    0
  );

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const reference = params.get('reference');//returns first value associated to the given search parameter.
    if (reference) {
      verifyPaystackPayment(reference);
      return;
    }

    const paymentId = params.get('paymentId') || params.get('paymentID') || params.get('payment_id');
    if (paymentId) {
      navigate(`/success?paymentId=${paymentId}`);
      return;
    }

    const success = params.get('success');
    if (success === 'true') {
      navigate('/success');
    } else if (success === 'false') {
      navigate('/failure');
    }
  }, [location]);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
    setError('');
  };

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handlePayNow = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedMethod === 'card') {
      const { email } = cardDetails;
      if (!email) {
        setError('Please enter your email...');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            amount: subtotal,
            callback_url: 'http://localhost:5173/checkout'
          })
        }); 
        const data = await res.json();
        if (res.ok && data.authorization_url) {
          window.location.href = data.authorization_url;
        } else {
          setError(data.error || 'Paystack initialization failed!');
        }
      } catch (err) {
        setError('Network error, please try again.');
      } finally {
        setLoading(false);
      }
    } else if (selectedMethod === 'paypal') {
      setLoading(true);
      setError('');
      try {
        const resp = await fetch(`${BASE_URL}/api/payments/paypal/create?amount=${encodeURIComponent(subtotal)}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        const data = await resp.json();
        if (resp.ok && data.approval_url) {
          window.location.href = data.approval_url;
        } else {
          setError(data.error || data.details || 'PayPal initialization failed.');
        }
      } catch (err) {
        console.error('PayPal init error', err);
        setError('Network error while contacting PayPal. Please try again.');
      } finally {
        setLoading(false);
      }
    } else if (selectedMethod === 'mpesa') {
      if (!/^2547\d{8}$/.test(phone)) {
        setError('Enter a valid phone number in the format 2547XXXXXXXX');
        return;
      }
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/api/payments/mpesa`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, amount: subtotal })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          // Redirect to processing page
          navigate(`/processing?checkoutRequestID=${data.checkoutRequestID}`);
        } else {
          setError(data.error || 'Mpesa payment failed.');
        }
      } catch (err) {
        setError('Network error, please try again.');
      } finally {
        setLoading(false);
      }
    }
  };

  const verifyPaystackPayment = async (reference) => {
    setLoading(true);
    try {
      const res = await fetch(`${BASE_URL}/api/payments/paystack/verify/${reference}`);
      const data = await res.json();
      if (res.ok && data.success) {
        navigate('/success');
      } else {
        navigate('/failure');
      }
    } catch (err) {
      navigate('/failure');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center'>
      <div className='m-10 bg-gray-100 shadow w-[700px] min-h-[570px] p-2 rounded'>
        <p className='text-center drop-shadow-md text-zinc-700'>ORDER SUMMARY</p>
        <div className='flex justify-between text-[18px] tracking-[-1px] shadow p-3 bg-gray-50 mt-2 mb-2'>
          <h1 className='ml-3'>TOTAL TO PAY:</h1>
          <h1 className='mr-6 text-blue-500'>KSH{subtotal.toFixed(2)}</h1>
        </div>
        <p className='text-center drop-shadow-md text-zinc-700'>CHOOSE PAYMENT METHOD</p>
        <form onSubmit={handlePayNow}>
          <div className='shadow bg-gray-50 mb-5 flex justify-between p-3'>
            <div className='flex'>
              <input
                type="radio"
                name="payment"
                checked={selectedMethod === 'card'}
                onChange={() => handleSelectMethod('card')}
                className='ml-2'
              />
              <h1 className='ml-3 mt-2'>Bank Cards (Paystack)</h1>
            </div>
            <div className='flex mr-4'>
              <img src={mastercard} alt="mastercard" className='w-[40px]' />
              <img src={visa} alt="visa" className='w-[40px]' />
            </div>
          </div>
          {selectedMethod === 'card' && (
            <div className="mb-4 px-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={cardDetails.email}
                onChange={handleCardChange}
                className="border rounded px-3 py-2 w-full mb-2"
              />
            </div>
          )}
          <div className='shadow bg-gray-50 mb-2 flex justify-between p-3'>
            <input
              type="radio"
              name="payment"
              checked={selectedMethod === 'paypal'}
              onChange={() => handleSelectMethod('paypal')}
              className='ml-2'
            />
            <img src={paypalImg} alt="paypal" className='w-[40px] mr-4' />
          </div>
          <div className='shadow bg-gray-50 mb-2 flex justify-between p-3'>
            <div className='flex'>
              <input
                type="radio"
                name="payment"
                checked={selectedMethod === 'mpesa'}
                onChange={() => handleSelectMethod('mpesa')}
                className='ml-2'
              />
              <h1 className='ml-3 mt-2'>Mobile Money</h1>
            </div>
            <img src={mpesa_icon} alt="Mpesa" className='w-[40px] mr-4' />
          </div>
          {selectedMethod === 'mpesa' && (
            <div className="mb-4 px-4">
              <input
                type="text"
                placeholder="Phone Number (2547XXXXXXXX)"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="border rounded px-3 py-2 w-full mb-2"
                maxLength={12}
              />
            </div>
          )}
          {error && <p className="text-red-500 text-center mb-2">{error}</p>}
          {loading && <p className="text-blue-500 text-center mb-2">Processing...</p>}
          <div className='shadow bg-blue-400 text-center font-[400] text-cyan-50 p-3 mt-10'>
            <button
              type="submit"
              disabled={!selectedMethod || loading}
              className={`w-full py-2 rounded ${selectedMethod ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
            >
              {loading ? 'Please wait...' : `PAY NOW: KSH${subtotal.toFixed(2)}`}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Checkout;

//////////////////////////////////////////////////////////////////

// import React, { useContext, useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import visa from '../../../assets/images/visa.png';
// import paypalImg from '../../../assets/images/paypal.png';
// import mpesa_icon from '../../../assets/images/mpesa_icon.png';
// import mastercard from '../../../assets/images/mastercard.png';
// import { CartContext } from '../../../Context/Context.jsx';

// const Checkout = () => {
//   const [selectedMethod, setSelectedMethod] = useState('');
//   const [cardDetails, setCardDetails] = useState({ email: '' });
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { cart } = useContext(CartContext);
//   const navigate = useNavigate();
//   const location = useLocation();

//   // Use env var so you can swap Ngrok URLs without editing code
//   const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://0131c4d0205f.ngrok-free.app';

//   // Get token from storage (adjust if you store it elsewhere)
//   const token = localStorage.getItem('token');

//   const subtotal = cart.reduce(
//     (sum, item) => sum + ((item.newPrice !== undefined ? item.newPrice : item.new_price) * item.quantity),
//     0
//   );

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     const reference = params.get('reference');
//     if (reference) {
//       verifyPaystackPayment(reference);
//       return;
//     }

//     const paymentId = params.get('paymentId') || params.get('paymentID') || params.get('payment_id');
//     if (paymentId) {
//       navigate(`/success?paymentId=${paymentId}`);
//       return;
//     }

//     const success = params.get('success');
//     if (success === 'true') {
//       navigate('/success');
//     } else if (success === 'false') {
//       navigate('/failure');
//     }
//   }, [location]);

//   const handleSelectMethod = (method) => {
//     setSelectedMethod(method);
//     setError('');
//   };

//   const handleCardChange = (e) => {
//     setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
//   };

//   const handlePayNow = async (e) => {
//     e.preventDefault();
//     setError('');

//     if (!token) {
//       setError('You must be logged in to make a payment.');
//       return;
//     }

//     if (selectedMethod === 'card') {
//       const { email } = cardDetails;
//       if (!email) {
//         setError('Please enter your email.');
//         return;
//       }
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({
//             email,
//             amount: subtotal,
//             callback_url: `${window.location.origin}/checkout`
//           })
//         }); 
//         const data = await res.json();
//         if (res.ok && data.authorization_url) {
//           window.location.href = data.authorization_url;
//         } else {
//           setError(data.error || 'Paystack initialization failed.');
//         }
//       } catch (err) {
//         setError('Network error, please try again.');
//       } finally {
//         setLoading(false);
//       }
//     } 
    
//     else if (selectedMethod === 'paypal') {
//       setLoading(true);
//       try {
//         const resp = await fetch(`${BASE_URL}/api/payments/paypal/create?amount=${encodeURIComponent(subtotal)}`, {
//           method: 'GET',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//         });
//         const data = await resp.json();
//         if (resp.ok && data.approval_url) {
//           window.location.href = data.approval_url;
//         } else {
//           setError(data.error || data.details || 'PayPal initialization failed.');
//         }
//       } catch (err) {
//         setError('Network error while contacting PayPal. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     } 
    
//     else if (selectedMethod === 'mpesa') {
//       if (!/^2547\d{8}$/.test(phone)) {
//         setError('Enter a valid phone number in the format 2547XXXXXXXX');
//         return;
//       }
//       setLoading(true);
//       try {
//         const res = await fetch(`${BASE_URL}/api/payments/mpesa`, {
//           method: 'POST',
//           headers: { 
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           },
//           body: JSON.stringify({ phone, amount: subtotal })
//         });
//         const data = await res.json();
//         if (res.ok && data.success) {
//           navigate(`/processing?checkoutRequestID=${data.checkoutRequestID}`);
//         } else {
//           setError(data.error || 'Mpesa payment failed.');
//         }
//       } catch (err) {
//         setError('Network error, please try again.');
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const verifyPaystackPayment = async (reference) => {
//     setLoading(true);
//     try {
//       const res = await fetch(`${BASE_URL}/api/payments/paystack/verify/${reference}`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
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
//       <div className='flex justify-center'>
//       <div className='m-10 bg-gray-100 shadow w-[700px] min-h-[570px] p-2 rounded'>
//         <p className='text-center drop-shadow-md text-zinc-700'>ORDER SUMMARY</p>
//         <div className='flex justify-between text-[18px] tracking-[-1px] shadow p-3 bg-gray-50 mt-2 mb-2'>
//           <h1 className='ml-3'>TOTAL TO PAY:</h1>
//           <h1 className='mr-6 text-blue-500'>KSH{subtotal.toFixed(2)}</h1>
//         </div>
//         <p className='text-center drop-shadow-md text-zinc-700'>CHOOSE PAYMENT METHOD</p>
//         <form onSubmit={handlePayNow}>
//           <div className='shadow bg-gray-50 mb-5 flex justify-between p-3'>
//             <div className='flex'>
//               <input
//                 type="radio"
//                 name="payment"
//                 checked={selectedMethod === 'card'}
//                 onChange={() => handleSelectMethod('card')}
//                 className='ml-2'
//               />
//               <h1 className='ml-3 mt-2'>Bank Cards (Paystack)</h1>
//             </div>
//             <div className='flex mr-4'>
//               <img src={mastercard} alt="mastercard" className='w-[40px]' />
//               <img src={visa} alt="visa" className='w-[40px]' />
//             </div>
//           </div>
//           {selectedMethod === 'card' && (
//             <div className="mb-4 px-4">
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={cardDetails.email}
//                 onChange={handleCardChange}
//                 className="border rounded px-3 py-2 w-full mb-2"
//               />
//             </div>
//           )}
//           <div className='shadow bg-gray-50 mb-2 flex justify-between p-3'>
//             <input
//               type="radio"
//               name="payment"
//               checked={selectedMethod === 'paypal'}
//               onChange={() => handleSelectMethod('paypal')}
//               className='ml-2'
//             />
//             <img src={paypalImg} alt="paypal" className='w-[40px] mr-4' />
//           </div>
//           <div className='shadow bg-gray-50 mb-2 flex justify-between p-3'>
//             <div className='flex'>
//               <input
//                 type="radio"
//                 name="payment"
//                 checked={selectedMethod === 'mpesa'}
//                 onChange={() => handleSelectMethod('mpesa')}
//                 className='ml-2'
//               />
//               <h1 className='ml-3 mt-2'>Mobile Money</h1>
//             </div>
//             <img src={mpesa_icon} alt="Mpesa" className='w-[40px] mr-4' />
//           </div>
//           {selectedMethod === 'mpesa' && (
//             <div className="mb-4 px-4">
//               <input
//                 type="text"
//                 placeholder="Phone Number (2547XXXXXXXX)"
//                 value={phone}
//                 onChange={e => setPhone(e.target.value)}
//                 className="border rounded px-3 py-2 w-full mb-2"
//                 maxLength={12}
//               />
//             </div>
//           )}
//           {error && <p className="text-red-500 text-center mb-2">{error}</p>}
//           {loading && <p className="text-blue-500 text-center mb-2">Processing...</p>}
//           <div className='shadow bg-blue-400 text-center font-[400] text-cyan-50 p-3 mt-10'>
//             <button
//               type="submit"
//               disabled={!selectedMethod || loading}
//               className={`w-full py-2 rounded ${selectedMethod ? 'bg-blue-600' : 'bg-gray-400 cursor-not-allowed'}`}
//             >
//               {loading ? 'Please wait...' : `PAY NOW: KSH${subtotal.toFixed(2)}`}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Checkout;
