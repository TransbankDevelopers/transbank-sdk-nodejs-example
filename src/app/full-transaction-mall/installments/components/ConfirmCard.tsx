"use client";
import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";
import "./ConfirmCard.css";

type ConfirmCardProps = {
  idQueryInstallments: string;
  token: string;
};

type ConfirmCardState = {
  idQueryInstallments: string;
  deferredPeriodIndex: string;
  gracePeriod: string;
  token: string;
};

export const ConfirmCard = (props: ConfirmCardProps) => {
  const [installmentsData, setInstallmentsData] = useState<ConfirmCardState>({
    token: props.token,
    idQueryInstallments: props.idQueryInstallments,
    deferredPeriodIndex: "",
    gracePeriod: "",
  });

  const handleInputChange = (value: string, name?: string) => {
    setInstallmentsData({
      ...installmentsData,
      [name as string]: value,
    });
  };

  const linkCommit = {
    pathname: "/full-transaction-mall/commit",
    query: {
      token_ws: props.token,
      id_query_installments: installmentsData.idQueryInstallments,
      deferred_period_index: installmentsData.deferredPeriodIndex,
      grace_period: installmentsData.gracePeriod,
    },
  };

  return (
    <Card className="confirm-card">
      <InputText
        label="Token"
        name="token"
        value={installmentsData.token}
        onChange={handleInputChange}
      />
      <InputText
        label="ID de consulta de cuotas (Opcional)"
        name="idQueryInstallments"
        value={installmentsData.idQueryInstallments}
        onChange={handleInputChange}
      />
      <InputText
        label="Indice de periodo diferido (opcional)"
        name="deferredPeriodIndex"
        value={installmentsData.deferredPeriodIndex}
        onChange={handleInputChange}
      />
      <InputText
        label="Periodo de gracia (opcional)"
        name="gracePeriod"
        value={installmentsData.gracePeriod}
        onChange={handleInputChange}
      />
      <div className="mt-4 button-container">
        <Button text="CONFIRMAR TRANSACCION" link={linkCommit} />
      </div>
    </Card>
  );
};
