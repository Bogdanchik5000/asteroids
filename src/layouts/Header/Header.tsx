import s from "./Header.module.css";
import { Passion_One } from "next/font/google";
import cn from "classnames";

const passionOne = Passion_One({
  weight: "400",
  subsets: ["latin"],
});

export function Header() {
  return (
    <header className={s.header}>
      <div className={s.wrap}>
        <h3 className={cn(passionOne.className, s.title)}>ARMAGEDDON 2023</h3>
        <p>
          ООО “Команда им. Б. Уиллиса”. <br />
          Взрываем астероиды с 1998 года.
        </p>
      </div>
    </header>
  );
}
