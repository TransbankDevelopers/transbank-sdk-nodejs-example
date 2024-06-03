"use client";
import { Button } from "@/components/button/Button";

type StatusButtonProps = {
  token: string;
  className?: string;
};

export const StatusButton = ({ token, className }: StatusButtonProps) => {
  const statusLink = {
    pathname: `/transaccion-completa-diferido/status`,
    query: {
      token: token,
    },
  };

  return (
    <div className={`flex-start ${className}`}>
      <Button text="CONSULTAR ESTADO" link={statusLink} />
    </div>
  );
};
