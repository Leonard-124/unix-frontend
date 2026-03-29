
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Navbar from "../Pages/Navbar";
import Footer from "../Components/Footer";

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const searchArtworks = async () => {
      if (!query.trim()) {
        setResults([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/art`);
        if (!res.ok) throw new Error("Failed to fetch artworks");
        
        const data = await res.json();
        
        // Filter results based on search query
        const filtered = data.filter((item) => {
          const searchLower = query.toLowerCase();
          return (
            item.name?.toLowerCase().includes(searchLower) ||
            item.author?.toLowerCase().includes(searchLower) ||
            item.inventor?.toLowerCase().includes(searchLower) ||
            item.type?.toLowerCase().includes(searchLower) ||
            item.description?.toLowerCase().includes(searchLower)
          );
        });

        setResults(filtered);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    searchArtworks();
  }, [query]);

  // Determine if item is invention or artwork
  const isInvention = (item) => item.type?.toLowerCase() === "invention";

  return (
    <>
      <Navbar />
      <div className="mt-24 px-4 sm:px-6 lg:px-12 mb-10">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-2">
          Search Results
        </h1>
        
        {query && (
          <p className="text-center text-gray-600 mb-6">
            Showing results for: <span className="font-semibold">"{query}"</span>
          </p>
        )}

        <hr className="mb-6" />

        {loading ? (
          <p className="text-center text-gray-500 mt-6">Searching...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-6">{error}</p>
        ) : !query.trim() ? (
          <p className="text-center text-gray-500 mt-6 text-lg">
            Try to modify your search query to find your desired collection.
          </p>
        ) : results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((item) => (
              <Link
                to={isInvention(item) ? `/inventioncard/${item._id}` : `/artworks/${item._id}`}
                key={item._id}
                className="rounded-lg bg-white shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden flex flex-col relative"
              >
                {/* Image */}
                <div className="h-48 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div className="text-gray-700 space-y-1">
                    <p className="font-semibold text-lg">{item.name}</p>
                    
                    {isInvention(item) ? (
                      <p className="text-sm text-gray-500">
                        Inventor: {item.inventor || "Unknown"}
                      </p>
                    ) : (
                      <p className="text-sm text-gray-500">
                        Artist: {item.author || "Unknown"}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center text-sm sm:text-base font-medium mt-3">
                    <p className="text-gray-600">
                      <span className="font-light text-gray-400">Type: </span>
                      {item.type || "Artwork"}
                    </p>
                    <p className={isInvention(item) ? "text-red-500" : "text-blue-600"}>
                      From: {item.price}
                    </p>
                  </div>
                </div>

                {/* Badge for type */}
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold">
                  {isInvention(item) ? "🔧 Invention" : "🎨 Artwork"}
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-6 text-lg">
            No results found for "{query}". Try a different search term.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Search;