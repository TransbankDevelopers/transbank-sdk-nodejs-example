"use client";

import React, { useState, useTransition } from "react";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Snippet } from "@/components/snippet/Snippet";
import { InputText } from "@/components/input/InputText";

export default function ApiRefOneclickRefund() {
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await fetch(
          "/api/oneclick-mall/getRefundTransaction",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await response.json();

        if (!response.ok) {
          const errorMessage = data.error || "Error desconocido.";
          setResult(`Error: ${errorMessage}`);
          return;
        }

        const formatedData = JSON.stringify(data, null, 2);

        setResult(formatedData);
      } catch (error) {
        console.error(error);
      }
    });
  };

  return (
    <Card className="card-pay">
      <span className="large-title">Formulario de Anulacion o Reversa</span>
      <form action={handleSubmit}>
        <div className="inp-container-card">
          <InputText name="buyOrder" label="Orden de compra(buy_order)" />
          <InputText isNumber name="amount" label="Monto" />
        </div>
        <div className="button-container">
          <Button
            text="Refund"
            className="button"
            type={ButtonTypes.SUBMIT}
            loading={isPending}
          />
        </div>
      </form>
      {isPending && <p>Cargando...</p>}

      {!isPending && result && <Snippet code={result} />}
    </Card>
  );
}
