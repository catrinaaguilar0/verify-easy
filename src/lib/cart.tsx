import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Product } from "./catalog";

export type CartItem = {
  productId: string;
  name: string;
  brand: string;
  image: string;
  price: number;
  volume?: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (p: Product, qty?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "vow-cart-v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) setItems(JSON.parse(raw));
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items, hydrated]);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((acc, it) => acc + it.quantity, 0);
    const subtotal = items.reduce((acc, it) => acc + it.price * it.quantity, 0);
    return {
      items,
      count,
      subtotal,
      add: (p, qty = 1) =>
        setItems((prev) => {
          const existing = prev.find((it) => it.productId === p.id);
          if (existing) {
            return prev.map((it) =>
              it.productId === p.id ? { ...it, quantity: it.quantity + qty } : it,
            );
          }
          return [
            ...prev,
            {
              productId: p.id,
              name: p.name,
              brand: p.brand,
              image: p.image,
              price: p.price,
              volume: p.volume,
              quantity: qty,
            },
          ];
        }),
      remove: (id) => setItems((prev) => prev.filter((it) => it.productId !== id)),
      setQuantity: (id, qty) =>
        setItems((prev) =>
          qty <= 0
            ? prev.filter((it) => it.productId !== id)
            : prev.map((it) => (it.productId === id ? { ...it, quantity: qty } : it)),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
