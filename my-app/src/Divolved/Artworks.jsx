



// import React, {useContext, useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import Footer from "../Components/Footer";
// import Navbar from "../Pages/Navbar";
// import { CartContext } from "../Context/Context";
// import red_heart from "../assets/images/red_heart.png"
// import white_heart from "../assets/images/white_heart.png"


// const Artworks = () => {
//   const { addToCart } = useContext(CartContext);
//   const [artworks, setArtworks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchArtworks = async () => {
//     try {
//       const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/art`); // adjust if deployed
//       if (!res.ok) throw new Error(`HTTP ${res.status}`);
//       const result = await res.json();

//       // ✅ Only include non-inventions
//       const artworksOnly = result.filter(
//         (item) => !item.type || item.type.toLowerCase() !== "invention"
//       );

//       setArtworks(artworksOnly);
//     } catch (err) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClick = (e) => {
//     e.preventDefault()
//     addToCart ? <img src={red_heart} alt="" width={40}/> : <img src={white_heart} alt="" width={40} />
//   }

//   useEffect(() => {
//     fetchArtworks();
//   }, []);

//   if (loading) {
//     return <div className="text-center mt-10 text-lg">Loading...</div>;
//   }

//   if (error) {
//     return <div className="text-center text-red-500 mt-10">❌ {error}</div>;
//   }

//   return (
//     <>
//     <Navbar/>
//         <div className=" px-4 sm:px-6 lg:px-12 mt-24 mb-10">
//       <h1 className="text-2xl sm:text-3xl font-bold text-center mb-10">
//         Artworks
//       </h1>

//       {artworks.length > 0 ? (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//           {artworks.map((item) => (
//             <div //
//               // to={`/artworks/${item._id}`}
//               key={item._id}
//               className="bg-white rounded-lg shadow hover:shadow-lg transition transform hover:scale-105 overflow-hidden flex flex-col"
//             >
//               {/* Image */}
//               <div className="h-52 sm:h-56 md:h-60 lg:h-64 overflow-hidden">
//                 <Link
//                 to={`/artworks/${item._id}`}
//                 >
//                 <img
//                   src={item.image}
//                   alt={item.name}
//                   className="w-full h-full object-cover"
//                 />
//                 </Link>
//               </div>

//               {/* Info */}
//               <div className="p-4 flex flex-col justify-between flex-grow">
//                 <div className="flex justify-between text-gray-700 space-y-1">
//                   <p className="font-semibold text-lg">{item.name}</p>
//                   {item.author && (
//                     <p className="text-sm text-gray-500">Artist: {item.author}</p>
//                   )}
//                   <button
//                   onClick={() => addToCart(item)}
//                   // className="bg-yellow-500 text-white w-40 px-3 py-2 rounded shadow hover:bg-yellow-600 cursor-pointer"
//                   aria-label={`Add ${item.name || 'product'} to cart`}
//                   >{handleClick}</button>
//                 </div>

//                 <div className="flex justify-between items-center text-sm sm:text-base font-medium mt-3">
//                   <p className="text-gray-600">
//                     <span className="font-light text-gray-400">Type: </span>
//                     {item.type || "Artwork"}
//                   </p>
//                   <p className="text-blue-600">From: {item.price}</p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p className="text-center text-gray-500 mt-10 text-lg">
//           No artworks found.
//         </p>
//       )}
//     </div>
//     <Footer/>
//     </>

//   );
// };

// export default Artworks;

//////////////////////////////////////////////////////////////////////////////////////

import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer";
import Navbar from "../Pages/Navbar";
import { CartContext } from "../Context/Context";

