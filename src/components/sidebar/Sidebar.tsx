"use client";
import { useState } from "react";
import { apiRefSidebar } from "@/consts";
import SidebarItems from "./SidebarItems";
import cx from "classnames";

import "./Sidebar.css";
import "@/components/layout/Menu.css";

type SidebarProps = {
  actualPath: string;
};

export default function Sidebar({ actualPath }: SidebarProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const hideMenuClass = cx({
    "tbk-menu": isMenuVisible,
    "tbk-menu tbk-menu-hide": !isMenuVisible,
  });

  const hideMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  return (
    <div className={hideMenuClass}>
      <div className="toogle-btn-container">
        <button className="tbk-toggle-btn" onClick={hideMenu}>
          {"<"}
        </button>
      </div>
      {apiRefSidebar.map((routes) => (
        <SidebarItems
          key={routes.category}
          title={routes.category}
          actualPath={actualPath}
          routes={routes.routes}
        />
      ))}
    </div>
  );
}
