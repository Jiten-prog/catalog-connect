import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/products";

export type CartLine = { product: Product; qty: number };

export const OWNER_PHONE = "919530640463";
export const OWNER_PHONE_DISPLAY = "+91 95306 40463";

type CartValue = {
  lines: CartLine[];
  count: number;
  total: number;
  add: (product: Product) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  phone: string;
  setPhone: (phone: string) => void;
};

const CartContext = createContext<CartValue | null>(null);
const PHONE_KEY = "catalog:whatsapp-phone";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [phone, setPhoneState] = useState("");

  useEffect(() => {
    const saved = window.localStorage.getItem(PHONE_KEY);
    if (saved) setPhoneState(saved);
  }, []);

  const value = useMemo<CartValue>(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const total = lines.reduce((n, l) => n + l.qty * l.product.price, 0);
    return {
      lines,
      count,
      total,
      add: (product) =>
        setLines((prev) => {
          const found = prev.find((l) => l.product.id === product.id);
          if (found) {
            return prev.map((l) =>
              l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l,
            );
          }
          return [...prev, { product, qty: 1 }];
        }),
      remove: (id) => setLines((prev) => prev.filter((l) => l.product.id !== id)),
      setQty: (id, qty) =>
        setLines((prev) =>
          qty <= 0
            ? prev.filter((l) => l.product.id !== id)
            : prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
        ),
      clear: () => setLines([]),
      phone,
      setPhone: (next) => {
        setPhoneState(next);
        window.localStorage.setItem(PHONE_KEY, next);
      },
    };
  }, [lines, phone]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}

export function normalizePhone(raw: string) {
  let digits = raw.replace(/[^0-9]/g, "");
  // If user inputs a 10-digit Indian number without country code, add 91
  if (digits.length === 10) {
    digits = `91${digits}`;
  }
  return digits;
}

export function buildOwnerCartMessage(lines: CartLine[], total: number, customerPhone: string) {
  const items = lines
    .map((l) => `• ${l.qty} × ${l.product.name} — $${(l.qty * l.product.price).toFixed(2)}`)
    .join("\n");
  return `🧸 *New Order from Gullak — The Toy House!*\n\n📱 *Customer Phone*: +${customerPhone}\n\n🛍️ *Order Items*:\n${items}\n\n💰 *Total Amount*: $${total.toFixed(2)}`;
}

export function buildCustomerCartMessage(lines: CartLine[], total: number) {
  const items = lines
    .map((l) => `• ${l.qty} × ${l.product.name} — $${(l.qty * l.product.price).toFixed(2)}`)
    .join("\n");
  return `🧸 *My Wishlist from Gullak — The Toy House*\n\n${items}\n\n💰 *Total*: $${total.toFixed(2)}\n\n🏬 Gullak Store: ${OWNER_PHONE_DISPLAY}`;
}

export function buildCartMessage(lines: CartLine[], total: number, customerPhone?: string) {
  if (customerPhone) {
    return buildOwnerCartMessage(lines, total, customerPhone);
  }
  return buildCustomerCartMessage(lines, total);
}