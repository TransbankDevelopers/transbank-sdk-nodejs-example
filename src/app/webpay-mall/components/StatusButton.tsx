"use client";
import { Button } from "@/components/button/Button";

export type StatusButtonProps = {
  token: string;
  className?: string;
};
export const StatusButton = ({ token, className }: StatusButtonProps) => {
  const statusLink = {
    pathname: `/webpay-mall/status`,
    query: {
      token_ws: token,
    },
  };

  return (
    <div className={`flex-start ${className}`}>
      <Button text="CONSULTAR ESTADO" link={statusLink} />
    </div>
  );
};
