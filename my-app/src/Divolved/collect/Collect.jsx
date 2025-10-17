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
        const res = await fetch(`http://localhost:3000/api/art/${id}`);
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
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-black">Loading...</p>
        </div>
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-red-500">❌ {error}</p>
        </div>
      </div>
    );
  if (!data)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <p className="text-2xl font-bold text-black">Collectible Not Found</p>
        </div>
      </div>
    );

  // Ensure price is numeric for calculations
  const numericPrice = Number(String(data.price).replace("$", ""));
  const fee = 0.05 * numericPrice;
  const total = fee + numericPrice;

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white pt-24 pb-20">
        <div className="container mx-auto px-4 sm:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold text-black mb-2">
              Order Details
            </h1>
            <div className="h-1 w-20 bg-red-500 mx-auto"></div>
          </div>

          {/* Order Card */}
          <div className="container mx-auto bg-white rounded-lg shadow-md border-2 border-black overflow-hidden">
            {/* Item Details Section */}
            <div className="p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                {/* Price Info */}
                <div className="text-center md:text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-black mb-2">
                    Price
                  </p>
                  <p className="text-3xl font-bold text-red-500 font-mono">
                    {data.price}
                  </p>
                </div>

                {/* Size Info */}
                <div className="text-center md:text-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-black mb-2">
                    Size
                  </p>
                  <p className="text-xl font-semibold text-black">
                    {data.size}
                  </p>
                </div>

                {/* Item Image */}
                <div className="flex flex-col items-center md:items-end">
                  <p className="text-xs font-bold uppercase tracking-widest text-black mb-3">
                    Item
                  </p>
                  <div className="w-48 h-48 rounded-lg shadow-md overflow-hidden border-2 border-black">
                    <img
                      src={data.image}
                      alt={data.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Divider */}
            <div className="border-t-2 border-black"></div>

            {/* Pricing Breakdown */}
            <div className="p-6 sm:p-8 bg-white">
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-2 border-b border-black">
                  <p className="text-base font-semibold text-black">
                    Subtotal
                  </p>
                  <p className="text-base font-mono text-black">{data.price}</p>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-black">
                  <p className="text-base font-semibold text-black">
                    Delivery Fee (5%)
                  </p>
                  <p className="text-base font-mono text-black">
                    ${fee.toFixed(2)}
                  </p>
                </div>
                
              </div>

              <div className="flex gap-2">
                <div className="w-full flex justify-between items-center py-4 bg-black px-4 rounded">
                  <p className="text-lg font-bold text-white uppercase tracking-wide">
                    Total to Pay
                  </p>
                  <p className="text-2xl font-bold text-red-500 font-mono">
                    ${total.toFixed(2)}
                  </p>
                </div>

                <Link
                to={`/paystack-redirect/?id=${id}`}
                className="w-full bg-red-500 text-white text-lg font-bold py-4 px-6 rounded hover:bg-red-600 active:scale-95 transition-all duration-200 shadow-md hover:shadow-lg text-center block"
              >
                Proceed to Checkout
              </Link>
              </div>

              {/* Checkout Button */}
              
            </div>
          </div>

          {/* Additional Info */}
          <div className="mt-8 text-center">
            <div className="inline-block bg-black text-white py-3 px-6 rounded text-sm font-medium">
              🔒 Secure payment powered by Paystack
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Collect;