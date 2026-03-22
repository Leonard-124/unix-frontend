


// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Available = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch("https://unix.up.railway.app/api/art"); // your backend endpoint
//         if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
//         const result = await res.json();

//         // Only take the first 5 items
//         setData(result.slice(0, 4));
//       } catch (err) {
//         console.error("Failed to fetch:", err.message);
//         setError("Failed to load artworks.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // Hover effect logic
//   useEffect(() => {
//     const images = document.querySelectorAll(".hover-image");

//     images.forEach((img) => {
//       const handleMove = (e) => {
//         const rect = img.getBoundingClientRect();
//         const x = e.clientX - rect.left - rect.width / 2;
//         const y = e.clientY - rect.top - rect.height / 2;
//         img.style.transform = `translate(${x * 0.05}px, ${y * 0.05}px)`;
//       };

//       const handleLeave = () => {
//         img.style.transform = "translate(0, 0)";
//       };

//       img.addEventListener("mousemove", handleMove);
//       img.addEventListener("mouseleave", handleLeave);

//       return () => {
//         img.removeEventListener("mousemove", handleMove);
//         img.removeEventListener("mouseleave", handleLeave);
//       };
//     });
//   }, [data]);

//   return (
//     <section className="py-10 bg-gray-50">
//       <h1 className="text-center font-bold text-2xl sm:text-3xl mb-8">
//         Available For You
//       </h1>

//       {loading && <p className="text-center">Loading...</p>}
//       {error && <p className="text-center text-red-500">{error}</p>}

//       {!loading && !error && (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 sm:px-8 lg:px-16">
//           {data.map((item, index) => (
//             <div
//               key={index}
//               className="bg-white rounded-lg shadow hover:shadow-lg hover:scale-105 transition-transform duration-300 ease-out overflow-hidden"
//             >
//               {/* Image */}
//               <div className="w-full h-48 sm:h-56 md:h-64 overflow-hidden">
//                 <img
//                   src={item.image} // assuming backend returns `image` field
//                   alt={item.title}
//                   className="hover-image w-full h-full object-cover transition-transform duration-300 ease-out"
//                 />
//               </div>

//               {/* Info */}
//               <div className="p-4 text-center">
//                 <h2 className="font-bold text-lg">{item.title}</h2>
//                 <p className="text-gray-600">{item.artist}</p>
//                 <p className="text-lg font-medium mt-1">From: {item.price}</p>
//                 <Link
//                   to={`/artworks/${item._id}`}
//                   className="inline-block mt-2 text-blue-600 hover:underline font-medium"
//                 >
//                   View Details
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </section>
//   );
// };

// export default Available;

/////////////////////////////////////////////////////////////////////////////////////////////
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Available = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  // FIX: use refs instead of querySelectorAll so event listeners
  // are properly cleaned up and don't leak across re-renders
  const cardRefs = useRef([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // FIX: hardcoded URL replaced with env var
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/art`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const result = await res.json();
        setData(result.slice(0, 4));
      } catch (err) {
        setError("Failed to load artworks.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // FIX: parallax effect attached via refs — properly cleaned up per image
  useEffect(() => {
    const cleanups = cardRefs.current.map((img) => {
      if (!img) return null;

      const handleMove = (e) => {
        const rect = img.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        img.style.transform = `scale(1.04) translate(${x * 0.03}px, ${y * 0.03}px)`;
      };
      const handleLeave = () => {
        img.style.transform = "scale(1) translate(0, 0)";
      };

      img.addEventListener("mousemove", handleMove);
      img.addEventListener("mouseleave", handleLeave);
      return () => {
        img.removeEventListener("mousemove", handleMove);
        img.removeEventListener("mouseleave", handleLeave);
      };
    });
    return () => cleanups.forEach((c) => c?.());
  }, [data]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .avail-card { animation: fadeUp 0.5s ease both; }
      `}</style>

      <section id="available"
        className="bg-[#fafaf8] py-20 px-6 sm:px-10 lg:px-16"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Header */}
        <header className="text-center mb-14">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
            Featured Collections
          </p>
          <h2
            className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Available works For You
          </h2>
          <div className="w-10 h-px bg-neutral-800 mx-auto" />
        </header>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-16">
            <div className="flex gap-2">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-2 h-2 rounded-full bg-neutral-800 animate-bounce"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <p className="text-center font-mono text-[10px] tracking-widest uppercase text-red-400">
            {error}
          </p>
        )}

        {/* Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {data.map((item, i) => (
                <article
                  key={item._id || i}
                  className="avail-card group flex flex-col bg-white border border-neutral-100"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  {/* Image */}
                  <Link
                    to={`/artworks/${item._id}`}
                    className="block relative overflow-hidden"
                    style={{ paddingBottom: "120%" }}
                  >
                    <img
                      // FIX: was item.title (wrong field) — should be item.name
                      ref={(el) => (cardRefs.current[i] = el)}
                      src={item.image}
                      alt={item.name}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white border-b border-white/60 pb-0.5">
                        BUY NOW
                      </span>
                    </div>
                  </Link>

                  {/* Info */}
                  <div className="p-4 flex flex-col gap-3 flex-1">
                    <div className="flex-1">
                      <p
                        className="text-base font-medium text-neutral-900 truncate tracking-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {/* FIX: was item.title — correct field is item.name */}
                        {item.name}
                      </p>
                      {/* FIX: was item.artist — correct field is item.author */}
                      {(item.author || item.inventor) && (
                        <p className="text-xs text-neutral-500 italic mt-0.5">
                          {item.author || item.inventor}
                        </p>
                      )}
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-300 mt-1">
                        {item.type || "Artwork"}
                      </p>
                    </div>

                    <div className="flex items-center justify-between border-t border-neutral-100 pt-3 mt-auto">
                      <p className="text-sm text-neutral-700">
                        {item.price ? `From ${item.price}` : "Price on request"}
                      </p>
                      <Link
                        to={`/artworks/${item._id}`}
                        className="font-mono text-[10px] tracking-[0.14em] uppercase bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-600 active:scale-95 transition-all duration-150"
                      >
                        BUY NOW
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* See all link */}
            <div className="text-center mt-14">
              <Link
                to="/artworks"
                className="font-mono text-[10px] tracking-[0.18em] uppercase border-b border-neutral-800 text-neutral-800 hover:text-neutral-400 hover:border-neutral-400 transition-colors pb-0.5"
              >
                Browse All Works →
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Available;
