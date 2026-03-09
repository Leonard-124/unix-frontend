
import { createContext, useState } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add to cart
  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => (item._id || item.id) === (product._id || product.id));
      if (existing) {
        return prevCart.map(item =>
          (item._id || item.id) === (product._id || product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  // Remove from cart
  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(item => (item._id || item.id) !== id));
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    setCart(prevCart =>
      prevCart.map(item =>
        (item._id || item.id) === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Get total items
  const getTotalItems = () =>
    cart.reduce((total, item) => total + item.quantity, 0);

  // Get total price
  const getCartTotal = () =>
    cart.reduce((total, item) =>
      total + ((item.price !== undefined ? item.price : item.new_price) * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      getTotalItems,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [search, setSearch] = useState("");

  return (
    <SearchContext.Provider value={{ search, setSearch }}>
      {children}
    </SearchContext.Provider>
  );
};
