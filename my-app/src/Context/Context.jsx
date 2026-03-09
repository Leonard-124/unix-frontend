
// import { createContext, useState } from "react";

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState([]);

//   const [wishlist, setWishlist] = useState([])

//   // Add to cart
//   const addToCart = (product) => {
//     setCart(prevCart => {
//       const existing = prevCart.find(item => (item._id || item.id) === (product._id || product.id));
//       if (existing) {
//         return prevCart.map(item =>
//           (item._id || item.id) === (product._id || product.id)
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   // Remove from cart
//   const removeFromCart = (id) => {
//     setCart(prevCart => prevCart.filter(item => (item._id || item.id) !== id));
//   };

//   // Clear cart
//   const clearCart = () => {
//     setCart([]);
//   };

//   // Update quantity
//   const updateQuantity = (id, newQuantity) => {
//     setCart(prevCart =>
//       prevCart.map(item =>
//         (item._id || item.id) === id
//           ? { ...item, quantity: newQuantity }
//           : item
//       )
//     );
//   };

//   // Get total items
//   const getTotalItems = () =>
//     cart.reduce((total, item) => total + item.quantity, 0);

//   // Get total price
//   const getCartTotal = () =>
//     cart.reduce((total, item) =>
//       total + ((item.price !== undefined ? item.price : item.new_price) * item.quantity), 0);

//   //wishlist
//   const toggleWishlist = (item) => {
//     setWishlist((prev) => {
//       const exists = prev.find((w) => (w._id || w.id) === (item._id || item.id));
//       return exists
//       ? prev.filter((w) => (w._id || w.id) !== (item._id || item.id))
//       : [...prev, item]
//     });
//   };

//   const getTotalWish = () => wishlist.reduce((total, item) => total + item.quantity, 0)

//   const isWishlisted = (item) => wishlist.some((w) => (w._id || w.id) === (item._id || item.id));

//   const removeFromWishlist = (id) => setWishlist((prev) => prev.filter((w) => (w._id || w.id) !== id))

//   return (
//     <CartContext.Provider value={{
//       cart,
//       addToCart,
//       removeFromCart,
//       clearCart,
//       updateQuantity,
//       getTotalItems,
//       getCartTotal,
//       wishlist,
//       toggleWishlist,
//       isWishlisted,
//       removeFromWishlist,
//       getTotalWish

//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [search, setSearch] = useState("");

//   return (
//     <SearchContext.Provider value={{ search, setSearch }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

////////////////////////////////////////////////////////////////////////////

// import { createContext, useState, useEffect } from "react";
// import { useAuth0 } from "@auth0/auth0-react";

// const userAuth = useAuth0;

// const { user, getAccessTokenSilently } = userAuth()

// // Helper: load from localStorage safely
// const loadFromStorage = (user, key, fallback) => {
//   try {
//     const stored = localStorage.getItem(key);
//     return stored ? JSON.parse(stored) : fallback;
//   } catch {
//     return fallback;
//   }
// };

// // Helper: save to localStorage safely
// const saveToStorage = (key, value) => {
//   try {
//     localStorage.setItem(key, JSON.stringify(value));
//   } catch (e) {
//     console.warn(`Failed to save "${key}" to localStorage:`, e);
//   }
// };

// // ─── CART CONTEXT ────────────────────────────────────────────────────────────

// export const CartContext = createContext();

// export const CartProvider = ({ children }) => {
//   const [cart, setCart] = useState(() => loadFromStorage("cart", []));
//   const [wishlist, setWishlist] = useState(() => loadFromStorage("wishlist", []));

//   // Persist cart to localStorage whenever it changes
//   useEffect(() => {
//     saveToStorage("cart", cart);
//   }, [cart]);

//   // Persist wishlist to localStorage whenever it changes
//   useEffect(() => {
//     saveToStorage("wishlist", wishlist);
//   }, [wishlist]);

//   // ── Cart actions ────────────────────────────────────────────────────────────

//   const getId = (item) => item._id || item.id;

//   const addToCart = (product) => {
//     setCart((prevCart) => {
//       const existing = prevCart.find((item) => getId(item) === getId(product));
//       if (existing) {
//         return prevCart.map((item) =>
//           getId(item) === getId(product)
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prevCart, { ...product, quantity: 1 }];
//     });
//   };

//   const removeFromCart = (id) => {
//     setCart((prevCart) => prevCart.filter((item) => getId(item) !== id));
//   };

