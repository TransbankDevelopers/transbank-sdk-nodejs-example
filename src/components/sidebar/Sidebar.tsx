"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import cx from "classnames";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "@/consts";
import useScrollSpy from "@/app/hooks/useScrollSpy";
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
  const hideMenuClass = cx({
    "tbk-sidebar": isMenuVisible && !isMobile,
    "tbk-sidebar tbk-sidebar-hide": !isMenuVisible && !isMobile,
    "tbk-sidebar-mobile show": isSidebarVisible && isMobile,
    "tbk-sidebar-mobile": !isSidebarVisible && isMobile,
  });

  const allApiRoutes = useMemo(
    () =>
      sidebarConfig.flatMap(
        (section) =>
          section.collapsibles?.map((col) => ({
            route: col.apiReferenceRoute,
            sections: col.apiSections || [],
          })) || []
      ),
    []
  );

  const currentApi = allApiRoutes.find(
    (api) => api.route && pathname === api.route
  );

  const activeApiSection = useScrollSpy(currentApi ? currentApi.sections : []);

  const initialTitlesState: CollapseState = {};
  sidebarConfig.forEach((section) => {
    section.collapsibles?.forEach((collapsible) => {
      const isCurrentCollapsible =
        pathname === collapsible.fullRoute ||
        (collapsible.apiReferenceRoute &&
          pathname === collapsible.apiReferenceRoute);

      initialTitlesState[collapsible.title] = Boolean(isCurrentCollapsible);
    });
  });

  const [collapseState, setCollapseState] =
    useState<CollapseState>(initialTitlesState);

  const hideMenu = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggle = (key: string) => {
    setCollapseState((prev) => {
      const newState = { ...prev };

      sidebarConfig.forEach((principalSections) => {
        principalSections.collapsibles?.forEach((collapsible) => {
          newState[collapsible.title] = false;
        });
      });

      newState[key] = !prev[key];

      return newState;
    });
  };

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
                      activeApiSection={activeApiSection}
                      pathname={pathname}
                      toggle={toggle}
                      collapseState={collapseState}
                    />
                  ))
                ) : (
                  <li
                    className={`${cx(
                      pathname === section.fullRoute && "active"
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
