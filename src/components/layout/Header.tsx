"use client";
import { useState } from "react";
import TBKLogo from "@/assets/svg/tbk-logo.svg";
import Menu from "@/assets/svg/menu.svg";
import Image from "next/image";
import Link from "next/link";
import { Button, ButtonVariant } from "@/components/button/Button";
import { MenuMobile } from "./MenuMobile";

import "./Header.css";

export const Header = () => {
  const [showMenuMobile, setShowMenuMobile] = useState(false);

  const openMobileMenu = () => {
    setShowMenuMobile(true);
  };
  const closeMobileMenu = () => {
    setShowMenuMobile(false);
  };
  return (
    <div className="tbk-header">
      <div className="tbk-logo-container">
        <button
          className="text-white text-sm font-medium btn-burger"
          onClick={openMobileMenu}
        >
          <Image
            unoptimized
            src={Menu}
            alt="menu burger"
            width={31}
            height={31}
          />
        </button>
        <MenuMobile hideMenu={closeMobileMenu} isMenuVisible={showMenuMobile} />
        <Link href="/">
          <Image
            unoptimized
            src={TBKLogo}
            alt="tbk logo"
            width={181}
            height={34}
          />
        </Link>
      </div>
      <div className="rigth-header">
        <Link className="header-link" href="/api-reference/webpay-plus">
          Operaciones API
        </Link>
        <Button
          text="Comunidad Slack"
          variant={ButtonVariant.SECONDARY}
          className="tbk-header-btn"
        />
      </div>
    </div>
  );
};
