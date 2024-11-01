"use client";
import {
  webpayFullTransactionRoutes,
  webpayOneClickRoutes,
  webpayPlusRoutes,
  patpassTransactionRoutes,
} from "@/consts";
import { Route } from "@/types/menu";
import { usePathname } from "next/navigation";
import cx from "classnames";
import Link from "next/link";
import "./Menu.css";

type MenuProps = {
  hideMenu: () => void;
  isMenuVisible: boolean;
};

export type MenuItemProps = {
  title: string;
  routes: Route[];
  actualPath: string;
};

const MenuItem = (props: MenuItemProps) => {
  const [, basePath] = props.actualPath.split("/");

  const isActive = (item: Route) => {
    const [, path] = item.path.split("/");

    return basePath === path;
  };
  return (
    <div className="tbk-menu-item-container">
      <span className="tbk-menu-item-text">{props.title}</span>
      {props.routes.map((item) => {
        return (
          <Link
            href={{
              pathname: item.path,
            }}
            className={cx("tbk-menu-item", {
              active: isActive(item),
            })}
            key={item.name}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export const Menu = ({ hideMenu, isMenuVisible }: MenuProps) => {
  const path = usePathname() || "/";

  const hideMenuClass = cx({
    "tbk-menu": isMenuVisible,
    "tbk-menu tbk-menu-hide": !isMenuVisible,
  });

  return (
    <div className={hideMenuClass}>
      <div className="toogle-btn-container">
        <button className="tbk-toggle-btn" onClick={hideMenu}>
          {"<"}
        </button>
      </div>

      <MenuItem
        title="Webpay Plus"
        actualPath={path}
        routes={webpayPlusRoutes}
      />
      <MenuItem
        title="Webpay Oneclick"
        actualPath={path}
        routes={webpayOneClickRoutes}
      />
      <MenuItem
        title="Webpay Transacción Completa"
        actualPath={path}
        routes={webpayFullTransactionRoutes}
      />
      <MenuItem
        title="Patpass Comercio"
        actualPath={path}
        routes={patpassTransactionRoutes}
      />
    </div>
  );
};
