"use client";
import { Button } from "@/components/button/Button";

export type StatusButtonProps = {
  token: string;
  className?: string;
};
export const StatusButton = ({ token, className }: StatusButtonProps) => {
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
