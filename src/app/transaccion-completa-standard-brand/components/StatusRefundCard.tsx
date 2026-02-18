"use client";

import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";

export type StatusRefundCardProps = {
  token: string;
  amount: number;
};

export const StatusRefundCard = ({ token, amount }: StatusRefundCardProps) => {
  const [refundAmount, setRefundAmount] = useState<number>(amount || 0);

  const handleRefund = (value: string) => {
    if (Number.isNaN(Number.parseFloat(value))) return;
    setRefundAmount(Number.parseFloat(value));
  };

  const statusLink = {
    pathname: "/transaccion-completa-standard-brand/status",
    query: {
      token,
    },
  };

  const refundLink = {
    pathname: "/transaccion-completa-standard-brand/refund",
    query: {
      token,
      amount: refundAmount,
    },
  };

  return (
    <Card className="tbk-tx-card">
      <InputText
        label="Monto a reembolsar"
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
