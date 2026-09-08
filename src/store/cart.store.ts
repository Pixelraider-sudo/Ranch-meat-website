import { create } from "zustand";
import type { CartLine, Product } from "@/types";

interface CartState {
  lines: CartLine[];
  isOpen: boolean;
  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>((set) => ({
  lines: [],
  isOpen: false,
  add: (product, quantity = 1) =>
    set((state) => {
      const existing = state.lines.find((l) => l.productId === product.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.productId === product.id ? { ...l, quantity: l.quantity + quantity } : l,
          ),
        };
      }
      return {
        lines: [
          ...state.lines,
          {
            productId: product.id,
            name: product.name,
            price: product.price,
            unit: product.unit,
            image: product.image,
            quantity,
          },
        ],
      };
    }),
  remove: (productId) =>
    set((state) => ({ lines: state.lines.filter((l) => l.productId !== productId) })),
  setQuantity: (productId, quantity) =>
    set((state) => ({
      lines: state.lines
        .map((l) => (l.productId === productId ? { ...l, quantity } : l))
        .filter((l) => l.quantity > 0),
    })),
  clear: () => set({ lines: [] }),
  setOpen: (isOpen) => set({ isOpen }),
}));

export const selectCartCount = (state: CartState) =>
  state.lines.reduce((sum, l) => sum + l.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.lines.reduce((sum, l) => sum + l.quantity * l.price, 0);