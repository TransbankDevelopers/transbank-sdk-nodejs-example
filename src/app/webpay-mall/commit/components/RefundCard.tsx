"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RefundAndStatusProps } from "@/types/transactions";

export const RefundCard = ({
  token,
  amount,
  buyOrder,
  commerceCode,
}: RefundAndStatusProps) => {
  const router = useRouter();
  const [refundAmount, setRefundAmount] = useState<number>(Number(amount || 0));

  const handleRefund = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setRefundAmount(parseFloat(value));
  };

  const handleGoToTRXRefund = () => {
    router.push(
      `/webpay-mall/refund?token_ws=${token}&amount=${refundAmount}&buyOrder=${buyOrder}&commerceCode=${commerceCode}`
    );
  };

  return (
    <Card className="refund-card">
      <div className="refund-card-title">
        Orden De Compra <span className="value">{`${buyOrder}`}</span>
      </div>
      <InputText
        label="Monto a reembolsar:"
        value={refundAmount}
        onChange={handleRefund}
      />
      <div className="button-container">
        <Button
          text="REEMBOLSAR"
          className="small-button"
          onClick={handleGoToTRXRefund}
        />
      </div>
    </Card>
  );
};
