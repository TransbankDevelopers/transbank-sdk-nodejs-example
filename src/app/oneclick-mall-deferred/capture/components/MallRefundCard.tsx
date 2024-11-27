"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { TransactionDetail } from "@/types/transactions";
import { useState } from "react";

export type MallRefundCardProps = {
  buyOrder: string;
  detail: TransactionDetail;
};

export const MallRefundCard = (props: MallRefundCardProps) => {
  const [refundAmount, setRefundAmount] = useState<number>(
    Number(props.detail.amount || 0)
  );

  const handleRefund = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setRefundAmount(parseFloat(value));
  };

  const refundLink = {
    pathname: `/oneclick-mall/refund`,
    query: {
      buy_order: props.buyOrder,
      child_commerce_code: props.detail.commerce_code,
      child_buy_order: props.detail.buy_order,
      amount: refundAmount,
    },
  };

  return (
    <Card className="refund-card">
      <div className="refund-card-inputs">
        <InputText label="Orden compra" value={props.buyOrder} />
        <InputText
          label="Código de comercio:"
          value={props.detail.commerce_code}
        />
        <InputText
          label="Orden de compra (tienda):"
          value={props.detail.buy_order}
        />
        <InputText
          label="Monto a reembolsar:"
          value={props.detail.amount}
          onChange={handleRefund}
        />
      </div>
      <div className="button-container">
        <Button text="REEMBOLSAR" className="small-button" link={refundLink} />
      </div>
    </Card>
  );
};
