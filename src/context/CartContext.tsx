"use client";

import { NearEarthObject } from "@/types/asteroid.type";
import { createContext, ReactNode, useState } from "react";

type CartType = NearEarthObject[];

interface CartContext {
  cart: CartType;
  toggleCart: (asteroid: NearEarthObject) => void;
  setPaid: () => void;
  isPayed: boolean;
}

export const CartContext = createContext<CartContext>({} as CartContext);

export default function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartType>([]);
  const [isPayed, setIsPaid] = useState(false);

  const toggleCart = (cartItem: NearEarthObject) => {
    if (cart.find((item) => item.id === cartItem.id)) {
      setCart(cart.filter((item) => item.id !== cartItem.id));
    } else {
      setCart([...cart, cartItem]);
    }
  };

  const setPaid = () => setIsPaid(true);

  return (
    <CartContext.Provider
      value={{
        cart,
        toggleCart,
        setPaid,
        isPayed,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