//   const clearCart = () => {
//     setCart([]);
//     localStorage.removeItem("cart");
//   };

//   const updateQuantity = (id, newQuantity) => {
//     setCart((prevCart) =>
//       prevCart.map((item) =>
//         getId(item) === id ? { ...item, quantity: newQuantity } : item
//       )
//     );
//   };

//   const getTotalItems = () =>
//     cart.reduce((total, item) => total + item.quantity, 0);

//   const getCartTotal = () =>
//     cart.reduce(
//       (total, item) =>
//         total +
//         (item.price !== undefined ? item.price : item.new_price) * item.quantity,
//       0
//     );

//   // ── Wishlist actions ────────────────────────────────────────────────────────

//   const toggleWishlist = (item) => {
//     setWishlist((prev) => {
//       const exists = prev.find((w) => getId(w) === getId(item));
//       return exists
//         ? prev.filter((w) => getId(w) !== getId(item))
//         : [...prev, item];
//     });
//   };

//   const isWishlisted = (item) =>
//     wishlist.some((w) => getId(w) === getId(item));

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

// // ─── SEARCH CONTEXT ──────────────────────────────────────────────────────────

// export const SearchContext = createContext();

// export const SearchProvider = ({ children }) => {
//   const [search, setSearch] = useState("");

//   return (
//     <SearchContext.Provider value={{ search, setSearch }}>
//       {children}
//     </SearchContext.Provider>
//   );
// };

///////////////////////////////////////////////////////////////////////////////////////////////

import { createContext, useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────

const getId = (item) => item._id || item.id;

// Namespace key by Auth0 user ID: "user_auth0|abc123:cart"
const userKey = (userId, key) => (userId ? `user_${userId}:${key}` : key);

const loadFromStorage = (userId, key, fallback) => {
  try {
    const stored = localStorage.getItem(userKey(userId, key));
    return stored ? JSON.parse(stored) : fallback;
  } catch {
    return fallback;
  }
};

const saveToStorage = (userId, key, value) => {
  try {
    localStorage.setItem(userKey(userId, key), JSON.stringify(value));
  } catch (e) {
    console.warn(`Failed to save "${key}" to localStorage:`, e);
  }
};

// ─── Cart Context ─────────────────────────────────────────────────────────────

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ✅ useAuth0 called INSIDE the component
  const { user } = useAuth0();
  const userId = user?.sub; // Auth0 unique ID e.g. "auth0|64f3abc..."

  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // ✅ Load the correct user's data whenever userId becomes available or changes
  useEffect(() => {
    setCart(loadFromStorage(userId, "cart", []));
    setWishlist(loadFromStorage(userId, "wishlist", []));
  }, [userId]);

  // ✅ Persist cart scoped to this user
  useEffect(() => {
    saveToStorage(userId, "cart", cart);
  }, [cart, userId]);

  // ✅ Persist wishlist scoped to this user
  useEffect(() => {
    saveToStorage(userId, "wishlist", wishlist);
  }, [wishlist, userId]);

  // ── Cart actions ──────────────────────────────────────────────────────────

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => getId(item) === getId(product));
      if (existing) {
        return prev.map((item) =>
          getId(item) === getId(product)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((item) => getId(item) !== id));

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(userKey(userId, "cart")); // ✅ removes the namespaced key
  };

  const updateQuantity = (id, newQuantity) =>
    setCart((prev) =>
      prev.map((item) =>
        getId(item) === id ? { ...item, quantity: newQuantity } : item
      )
    );

  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  const getCartTotal = () =>
    cart.reduce(
      (total, item) =>
        total +
        (item.price !== undefined ? item.price : item.new_price) * item.quantity,
      0
    );

  // ── Wishlist actions ──────────────────────────────────────────────────────

  const toggleWishlist = (item) => {
    setWishlist((prev) => {
      const exists = prev.find((w) => getId(w) === getId(item));
      return exists
        ? prev.filter((w) => getId(w) !== getId(item))
        : [...prev, item];
    });
  };

  const isWishlisted = (item) => wishlist.some((w) => getId(w) === getId(item));

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((w) => getId(w) !== id));

  const getTotalWish = () =>
    wishlist.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        getTotalItems,
        getCartTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        removeFromWishlist,
        getTotalWish,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ─── Search Context ───────────────────────────────────────────────────────────

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
