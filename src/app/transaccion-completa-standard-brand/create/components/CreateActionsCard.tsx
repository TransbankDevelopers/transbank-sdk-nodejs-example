"use client";

import { useState } from "react";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { Button } from "@/components/button/Button";

export type CreateActionsCardProps = {
  token?: string;
  buyOrder?: string;
  commerceCode?: string;
  amount?: string;
};

export const CreateActionsCard = ({
  token,
  buyOrder,
  commerceCode,
  amount,
}: CreateActionsCardProps) => {
  const [installmentsNumber, setInstallmentsNumber] = useState<number>(3);

  const handleInstallments = (value: string) => {
    if (Number.isNaN(Number.parseFloat(value))) return;
    setInstallmentsNumber(Number.parseFloat(value));
  };

  const installmentsLink = {
    pathname: "/transaccion-completa-standard-brand/installments",
    query: {
      token,
      buy_order: buyOrder || "",
      commerce_code: commerceCode || "",
      amount: amount || "",
      installments_number: installmentsNumber,
    },
  };

  const commitLink = {
    pathname: "/transaccion-completa-standard-brand/commit",
    query: {
      token,
      buy_order: buyOrder || "",
      commerce_code: commerceCode || "",
      amount: amount || "",
    },
  };

  return (
    <Card className="commit-card">
      <InputText
        label="N de Cuotas"
        isNumber
        value={installmentsNumber}
        onChange={handleInstallments}
      />
      <div className="button-container">
        <Button text="CONSULTAR CUOTAS" link={installmentsLink} />
        <Button text="CONFIRMAR" link={commitLink} />
      </div>
    </Card>
  );
};
