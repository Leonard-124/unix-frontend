import BaseUrl from "../utils/BaseUrl";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Pages/Navbar";
import { Link, Outlet } from "react-router-dom";
import Footer from "../Components/Footer";
import LoadingSpinner from "../LoadingSpinner";

const Inventions = () => {
  const [inventions, setInventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchInventions = async () => {
      try {
        const res = await fetch(`${BaseUrl()}/api/art`); // adjust if deployed
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
        <h1 className="text-2xl sm:text-3xl font-bold text-red-500 text-center mb-4">
          Welcome to the Inventions Page
        </h1>

        <div className="flex flex-col   text-gray-600 text-lg sm:text-xl font-light mb-6">
          <p className="text-center ">
            Explore the latest inventions and innovations in technology, art and   other fields.
          </p>
          <p className="text-center ">
            Heads Up — who invented the light bulb? 🤔
          </p>
        </div>

        

        {loading ? (
          <p className="text-center text-gray-500 mt-6"><LoadingSpinner/> </p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">❌ {error}</p>
        ) : inventions.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {inventions.map((item) => (
              <Link
                to={`/inventioncard/${item._id}`}
                key={item._id}
                className="rounded-lg bg-[#f7f4f4] border border-gray-300 hover:border-red-500 transition-all  overflow-hidden flex flex-col"
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
                    <p className="font-semibold text-xl text-red-500">{item.name}</p>
                    <p className="text-lg ">Inventor: {item.inventor}</p>
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base font-medium mt-3">
                    <p className="text-gray-600">
                      <span className="font-light text-gray-400">Type: </span>
                      {item.type}
                    </p>
                    <p className="text-green-400">From: {item.price}</p>
                  </div>
                </div>

                <p className="absolute top-2 right-2">⭐⭐</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6 text-lg">
            No inventions found.
          </p>
        )}
      </div>
      <Footer/>
    </>
  );
};

export default Inventions;