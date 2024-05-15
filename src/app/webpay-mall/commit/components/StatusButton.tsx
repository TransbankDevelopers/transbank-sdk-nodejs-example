"use client";
import { Button } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export type StatusButtonProps = {
  token: string;
};
export const StatusButton = ({ token }: StatusButtonProps) => {
  const router = useRouter();

  const handleGoToTRXStatus = () => {
    router.push(`/webpay-mall/status?token_ws=${token}`);
  };

  return (
    <div className="flex-start">
      <Button text="CONSULTAR ESTADO" onClick={handleGoToTRXStatus} />
    </div>
  );
};
