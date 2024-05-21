"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { CaptureProps } from "@/types/transactions";

export const CaptureCard = ({
  token,
  amount,
  buyOrder,
  commerceCode,
  authorizationCode,
}: CaptureProps) => {
  const router = useRouter();
  const [captureAmount, setCaptureAmount] = useState<number>(
    Number(amount || 0)
  );

  const handleRefund = (value: string) => {
    // if (isNaN(parseFloat(value))) return;
    // setCaptureAmount(parseFloat(value));
  };

  const handleGoToTRXCapture = () => {
    router.push(
      `/webpay-mall-diferido/capture?token_ws=${token}&captureAmount=${captureAmount}&buyOrder=${buyOrder}&childCommerceCode=${commerceCode}&authorizationCode=${authorizationCode}`
    );
  };

  return (
    <Card className="refund-card">
      <div className="refund-card-title">
        Orden De Compra <span className="value">{`${buyOrder}`}</span>
      </div>
      <InputText
        label="Monto a Capturar:"
        value={captureAmount}
        onChange={handleRefund}
      />
      <div className="button-container">
        <Button
          text="Capturar"
          className="small-button"
          onClick={handleGoToTRXCapture}
        />
      </div>
    </Card>
  );
};
