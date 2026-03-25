// import { useContext, useEffect, useState } from 'react'
// import React from 'react'
// import { CartContext } from '../../Context/Context'
// import { Link, useParams } from 'react-router-dom'


// const Collectionlist = () => {
//     const { id } = useParams()
//     const [data, setData] = useState(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState(null)

//     useEffect(() => {
//         const fetchCollectible = async () => {
//           try {
//             const res = await fetch(`https://unix.up.railway.app/api/art/${id}`)
//             if (!res.ok) throw new Error(`Error: ${res.status}`)
//             const result = await res.json()
//             setData(result)
//           } catch (err) {
//             setError(err.message)
//           } finally {
//             setLoading(false)
//           }
//         }
//         fetchCollectible()
//       }, [id])

// const numericPrice = Number(String(data.price).replace("$", ""))
//   const fee = 0.05 * numericPrice
//   const total = fee + numericPrice

//     const {
//         cart,
//         removeFromCart,
//         updateCartQuantity,
//         clearCart,
//         getCartTotal,
//         getTotalItems
//     } = useContext(CartContext)

//     const handleQuantityChange = (itemId, newQuantity) => {
//         if (newQuantity < 1) return;
//         updateCartQuantity(itemId, newQuantity)
//     }

//   return (
//     <div>
//         <div className='flex justify-evenly items-center font-[500] text-[19px] tracking-[1px] mt-20'>
//         <div>Favorite collections</div>
//         <div>Title</div>
//         <div>Price</div>
//         <div>Quantity</div>
//         <div>Total</div>
//         <div>Remove</div>
//         </div>
//         {cart.length === 0 ? (
//             <div>Your collections are empty?</div>
//         ) : (
//             cart.map((item) => (
//                 <div key={item._id || item.id} className='flex justify-evenly items-center border-b py-4'>
//                     <div className='flex items-center'>
//                         <img src={item.imageUrl ||  item.image} alt={item.name} className='w-12 h-12 object-cover mr-4'/>
//                         <span>{item.name}</span>
//                     </div>
//                     <span>Ksh {item.price !== undefined ? item.price : item.new_price}</span>
//                     <div className='flex items-center'>
//                         <button
//                         onClick={() => handleQuantityChange(item._id || item.id, item.quantity - 1 )}
//                         className='px-2 py-1 bg-gray-200 rounded-l hover:bg-gray-30 '
//                         aria-label='Decrease quantiy'
//                         >-</button>
//                         <input type="number"
//                         min="1"
//                         value={item.quantity}
//                         onChange={e => handleQuantityChange(item._id || item.id, Number(e.target.value))}
//                          />
//                          <button
//                          onClick={() => handleQuantityChange(item._id || item.id, item.quantity + 1)}
//                          className='px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-30'
//                          aria-label='Increase quantity'
//                          >+</button>
//                     </div>
//                     <span>Ksh {(item.price !== undefined ? item.price : item.new_price) * item.quantity}</span>
//                     <button
//                     onClick={() => removeFromCart(item._id || item.id)}
//                     className='text-red-500'
//                     >Remove</button>
//                 </div>
//             ))
//         )}
//         {cart.length > 0 && (
//             <div className='flex justify-end mt-8 gap-4 items-center'>
//                 <span className='font-bold'>Total Collections: {getTotalItems()}</span>
//                 <span>Price of collections: ksh {getCartTotal()}</span>
//                 <button onClick={clearCart} className='bg-red-500 text-white px-4 py-2 rounded'>Clear Cart</button>
//             </div>
//         )}
//         <div className="text-center">
//                     <Link
//                       to={`/paystack-redirect/?id=${id}`}
//                       //to={`/paystack-redirect`}
//                       className="inline-block bg-red-500 text-white px-6 py-3 rounded-lg text-lg font-medium hover:bg-red-600 transition mt-8"
//                     >
//                       Check Out
//                     </Link>
//                   </div>
//     </div>
//   )
// }

// export default Collectionlist
/////////////////////////////////////////////////
import { useContext, useState } from "react";
import React from "react";
import { CartContext } from "../../Context/Context";
import { Link } from "react-router-dom";

