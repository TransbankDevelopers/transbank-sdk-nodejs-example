"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";

export type ConfirmCardProps = {
  token: string;
};

export const ConfirmCard = ({ token }: ConfirmCardProps) => {
  const [txInstallments, setTxInstallments] = useState<number>(3);

  const handleRefund = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setTxInstallments(parseFloat(value));
  };

  const commitLink = {
    pathname: `/transaccion-completa/commit`,
    query: {
      token: token,
    },
  };

  const installmentsLinks = {
    pathname: `/transaccion-completa/installments`,
    query: {
      token: token,
      installments: txInstallments,
    },
  };

  return (
    <Card className="tbk-tx-card">
      <InputText
        label="N° de cuotas"
        value={txInstallments}
        onChange={handleRefund}
      />
      <div className="button-container">
        <Button
          text="HACER CONSULTA DE CUOTAS"
          className="button"
          link={installmentsLinks}
        />
        <Button text="CONFIRMAR" className="button" link={commitLink} />
      </div>
    </Card>
  );
};
