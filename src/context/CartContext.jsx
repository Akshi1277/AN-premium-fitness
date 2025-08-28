'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // [{id, name, price, image, qty}]

  // Load/save from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem('cart:v1');
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('cart:v1', JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((p) => p.id === product.id);
      if (idx !== -1) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], qty: copy[idx].qty + qty };
        return copy;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          qty,
        },
      ];
    });
  };

  const removeItem = (id) => setItems((prev) => prev.filter((p) => p.id !== id));

  const updateQty = (id, qty) =>
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: Math.max(1, qty) } : p)));

  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const subtotal = items.reduce((sum, p) => sum + p.price * p.qty, 0);
    const shipping = subtotal > 0 ? 0 : 0; // free shipping for demo
    const tax = subtotal * 0.08; // 8% sample tax
    const total = subtotal + shipping + tax;
    const count = items.reduce((n, p) => n + p.qty, 0);
    return { subtotal, shipping, tax, total, count };
  }, [items]);

  const value = useMemo(
    () => ({ items, addItem, removeItem, updateQty, clear, totals }),
    [items, totals]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
