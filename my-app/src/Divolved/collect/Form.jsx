

import React, {useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Form = () => {
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
      username: "",
      phone: "",
      address: "",
      country: "",
      city: "",
      postalCode: "",
    })

    const handleSubmit = async(e) => {
    e.preventDefault()
    // if (!form.address || !form.city || !form.country || !form.phone || !form.username || !form.postalCode) {
    //   setError("All fields are required to continue with payment!")
    //   setSuccess(false)
    //   return
    // }
    // setError("")
    // setSuccess(false)

    const formData = new FormData()
    formData.append("username", form.username)
    formData.append("phone", form.phone)
    formData.append("address", form.address)
    formData.append("country", form.country)
    formData.append("city", form.city)
    formData.append("postalCode", form.postalCode)

    try{
      const token = await getAccessTokenSilently({
        authorizationParams: {
          audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        },
      });
      const res = await fetch("http://localhost:3000/personal_details",{
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`},
      body: formData
    })
    if(res.ok) 
    setSuccess(true)
    setForm({
      username: form.username,
      phone: form.phone,
      address: form.address,
      country: form.country,
      city: form.city,
      postalCode: form.postalCode
    })

    } catch (err) {
      setError("Error sending your payment details...")
      console.error(err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    handleSubmit()
  },[])


  return (
    <div>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col'>
            <div className='flex justify-between'>
              <input type="text"
              placeholder='username...'
              onChange={(e)=> setForm(e.target.value)}
              value={form.username}
              />
              <input type="phone"
              placeholder='Enter phone no.'
              onChange={(e) => setForm(e.target.value)}
              value={form.phone}
              />
            </div>
            <div className='flex justify-between'>
              <input type="text"
              placeholder='Enter your local address...'
              onChange={(e) => setForm(e.target.value)}
              value={form.address}
              required
              />
              <input type="text"
              placeholder='Postal code / Zip code'
              onChange={(e) => setForm(e.target.value)}
              value={form.postalCode}
              />
            </div>
            <div className='flex justify-between'>
              <input type="text"
              placeholder='Enter country of residence'
              onChange={(e) => setForm(e.target.value)}
              value={form.country}
              />
              <input type="text"
              placeholder='Enter your current city / region'
              onChange={(e) => setForm(e.target.value)}
              value={form.city}
              />
            </div>
            
          </div>
          {error ? <p className='text-red-500 text-sm'>{error}</p> : null}
          {success && <p className='text-green-300 font-light text-sm'>Payment details set successfully</p>}
          <button type="submit" className='bg-[#d8d7d7] text-[#332f75]'>{success ? <p className=''>Sent</p> : <p>Send</p>}</button>
        </form>
    </div>
  )
}

export default Form

/////////////////////////////////////////////////////////////////
// const handleChange = (e) => {
//   const {name, type, files, value} = e.target;
//   if (type === "file") {
//     setForm({...form, image: files[0]})
//     setImagePreview(files[0] ? URL.createObjectURL(files[0]) : null)
//   } else {
//     setForm({...form, [name] : value})
//   }
// }

// const logout = () => {
//   const navigate = useNavigate()
//   useEffect(() => {
//     localStorage.removeItem("token")
//     navigate("/login")
//   },[navigate])
//   return null
// }

{/* <span>{t.type === "error" ? "✗" : t.type === "warn" ? "⚠" : "✓"}</span> */}

{/* <Btn onClick={() => { onClose(); onEdit(item); }}></Btn> */}

        // const token = await getAccessTokenSilently();

        // // 1. Sync user with backend
        // await axios.post(
        //   `${import.meta.env.VITE_API_BASE_URL}/api/users/users`,
        //   {
        //     auth0Id: user.sub,
        //     email: user.email,
        //     username: user.nickname,
        //   },
        //   { headers: { Authorization: `Bearer ${token}` } }
        // );




  // const copyShareLink = () => {
  //   if (!shareUrl) {
  //     alert("Please set a username first to get your shareable link");
  //     return;
  //   }
  //   navigator.clipboard.writeText(shareUrl);
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 2000);
  // };

    // if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    //   setError("Username can only contain letters, numbers, and underscores");
    //   setSavingUsername(false);
    //   return;
    // }


          // const res = await axios.put(
          //   `${import.meta.env.VITE_API_BASE_URL}/api/users/username`,
          //   { username: username.trim(), auth0Id: user.sub },
          //   {
          //     headers: { Authorization: `Bearer ${token}` },
          //   }
          // ); user-> has many attributes (payload)


            // <label className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
            //   {uploadingAvatar ? "Uploading..." : "Change Avatar"}
            //   <input
            //     type="file"
            //     accept="image/*"
            //     onChange={handleAvatarChange}
            //     className="hidden"
            //     disabled={uploadingAvatar}
            //   />
            // </label>

          // {!editingUsername && (
          //   <button
          //     onClick={() => setEditingUsername(true)}
          //     className="text-blue-600 hover:text-blue-700 text-sm"
          //   >
          //     Edit
          //   </button>
          // )}

          // <button
          //   onClick={() => {
          //     setUsername(profile?.username || user.nickname || "");
          //     setEditingUsername(false);
          //     setError("");
          //   }}
          //   className="px-3 py-1 text-gray-600 border rounded hover:bg-gray-50"
          //   disabled={savingUsername}
          // >
          //   Cancel
          // </button>

        // <button
        //   onClick={saveUsername}
        //   className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        //   disabled={savingUsername}
        // >
        //   {savingUsername ? "Saving..." : "Save"}
        // </button>

        //Access token is gotten anytime data is being parsed
/////////////////////////////////////////////////////////////
  //   const saveBio = async () => {
  //   setSavingBio(true);
  //   setError("");

  //   try {
  //     const token = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  //       },
  //     });

  //     const res = await axios.put(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/users/bio`,
  //       { bio, auth0Id: user.sub },
  //       {
  //         headers: { Authorization: `Bearer ${token}` },
  //       }
  //     );

  //     setProfile(res.data.user);
  //     setEditingBio(false);
  //     alert("Bio updated successfully! ✅");
  //   } catch (err) {
  //     console.error("❌ Error updating bio:", err);
  //     setError(err.response?.data?.message || "Failed to update bio");
  //   } finally {
  //     setSavingBio(false);
  //   }
  // };
///////////////////////////////////////////////////////////
//   <input
//   type="file"
//   accept="image/*"
//   onChange={handleAvatarChange}
//   className="hidden"
//   disabled={uploadingAvatar} </>
// />
////////////////////////

    // <input
    //   type="text"
    //   value={shareUrl}
    //   readOnly
    //   className="flex-1 px-3 py-2 border rounded bg-gray-50 text-sm font-mono"
    //   onClick={(e) => e.target.select()}
    // />
    // <button
    //   onClick={copyShareLink}
    //   className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition font-medium"
    // >
    //   {copied ? "✓ Copied!" : "Copy"}
    // </button>

//////////////////////////////////////////////////////
  //   const handleRemove = async id => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/products/${id}`, {
  //       method: 'DELETE'
  //     })
  //     if (res.ok) {
  //       setSuccess('Product removed.')
  //       setProducts(products.filter(p => p._id !== id))
  //     } else {
  //       setError('Failed to remove product.')
  //     }
  //   } catch {
  //     setError('Server error.')
  //   }
  // }

/////////////////////////////////////////////////////////////
  // <select
  //   id="category"
  //   name="category"
  //   value={form.category}
  //   onChange={handleChange}
  //   className="block w-full m-1 border rounded px-2 py-1"
  // >
  //   <option value="">-- Select a category --</option>
  //   <option value="phones">Phones</option>
  //   <option value="crockery">Crockery</option>
  //   <option value="foods">Foods</option>
  //   <option value="clothing">Clothing</option>
  //   <option value="footwear">Footwear</option>
  //   <option value="accessories">Accessories</option>
  //   <option value="beauty">Beauty</option>
  //   <option value="sports">Sports</option>
  //   <option value="machines">Machines</option>
  //   <option value="drinks">Drinks</option>
  //   <option value="others">Others</option>
  // </select>
//////////////////////////////////////////////////////////////////
// const Tradeacc = () => {
//   const [currentImage, setCurrentImage] = useState(0)

//   const Images = [bike, Coke, ferari, redcar]
//   useEffect(()=> {
//     const interval = setInterval(()=>{
//       setCurrentImage((prev) =>(prev + 1) % Images.length)
//     },8000)
//     return () => clearInterval(interval)
// },[])
// <img src={Images[currentImage]} alt={null} 
////////////////////////////////////////////////////////////////

// const handleContact = () => {
//   if (!isAuthenticated) {
//     // Save intended action and redirect to login
//     sessionStorage.setItem("returnTo", `/messages?userId=${creatorId}&artworkId=${artworkId}`);
//     loginWithRedirect();
//     return;
//   }

//   // Navigate to messages with pre-filled recipient
//   navigate(`/messages?userId=${creatorId}&artworkId=${artworkId}`);
// };

//  const creatorArtworks = artworksRes.data.filter(
//         (art) => art.auth0Id === foundCreator.auth0Id
//   );

// const hasArtwork = creatorArtworks.some(
//   (art) => art.type && art.type.toLowerCase() !== "invention"
// )

  // let creatorType = "artist";
  // if (hasInvention && hasArtwork) {
  //   creatorType = "both";
  // } else if (hasInvention) {
  //   creatorType = "inventor";
  // }

//   setCreator({
//       ...foundCreator,
//       creatorType,
//       followerCount: foundCreator.followers ? foundCreator.followers.length : 0,
//       followingCount: foundCreator.following ? foundCreator.following.length : 0,
//     });
//     setArtworks(creatorArtworks);
//   } catch (err) {
//     console.error("Error fetching creator:", err);
//     setError("Failed to load creator profile");
//   } finally {
//     setLoading(false);
//   }
// };

  // const checkFollowStatus = async () => {
  //   try {
  //     const token = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  //       },
  //     });

  //     const res = await axios.get(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/users/follow/status/${creator.auth0Id}`,
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     setIsFollowing(res.data.isFollowing);
  //   } catch (err) {
  //     console.error("Error checking follow status:", err);
  //   }
  // };

  //   <button
  //   onClick={copyShareLink}
  //   className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium flex items-center gap-2"
  // >
  //   {copied ? (
  //     <>
  //       ✓ Copied!
  //     </>
  //   ) : (
  //     <>
  //       🔗 Share Profile
  //     </>
  //   )}
  // </button>

// to={
//                 artwork.type?.toLowerCase() === "invention"
//                   ? `/inventioncard/${artwork._id}`
//                   : `/artworks/${artwork._id}`
//               }

// {artwork.size && <p className="truncate">Size: {artwork.size}</p>}
// setMessages((prev) => [...prev, res.data.message]);
      // setNewMessage("");
      // key={conv.user.auth0Id}
// {selectedConversation.user.username?.[0].toUpperCase() || "?"}
  //  {typing && (
  //   <p className="text-xs text-gray-500">typing...</p>
  //     )}
    // <p className={`text-xs mt-1 ${
    //       msg.senderId === user.sub ? "text-blue-100" : "text-gray-500"
    //     }`}>
    // {new Date(msg.createdAt).toLocaleTimeString([], {
    //   hour: "2-digit",
    //   minute: "2-digit",
    // })}
    // <input
    //                 type="text"
    //                 value={newMessage}
    //                 onChange={(e) => {
    //                   setNewMessage(e.target.value);
    //                   handleTyping();
    //                 }}
    //                 placeholder="Type a message..."
    //                 className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    //                 disabled={sending}
    //               />
///////////////////////////////////
//     const userKey = (userId, key) => (userId ? `user_${userId}:${key}` : key);

// const loadFromStorage = (userId, key, fallback) => {
//   try {
//     const stored = localStorage.getItem(userKey(userId, key));
//     return stored ? JSON.parse(stored) : fallback;
//   } catch {
//     return fallback;
//   }
// };

// const saveToStorage = (userId, key, value) => {
//   try {
//     localStorage.setItem(userKey(userId, key), JSON.stringify(value));
//   } catch (e) {
//     console.warn(`Failed to save "${key}" to localStorage:`, e);
//   }
// };
//////////////////////////////////


  // // ✅ useAuth0 called INSIDE the component
  // const { user } = useAuth0();
  // const userId = user?.sub; // Auth0 unique ID e.g. "auth0|64f3abc..."

  // const [cart, setCart] = useState([]);
  // const [wishlist, setWishlist] = useState([]);
//////////////////////////////////////////////////
  // // ✅ Load the correct user's data whenever userId becomes available or changes
  // useEffect(() => {
  //   setCart(loadFromStorage(userId, "cart", []));
  //   setWishlist(loadFromStorage(userId, "wishlist", []));
  // }, [userId]);

  // // ✅ Persist cart scoped to this user
  // useEffect(() => {
  //   saveToStorage(userId, "cart", cart);
  // }, [cart, userId]);

  // // ✅ Persist wishlist scoped to this user
  // useEffect(() => {
  //   saveToStorage(userId, "wishlist", wishlist);
  // }, [wishlist, userId]);
  ///////////////////////////////////////////////////////

  // const addToCart = (product) => {
  //   setCart((prev) => {
  //     const existing = prev.find((item) => getId(item) === getId(product));
  //     if (existing) {
  //       return prev.map((item) =>
  //         getId(item) === getId(product)
  //           ? { ...item, quantity: item.quantity + 1 }
  //           : item
  //       );
  //     }
  //     return [...prev, { ...product, quantity: 1 }];
  //   });
  // };

/////////////////////////////////////////////////

//   const getCartTotal = () =>
//     cart.reduce(
//       (total, item) =>
//         total +
//         (item.price !== undefined ? item.price : item.new_price) * item.quantity,
//       0
//     );

//     const cartPayload = () => { ///added
//       const { id } = useParams()

//     }

//   // ── Wishlist actions ──────────────────────────────────────────────────────

//   const toggleWishlist = (item) => {
//     setWishlist((prev) => {
//       const exists = prev.find((w) => getId(w) === getId(item));
//       return exists
//         ? prev.filter((w) => getId(w) !== getId(item))
//         : [...prev, item];
//     });
//   };

//   const isWishlisted = (item) => wishlist.some((w) => getId(w) === getId(item));

//   const removeFromWishlist = (id) =>
//     setWishlist((prev) => prev.filter((w) => getId(w) !== id));

//   const getTotalWish = () =>
//     wishlist.reduce((total, item) => total + (item.quantity || 1), 0);

//   return (
//     <CartContext.Provider
//       value={{
//         cart,
//         addToCart,
//         removeFromCart,
//         clearCart,
//         updateQuantity,
//         getTotalItems,
//         getCartTotal,
//         wishlist,
//         toggleWishlist,
//         isWishlisted,
//         removeFromWishlist,
//         getTotalWish,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// };
///////////////////////////////////
//   const { id } = useParams();
//  const res = await fetch(`https://unix.up.railway.app/api/art/${id}`);
//////////////////////////////////
// // if (loading) return <h1>Loading...</h1>
// // if (error) return <h1>{error}</h1>
//const numericPrice = Number(String(data.price).replace("$", ""))
//     const { id } = useParams()
//     const inventionItem = invention.find(i=> i.id === Number((id)))
///////////////////////////////////
  // const handleAddToCart = () => {
  //   addToCart(item)
  //   setAddedToCart(true)
  //   setTimeout(() => setAddedToCart(false), 2500)
  // }
//////////////////////////////
//  {[0, 1, 2].map((i) => (
//     <span key={i} className="w-2 h-2 rounded-full bg-neutral-800 animate-bounce"
//       style={{ animationDelay: `${i * 0.15}s` }} />
//   ))}
///////////////////////
  // if (error || !item) {
  //   return (
  //     <>
  //       <Navbar />
  //       <div className="flex items-center justify-center min-h-screen bg-[#fafaf8]">
  //         <p className="font-mono text-xs tracking-widest text-red-500 uppercase">
  //           {error || "Item not found"}
  //         </p>
  //       </div>
  //     </>
  //   )
  // }
/////////////////////
  // <button
  //   onClick={() => toggleWishlist(item)}
  //   className={`flex items-center gap-1.5 transition-colors cursor-pointer
  //     ${isWishlisted(item) ? "text-red-400" : "hover:text-neutral-700"}`}
  //   aria-label={isWishlisted(item) ? "Remove from saved" : "Save"}
  // >
  //   <HeartIcon filled={isWishlisted(item)} />
  //   <span>{isWishlisted(item) ? "Saved" : "Save"}</span>
  // </button>
//////////////////////
  // <button
  //   onClick={() => navigator.share?.({picture: item.image, title: item.name, url: window.location.href })}
  //   className="hover:text-neutral-700 transition-colors cursor-pointer"
  // >
  //   Share
  // </button>

  // {(item.inventor || item.author) && (
  //   <p className="text-sm text-neutral-500 italic">
  //     By {item.inventor || item.author}
  //   </p>
/////////////////////////////////////////////////////
      // {item.type && (
      //   <div className="flex justify-between text-xs tracking-widest uppercase">
      //     <span className="text-neutral-400">Type</span>
      //     <span className="text-neutral-700">{item.type}</span>
      //   </div>
      // )}
///////      
//--> to={`/paystack-redirect?id=${item._id}`} needs to be modified?
///////
//  const getItemPrice = (item) =>
//     Number(String(item.price ?? item.new_price ?? 0).replace(/[^0-9.]/g, ""));
///////
  // const fee = parseFloat((0.05 * cartTotal).toFixed(2));
  // const grandTotal = parseFloat((cartTotal + fee).toFixed(2));
///////
  // <button
  //   onClick={() =>
  //     handleQuantityChange(
  //       item._id || item.id,
  //       item.quantity - 1
  //     )
  //   }
  //   className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors text-lg leading-none"
  //   aria-label="Decrease quantity"
  // >
  //   −
  // </button>
////////
//  <input
//     type="number"
//     min="1"
//     value={item.quantity}
//     onChange={(e) =>
//       handleQuantityChange(
//         item._id || item.id,
//         Number(e.target.value)
//       )
//     }
/////////
  // <button
  //   onClick={() =>
  //     handleQuantityChange(
  //       item._id || item.id,
  //       item.quantity + 1
  //     )
  //   }
  //   className="w-8 h-8 flex items-center justify-center text-neutral-500 hover:bg-neutral-100 transition-colors text-lg leading-none"
  //   aria-label="Increase quantity"
  // >
  //   +
  // </button>
/////////
//  <button
//   onClick={() => removeFromCart(item._id || item.id)}
//   className="text-[9px] tracking-widest uppercase text-neutral-300 hover:text-red-400 transition-colors justify-self-end md:justify-self-center"
//   aria-label={`Remove ${item.name}`}
// >
//   Remove
// </button>
/////////////
  // <Link
  //   to={`/paystack-redirect2?total=${grandTotal}&items=${encodeURIComponent(JSON.stringify(cart.map(i => ({ artId: i._id || i.id, quantity: i.quantity }))))}`}
  //   className="mt-4 w-full text-center bg-neutral-900 text-white text-[10px] tracking-[0.18em] uppercase py-4 hover:bg-neutral-700 active:scale-[0.98] transition-all duration-150"
  // >
  //   Proceed to Checkout
  // </Link>  **** Should take note.
  // to={`/paystack-redirect/?id=${id}`} can add --> &images=${item.image}
///////
//const location = useLocation()
//  const params = new URLSearchParams(location.search);
////////
  // try {
  //   const itemsParam = params.get("items");
  //   if (itemsParam) setCartItems(JSON.parse(decodeURIComponent(itemsParam)));
  // } catch {
  //   setError("Could not read cart items. Please go back and try again.");
  // }
///////////////////////////////////
    // try {
    //   const token = await getAccessTokenSilently({
    //     authorizationParams: { audience: import.meta.env.VITE_AUTH0_AUDIENCE },
    //   });

    //   const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${token}`,
    //     },
    //     body: JSON.stringify({
    //       email,
    //       amount: total,
    //       // Single artwork flow
    //       ...(artDetails ? { artId: artDetails._id, quantity: 1 } : {}),
    //       // Cart flow — array of { artId, quantity }
    //       ...(cartItems.length > 0 ? { items: cartItems } : {}),
    //     }),
    //   });
//////////////////////

  // const verifyPaystackPayment = async (reference) => {
  //   setVerifying(true);
  //   try {
  //     const res = await fetch(
  //       `${BASE_URL}/api/payments/paystack/verify/${reference}`
  //     );
  //     const data = await res.json();
  //     navigate(res.ok && data.success ? "/success" : "/failure");
  //   } catch {
  //     navigate("/failure");
  //   } finally {
  //     setVerifying(false);
  //   }
  // };
///////////////////
// if (user?.email) setEmail(user.email); //note
//////////////////
// window.location.href = data.authorization_url;
/////////////////
// {[0, 1, 2].map((i) => (
//             <span
//               key={i}
//               className="w-2 h-2 rounded-full bg-neutral-800 animate-bounce"
//               style={{ animationDelay: `${i * 0.15}s` }}
//             />
//           ))}
/////////////////
  // <label className="font-mono text-[9px] tracking-[0.2em] uppercase text-neutral-400">
  //   Email address
  // </label>
  // <input
  //   type="email"
  //   name="email"
  //   placeholder="your@email.com"
  //   value={email}
  //   onChange={(e) => setEmail(e.target.value)}
  //   className="w-full border border-neutral-200 bg-[#fafaf8] px-4 py-3 text-sm text-neutral-900 outline-none focus:border-neutral-800 transition-colors font-mono placeholder:text-neutral-300"
  //   required
  // />
/////////////////
  // const getItemPrice = (item) =>
  //   Number(String(item.price ?? item.new_price ?? 0).replace(/[^0-9.]/g, ""))
//  {wishlist.length} saved work{wishlist.length !== 1 ? "s" : ""}
// onClick={() => addToCart(item)}
// onClick={() => removeFromWishlist(item._id || item.id)}
// onClick={() => wishlist.forEach((item) => addToCart(item))}
///////////////
  // if (user?.email_verified) {
  //   return null;
  // }
  /////////////
  //     const response = await fetch(
  //       `https://${import.meta.env.VITE_AUTH0_DOMAIN}/api/v2/jobs/verification-email`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify({
  //           user_id: user.sub,
  //         }),
  //       }
  //     );

  //     if (response.ok) {
  //       setMessage("✅ Verification email sent! Check your inbox.");
  //     } else {
  //       setMessage("❌ Failed to send email. Please try again later.");
  //     }
  //   } catch (error) {
  //     console.error("Error resending verification email:", error);
  //     setMessage("❌ An error occurred. Please try again.");
  //   } finally {
  //     setSending(false);
  //   }
  // };
//////////////////////////
  // if (!isAuthenticated) {
  //   return <Navigate to="/login" replace />;
  // }
//////////////////
// export const EmailVerifiedRoute = ({ children }) => { 
//   return children; //why return children
// }
/////////////////
    // const res = await axios.get(
    //   `${import.meta.env.VITE_API_BASE_URL}/api/orders`,
    //   {
    //     headers: { Authorization: `Bearer ${token}` },
    //   }
    // );

    // setOrders(res.data.orders);
    //  setError(err.response?.data?.message || "Failed to load orders");
    // <button
    //   onClick={() => window.location.reload()}
    //   className="mt-4 bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition"
    // >
    //   Retry
    // </button>
/////////////////////img for orders
//  <img
//     src={order.artDetails?.image || order.artId?.image}
//     alt={order.artDetails?.name || order.artId?.name}
//     className="w-full h-full object-cover"
//   />
//////
//  <span>Inventor: {order.artDetails.inventor}</span>
//  {order.status === "success" ? "✓ Completed" : order.status}

  // {new Date(order.createdAt).toLocaleDateString("en-US", {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // })}
///////////////
  // const handleDelete = async (id) => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const res = await fetch(`https://unix.up.railway.app/api/art/${id}`, {
  //       method: "DELETE",
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     if (!res.ok) throw new Error("Failed to delete");
  //     setWorks((prev) => prev.filter((item) => item._id !== id));
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
//////////////
  // const handleEdit = (item) => {
  //   setEditingId(item._id);
  //   setEditForm({
  //     name: item.name,
  //     description: item.description,
  //     price: item.price,
  //     image: item.image,
  //   });
  // };
///////////////
  // const handleUpdate = async (id) => {
  //   try {
  //     const token = await getAccessTokenSilently();
  //     const res = await fetch(`https://unix.up.railway.app/api/art/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify(editForm),
  //     });
  //     if (!res.ok) throw new Error("Failed to update");
  //     const updated = await res.json();
  //     setWorks((prev) =>
  //       prev.map((item) => (item._id === id ? updated : item))
  //     );
  //     setEditingId(null);
  //   } catch (err) {
  //     setError(err.message);
  //   }
  // };
/////////////////
// {editingId === item._id ? (
//   <>
//     <input
//       type="text"
//       value={editForm.name}
//       onChange={(e) =>
//         setEditForm({ ...editForm, name: e.target.value })
//       }
//       className="w-full border rounded px-3 py-2 mb-3 focus:ring-2 focus:ring-blue-400 outline-none"
//     />
//////////////////
  // <button
  //   className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
  //   onClick={() => handleUpdate(item._id)}
  // >
  //   Save
  // </button>
  // <button
  //   className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
  //   onClick={() => setEditingId(null)}
  // >
  //   Cancel
  // </button>
////////////////
//  onClick={() => handleEdit(item)}
//   onClick={() => handleDelete(item._id)}
///////////////
// users.forEach((user) => {
//   const userArtworks = artworks.filter(
//     (art) => art.auth0Id === user.auth0Id
//   );
//////////////
//  const hasInvention = userArtworks.some(
// (art) => art.type && art.type.toLowerCase() === "invention"
// );
/////////////
// const creatorsMap = new Map();
// creatorsMap.set(user.auth0Id, {
//   ...user,
//   artworks: userArtworks,
//   creatorType,
//   totalWorks: userArtworks.length,
//   followerCount: user.followers ? user.followers.length : 0,
//   followingCount: user.following ? user.following.length : 0,
// });
// setCreators(Array.from(creatorsMap.values()));
//////////////
// const statusPromises = creators.map(async (creator) => {
// if (creator.auth0Id === user?.sub) return null;
//////////////
        
// try {
//   const res = await axios.get(
//     `${import.meta.env.VITE_API_BASE_URL}/api/users/follow/status/${creator.auth0Id}`,
//     { headers: { Authorization: `Bearer ${token}` } }
//   );
//   return { [creator.auth0Id]: res.data.isFollowing };
// } catch (err) {
//   return { [creator.auth0Id]: false };
// }
// });
  //     const results = await Promise.all(statusPromises);
  //     const statusMap = results.reduce((acc, curr) => ({ ...acc, ...curr }), {});
  //     setFollowStatus(statusMap);
  //   } catch (err) {
  //     console.error("Error fetching follow status:", err);
  //   }
  // };
    // setFollowLoading({ ...followLoading, [creatorAuth0Id]: true });
//////////////
  //   try {
  //     const token = await getAccessTokenSilently({
  //       authorizationParams: {
  //         audience: import.meta.env.VITE_AUTH0_AUDIENCE,
  //       },
  //     });

  //     const res = await axios.post(
  //       `${import.meta.env.VITE_API_BASE_URL}/api/users/follow`,
  //       { targetUserId: creatorAuth0Id },
  //       { headers: { Authorization: `Bearer ${token}` } }
  //     );

  //     // Update follow status
  //     setFollowStatus({
  //       ...followStatus,
  //       [creatorAuth0Id]: res.data.isFollowing,
  //     });

  //     // Update follower count in creators list
  //     setCreators(
  //       creators.map((creator) =>
  //         creator.auth0Id === creatorAuth0Id
  //           ? { ...creator, followerCount: res.data.followerCount }
  //           : creator
  //       )
  //     );
  //   } catch (err) {
  //     console.error("Error following user:", err);
  //     alert("Failed to update follow status");
  //   } finally {
  //     setFollowLoading({ ...followLoading, [creatorAuth0Id]: false });
  //   }
  // };
///////////
{/* <button
  onClick={() => setFilter("all")}
  className={`px-6 py-2 rounded-full font-medium transition ${
    filter === "all"
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
>
  All ({creators.length})
</button> */}
///////////
{/* <button
  onClick={() => setFilter("inventors")}
  className={`px-6 py-2 rounded-full font-medium transition ${
    filter === "inventors"
      ? "bg-blue-600 text-white"
      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
  }`}
>
  🔧 Inventors (
  {
    creators.filter(
      (c) => c.creatorType === "inventor" || c.creatorType === "both"
    ).length
  }
  )
</button> */}
///////////////
  // <button
  //   onClick={() => toggleWorks(creator.auth0Id)}
  //   className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
  // >
  //   {expandedCreator === creator.auth0Id
  //     ? "Hide Works"
  //     : `View Works (${creator.totalWorks})`}
  // </button>
///////////////////////////////
  // const handleToggleWishlist = (e, item) => {
  //   e.preventDefault();
  //   const willSave = !isWishlisted(item);
  //   toggleWishlist(item);
  //   showToast(
  //     willSave ? `Saved — ${item.name}` : `Removed — ${item.name}`,
  //     "wishlist",
  //     { saved: willSave }
  //   );
  // };
/////////////////////////////
  // const handleAddToCart = (item) => {
  //   addToCart(item);
  //   showToast(`Added to cart — ${item.name}`, "cart");
  // };
// //////////////////////////
// <button
//   onClick={(e) => handleToggleWishlist(e, item)}
//   className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-200 cursor-pointer
//     ${isWishlisted(item)
//       ? "border-red-300 bg-red-50"
//       : "border-neutral-200 hover:border-neutral-400 bg-white"
//     }`}
//   aria-label={ ==> What is Aria
//     isWishlisted(item)
//       ? `Remove ${item.name} from saved`
//       : `Save ${item.name}`
//   }
// >
//   <HeartIcon filled={isWishlisted(item)} />
// </button>
// aria-label={`Add ${item.name || "artwork"} to cart`}
///////////////////////////////
  // const showToast = (message, type, extra = {}) => {
  //   const id = Date.now();
  //   setToasts((prev) => [...prev, { id, message, type, ...extra }]);
  //   setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2800);
  // };
/////////////////////<Toast toasts={toasts} /> <HeartIcon filled={isWishlisted(item)} />Take note.
////////////////////
  //   paystack.newTransaction({
  //     key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  //     email: user.email,
  //     amount: 19900, // cents if USD
  //     currency: "USD",
  //     onSuccess: async (transaction) => {
  //       try {
  //         const res = await fetch("/api/payments/paystack/verify", {
  //           method: "POST",
  //           headers: { "Content-Type": "application/json" },
  //           body: JSON.stringify({ reference: transaction.reference }),
  //         });

  //         if (!res.ok) throw new Error("Verification request failed");

  //         const data = await res.json();
  //         if (data.success) {
  //           navigate("/premium-service");
  //         } else {
  //           alert("Verification failed ❌");
  //         }
  //       } catch (err) {
  //         console.error(err);
  //         alert("Server error ❌ Try again later.");
  //       } finally {
  //         setProcessing(false);
  //       }
  //     },
  //     onCancel: () => {
  //       alert("Payment canceled ❌");
  //       setProcessing(false);
  //     },
  //   });
  // };
  // const numericValue = value.replace(/[^0-9.]/g, "");
//   const decimalCount = (numericValue.match(/\./g) || []).length;
// if (decimalCount > 1) return;
////////////////////////
// window.scrollTo({ top: 0, behavior: "smooth" });
///////////////////////
{/* <input
  type="radio"
  name="personType"
  value="inventor"
  checked={formData.personType === "inventor"}
  onChange={handleChange}
  className="mr-2"
/> */}
////////////////////
{/* <button
  type="button"
  onClick={() => {
    setPreview(null);
    setFormData((prev) => ({ ...prev, image: null }));
  }}
  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-red-600 transition"
>
  ×
</button> */}
////////////////////
// const query = searchParams.get("q") || "";
    // const searchArtworks = async () => {
    //   if (!query.trim()) {
    //     setResults([]);
    //     setLoading(false);
    //     return;
    //   }

    //   setLoading(true);
    //   setError("");
///////////////////
  //       const filtered = data.filter((item) => {
  //         const searchLower = query.toLowerCase();
  //         return (
  //           item.name?.toLowerCase().includes(searchLower) ||
  //           item.author?.toLowerCase().includes(searchLower) ||
  //           item.inventor?.toLowerCase().includes(searchLower) ||
  //           item.type?.toLowerCase().includes(searchLower) ||
  //           item.description?.toLowerCase().includes(searchLower)
  //         );
  //       });

  //       setResults(filtered);
  //     } catch (err) {
  //       setError(err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   searchArtworks();
  // }, [query]);
////////////////////
// to={isInvention(item) ? `/inventioncard/${item._id}` : `/artworks/${item._id}`}
// const isInvention = (item) => item.type?.toLowerCase() === "invention";
////////////////////
    // const Images = [eastart, mask_art, nicigoten, fotios]
    // const [imageIndex, setImageIndex] = useState(0)

    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         setImageIndex((prev) => (prev + 1) % (Images.length))
    //     }, 6000)

    //     return () => clearInterval(interval)
    // }, [])
    //  <img src={Images[imageIndex]} alt={`Product ${imageIndex + 1}`}
//////////////////////
// setData(result.slice(0, 4));
//////////////////////
  // useEffect(() => {
  //   const cleanups = cardRefs.current.map((img) => {
  //     if (!img) return null;

  //     const handleMove = (e) => {
  //       const rect = img.getBoundingClientRect();
  //       const x = e.clientX - rect.left - rect.width / 2;
  //       const y = e.clientY - rect.top - rect.height / 2;
  //       img.style.transform = `scale(1.04) translate(${x * 0.03}px, ${y * 0.03}px)`;
  //     };
  //     const handleLeave = () => {
  //       img.style.transform = "scale(1) translate(0, 0)";
  //     };

  //     img.addEventListener("mousemove", handleMove);
  //     img.addEventListener("mouseleave", handleLeave);
  //     return () => {
  //       img.removeEventListener("mousemove", handleMove);
  //       img.removeEventListener("mouseleave", handleLeave);
  //     };
  //   });
  //   return () => cleanups.forEach((c) => c?.());
  // }, [data]);
  //////////////////////
// {[0, 1, 2].map((i) => (
// <span
//   key={i}
//   className="w-2 h-2 rounded-full bg-neutral-800 animate-bounce"
//   style={{ animationDelay: `${i * 0.15}s` }}
// />
// ))}
// const cardRefs = useRef([])
// ref={(el) => (cardRefs.current[i] = el)}
////////////////////////
  // if (error) {   //if (isLoading) return;
  //   console.error("Auth0 callback error:", error);
  //   navigate("/login");
  //   return;
  // }
// onClick={() => navigate("/login")}
//     const returnTo = sessionStorage.getItem("returnTo");
    
//     if (returnTo) {
//       sessionStorage.removeItem("returnTo");
//       navigate(returnTo);
//     } else {
//       navigate("/profile");
//     }
//   } catch (err) {
//     console.error("❌ User sync failed:", err);
//     // Still navigate even if sync fails
//     const returnTo = sessionStorage.getItem("returnTo");
//     sessionStorage.removeItem("returnTo");
//     navigate(returnTo || "/profile");
//   }
// }
// };
//////////////////
//useRef, useCallback, 
//  {slides.map((_, i) => (
  //  {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")} ==>info.jsx

/////////////////
  // const handleLogin = () => {
  //   sessionStorage.setItem("returnTo", location.pathname);
  //   loginWithRedirect({
  //     appState: { returnTo: location.pathname }
  //   });
  // };
{/* <button
onClick={() =>
  logout({
    logoutParams: { returnTo: window.location.origin },
  })
} */}

// function useQuery() {
//   return new URLSearchParams(useLocation().search)
// }


// const packageDetails = {
//   basic: {
//     price: "$10",
//     quality: "Standard",
//     description: "Basic package with essential features."
//   },
//   premium: {
//     price: "$25",
//     quality: "High",
//     description: "Premium package with extra features and faster delivery."
//   },
//   deluxe: {
//     price: "$50",
//     quality: "Top",
//     description: "Deluxe package with all features, priority support, and unlimited revisions."
//   }
// }

// function useQuery() {
//   return new URLSearchParams(useLocation().search)
// }

// const Checkoutnow = () => {
//   const { id } = useParams()
//   const query = useQuery()
//   const plan = query.get('plan') || 'basic'
//   const gig = gigs.find(g => g.id === parseInt(id))
// {["basic", "premium", "deluxe"].map(pkg => (
// {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
//  to={`/checkout/${gig._id}?plan=${plan}`}//Gigc.jsx
///////////////////
// {["basic", "premium", "deluxe"].map(pkg => (
//   <button
//     key={pkg}
//     className={`border px-4 py-2 rounded transition-colors duration-200 ${
//       plan === pkg
//         ? "bg-amber-500 text-white border-amber-500"
//         : "bg-white text-gray-800 hover:bg-amber-100"
//     }`}
//     onClick={() => handlePlanChange(pkg)}
//   >
//     {pkg.charAt(0).toUpperCase() + pkg.slice(1)}
//   </button>
// ))}
// </div>
// <div className="bg-gray-100 p-4 rounded mb-4">
// <h2 className="font-bold text-lg mb-2">{plan.charAt(0).toUpperCase() + plan.slice(1)} Package</h2>
// <p><span className="font-semibold">Price:</span> {packageDetails[plan].price}</p>
// <p><span className="font-semibold">Quality:</span> {packageDetails[plan].quality}</p>
// <p><span className="font-semibold">Description:</span> {packageDetails[plan].description}</p>
// </div>
///////////////////
  // const handleCardChange = (e) => {
  //   setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  // };
// Paystackredirect ---> Checkout <></>similarity
///////////////////
// const resp = await fetch(`${BASE_URL}/api/payments/paypal/create?amount=${encodeURIComponent(subtotal)}`, {
//   method: 'GET',
//   headers: { 'Content-Type': 'application/json' },
// })
///////////////////
// if (!/^2547\d{8}$/.test(phone)) {
//   setError('Enter a valid phone number in the format 2547XXXXXXXX');
//   return;
//////////////////
// try {
//   const res = await fetch(`${BASE_URL}/api/payments/mpesa`, {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ phone, amount: subtotal })
//   });
// const params = new URLSearchParams(location.search);
/////////////////
// const res = await fetch(`${BASE_URL}/api/payments/paystack/initialize`, {
//   method: 'POST',
//   headers: { 'Content-Type': 'application/json' },
//   body: JSON.stringify({
//     email,
//     amount: subtotal,
//     callback_url: 'http://localhost:5173/checkout'
//   })
// }); 
////////////////
{/* <button
onClick={() => handleQuantityChange(item._id || item.id, item.quantity - 1)} */}
////////////////
{/* <input
  type="number"
  min="1"
  value={item.quantity}
  onChange={e => handleQuantityChange(item._id || item.id, Number(e.target.value))}
  className="w-12 text-center border-t border-b"
/> */}
///////////////
{/* <button
  onClick={() => handleQuantityChange(item._id || item.id, item.quantity + 1)}
  className="px-2 py-1 bg-gray-200 rounded-r hover:bg-gray-300"
  aria-label="Increase quantity"
>+</button> */}
///////////////
// const params = new URLSearchParams(location.search);
// const reference = params.get("reference");
// .then, .catch, .finally --->Success.jsx
///////////////////
{/* <input
  type="text"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  placeholder={`Search ${selectedCategory.toLowerCase()}...`}
  className="border rounded px-4 py-2 w-full"
  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
/> */}
{/* <ProductCard key={product._id} product={product} /> */}
////////////////// Group</> </>ProductPath</>
// setProducts(Array.isArray(data) ? data : []);
// const scrollByOffset = (offset) => {
//   if (scrollerRef.current) {
//     scrollerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
//   }
// };
//////////////////
// const filteredProducts = products.filter(product =>
//   (product.name || '').toLowerCase().includes((search || '').toLowerCase())
// );