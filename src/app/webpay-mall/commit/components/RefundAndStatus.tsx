"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { RefundAndStatusProps } from "@/types/transactions";

export const RefundAndStatus = ({
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

  const handleGoToTRXStatus = () => {
    router.push(`/webpay-plus/status?token_ws=${token}`);
  };

  const handleGoToTRXRefund = () => {
    router.push(
      `/webpay-plus/refund?token_ws=${token}&amount=${refundAmount}&buyOrder=${buyOrder}&commerceCode=${commerceCode}`
    );
  };

  return (
    <Card className="refund-card">
      <InputText
        label="Monto a reembolsar:"
        value={refundAmount}
        onChange={handleRefund}
      />
      <div className="button-container">
        <Button
          text="REEMBOLSAR"
          className="button"
          onClick={handleGoToTRXRefund}
        />
        <Button
          text="CONSULTAR ESTADO"
          className="button"
          onClick={handleGoToTRXStatus}
        />
      </div>
    </Card>
  );
};
