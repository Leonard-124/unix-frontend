

import React, {useState, useEffect } from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const Form = () => {
  const {user, isAuthenticated, getAccessTokenSilently} = useAuth0();
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState("")
    const [form, setForm] = useState({
      username: "",
      phone: Number,
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