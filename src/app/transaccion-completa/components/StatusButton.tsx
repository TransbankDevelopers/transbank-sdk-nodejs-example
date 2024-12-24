"use client";
import { Button } from "@/components/button/Button";

export type StatusButtonProps = {
  token: string;
  className?: string;
};
export const StatusButton = ({ token, className }: StatusButtonProps) => {
  const statusLink = {
    pathname: `/transaccion-completa/status`,
    query: {
      token,
    },
  };

  return (
    <div className={`flex-start ${className}`}>
      <Button text="CONSULTAR ESTADO" link={statusLink} />
    </div>
  );
};
