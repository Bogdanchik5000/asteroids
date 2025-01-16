import type { Metadata } from "next";
import localFont from "next/font/local";
import "./normalize.css";
import "./globals.css";
import { Footer, Header } from "@/layouts";
import cn from "classnames";
import CartProvider from "@/context/CartContext";
import { RelativeUnitProvider } from "@/context/RelativeUnitContext";

const helvetica = localFont({
  src: [
    {
      path: "../../public/fonts/Helvetica/helvetica_regular.otf",
      style: "normal",
      weight: "400",
    },
    {
      path: "../../public/fonts/Helvetica/helvetica_bold.otf",
      style: "normal",
      weight: "700",
    },
  ],
});

export const metadata: Metadata = {
  title: "Armageddon",
  description: "Взорвите приближающиеся астероиды",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={cn(helvetica.className, "body-wrap")}>
        <RelativeUnitProvider>
          <CartProvider>
            <Header />

            <main className="main">{children}</main>

            <Footer />
          </CartProvider>
        </RelativeUnitProvider>
      </body>
    </html>
  );
}
