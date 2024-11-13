"use client";
import { Route } from "@/types/menu";
import cx from "classnames";
import Link from "next/link";

type SidebarItemsProps = {
  title: string;
  routes: Route[];
  actualPath: string;
};

export default function SidebarItems({
  title,
  routes,
  actualPath,
}: SidebarItemsProps) {
  return (
    <div className="tbk-menu-item-container">
      <span className="tbk-menu-item-text">{title}</span>
      {routes.map((item) => {
        return (
          <Link
            href={{
              pathname: item.path,
            }}
            className={cx("tbk-menu-item", {
              active: actualPath === item.path,
            })}
            key={item.name}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
}
