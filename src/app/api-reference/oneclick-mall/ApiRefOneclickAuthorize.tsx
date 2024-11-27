"use client";
import React, { useState, useTransition } from "react";
import Image from "next/image";

import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Snippet } from "@/components/snippet/Snippet";
import { InputText } from "@/components/input/InputText";

export default function ApiRefOneclickAuthorize() {
  const [result, setResult] = useState("");
  const [isPending, startTransition] = useTransition();
  const [numberOfStores, setNumberOfStores] = React.useState(1);

  const handleSubmit = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await fetch(
          "/api/oneclick-mall/authorizeTransaction",
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

  const addDetail = () => {
    if (numberOfStores < 2) {
      setNumberOfStores(numberOfStores + 1);
    }
  };

  const removeDetail = () => {
    if (numberOfStores > 1) {
      setNumberOfStores(numberOfStores - 1);
    }
  };

  return (
    <Card className="card-pay">
      <span className="large-title">Transaction.authorize()</span>
      <form action={handleSubmit}>
        <div className="inp-container-card">
          <div className="tbk-input-group">
            <InputText name="userName" label="username" />
            <InputText name="tbkUser" label="tbk_user" />
            <InputText name="buyOrder" label="Orden de compra" />
          </div>

          {Array.from({ length: numberOfStores }, (_, index) => (
            <div className="card-group" key={index}>
              <h3 className="mb-6">Tienda {index + 1}</h3>
              <div className="tbk-input-group">
                <InputText
                  name={`details[${index}][commerce_code]`}
                  label={`Commerce Code(tienda ${index + 1})`}
                />
                <InputText
                  name={`details[${index}][buy_order]`}
                  label={`Buy Order(tienda ${index + 1})`}
                />
                <InputText name={`details[${index}][amount]`} label="Amount" />
                <InputText
                  name={`details[${index}][installments_number]`}
                  label="Installments Number"
                />
              </div>
            </div>
          ))}
          {numberOfStores === 1 ? (
            <button type="button" className="add-btn" onClick={addDetail}>
              Agregar tienda{" "}
              <Image
                unoptimized
                src="/add-circle.svg"
                alt="add circle"
                width={18}
                height={18}
              />
            </button>
          ) : (
            <button type="button" className="add-btn" onClick={removeDetail}>
              Remover tienda{" "}
              <Image
                unoptimized
                src="/delete.svg"
                alt="add circle"
                width={18}
                height={18}
              />
            </button>
          )}
        </div>
        <div className="button-container">
          <Button
            text="Authorize"
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
