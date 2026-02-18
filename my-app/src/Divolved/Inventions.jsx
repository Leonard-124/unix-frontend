

import React, { useEffect, useState } from "react";
import Navbar from "../Pages/Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";

const Inventions = () => {
  const [inventions, setInventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventions = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/art`); // adjust if deployed
        if (!res.ok) throw new Error("Failed to fetch inventions");
        const data = await res.json();

        // Filter only inventions
        const inventionsOnly = data.filter(
          (item) => item.type && item.type.toLowerCase() === "invention"
        );
        setInventions(inventionsOnly);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchInventions();
  }, []);

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12 mb-5">
        <Outlet />
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-4">
          Trending art pieces
        </h1>

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-red-400 text-lg sm:text-xl font-light mb-6">
          <p className="text-center md:text-left">
            Get the latest pieces of art at an affordable price here at UnixArt
          </p>
          <p className="text-center md:text-right">
            Quality Art for All.
          </p>
        </div>

        <hr className="mb-6" />

        {loading ? (
          <p className="text-center text-gray-500 mt-6">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">❌ {error}</p>
        ) : inventions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {inventions.map((item) => (
              <Link
                to={`/inventioncard/${item._id}`}
                key={item._id}
                className="rounded-lg bg-[#f7f4f4] shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden flex flex-col"
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
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-sm">Inventor: {item.inventor}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base font-medium mt-3">
                    <p className="text-gray-600">
                      <span className="font-light text-gray-400">Type: </span>
                      {item.type}
                    </p>
                    <p className="text-red-500">From: {item.price}</p>
                  </div>
                </div>

                <p className="absolute top-2 right-2">⭐⭐</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6 text-lg">
            No Arts found.
          </p>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Inventions;