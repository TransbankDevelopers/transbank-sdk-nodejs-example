import Image from "next/image";
import RightChevron from "@/assets/svg/right-chevron.svg";
import { Route } from "@/types/menu";
import cx from "classnames";
import Link from "next/link";
import "./Breadcrumbs.css";

export type BreadcrumbsProps = {
  items: Route[];
  active: string;
};

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  return (
    <div className="breadcrumbs-container">
      {props.items.map((item, index) => (
        <div className="breadcrumbs-items" key={item.path}>
          <Link
            className={cx({
              "current-breadcrumb": item.path === props.active,
            })}
            href={{
              pathname: item.path,
            }}
          >
            {item.name}
          </Link>
          {index < props.items.length - 1 && (
            <Image src={RightChevron} alt="nav" />
          )}
        </div>
      ))}
    </div>
  );
};
