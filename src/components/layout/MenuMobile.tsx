"use client";
import {
  webpayFullTransactionRoutes,
  webpayOneClickRoutes,
  webpayPlusRoutes,
  patpassTransactionRoutes,
  apiWebpayPlusRoutes,
  apiWebpayOneClickRoutes,
  apiWebpayFullTransactionRoutes,
  apiPatpassTransactionRoutes,
} from "@/consts";
import { Route } from "@/types/menu";
import { usePathname } from "next/navigation";
import cx from "classnames";
import Link from "next/link";
import Image from "next/image";
import close from "@/assets/svg/close-icon.svg";
import "./Menu.css";
type MenuMobileProps = {
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
export const MenuMobile = ({ isMenuVisible, hideMenu }: MenuMobileProps) => {
  const path = usePathname() || "/";
  const TbkMenuStyles = cx({
    "tbk-mobile-menu show": isMenuVisible,
    "tbk-mobile-menu": !isMenuVisible,
  });
  return (
    <div className={TbkMenuStyles}>
      <div className="toogle-close-btn-container">
        <button className="tbk-vlose-toggle-btn" onClick={hideMenu}>
          <Image
            unoptimized
            src={close}
            alt="menu burger"
            width={21}
            height={21}
          />
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
