"use client";
import {
  webpayFullTransactionRoutes,
  webpayOneClickRoutes,
  webpayPlusRoutes,
} from "@/consts";
import { Route } from "@/types/menu";
import { usePathname } from "next/navigation";
import cx from "classnames";

export type MenuItemProps = {
  title: string;
  routes: Route[];
  actualPath: string;
};

const MenuItem = (props: MenuItemProps) => {
  return (
    <div className="flex flex-col gap-y-6 px-2">
      <span className="text-lg text-tbk-grey mb-3 font-bold">
        {props.title}
      </span>
      {props.routes.map((item, idx) => {
        return (
          <span
            className={cx(
              "text-tbk-black px-3 hover:text-tbk-red hover:cursor-pointer",
              {
                "text-tbk-red": props.actualPath === item.path,
              }
            )}
            key={idx}
          >
            {item.name}
          </span>
        );
      })}
    </div>
  );
};

export const Menu = () => {
  const path = usePathname();

  console.log(path);
  return (
    <div className="border-r border-tbk-border flex flex-col gap-y-14">
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
    </div>
  );
};
