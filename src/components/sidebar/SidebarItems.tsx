"use client";

import cx from "classnames";
import Link from "next/link";
import Image from "next/image";

type SidebarItemsProps = Readonly<{
  pathname: string;
  basePath: string;
  collapseState: Record<string, boolean>;
  activeApiSection?: string | null;
  toggle: (title: string) => void;
  collapsible?: {
    title: string;
    fullRoute: string;
    apiSections?: string[];
    apiReferenceRoute?: string;
  };
}>;

export default function SidebarItems({
  pathname,
  basePath,
  collapseState,
  toggle,
  collapsible,
  activeApiSection,
}: SidebarItemsProps) {
  if (!collapsible) {
    return null;
  }

  return (
    <li style={{ marginBottom: "20px" }}>
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
            collapseState[collapsible.title] && "sidebar-icons-rotate"
          )}
        />
      </button>
      {collapseState[collapsible.title] && (
        <ul>
          <li
            className={`${cx(
              basePath === collapsible.fullRoute && "active"
            )} collapsible-items`}
          >
            <Link href={collapsible.fullRoute} className="tbk-sidebar-item">
              Flujo Completo
            </Link>
          </li>
          {collapsible.apiSections?.map((apiId) => (
            <li
              key={apiId}
              className={`${cx(
                collapsible.apiReferenceRoute &&
                  pathname === collapsible.apiReferenceRoute &&
                  activeApiSection === apiId
                  ? "active"
                  : ""
              )} collapsible-items`}
            >
              <Link
                href={`${collapsible.apiReferenceRoute}#${apiId}`}
                className="tbk-sidebar-item"
              >
                {apiId.replace("api-", "api ")}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}
