
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const PaystackButton = ({ user }) => {
  const navigate = useNavigate();
  const [paystackLoaded, setPaystackLoaded] = useState(false);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (window.PaystackPop) {
      setPaystackLoaded(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => setPaystackLoaded(true);
    document.body.appendChild(script);
  }, []);

  const handlePayment = () => {
    if (!paystackLoaded) return alert("Payment system is still loading.");
    if (!user?.email) return alert("Please log in first");

    setProcessing(true);

    const paystack = new window.PaystackPop();
    paystack.newTransaction({
      key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
      email: user.email,
      amount: 19900, // cents if USD
      currency: "KSH",
      onSuccess: async (transaction) => {
        try {
          const res = await fetch("/api/payments/paystack/verify", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ reference: transaction.reference }),
          });

          if (!res.ok) throw new Error("Verification request failed");

          const data = await res.json();
          if (data.success) {
            navigate("/premium-service");
          } else {
            alert("Verification failed ❌");
          }
        } catch (err) {
          console.error(err);
          alert("Server error ❌ Try again later.");
        } finally {
          setProcessing(false);
        }
      },
      onCancel: () => {
        alert("Payment canceled ❌");
        setProcessing(false);
      },
    });
  };

  return (
    <button
      onClick={handlePayment}
      disabled={!paystackLoaded || processing}
      className={`px-4 py-2 rounded-lg text-white ${
        paystackLoaded ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
      }`}
    >
      {processing
        ? "Processing..."
        : paystackLoaded
        ? "Pay $1.99 to Unlock"
        : "Loading Payment..."}
    </button>
  );
};

export default PaystackButton;


