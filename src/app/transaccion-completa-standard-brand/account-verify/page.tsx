"use client";

import { useState, useTransition } from "react";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Snippet } from "@/components/snippet/Snippet";

const actualBread: Route[] = [
  { name: "Inicio", path: "/" },
  {
    name: "Transaccion Completa Estándar Marca ",
    path: "/transaccion-completa-standard-brand",
  },
  {
    name: "Verificar Cuenta",
    path: "/transaccion-completa-standard-brand/account-verify",
  },
];

const navigationItems: NavigationItem[] = [
  { title: "Formulario", sectionId: "formulario" },
  { title: "Respuesta", sectionId: "respuesta" },
];

type SelectFieldProps = {
  label: string;
  name: string;
  value: string;
  onChange: (value: string, name?: string) => void;
  options: Array<{ value: string; label: string }>;
};

const SelectField = ({ label, name, value, onChange, options }: SelectFieldProps) => (
  <div className="flex-col">
    <span className="tbk-label mb-2">{label}</span>
    <select
      name={name}
      value={value}
      onChange={(e) => onChange(e.target.value, e.target.name)}
      className="tbk-input-text"
    >
      {options.map((option) => (
        <option key={`${name}-${option.label}`} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

export default function StandardBrandAccountVerifyPage() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    card_number: "4051885600446623",
    card_expiration_date: "31/12",
    cvv: "123",
    eci: "",
    authentication_value: "",
    trans_status: "",
    message_version: "",
    ds_trans_id: "",
    commerce_code:
      process.env.TRANSACCION_COMPLETA_MALL_STANDARD_BRAND_CHILD_CC || "",
  });

  const handleChange = (value: string, name?: string) => {
    if (!name) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    setResult("");

    if (
      !form.card_number ||
      !form.card_expiration_date ||
      !form.cvv ||
      !form.commerce_code
    ) {
      setError("Completa los campos obligatorios antes de continuar.");
      return;
    }

    startTransition(async () => {
      try {
        const response = await fetch(
          "/api/transaccion-completa-standard-brand/account-verify",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          },
        );

        const data = await response.json();
        if (!response.ok) {
          setError(data.error || "Error desconocido.");
          return;
        }

        setResult(JSON.stringify(data, null, 2));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Error inesperado.");
      }
    });
  };

  return (
    <>
      <Head>
        <title>Transaccion Completa Estándar Marca - Verificacion</title>
      </Head>
      <Layout
        pageTitle="Transaccion Completa Estándar Marca  - Verificacion"
        pageDescription="Ejecuta la verificacion de cuenta con los datos de la tarjeta."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-standard-brand/account-verify"
        navigationItems={navigationItems}
        additionalContent={
          <div className="flex-col gap-6">
            <Card className="tbk-tx-card column-card">
              <div id="formulario" className="flex-col gap-4">
                <InputText
                  label="Numero de tarjeta"
                  name="card_number"
                  value={form.card_number}
                  onChange={handleChange}
                />
                <InputText
                  label="Fecha expiracion (MM/YY)"
                  name="card_expiration_date"
                  value={form.card_expiration_date}
                  onChange={handleChange}
                />
                <InputText
                  label="CVV"
                  name="cvv"
                  value={form.cvv}
                  onChange={handleChange}
                />
                <SelectField
                  label="ECI"
                  name="eci"
                  value={form.eci}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "null - Transacción no autenticada" },
                    { value: "05", label: "VISA 05" },
                    { value: "06", label: "VISA 06" },
                    { value: "02", label: "MASTERCARD 02" },
                    { value: "01", label: "MASTERCARD 01" },
                    { value: "05", label: "AMEX 05" },
                    { value: "06", label: "AMEX 06" },
                  ]}
                />
                <InputText
                  label="Authentication value"
                  name="authentication_value"
                  value={form.authentication_value}
                  onChange={handleChange}
                />
                <SelectField
                  label="Transaction status"
                  name="trans_status"
                  value={form.trans_status}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "No autenticada (null)" },
                    { value: "C", label: "C - Desafio requerido" },
                    { value: "Y", label: "Y - Elegible/Exitosa" },
                    { value: "A", label: "A - Intento de autenticacion" },
                    { value: "N", label: "N - No autenticada/Denegada" },
                    { value: "R", label: "R - Autenticacion rechazada" },
                    { value: "D", label: "D - Desafio desacoplado" },
                    { value: "U", label: "U - No se pudo autenticar" },
                    { value: "I", label: "I - Informativo/Exencion" },
                  ]}
                />
                <InputText
                  label="Message version"
                  name="message_version"
                  value={form.message_version}
                  onChange={handleChange}
                />
                <InputText
                  label="DS Trans ID"
                  name="ds_trans_id"
                  value={form.ds_trans_id}
                  onChange={handleChange}
                />
                <InputText
                  label="Codigo de comercio"
                  name="commerce_code"
                  value={form.commerce_code}
                  onChange={handleChange}
                />
                <div className="button-container">
                  <Button
                    text="VERIFICAR CUENTA"
                    className="button"
                    type={ButtonTypes.BUTTON}
                    loading={isPending}
                    onClick={handleSubmit}
                  />
                </div>
              </div>
            </Card>

            <div id="respuesta" className="flex-col gap-2">
              {isPending && <p>Cargando...</p>}
              {!isPending && error && <p>{error}</p>}
              {!isPending && result && <Snippet code={result} />}
            </div>
          </div>
        }
      />
    </>
  );
}
