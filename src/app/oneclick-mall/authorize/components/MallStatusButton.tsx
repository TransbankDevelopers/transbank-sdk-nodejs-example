"use client";
import { Button } from "@/components/button/Button";

export type MallStatusButtonProps = {
  buyOrder: string;
  isDeferred?: boolean;
};
export const MallStatusButton = (props: MallStatusButtonProps) => {
  const { isDeferred = false } = props;

  const getTRXStatusLink = () => {
    const url = isDeferred ? "/oneclick-mall-deferred" : "/oneclick-mall";
    return {
      pathname: `${url}/status`,
      query: {
        buy_order: props.buyOrder,
      },
    };
  };

  return (
    <div className="flex-start">
      <Button text="CONSULTAR ESTADO" link={getTRXStatusLink()} />
    </div>
  );
};
