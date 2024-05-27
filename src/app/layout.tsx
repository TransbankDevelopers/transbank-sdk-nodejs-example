"use client";
import { Roboto } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Transbank SDK</title>
      </head>
      <body className={roboto.className}>
        <NextTopLoader color="#D5006C" />
        {children}
      </body>
    </html>
  );
}
