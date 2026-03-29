
// import React, { useEffect, useState } from 'react'
// import { useParams, Link } from 'react-router-dom'
// import Navbar from '../../Pages/Navbar'

// const Cardo = () => {
//   const { id } = useParams()
//   const [item, setItem] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchArt = async () => {
//       try {
//         const res = await fetch(`https://unix.up.railway.app/api/art/${id}`)
//         if (!res.ok) throw new Error(`Error: ${res.status}`)
//         const data = await res.json()
//         setItem(data)
//       } catch (err) {
//         setError(err.message)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchArt()
//   }, [id])

//   if (loading) return <h1>Loading...</h1>
//   if (error) return <h1>{error}</h1>
//   if (!item) return <h1>Item not found</h1>

//   return (
//     <>
//       <Navbar />
//       <div className='mt-24'>
//         <div className='flex max-h-[400px] '>
//           <div className='w-full h-96 m-4'>
//             <img
//               src={item.image}
//               alt={item.name}
//               className='w-full h-full object-cover'
//             />
//             <div className='flex text-sm gap-3'>
//               <p>Likes ❤️</p>
//               <Link to="/">View in room</Link>
//               <Link to="/">Share</Link>
//             </div>
//             <p>About the Art</p>
//             <p className='font-mono text-xl tracking-[1px]'>
//               {item.description}
//             </p>
//           </div>
//           <div className='w-full flex flex-col gap-8 text-center'>
//             <p className='font-light text-black text-xl'>{item.name}</p>
//             <p className='text-2xl text-gray-500 '>By {item.inventor}</p>
//             <p className='text-xl text-gray font-mono'>Size: {item.size}</p>
//             <p className='text-xl text-gray font-mono'>Price: {item.price}</p>
//             <div className='flex justify-around'>
//               <Link
//               to={`/artworkscard/${item._id}`}
//               className='text-white bg-black rounded p-4 text-xl mr-5 ml-5 hover:bg-[#535353]'
//             >
//               Buy Now
//             </Link>
//             <Link to={`/collections`} className='text-white bg-black rounded p-4 text-xl mr-5 ml-5 hover:bg-[#535353]'>
//             Continue with cart Collections
//             </Link>
//             </div>
//             <div>
//               <h1>Contact sellers for more inquiry to this works?</h1>
//               <div className='flex justify-center gap-3'>
//                   <a href="https://wa.me/in/0790630415">WhatSApp</a>
//                   <a href="tel:+254790630415">Telephone</a>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   )
// }

// export default Cardo
//////////////////////////////////////////////////////

