

import React, { useEffect, useState } from "react";

const Photography = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/art"); // ✅ Correct backend port
        if (!res.ok) throw new Error("Failed to fetch artworks");
        const data = await res.json();
        setArtworks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading artworks...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {artworks.map((art) => (
        <div
          key={art._id}
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          <img
            src={art.src}
            alt={art.name}
            className="w-full h-56 object-cover"
          />
          <div className="p-4">
            <h3 className="text-lg font-semibold mb-1">{art.name}</h3>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Author:</span> {art.author}
            </p>
            <p className="text-sm text-gray-600 mb-1">
              <span className="font-medium">Size:</span> {art.size}
            </p>
            <p className="text-sm text-gray-700 mb-2">{art.description}</p>
            <p className="text-sm font-semibold text-green-600">{art.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Photography;
