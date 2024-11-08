"use client";
import cx from "classnames";
import { useState } from "react";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const hideMenuClass = cx({
    "tbk-layout-body": isMenuVisible,
    "tbk-layout-body menu-collapsed": !isMenuVisible,
  });

  const hideMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <html lang="en">
      <head>
        <title>Transbank SDK</title>
      </head>
      <body className={roboto.className}>
        <NextTopLoader color="#D5006C" />
        <div className="flex-col">
          <Header />
          {isHome ? (
            children
          ) : (
            <div className={hideMenuClass}>
              <Menu hideMenu={hideMenu} isMenuVisible={isMenuVisible} />
              {children}
            </div>
          )}

          <Footer />
        </div>
      </body>
    </html>
  );
}
