"use client";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/layout/Header";
import Sidebar from "@/components/sidebar/Sidebar";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";
import "@/components/sidebar/Sidebar.css";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const excludePaths = pathname.startsWith("/api-reference");

  const isHome = pathname === "/";

  return (
    <html lang="en">
      <head>
        <title>Transbank SDK</title>
      </head>
      <body className={openSans.className}>
        <NextTopLoader color="#D5006C" />
        <div className="flex-col">
          <Header />
          {isHome || excludePaths ? (
            children
          ) : (
            <div className="tbk-layout-body">
              <Sidebar />
              {children}
            </div>
          )}

          <Footer />
        </div>
      </body>
    </html>
  );
}
