"use client";
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
          {isHome ? (
            children
          ) : (
            <div className="tbk-layout-body">
              <Menu />
              {children}
            </div>
          )}

          <Footer />
        </div>
      </body>
    </html>
  );
}
