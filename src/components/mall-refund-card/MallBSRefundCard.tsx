"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";
import "./MallRefundCard.css";

export type RefundCardDetail = {
  amount: number;
  commerce_code: string;
  buy_order: string;
};

export type MallBsRefundCardProps = {
  detail: RefundCardDetail;
  productLink?: string;
  token?: string;
};

export const MallBSRefundCard = (props: MallBsRefundCardProps) => {
  const { productLink } = props;
  const [refundAmount, setRefundAmount] = useState<number>(
    Number(props.detail.amount || 0),
  );

  const handleRefund = (value: string) => {
    if (Number.isNaN(Number.parseFloat(value))) return;
    setRefundAmount(Number.parseFloat(value));
  };

  const trxRefundLink = {
    pathname: `${productLink}/refund`,
    query: {
      child_commerce_code: props.detail.commerce_code,
      child_buy_order: props.detail.buy_order,
      amount: refundAmount,
      token: props.token,
    },
  };

  return (
    <Card className="refund-card">
      <div className="refund-card-inputs">
        <InputText
          label="Orden de compra tienda:"
          value={props.detail.buy_order}
        />
        <InputText
          label="Código de comercio:"
          value={props.detail.commerce_code}
        />
        <InputText
          label="Monto a reembolsar:"
          value={refundAmount}
          onChange={handleRefund}
        />
      </div>
      <div className="button-container">
        <Button
          text="REEMBOLSAR"
          className="small-button"
          link={trxRefundLink}
        />
      </div>
    </Card>
  );
};
