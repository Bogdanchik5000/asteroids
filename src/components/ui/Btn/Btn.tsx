import { HTMLAttributes, ReactNode } from "react";
import cn from "classnames";
import s from "./Btn.module.css";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  color?: "orange"; // в будущем можно масштабировать
  size?: "sm" | "md";
}

export function Btn({
  color = "orange",
  size = "sm",
  children,
  className,
  ...props
}: Props) {
  return (
    <button
      {...props}
      className={cn(
        s.btn,
        {
          [s.orange]: color === "orange",
          [s.sm]: size === "sm",
          [s.md]: size === "md",
        },
        className
      )}
    >
      {children}
    </button>
  );
}