import React, { useContext, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Navbar from '../../Pages/Navbar'
import { CartContext } from '../../Context/Context'

const HeartIcon = ({ filled }) => (
  <svg width="16" height="16" viewBox="0 0 24 24"
    fill={filled ? "#e63946" : "none"}
    stroke={filled ? "#e63946" : "#888"}
    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
)

const Cardo = () => {
  const { id } = useParams()
  const { addToCart, toggleWishlist, isWishlisted } = useContext(CartContext)
  const [item, setItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  // FIX: track added-to-cart feedback locally
  const [addedToCart, setAddedToCart] = useState(false)

  useEffect(() => {
    const fetchArt = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/art/${id}`)
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        const data = await res.json()
        setItem(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchArt()
  }, [id])

  const handleAddToCart = () => {
    addToCart(item)
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2500)
  }

  // ── Loading ──
  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#fafaf8]">
          <div className="flex gap-2">
            {[0, 1, 2].map((i) => (
              <span key={i} className="w-2 h-2 rounded-full bg-neutral-800 animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </div>
        </div>
      </>
    )
  }

  // ── Error ──
  if (error || !item) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-[#fafaf8]">
          <p className="font-mono text-xs tracking-widest text-red-500 uppercase">
            {error || "Item not found"}
          </p>
        </div>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Mono:wght@300;400&display=swap');

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-delay { animation: fadeUp 0.5s ease 0.15s both; }
      `}</style>

      <main className="min-h-screen bg-[#fafaf8] pt-28 pb-24 px-6 sm:px-10 lg:px-20 max-w-screen-xl mx-auto"
        style={{ fontFamily: "'DM Mono', monospace" }}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left: image + meta ── */}
          <div className="fade-up flex flex-col gap-5">
            {/* Image */}
            <div className="relative overflow-hidden bg-neutral-100 w-full"
              style={{ paddingBottom: "110%" }}>
              <img
                src={item.image}
                alt={item.name}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            {/* Actions row under image */}
            <div className="flex items-center gap-6 text-[10px] tracking-[0.18em] uppercase text-neutral-400">
              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(item)}
                className={`flex items-center gap-1.5 transition-colors cursor-pointer
                  ${isWishlisted(item) ? "text-red-400" : "hover:text-neutral-700"}`}
                aria-label={isWishlisted(item) ? "Remove from saved" : "Save"}
              >
                <HeartIcon filled={isWishlisted(item)} />
                <span>{isWishlisted(item) ? "Saved" : "Save"}</span>
              </button>

              <div className="w-px h-3 bg-neutral-200" />

              {/* FIX: "View in room" and "Share" were dead links — kept as placeholders with correct styling */}
              <button className="hover:text-neutral-700 transition-colors cursor-pointer">
                View in Room
              </button>
              <div className="w-px h-3 bg-neutral-200" />
              <button
                onClick={() => navigator.share?.({picture: item.image, title: item.name, url: window.location.href })}
                className="hover:text-neutral-700 transition-colors cursor-pointer"
              >
                Share
              </button>
            </div>

            {/* About */}
            {item.description && (
              <div className="border-t border-neutral-200 pt-5">
                <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-3">
                  About the Work.
                </p>
                <p className="text-sm text-neutral-600 leading-relaxed"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}>
                  {item.description}
                </p>
              </div>
            )}
          </div>

          {/* ── Right: details + actions ── */}
          <div className="fade-up-delay flex flex-col gap-8 lg:sticky lg:top-28">

            {/* Title block */}
            <div>
              <p className="text-[10px] tracking-[0.25em] uppercase text-neutral-400 mb-3">
                {item.type || "Invention"}
              </p>
              <h1
                className="text-4xl sm:text-5xl font-light tracking-tight text-neutral-900 mb-4 leading-tight"
                style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
              >
                {item.name}
              </h1>
              {/* FIX: show inventor OR author depending on which field exists */}
              {(item.inventor || item.author) && (
                <p className="text-sm text-neutral-500 italic">
                  By {item.inventor || item.author}
                </p>
              )}
            </div>

            <div className="w-full h-px bg-neutral-200" />

            {/* Details */}
            <div className="flex flex-col gap-3">
              {item.size && (
                <div className="flex justify-between text-xs tracking-widest uppercase">
                  <span className="text-neutral-400">Size</span>
                  <span className="text-neutral-700">{item.size}</span>
                </div>
              )}
              {item.type && (
                <div className="flex justify-between text-xs tracking-widest uppercase">
                  <span className="text-neutral-400">Type</span>
                  <span className="text-neutral-700">{item.type}</span>
                </div>
              )}
              <div className="flex justify-between items-baseline">
                <span className="text-[10px] tracking-widest uppercase text-neutral-400">Price</span>
                <span
                  className="text-2xl font-medium text-neutral-900"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  {item.price || "Price on request"}
                </span>
              </div>
            </div>

            <div className="w-full h-px bg-neutral-200" />

            {/* CTAs */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAddToCart}
                className={`w-full py-4 font-mono text-[10px] tracking-[0.18em] uppercase transition-all duration-200 active:scale-[0.98] cursor-pointer
                  ${addedToCart
                    ? "bg-neutral-500 text-white"
                    : "bg-neutral-900 text-white hover:bg-neutral-700"
                  }`}
              >
                {addedToCart ? "✓ Added to Cart" : "Add to Cart"}
              </button>

              <Link
                to={`/paystack-redirect?id=${item._id}`} //can be modified?
                className="w-full py-4 font-mono text-[10px] tracking-[0.18em] uppercase text-center border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white transition-all duration-200 active:scale-[0.98]"
              >
                Buy Now
              </Link>

              <Link
                to="/collections"
                className="w-full py-3 font-mono text-[10px] tracking-[0.18em] uppercase text-center text-neutral-400 hover:text-neutral-700 transition-colors border-b border-transparent hover:border-neutral-300 pb-0.5 text-center"
              >
                View Cart Collections →
              </Link>
            </div>

            <div className="w-full h-px bg-neutral-200" />

            {/* Contact */}
            <div>
              <p className="text-[9px] tracking-[0.2em] uppercase text-neutral-400 mb-4">
                Inquire about this work
              </p>
              <div className="flex gap-4">
                {/* FIX: WhatsApp href corrected — was "/in/number", should be just the number */}
                <a
                  href="https://wa.me/254798878676"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase border border-neutral-200 px-4 py-2.5 text-neutral-600 hover:border-neutral-800 hover:text-neutral-900 transition-all"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  WhatsApp
                </a>
                <a
                  href="tel:+254798878676"
                  className="flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase border border-neutral-200 px-4 py-2.5 text-neutral-600 hover:border-neutral-800 hover:text-neutral-900 transition-all"
                >
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8 19.79 19.79 0 01.07 1.18 2 2 0 012.03 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                  Call Now.
                </a>
              </div>
            </div>

          </div>
        </div>
      </main>
    </>
  )
}

export default Cardo