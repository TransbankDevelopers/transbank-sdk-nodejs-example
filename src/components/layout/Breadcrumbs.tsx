import Image from "next/image";
import RightChevron from "@/assets/svg/right-chevron.svg";
import { Route } from "@/types/menu";
import cx from "classnames";
import Link from "next/link";

export type BreadcrumbsProps = {
  items: Route[];
  active: string;
};

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  return (
    <div className="flex items-center gap-x-3 text-tbk-black-2 text-sm">
      {props.items.map((item, index) => (
        <div className="flex gap-x-3" key={index}>
          <Link
            className={cx({
              "text-tbk-red": item.path === props.active,
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
