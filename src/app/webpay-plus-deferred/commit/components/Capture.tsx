"use client";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { TBKCommitTransactionResponse } from "@/types/transactions";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type CaptureProps = {
  token_ws: string;
  commitResponse: TBKCommitTransactionResponse;
};

export const Capture = (props: CaptureProps) => {
  const router = useRouter();
  const { token_ws, commitResponse } = props;
  const [refundAmount, setRefundAmount] = useState<number>(
    Number(props.commitResponse.amount || 0)
  );

  const handleNavigateToCapture = () => {
    router.push(
      `/webpay-plus-deferred/capture?token_ws=${token_ws}&buyOrder=${commitResponse?.buy_order}&authorizationCode=${commitResponse?.authorization_code}&captureAmount=${refundAmount}`
    );
  };

  const handleCaptureAmountChange = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setRefundAmount(parseFloat(value));
  };

  return (
    <Card className="card-pay">
      <span className="title">
        Capturar la transacción para realmente capturar el dinero que habia sido
        previamente reservado.
      </span>
      <InputText
        label="Monto a capturar"
        value={refundAmount}
        onChange={handleCaptureAmountChange}
      />
      <div className="button-container">
        <Button
          text="CAPTURAR"
          className="button"
          type={ButtonTypes.SUBMIT}
          onClick={handleNavigateToCapture}
        />
      </div>
    </Card>
  );
};
