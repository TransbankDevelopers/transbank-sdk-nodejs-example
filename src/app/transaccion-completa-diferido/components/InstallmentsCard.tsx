"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";

export type ConfirmCardProps = {
  token: string;
  idQueryInstallments: string;
};

export const InstallmentsCard = ({
  token,
  idQueryInstallments,
}: ConfirmCardProps) => {
  const [installmentValues, setInstallmentValues] = useState({
    token: token,
    idQueryInstallments: idQueryInstallments,
  });

  const handleChange = (value: string, name?: string) => {
    if (!name) return;
    setInstallmentValues((prevState) => ({ ...prevState, [name]: value }));
  };

  const commitLink = {
    pathname: `/transaccion-completa-diferido/commit`,
    query: {
      token: installmentValues.token,
      idQueryInstallments: installmentValues.idQueryInstallments,
    },
  };

  return (
    <Card className="tbk-tx-card column-card">
      <InputText
        label="Token"
        value={installmentValues.token}
        name="token"
        onChange={handleChange}
      />
      <InputText
        label="ID de consulta de cuotas (Opcional)"
        value={installmentValues.idQueryInstallments}
        name="idQueryInstallments"
        onChange={handleChange}
      />
      <div className="button-container">
        <Button
          text="CONFIRMAR TRANSACCIÓN"
          className="button"
          link={commitLink}
        />
      </div>
    </Card>
  );
};
