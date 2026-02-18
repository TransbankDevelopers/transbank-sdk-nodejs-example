"use client";

import { Button } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";
import "./ConfirmCard.css";

type ConfirmCardProps = {
  token: string;
  buyOrder: string;
  commerceCode: string;
  idQueryInstallments: string;
};

type ConfirmCardState = {
  token: string;
  buyOrder: string;
  commerceCode: string;
  idQueryInstallments: string;
};

export const ConfirmCard = ({
  token,
  buyOrder,
  commerceCode,
  idQueryInstallments,
}: ConfirmCardProps) => {
  const [installmentsData, setInstallmentsData] = useState<ConfirmCardState>({
    token,
    buyOrder,
    commerceCode,
    idQueryInstallments,
  });

  const handleInputChange = (value: string, name?: string) => {
    if (!name) return;
    setInstallmentsData({
      ...installmentsData,
      [name]: value,
    });
  };

  const linkCommit = {
    pathname: "/transaccion-completa-standard-brand/commit",
    query: {
      token: installmentsData.token,
      buy_order: installmentsData.buyOrder,
      commerce_code: installmentsData.commerceCode,
      id_query_installments: installmentsData.idQueryInstallments,
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
        label="Buy Order"
        name="buyOrder"
        value={installmentsData.buyOrder}
        onChange={handleInputChange}
      />
      <InputText
        label="Commerce Code"
        name="commerceCode"
        value={installmentsData.commerceCode}
        onChange={handleInputChange}
      />
      <InputText
        label="ID de consulta de cuotas (Opcional)"
        name="idQueryInstallments"
        value={installmentsData.idQueryInstallments}
        onChange={handleInputChange}
      />
      <div className="mt-4 button-container">
        <Button text="CONFIRMAR TRANSACCION" link={linkCommit} />
      </div>
    </Card>
  );
};
