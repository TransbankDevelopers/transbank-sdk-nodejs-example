"use client";
import { Roboto } from "next/font/google";
import NextNProgress from "nextjs-progressbar";
import "./globals.css";

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
        <NextNProgress color="#D5006C" height={4} />
        {children}
      </body>
    </html>
  );
}
