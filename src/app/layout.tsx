"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { useMemo } from "react";
import { usePathname } from "next/navigation";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  const isHome = pathname === "/";

  return (
    <html lang="en">
      <head>
        <title>Transbank SDK</title>
      </head>
      <body className={roboto.className}>
        <NextTopLoader color="#D5006C" />
        <div className="flex-col">
          <Header />
          <div className="tbk-layout-body">
            {!isHome && <Menu />}
            {children}
          </div>
          <div className="tbk-layout-footer"></div>
        </div>
      </body>
    </html>
  );
}
