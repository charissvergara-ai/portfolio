import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('flowerShopCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('flowerShopCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (flower) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === flower.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === flower.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...flower, quantity: 1 }];
    });
  };

  const removeFromCart = (flowerId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== flowerId));
  };

  const updateQuantity = (flowerId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(flowerId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === flowerId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartCount = () => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
