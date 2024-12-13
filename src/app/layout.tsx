"use client";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { usePathname } from "next/navigation";
import Footer from "@/components/Footer/Footer";

const openSans = Open_Sans({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const pathname = usePathname();
  const excludePaths = pathname.startsWith("/api-reference");

  const isHome = pathname === "/";

  const hideMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

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
