"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";

export type captureProps = {
  token: string;
  buyOrder: string;
  authorizationCode: string;
  amount: number;
};

export const CaptureCard = ({
  token,
  buyOrder,
  authorizationCode,
  amount,
}: captureProps) => {
  const [captureAmount, setCaptureAmount] = useState<number>(amount || 0);

  const handleCapture = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setCaptureAmount(parseFloat(value));
  };

  const captureLink = {
    pathname: `/transaccion-completa-diferido/capture`,
    query: {
      token: token,
      buyOrder: buyOrder,
      authorizationCode: authorizationCode,
      captureAmount: captureAmount,
    },
  };

  return (
    <Card className="tbk-tx-card">
      <InputText
        label="Monto"
        value={captureAmount}
        onChange={handleCapture}
      />

      <Button text="CAPTURAR" className="button" link={captureLink} />
    </Card>
  );
};