const Collectionlist = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    clearCart,
    getCartTotal,
    getTotalItems,
  } = useContext(CartContext);

  const [confirmClear, setConfirmClear] = useState(false);

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateCartQuantity(itemId, newQuantity);
  };

  // FIX: price parsed safely per-item, not from a null data object
  const getItemPrice = (item) =>
    Number(String(item.price ?? item.new_price ?? 0).replace(/[^0-9.]/g, ""));

  const cartTotal = getCartTotal();

  // FIX: fee + total computed from cart total, not from a missing data object
  const fee = parseFloat((0.05 * cartTotal).toFixed(2));
  const grandTotal = parseFloat((cartTotal + fee).toFixed(2));

  return (
    <>
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
            Your Selection
          </p>
          <h1
            className="text-5xl sm:text-6xl font-light tracking-tight text-neutral-900 mb-5"
            style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
          >
            Collection Cart
          </h1>
          <div className="w-10 h-px bg-neutral-800 mx-auto mb-4" />
          <p className="text-[11px] tracking-widest text-neutral-400 uppercase">
            {getTotalItems()} item{getTotalItems() !== 1 ? "s" : ""} selected
          </p>
        </header>

        {cart.length === 0 ? (
          /* ── Empty state ── */
          <div className="flex flex-col items-center justify-center py-32 gap-6">
            <p
              className="text-3xl font-light text-neutral-300 tracking-tight"
              style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
            >
              Your cart is empty.
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
            {/* ── Column headers ── */}
            <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 text-[9px] tracking-[0.2em] uppercase text-neutral-400 border-b border-neutral-200 pb-3 mb-2">
              <span>Work</span>
              <span className="text-center">Price</span>
              <span className="text-center">Quantity</span>
              <span className="text-center">Subtotal</span>
              <span />
            </div>

            {/* ── Cart rows ── */}
            <div className="divide-y divide-neutral-100">
              {cart.map((item, i) => {
                const price = getItemPrice(item);
                const subtotal = price * item.quantity;

                return (
                  <div
                    key={item._id || item.id}
                    className="row-in grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr_auto] gap-4 items-center py-6"
                    style={{ animationDelay: `${i * 0.06}s` }}
                  >
                    {/* Artwork info */}
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden bg-neutral-100">
                        <img
                          src={item.imageUrl || item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p
                          className="text-sm font-medium text-neutral-900 leading-tight"
                          style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "1rem" }}
                        >
                          {item.name}
                        </p>
                        {item.author && (
                          <p className="text-[10px] text-neutral-400 italic mt-0.5">
                            {item.author}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Price */}
                    <p className="text-sm text-neutral-600 text-center">
                      Ksh {price.toLocaleString()}
                    </p>

                    {/* Quantity */}
                    <div className="flex items-center justify-center">
                      <div className="flex items-center border border-neutral-200">
                        <button
                          onClick={() =>
                            handleQuantityChange(  //noted
                              item._id || item.id,
                              item.quantity - 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors text-lg leading-none"
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) =>
                            handleQuantityChange(
                              item._id || item.id,
                              Number(e.target.value)
                            )
                          }
                          className="w-10 h-8 text-center text-sm text-neutral-900 bg-transparent outline-none border-x border-neutral-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          onClick={() =>
                            handleQuantityChange(
                              item._id || item.id,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors text-lg leading-none"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <p className="text-sm font-medium text-neutral-900 text-center">
                      Ksh {subtotal.toLocaleString()}
                    </p>

                    {/* Remove */}
                    <button
                      onClick={() => removeFromCart(item._id || item.id)}
                      className="text-[9px] tracking-widest uppercase text-neutral-300 hover:text-red-400 transition-colors justify-self-end md:justify-self-center"
                      aria-label={`Remove ${item.name}`}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>

            {/* ── Order summary ── */}
            <div className="mt-12 flex flex-col md:flex-row justify-between gap-10 border-t border-neutral-200 pt-10">

              {/* Clear cart */}
              <div className="flex items-start">
                {!confirmClear ? (
                  <button
                    onClick={() => setConfirmClear(true)}
                    className="text-[9px] tracking-widest uppercase text-neutral-300 hover:text-red-400 transition-colors border-b border-transparent hover:border-red-300 pb-0.5"
                  >
                    Clear cart
                  </button>
                ) : (
                  <div className="flex items-center gap-4">
                    <span className="text-[9px] tracking-widest uppercase text-neutral-500">
                      Are you sure?
                    </span>
                    <button
                      onClick={() => { clearCart(); setConfirmClear(false); }}
                      className="text-[9px] tracking-widest uppercase text-red-500 hover:text-red-700 transition-colors"
                    >
                      Yes, clear
                    </button>
                    <button
                      onClick={() => setConfirmClear(false)}
                      className="text-[9px] tracking-widest uppercase text-neutral-400 hover:text-neutral-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>

              {/* Totals + checkout */}
              <div className="flex flex-col gap-3 min-w-[280px]">
                <div className="flex justify-between text-xs text-neutral-500 tracking-widest uppercase">
                  <span>Subtotal</span>
                  <span>Ksh {cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs text-neutral-400 tracking-widest uppercase">
                  <span>Platform fee (5%)</span>
                  <span>Ksh {fee.toLocaleString()}</span>
                </div>
                <div className="w-full h-px bg-neutral-200 my-1" />
                <div
                  className="flex justify-between text-base text-neutral-900 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', Georgia, serif" }}
                >
                  <span className="uppercase tracking-widest text-xs font-mono text-neutral-700">
                    Total
                  </span>
                  <span className="text-xl font-medium">
                    Ksh {grandTotal.toLocaleString()}
                  </span>
                </div>

                {/* FIX: checkout no longer depends on a stale/undefined `id` from useParams */}
                <Link
                  to={`/paystack-redirect2?total=${grandTotal}&items=${encodeURIComponent(JSON.stringify(cart.map(i => ({ artId: i._id || i.id, quantity: i.quantity }))))}`}
                  className="mt-4 w-full text-center bg-neutral-900 text-white text-[10px] tracking-[0.18em] uppercase py-4 hover:bg-neutral-700 active:scale-[0.98] transition-all duration-150"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
};

export default Collectionlist;