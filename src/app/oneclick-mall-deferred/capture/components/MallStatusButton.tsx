"use client";
import { Button } from "@/components/button/Button";

export type MallStatusButtonProps = {
  buyOrder: string;
};
export const MallStatusButton = (props: MallStatusButtonProps) => {
  const statusLink = {
    pathname: `/oneclick-mall/status`,
    query: {
      buy_order: props.buyOrder,
    },
  };

  return (
    <div className="flex-start">
      <Button text="CONSULTAR ESTADO" link={statusLink} />
    </div>
  );
};
