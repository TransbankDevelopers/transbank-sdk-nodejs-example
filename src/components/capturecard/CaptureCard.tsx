"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";
import { Text, TextVariant } from "../text/Text";
import "./CaptureCard.css";

export type CaptureProps = {
  token: string;
  childCommerceCode: string;
  childBuyOrder: string;
  authorizationCode: string;
  amount: number;
  showCommerceCode?: boolean;
  captureLink: string;
  parentBuyOrder?: string;
};

export const CaptureCard = (props: CaptureProps) => {
  const [captureAmount, setCaptureAmount] = useState<number>(
    Number(props.amount || 0)
  );

  const handleRefund = (value: string) => {
    if (isNaN(Number(value))) return;
    setCaptureAmount(Number(value));
  };

  const getCaptureLink = () => {
    const query: Record<string, string | number> = {
      captureAmount,
      childBuyOrder: props.childBuyOrder,
      childCommerceCode: props.childCommerceCode,
      authorizationCode: props.authorizationCode,
      token_ws: props.token,
    };

    if (props.parentBuyOrder) {
      query.parentBuyOrder = props.parentBuyOrder;
    }

    return {
      pathname: props.captureLink,
      query,
    };
  };

  return (
    <Card className="refund-card">
      <div>
        {props.showCommerceCode ? (
          <>
            <Text
              className="refund-card-title-alt"
              variant={TextVariant.PARAGRAPH}
            >
              Codigo de Comercio: <b>{props.childCommerceCode}</b>
            </Text>
            <Text
              className="refund-card-title-alt"
              variant={TextVariant.PARAGRAPH}
            >
              Orden de Compra: <b>{props.childBuyOrder}</b>
            </Text>
          </>
        ) : (
          <div className="refund-card-title">
            Orden De Compra{" "}
            <span className="value">{`${props.childBuyOrder}`}</span>
          </div>
        )}
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
          link={getCaptureLink()}
        />
      </div>
    </Card>
  );
};
