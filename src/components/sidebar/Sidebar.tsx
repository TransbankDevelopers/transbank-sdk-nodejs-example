"use client";

import { useState, useCallback, useMemo } from "react";
import Link from "next/link";
import cx from "classnames";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "@/consts";
import Image from "next/image";
import close from "@/assets/svg/close-icon.svg";
import SidebarItems from "./SidebarItems";

type CollapseState = Record<string, boolean>;

type SidebarMobileProps = Readonly<{
  hideSidebar?: () => void;
  isSidebarVisible?: boolean;
  isMobile?: boolean;
}>;

export default function Sidebar({
  isSidebarVisible = false,
  isMobile = false,
  hideSidebar,
}: SidebarMobileProps) {
  const [isMenuVisible, setIsMenuVisible] = useState(true);

  const pathname = usePathname();
  const [, path] = pathname.split("/");
  const basePath = `/${path}`;

  const hideMenuClass = cx({
    "tbk-sidebar": isMenuVisible && !isMobile,
    "tbk-sidebar tbk-sidebar-hide": !isMenuVisible && !isMobile,
    "tbk-sidebar-mobile show": isSidebarVisible && isMobile,
    "tbk-sidebar-mobile": !isSidebarVisible && isMobile,
  });

  const initialTitlesState = useMemo(() => {
    const state: CollapseState = {};

    sidebarConfig.forEach((section) => {
      section.collapsibles?.forEach((collapsible) => {
        const isCurrentCollapsible =
          basePath === collapsible.fullRoute ||
          (collapsible.apiReferenceRoute &&
            pathname === collapsible.apiReferenceRoute) ||
          (collapsible.promotions && basePath === collapsible.promotions);

        state[collapsible.title] = Boolean(isCurrentCollapsible);
      });
    });
    return state;
  }, [basePath, pathname]);

  const [collapseState, setCollapseState] =
    useState<CollapseState>(initialTitlesState);

  const hideMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const resetCollapseState = useCallback((newState: CollapseState) => {
    sidebarConfig.forEach((principalSections) => {
      principalSections.collapsibles?.forEach((collapsible) => {
        newState[collapsible.title] = false;
      });
    });
  }, []);

  const toggle = useCallback(
    (key: string) => {
      setCollapseState((prev) => {
        const newState = { ...prev };

        resetCollapseState(newState);

        newState[key] = !prev[key];

        return newState;
      });
    },
    [resetCollapseState]
  );

  return (
    <aside className={hideMenuClass}>
      {isMobile ? (
        <div className="toogle-close-btn-container">
          <button className="tbk-vlose-toggle-btn" onClick={hideSidebar}>
            <Image
              unoptimized
              src={close}
              alt="menu burger"
              width={21}
              height={21}
            />
          </button>
        </div>
      ) : (
        <div className="toogle-btn-container">
          <button className="tbk-toggle-btn" onClick={hideMenu}>
            {"<"}
          </button>
        </div>
      )}
      <nav className="sidebar-content">
        {sidebarConfig.map((section) => {
          const hasCollapsibles = !!section.collapsibles;
          return (
            <div key={section.title}>
              <p className="tbk-sidebar-item-title">{section.title}</p>

              <ul>
                {hasCollapsibles && section.collapsibles ? (
                  section.collapsibles.map((collapsible) => (
                    <SidebarItems
                      key={collapsible.title}
                      collapsible={collapsible}
                      pathname={pathname}
                      basePath={basePath}
                      toggle={toggle}
                      collapseState={collapseState}
                    />
                  ))
                ) : (
                  <li
                    className={`${cx(
                      basePath === section.fullRoute && "active"
                    )} collapsible-items`}
                  >
                    {section.fullRoute && (
                      <Link href={section.fullRoute}>flujo completo</Link>
                    )}
                  </li>
                )}
              </ul>
              <hr className="sidebar-divider" />
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
