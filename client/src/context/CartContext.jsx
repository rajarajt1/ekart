import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem("ekartCart")) || []
  );

  // Save cart to localStorage
  const saveCart = (items) => {
    setCartItems(items);
    localStorage.setItem("ekartCart", JSON.stringify(items));
  };

  // Add item to cart
  const addToCart = (product) => {
    const existingItem = cartItems.find(
      (item) => item._id === product._id
    );

    let updatedCart;

    if (existingItem) {
      // If already in cart, increase quantity
      updatedCart = cartItems.map((item) =>
        item._id === product._id
          ? { ...item, qty: item.qty + 1 }
          : item
      );
    } else {
      // Add new item with qty 1
      updatedCart = [...cartItems, { ...product, qty: 1 }];
    }

    saveCart(updatedCart);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item._id !== id);
    saveCart(updatedCart);
  };

  // Increase quantity
  const increaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id ? { ...item, qty: item.qty + 1 } : item
    );
    saveCart(updatedCart);
  };

  // Decrease quantity
  const decreaseQty = (id) => {
    const updatedCart = cartItems.map((item) =>
      item._id === id && item.qty > 1
        ? { ...item, qty: item.qty - 1 }
        : item
    );
    saveCart(updatedCart);
  };

  // Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("ekartCart");
  };

  // Calculate total price
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  // Total number of items
  const cartCount = cartItems.reduce(
    (count, item) => count + item.qty,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        cartTotal,
        cartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);