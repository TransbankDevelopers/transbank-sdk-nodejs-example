"use client";
import { Button } from "@/components/button/Button";

export type StatusButtonProps = {
  buyOrder: string;
  className?: string;
};
export const StatusButton = ({ buyOrder, className }: StatusButtonProps) => {
  const statusLink = {
    pathname: `/oneclick-mall/status`,
    query: {
      buy_order: buyOrder,
    },
  };

  return (
    <div className={`flex-start ${className}`}>
      <Button text="CONSULTAR ESTADO" link={statusLink} />
      {/* <a href={`/oneclick-mall/status?buy_order=${buyOrder}`}></a> */}
    </div>
  );
};
