"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import cx from "classnames";
import { usePathname } from "next/navigation";
import { sidebarConfig } from "@/consts";
import useScrollSpy from "@/app/hooks/useScrollSpy";
import Image from "next/image";
import close from "@/assets/svg/close-icon.svg";

type CollapseState = Record<string, boolean>;

type SidebarMobileProps = {
  hideSidebar?: () => void;
  isSidebarVisible?: boolean;
  isMobile?: boolean;
};

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

      if (isCurrentCollapsible) {
        initialTitlesState[collapsible.title] = true;
      } else {
        initialTitlesState[collapsible.title] = false;
      }
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
                    <li
                      key={collapsible.title}
                      style={{ marginBottom: "20px" }}
                    >
                      <button
                        className="sidebar-collapsible-title"
                        onClick={() => toggle(collapsible.title)}
                      >
                        <span>{collapsible.title}</span>
                        <Image
                          unoptimized
                          src="/t-arrow.svg"
                          alt="{imagePath}"
                          width={24}
                          height={24}
                          className={cx(
                            collapseState[collapsible.title] &&
                              "sidebar-icons-rotate"
                          )}
                        />
                      </button>
                      {collapseState[collapsible.title] && (
                        <ul>
                          <li
                            className={`${cx(
                              pathname === collapsible.fullRoute && "active"
                            )} collapsible-items`}
                          >
                            <Link
                              href={collapsible.fullRoute}
                              className="tbk-sidebar-item"
                            >
                              Flujo Completo
                            </Link>
                          </li>
                          {collapsible.apiSections?.map((apiId) => (
                            <li
                              key={apiId}
                              className={`${
                                cx(
                                  collapsible.apiReferenceRoute &&
                                    pathname ===
                                      collapsible.apiReferenceRoute &&
                                    activeApiSection === apiId
                                    ? "active"
                                    : ""
                                ) && "active"
                              } collapsible-items`}
                            >
                              <Link
                                href={`${collapsible.apiReferenceRoute}#${apiId}`}
                                className={`tbk-sidebar-item`}
                              >
                                {apiId.replace("api-", "api ")}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
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
