"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";

export type RefundAndStatusProps = {
  token: string;
  amount: string | number;
};

export const RefundAndStatus = ({ token, amount }: RefundAndStatusProps) => {
  const [refundAmount, setRefundAmount] = useState<number>(Number(amount || 0));

  const handleRefund = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setRefundAmount(parseFloat(value));
  };

  const statusLink = {
    pathname: `/webpay-plus-deferred/status`,
    query: {
      token_ws: token,
    },
  };

  const refundLink = {
    pathname: `/webpay-plus-deferred/refund`,
    query: {
      token_ws: token,
      amount: refundAmount,
    },
  };

  return (
    <Card className="refund-card">
      <InputText
        label="Monto a reembolsar:"
        value={refundAmount}
        onChange={handleRefund}
      />
      <div className="button-container">
        <Button text="REEMBOLSAR" className="button" link={refundLink} />
        <Button text="CONSULTAR ESTADO" className="button" link={statusLink} />
      </div>
    </Card>
  );
};
