


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Available = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch("https://unix.up.railway.app/api/art"); // your backend endpoint
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const result = await res.json();

        // Only take the first 5 items
        setData(result.slice(0, 4));
      } catch (err) {
        console.error("Failed to fetch:", err.message);
        setError("Failed to load artworks.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Hover effect logic
  useEffect(() => {
    const images = document.querySelectorAll(".hover-image");

    images.forEach((img) => {
      const handleMove = (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        img.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
      };

      const handleLeave = () => {
        img.style.transform = "translate(0, 0)";
      };

      img.addEventListener("mousemove", handleMove);
      img.addEventListener("mouseleave", handleLeave);

      return () => {
        img.removeEventListener("mousemove", handleMove);
        img.removeEventListener("mouseleave", handleLeave);
      };
    });
  }, [data]);

  return (
    <section className="py-10 bg-gray-50">
      <h1 className="text-center text-red-500 font-bold text-2xl sm:text-3xl mb-8">
        Available For You
      </h1>

      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-16">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-out overflow-hidden"
            >
              {/* Image */}
              <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
                <img
                  src={item.image} // assuming backend returns `image` field
                  alt={item.title}
                  className="hover-image w-full h-full object-cover transition-transform duration-300 ease-out"
                />
              </div>

              {/* Info */}
              <div className="p-4 text-center">
                <h2 className="font-bold text-lg">{item.title}</h2>
                <p className="text-gray-600">{item.artist}</p>
                <p className="text-lg font-medium mt-1">From: {item.price}</p>
                <Link
                  to={`/view/${item._id}`}
                  className="inline-block mt-2 text-red-500 hover:underline font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default Available;
