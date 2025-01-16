"use client";

import Image from "next/image";
import s from "./page.module.css";
import { AsteroidItem, AsteroidsList, Cart } from "@/components/shared";
import { use } from "react";
import { CartContext } from "@/context/CartContext";
import { RelativeUnitContext } from "@/context/RelativeUnitContext";

export default function HomePage() {
  const { isPayed, cart } = use(CartContext);
  const { relativeUnit } = use(RelativeUnitContext);

  return (
    <div className={s.wrap}>
      <Image
        src={"/planeta.png"}
        alt="Картинка планеты"
        width={536}
        height={620}
        className={s.img}
      />

      {!isPayed ? (
        <>
          <AsteroidsList
            title="Ближайшие подлёты астероидов"
            className={s.asteroidsList}
          />

          <Cart />
        </>
      ) : (
        <div className={s.payed}>
          <div className={s.payedTitle}>Заказ отправлен!</div>
          {cart.map((item) => (
            <AsteroidItem
              key={item.id}
              nearEarthObject={item}
              relativeUnit={relativeUnit}
              showPayBtn={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
