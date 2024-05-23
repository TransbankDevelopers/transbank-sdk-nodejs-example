"use client";
import { Button } from "@/components/button/Button";
import { useRouter } from "next/navigation";

export type MallStatusButtonProps = {
  buyOrder: string;
  isDeferred?: boolean;
};
export const MallStatusButton = (props: MallStatusButtonProps) => {
  const router = useRouter();
  const { isDeferred = false } = props;

  const handleGoToTRXStatus = () => {
    router.push(
      `/oneclick-mall${isDeferred ? "-deferred" : ""}/status?buy_order=${
        props.buyOrder
      }`
    );
  };

  return (
    <div className="flex-start">
      <Button text="CONSULTAR ESTADO" onClick={handleGoToTRXStatus} />
    </div>
  );
};
