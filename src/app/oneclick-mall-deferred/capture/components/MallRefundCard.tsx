"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { TransactionDetail } from "@/types/transactions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type MallRefundCardProps = {
  buyOrder: string;
  detail: TransactionDetail;
};

export const MallRefundCard = (props: MallRefundCardProps) => {
  const router = useRouter();
  const [refundAmount, setRefundAmount] = useState<number>(
    Number(props.detail.amount || 0)
  );

  const handleRefund = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setRefundAmount(parseFloat(value));
  };

  const handleGoToTRXRefund = () => {
    router.push(
      `/oneclick-mall/refund?buy_order=${props.buyOrder}&child_commerce_code=${props.detail.commerce_code}&child_buy_order=${props.detail.buy_order}&amount=${refundAmount}`
    );
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
          label="Orden de compra (tienda hija):"
          value={props.detail.buy_order}
        />
        <InputText
          label="Monto a reembolsar:"
          value={props.detail.amount}
          onChange={handleRefund}
        />
      </div>
      <div className="button-container">
        <Button
          text="REEMBOLSAR"
          className="small-button"
          onClick={handleGoToTRXRefund}
        />
      </div>

      {/* <div className="refund-card-title">
        <span>Orden De Compra: </span>
        <span className="value">{`${props.detail.buy_order}`}</span>
        <span className="mx-4">Codigo Comercio: </span>
        <span className="value">{`${props.detail.commerce_code}`}</span>
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
      </div> */}
    </Card>
  );
};
