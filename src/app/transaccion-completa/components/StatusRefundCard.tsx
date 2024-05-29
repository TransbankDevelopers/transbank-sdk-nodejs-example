"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";

export type ConfirmCardProps = {
  token: string;
  amount: number;
};

export const StatusRefundCard = ({ token, amount }: ConfirmCardProps) => {
  const [refundAmount, setRefundAmount] = useState<number>(amount || 0);

  const handleRefund = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setRefundAmount(parseFloat(value));
  };

  const statusLink = {
    pathname: `/transaccion-completa/status`,
    query: {
      token: token,
    },
  };

  const refundmentsLinks = {
    pathname: `/transaccion-completa/refund`,
    query: {
      token: token,
      installments: refundAmount,
    },
  };

  return (
    <Card className="tbk-tx-card">
      <InputText
        label="N° de cuotas"
        value={refundAmount}
        onChange={handleRefund}
      />
      <div className="button-container">
        <Button text="REEMBOLSAR" className="button" link={refundmentsLinks} />
        <Button text="CONSULTAR ESTADO" className="button" link={statusLink} />
      </div>
    </Card>
  );
};
