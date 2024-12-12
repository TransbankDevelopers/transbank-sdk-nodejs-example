"use client";
import { Button } from "@/components/button/Button";

export type StatusButtonProps = {
  token: string;
  className?: string;
};
export const StatusButton = ({ token, className }: StatusButtonProps) => {
  console.log(token)
  const getTRXStatusLink = () => {
    return {
      pathname: `/webpay-mall-diferido/status`,
      query: {
        token_ws: token,
      },
    };
  };

  return (
    <div className={`flex-start ${className}`}>
      <Button text="CONSULTAR ESTADO" link={getTRXStatusLink()} />
    </div>
  );
};
