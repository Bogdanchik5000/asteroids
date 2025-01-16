"use client";

import { Btn } from "@/components/ui";
import s from "./Cart.module.css";
import cn from "classnames";
import { use } from "react";
import { CartContext } from "@/context/CartContext";
import asteroidService from "@/services/asteroidService";

interface Props {
  className?: string;
}

export function Cart({ className }: Props) {
  const { cart, setPaid } = use(CartContext);

  return (
    <div className={cn(s.cart, className)}>
      <div className={s.info}>
        <span>Корзина</span>
        <span>
          {cart.length} {asteroidService.getAsteroidEnding(cart.length)}
        </span>
      </div>
      <Btn
        size="md"
        onClick={() => {
          if (cart.length) setPaid();
        }}
      >
        Отправить
      </Btn>
    </div>
  );
}
