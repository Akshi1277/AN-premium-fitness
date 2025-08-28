'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function CartPage() {
  const { items, updateQty, removeItem, clear, totals } = useCart();
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    setProcessing(true);
    // Simulate payment
    await new Promise((r) => setTimeout(r, 1400));
    setProcessing(false);
    setSuccess(true);
    clear();
  };

  return (
    <section className="py-16 container mx-auto px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <ShoppingBag className="text-amber-300" />
        <h1 className="text-3xl md:text-4xl font-bold text-white">Your Cart</h1>
        {totals.count > 0 && (
          <span className="text-sm text-gray-400">({totals.count} items)</span>
        )}
      </div>

      {success && (
        <div className="mb-6 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-200">
          Payment successful! Your order is confirmed.
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-300 mb-6">Your cart is empty.</p>
          <Link
            href="/"
            className="inline-flex px-6 py-3 rounded-lg border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 hover:text-amber-200"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-4 p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-semibold">{item.name}</h3>
                    <div className="text-amber-300 font-bold">
                      ${Number(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                  <div className="text-sm text-gray-400">
                    ${Number(item.price).toFixed(2)} each
                  </div>
                  <div className="mt-3 flex items-center gap-3">
                    <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg">
                      <button
                        className="p-2 hover:bg-white/10 rounded-l-lg"
                        onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-3 py-1 text-white">{item.qty}</span>
                      <button
                        className="p-2 hover:bg-white/10 rounded-r-lg"
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      className="ml-4 inline-flex items-center gap-2 text-red-300 hover:text-red-200"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl h-fit">
            <h2 className="text-white font-semibold text-xl mb-4">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Shipping</span>
                <span>{totals.subtotal > 0 ? 'Free' : '$0.00'}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Estimated Tax</span>
                <span>${totals.tax.toFixed(2)}</span>
              </div>
            </div>
            <div className="my-4 border-t border-white/10" />
            <div className="flex justify-between text-white font-semibold mb-4">
              <span>Total</span>
              <span>${totals.total.toFixed(2)}</span>
            </div>

            <motion.button
              className="w-full bg-white/10 text-white border border-white/20 hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-amber-400/40 rounded-lg py-3 font-semibold disabled:opacity-60"
              whileHover={{ scale: items.length ? 1.01 : 1 }}
              whileTap={{ scale: items.length ? 0.99 : 1 }}
              disabled={processing || items.length === 0}
              onClick={handleCheckout}
            >
              {processing ? 'Processing…' : 'Proceed to Payment'}
            </motion.button>

            <button
              className="w-full mt-3 text-sm text-gray-300 hover:text-white"
              onClick={clear}
              disabled={items.length === 0}
            >
              Clear cart
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
