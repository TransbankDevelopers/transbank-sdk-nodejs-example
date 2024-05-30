"use client";
import { Button } from "@/components/button/Button";

export type MallStatusButtonProps = {
  token?: string;
  buyOrder?: string;
  isDeferred?: boolean;
  productLink?: string;
};
export const MallStatusButton = (props: MallStatusButtonProps) => {
  const { isDeferred = false, productLink = "/oneclick-mall" } = props;

  const getTRXStatusLink = () => {
    const url = `${productLink}${isDeferred ? "-deferred" : ""}`;
    const query = props.token
      ? { token_ws: props.token }
      : {
          buy_order: props.buyOrder,
        };

    return {
      pathname: `${url}/status`,
      query,
    };
  };

  return (
    <div className="flex-start">
      <Button text="CONSULTAR ESTADO" link={getTRXStatusLink()} />
    </div>
  );
};
