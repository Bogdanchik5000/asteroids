import s from "./Footer.module.css";
import cn from "classnames";

interface Props {
  className?: string;
}

export function Footer({ className }: Props) {
  return (
    <footer className={cn(s.footer, className)}>
      <div className={s.wrap}>© Все права и планета защищены</div>
    </footer>
  );
}