const HeartIcon = ({ filled }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#e63946" : "none"}
    stroke={filled ? "#e63946" : "#888"}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// Toast notification component
const Toast = ({ toasts }) => (
  <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2 pointer-events-none">
    {toasts.map((t) => (
      <div
        key={t.id}
        className={`flex items-center gap-3 px-5 py-3 shadow-lg border text-sm tracking-wide toast-in
          ${t.type === "cart"
            ? "bg-neutral-900 text-white border-neutral-700"
            : "bg-white text-neutral-900 border-neutral-200"
          }`}
      >
        <span className="text-base">{t.type === "cart" ? "🛍" : t.saved ? "♥" : "♡"}</span>
        <span className="font-mono text-[11px] tracking-widest uppercase">{t.message}</span>
      </div>
    ))}
  </div>
);

const Artworks = () => {
  const { addToCart } = useContext(CartContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [wishlisted, setWishlisted] = useState({});
  const [toasts, setToasts] = useState([]);

  const fetchArtworks = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/art`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const result = await res.json();
      const artworksOnly = result.filter(
        (item) => !item.type || item.type.toLowerCase() !== "invention"
      );
      setArtworks(artworksOnly);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message, type, extra = {}) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, ...extra }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800);
  };

  const toggleWishlist = (e, item) => {
    e.preventDefault();
    const isNowSaved = !wishlisted[item._id];
    setWishlisted((prev) => ({ ...prev, [item._id]: isNowSaved }));
    showToast(
      isNowSaved ? `Saved — ${item.name}` : `Removed — ${item.name}`,
      "wishlist",
      { saved: isNowSaved }
    );
  };

  const handleAddToCart = (item) => {
    addToCart(item);
    showToast(`Added to cart — ${item.name}`, "cart");
  };

  useEffect(() => {
    fetchArtworks();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#fafaf8]">
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
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#fafaf8]">
          <p className="font-mono text-xs tracking-widest text-red-500 uppercase">
            Unable to load artworks — {error}
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#fafaf8] px-6 sm:px-10 lg:px-16 pt-28 pb-24 max-w-screen-xl mx-auto">

        {/* Editorial header */}
        <header className="text-center mb-16">
          <p className="font-mono text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
            Collection
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light tracking-tight text-neutral-900 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Artworks
          </h1>
          <div className="w-10 h-px bg-neutral-800 mx-auto mb-4" />
          <p className="font-mono text-[11px] tracking-widest text-neutral-400 uppercase">
            {artworks.length} work{artworks.length !== 1 ? "s" : ""} available
          </p>
        </header>

        {artworks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-12">
            {artworks.map((item, i) => (
              <article
                key={item._id}
                className="group flex flex-col bg-white border border-neutral-100 artwork-card"
                style={{ animationDelay: `${i * 0.07}s` }}
              >
                {/* Image — portrait ratio like Artsy */}
                <Link
                  to={`/artworks/${item._id}`}
                  className="block relative overflow-hidden"
                  style={{ paddingBottom: "120%" }}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white border-b border-white/60 pb-0.5">
                      View Work
                    </span>
                  </div>
                </Link>

                {/* Card body */}
                <div className="p-4 flex flex-col gap-3 flex-1">
                  {/* Name, author, type + wishlist */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-base font-medium text-neutral-900 truncate tracking-tight"
                        style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                      >
                        {item.name}
                      </p>
                      {item.author && (
                        <p className="text-xs text-neutral-500 italic mt-0.5">
                          {item.author}
                        </p>
                      )}
                      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-300 mt-1">
                        {item.type || "Artwork"}
                      </p>
                    </div>

                    {/* FIX: per-item wishlist with correct state */}
                    <button
                      onClick={(e) => toggleWishlist(e, item)}
                      className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer
                        ${wishlisted[item._id]
                          ? "border-red-300 bg-red-50"
                          : "border-neutral-200 hover:border-neutral-400 bg-white"
                        }`}
                      aria-label={
                        wishlisted[item._id]
                          ? `Remove ${item.name} from saved`
                          : `Save ${item.name}`
                      }
                    >
                      <HeartIcon filled={!!wishlisted[item._id]} />
                    </button>
                  </div>

                  {/* Price + Inquire */}
                  <div className="flex items-center justify-between border-t border-neutral-100 pt-3 mt-auto">
                    <p className="text-sm text-neutral-700">
                      {item.price ? `From ${item.price}` : "Price on request"}
                    </p>

                    <button
                      onClick={() => handleAddToCart(item)}
                      className="font-mono text-[10px] tracking-[0.14em] uppercase bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-600 active:scale-95 transition-all duration-150 cursor-pointer"
                      aria-label={`Add ${item.name || "artwork"} to cart`}
                    >
                      Inquire
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-32">
            <p className="font-mono text-xs tracking-widest text-neutral-300 uppercase">
              No artworks found.
            </p>
          </div>
        )}
      </main>

      <Toast toasts={toasts} />
      <Footer />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .artwork-card {
          animation: fadeUp 0.5s ease both;
        }
        @keyframes toastIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .toast-in {
          animation: toastIn 0.25s ease both;
        }
      `}</style>
    </>
  );
};

export default Artworks;