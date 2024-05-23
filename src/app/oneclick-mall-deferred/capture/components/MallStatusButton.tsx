"use client";
import { Button } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export type MallStatusButtonProps = {
  buyOrder: string;
};
export const MallStatusButton = (props: MallStatusButtonProps) => {
  const router = useRouter();

  const handleGoToTRXStatus = () => {
    router.push(`/oneclick-mall/status?buy_order=${props.buyOrder}`);
  };

  return (
    <div className="flex-start">
      <Button text="CONSULTAR ESTADO" onClick={handleGoToTRXStatus} />
    </div>
  );
};
