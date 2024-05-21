"use client";
import { Button } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export type StatusButtonProps = {
  token: string;
  className?: string;
};
export const StatusButton = ({ token, className }: StatusButtonProps) => {
  const router = useRouter();

  const handleGoToTRXStatus = () => {
    router.push(`/webpay-mall-diferido/status?token_ws=${token}`);
  };

  return (
    <div className={`flex-start ${className}`}>
      <Button text="CONSULTAR ESTADO" onClick={handleGoToTRXStatus} />
    </div>
  );
};
