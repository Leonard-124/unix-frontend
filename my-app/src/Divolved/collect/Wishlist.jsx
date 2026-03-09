

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/Context";
import Navbar from "../../Pages/Navbar"
import Footer from "../../Components/Footer"

const HeartFilledIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="#e63946" stroke="#e63946" strokeWidth="1.5">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useContext(CartContext);

  const getItemPrice = (item) =>
    Number(String(item.price ?? item.new_price ?? 0).replace(/[^0-9.]/g, ""));

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .row-in { animation: fadeUp 0.4s ease both; }
      `}</style>

      <main
        className="min-h-screen bg-[#fafaf8] px-6 sm:px-10 lg:px-20 pt-28 pb-32 max-w-screen-xl mx-auto"
        style={{ fontFamily: "'DM Mono', monospace" }}
      >
        {/* Header */}
        <header className="text-center mb-14">
          <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
            Your Saves
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light tracking-tight text-neutral-900 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Wishlist
          </h1>
          <div className="w-10 h-px bg-neutral-800 mx-auto mb-4" />
          <p className="text-[11px] tracking-widest text-neutral-400 uppercase">
            {wishlist.length} saved work{wishlist.length !== 1 ? "s" : ""}
          </p>
        </header>

        {wishlist.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <div className="w-14 h-14 rounded-full border border-neutral-200 flex items-center justify-center mb-2">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#ccc" strokeWidth="1.2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p
              className="text-3xl font-light text-neutral-300 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              No saved works yet.
            </p>
            <Link
              to="/artworks"
              className="text-[10px] tracking-[0.18em] uppercase border-b border-neutral-800 text-neutral-800 hover:text-neutral-400 hover:border-neutral-400 transition-colors pb-0.5"
            >
              Browse Artworks
            </Link>
          </div>
        ) : (
          <>
            {/* ── Column headers (desktop) ── */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 text-[9px] tracking-[0.2em] uppercase text-neutral-400 border-b border-neutral-200 pb-3 mb-2">
              <span>Work</span>
              <span className="text-center">Price</span>
              <span className="text-center">Action</span>
              <span />
            </div>

            {/* ── Wishlist rows ── */}
            <div className="divide-y divide-neutral-100">
              {wishlist.map((item, i) => {
                const price = getItemPrice(item);

                return (
                  <div
                    key={item._id || item.id}
                    className="row-in grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center py-6"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {/* Artwork info */}
                    <Link
                      to={`/artworks/${item._id || item.id}`}
                      className="flex items-center gap-4 group"
                    >
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-neutral-100">
                        <img
                          src={item.imageUrl || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div>
                        <p
                          className="text-base font-medium text-neutral-900 leading-tight group-hover:text-neutral-500 transition-colors"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                        >
                          {item.name}
                        </p>
                        {item.author && (
                          <p className="text-[10px] text-neutral-400 italic mt-0.5">
                            {item.author}
                          </p>
                        )}
                        <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-neutral-300 mt-1">
                          {item.type || "Artwork"}
                        </p>
                      </div>
                    </Link>

                    {/* Price */}
                    <p className="text-sm text-neutral-600 text-center md:text-center">
                      {price ? `Ksh ${price.toLocaleString()}` : "Price on request"}
                    </p>

                    {/* Add to cart */}
                    <div className="flex justify-center">
                      <button
                        onClick={() => addToCart(item)}
                        className="font-mono text-[10px] tracking-[0.14em] uppercase bg-neutral-900 text-white px-4 py-2 hover:bg-neutral-600 active:scale-95 transition-all duration-150 cursor-pointer w-full md:w-auto text-center"
                        aria-label={`Add ${item.name} to cart`}
                      >
                        Add to Cart
                      </button>
                    </div>

                    {/* Remove from wishlist */}
                    <button
                      onClick={() => removeFromWishlist(item._id || item.id)}
                      className="flex items-center gap-1.5 text-[9px] tracking-widest uppercase text-neutral-300 hover:text-red-400 transition-colors justify-self-start md:justify-self-center"
                      aria-label={`Remove ${item.name} from wishlist`}
                    >
                      <HeartFilledIcon />
                      <span>Remove</span>
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── Footer actions ── */}
            <div className="mt-12 border-t border-neutral-200 pt-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <p className="text-[10px] tracking-widest uppercase text-neutral-400">
                {wishlist.length} saved work{wishlist.length !== 1 ? "s" : ""}
              </p>
              <div className="flex gap-6 items-center">
                <button
                  onClick={() => wishlist.forEach((item) => addToCart(item))}
                  className="font-mono text-[10px] tracking-[0.14em] uppercase bg-neutral-900 text-white px-6 py-3 hover:bg-neutral-600 active:scale-95 transition-all duration-150 cursor-pointer"
                >
                  Add All to Cart
                </button>
                <Link
                  to="/artworks"
                  className="text-[10px] tracking-[0.18em] uppercase border-b border-neutral-400 text-neutral-400 hover:text-neutral-800 hover:border-neutral-800 transition-colors pb-0.5"
                >
                  Continue Browsing
                </Link>
              </div>
            </div>
          </>
        )}
      </main>

      <Footer />
    </>
  );
};

export default Wishlist;