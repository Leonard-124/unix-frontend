

import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import { Link } from "react-router-dom";
import Navbar from "../../Pages/Navbar";

const Order = () => {   ///needs to be relooked
  const { getAccessTokenSilently, isAuthenticated, user } = useAuth0();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      if (!isAuthenticated) return; // returns null,void

      try {
        const token = await getAccessTokenSilently({
          authorizationParams: {
            audience: import.meta.env.VITE_AUTH0_AUDIENCE,
          },
        });

        const res = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(res.data.orders);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError(err.response?.data?.message || "Failed to load orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [isAuthenticated, getAccessTokenSilently]);

  if (!isAuthenticated) {
    return (
      <>
        <Navbar />
        <div className="mt-24 text-center text-lg text-gray-600">
          Please log in to view your orders!
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-6"></div>
            <p className="text-gray-700 text-xl font-medium">Loading your orders...please wait.</p>
          </div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="mt-24 px-4 max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-600 text-lg">Warning: {error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
            >
              Retry
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12 mb-10">
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Your Orders
        </h1>
        <p className="text-center text-gray-600 mb-8">
          {orders.length} {orders.length === 1 ? "order" : "orders"} found
        </p>

        {orders.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-12">
            <div className="bg-gray-50 rounded-lg p-8 shadow-md">
              <svg
                className="mx-auto h-24 w-24 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-500 mb-6">
                You haven't made any purchases yet. Start exploring our collections!
              </p>
              <Link
                to="/buy"
                className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
              >
                Browse Artworks
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto space-y-4">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="sm:w-48 h-48 flex-shrink-0">
                    <img
                      src={order.artDetails?.image || order.artId?.image}
                      alt={order.artDetails?.name || order.artId?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Order Details */}
                  <div className="flex-1 p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">
                          {order.artDetails?.name || order.artId?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {order.artDetails?.author && (
                            <span>Artist: {order.artDetails.author}</span>
                          )}
                          {order.artDetails?.inventor && (
                            <span>Inventor: {order.artDetails.inventor}</span>
                          )}
                        </p>
                      </div>

                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          order.status === "success"
                            ? "bg-green-100 text-green-800"
                            : order.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {order.status === "success" ? "✓ Completed" : order.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Order Date</p>
                        <p className="font-medium text-gray-800">
                          {new Date(order.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Quantity</p>
                        <p className="font-medium text-gray-800">
                          {order.quantity || 1}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Amount Paid</p>
                        <p className="font-semibold text-lg text-blue-600">
                          KSH{(order.amount / 100).toFixed(2)} {/*Is it KSH or USD */}
                        </p>
                      </div>

                      <div>
                        <p className="text-gray-500">Reference</p>
                        <p className="font-mono text-xs text-gray-600 truncate">
                          {order.reference}
                        </p>
                      </div>
                    </div>

                    {order.artDetails?.type && (
                      <div className="mt-4">
                        <span className="inline-block bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {order.artDetails.type === "invention" ? "🔧" : "🎨"}{" "}
                          {order.artDetails.type}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Order;
