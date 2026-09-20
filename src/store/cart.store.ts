import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

import type { CartLine, Product } from "@/types";

const DELIVERY_FEE = 250;
const FREE_DELIVERY_THRESHOLD = 5000;

interface CartState {
  lines: CartLine[];
  isOpen: boolean;

  add: (product: Product, quantity?: number) => void;
  remove: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clear: () => void;
  setOpen: (open: boolean) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      lines: [],
      isOpen: false,

      add: (product, quantity = 1) =>
        set((state) => {
          const existing = state.lines.find((line) => line.productId === product.id);

          if (existing) {
            return {
              lines: state.lines.map((line) =>
                line.productId === product.id
                  ? {
                      ...line,
                      quantity: Math.max(1, line.quantity + quantity),
                    }
                  : line,
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
                quantity: Math.max(1, quantity),
              },
            ],
          };
        }),

      remove: (productId) =>
        set((state) => ({
          lines: state.lines.filter((line) => line.productId !== productId),
        })),

      setQuantity: (productId, quantity) =>
        set((state) => ({
          lines: state.lines
            .map((line) =>
              line.productId === productId
                ? {
                    ...line,
                    quantity: Math.max(0, quantity),
                  }
                : line,
            )
            .filter((line) => line.quantity > 0),
        })),

      clear: () => set({ lines: [] }),

      setOpen: (isOpen) => set({ isOpen }),
    }),

    {
      name: "ranch-meat-cart",
      storage: createJSONStorage(() => localStorage),

      partialize: (state) => ({
        lines: state.lines,
      }),
    },
  ),
);

export const selectCartCount = (state: CartState) =>
  state.lines.reduce((total, line) => total + line.quantity, 0);

export const selectCartSubtotal = (state: CartState) =>
  state.lines.reduce((total, line) => total + line.quantity * line.price, 0);

export const selectDeliveryFee = (state: CartState) => {
  const subtotal = selectCartSubtotal(state);

  return subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
};

export const selectCartTotal = (state: CartState) =>
  selectCartSubtotal(state) + selectDeliveryFee(state);

export const selectIsCartEmpty = (state: CartState) => state.lines.length === 0;
