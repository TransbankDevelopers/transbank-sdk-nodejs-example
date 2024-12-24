"use client";
import { Button } from "@/components/button/Button";

export type StatusButtonProps = {
  token: string;
  className?: string;
};
export const StatusButton = ({ token, className }: StatusButtonProps) => {
  const statusLink = {
    pathname: `/transaccion-completa-mall/status`,
    query: {
      token_ws: token,
    },
  };

  return (
    <div className={`flex-start ${className}`}>
      <Button text="CONSULTAR ESTADO" link={statusLink} />
      {/* <a href={`/oneclick-mall/status?buy_order=${token}`}></a> */}
    </div>
  );
};
