"use client";

import { useMemo, useState } from "react";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { Button } from "@/components/button/Button";
import { generateRandomTxCompletaData } from "@/helpers/transactions/transactionHelper";
import { CreditCard, CreditCardState } from "@/components/creditcard/CreditCard";
import { Focused } from "react-credit-cards-2";

const actualBread: Route[] = [
  { name: "Inicio", path: "/" },
  {
    name: "Transacción Completa Estándar Marca",
    path: "/transaccion-completa-standard-brand",
  },
];

const navigationItems: NavigationItem[] = [
  { title: "Formulario", sectionId: "formulario" },
];

const buildChildBuyOrder = () =>
  `O-${crypto.randomUUID().replaceAll("-", "").slice(0, 6)}`;

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

export default function TransaccionCompletaStandardBrandPage() {
  const randomData = useMemo(() => generateRandomTxCompletaData(), []);
  const [cardState, setCardState] = useState<CreditCardState>({
    number: "4051885600446623",
    expiry: "31/12",
    cvc: "123",
    name: "Transbank User",
    focus: "number",
  });

  const [form, setForm] = useState({
    buy_order: randomData.buyOrder,
    session_id: randomData.sessionId,
    detail_amount: String(randomData.amount),
    detail_commerce_code:
      process.env.TRANSACCION_COMPLETA_MALL_STANDARD_BRAND_CHILD_CC || "",
    detail_buy_order: buildChildBuyOrder(),
    detail_post_entry_mod: "810",
    detail_eci: "",
    detail_authentication_value: "",
    detail_message_version: "",
    detail_trans_status: "",
    detail_ds_trans_id: "",
    detail_authentication_type: "",
    detail_identify_initiated_trx: "",
    detail_pmnt_ind: "",
    detail_recur_pmnt: "",
  });

  const handleChange = (value: string, name?: string) => {
    if (!name) return;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInputChange = (value: string, name: string) => {
    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardInputFocus = (name: string) => {
    setCardState((prev) => ({
      ...prev,
      focus: name as Focused,
    }));
  };

  const createLink = {
    pathname: "/transaccion-completa-standard-brand/create",
    query: {
      ...form,
      card_number: cardState.number,
      card_expiration_date: cardState.expiry,
      cvv: cardState.cvc,
    },
  };

  return (
    <>
      <Head>
        <title>Transacción Completa Estándar Marca - Formulario</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Estándar Marca"
        pageDescription="Completa el formulario para crear la transaccion. El proceso continua en la siguiente vista usando el token generado."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-standard-brand"
        navigationItems={navigationItems}
        additionalContent={
          <div className="flex-col gap-6">
            <Card className="tbk-tx-card column-card">
              <div id="formulario" className="flex-col gap-4">
                <CreditCard
                  {...cardState}
                  embedded
                  hidePayButton
                  handleInputChange={handleCardInputChange}
                  handleInputFocus={handleCardInputFocus}
                />
                <InputText
                  label="Orden de compra"
                  name="buy_order"
                  value={form.buy_order}
                  onChange={handleChange}
                />
                <InputText
                  label="Id de sesion"
                  name="session_id"
                  value={form.session_id}
                  onChange={handleChange}
                />
                <InputText
                  label="Monto"
                  name="detail_amount"
                  value={form.detail_amount}
                  onChange={handleChange}
                />
                <InputText
                  label="Codigo de comercio"
                  name="detail_commerce_code"
                  value={form.detail_commerce_code}
                  onChange={handleChange}
                />
                <InputText
                  label="Orden de compra (hijo)"
                  name="detail_buy_order"
                  value={form.detail_buy_order}
                  onChange={handleChange}
                />
                <SelectField
                  label="Post entry mode"
                  name="detail_post_entry_mod"
                  value={form.detail_post_entry_mod}
                  onChange={handleChange}
                  options={[
                    { value: "010", label: "010" },
                    { value: "810", label: "810" },
                    { value: "100", label: "100" },
                  ]}
                />
                <SelectField
                  label="ECI"
                  name="detail_eci"
                  value={form.detail_eci}
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
                  name="detail_authentication_value"
                  value={form.detail_authentication_value}
                  onChange={handleChange}
                />
                <InputText
                  label="Message version"
                  name="detail_message_version"
                  value={form.detail_message_version}
                  onChange={handleChange}
                />
                <SelectField
                  label="Transaction status"
                  name="detail_trans_status"
                  value={form.detail_trans_status}
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
                  label="DS Trans ID"
                  name="detail_ds_trans_id"
                  value={form.detail_ds_trans_id}
                  onChange={handleChange}
                />
                <SelectField
                  label="Authentication type"
                  name="detail_authentication_type"
                  value={form.detail_authentication_type}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "No challenge (null)" },
                    { value: "C", label: "C - Challenge" },
                  ]}
                />
                <SelectField
                  label="Identify initiated trx"
                  name="detail_identify_initiated_trx"
                  value={form.detail_identify_initiated_trx}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Seleccionar" },
                    { value: "0", label: "0 - Venta Unica" },
                    { value: "1", label: "1 - Primera CIT" },
                    { value: "2", label: "2 - Primera CIT Recurrencia MIT" },
                    { value: "3", label: "3 - Subsecuente CIT" },
                    { value: "4", label: "4 - Recurrente MIT" },
                  ]}
                />
                <SelectField
                  label="pmnt_ind"
                  name="detail_pmnt_ind"
                  value={form.detail_pmnt_ind}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Ventas únicas" },
                    { value: "C", label: "C - Transacciones COF" },
                    { value: "R", label: "R - Transacciones recurrentes" },
                  ]}
                />
                <SelectField
                  label="recur_pmnt"
                  name="detail_recur_pmnt"
                  value={form.detail_recur_pmnt}
                  onChange={handleChange}
                  options={[
                    { value: "", label: "Seleccionar" },
                    { value: "F", label: "F - Fijo" },
                    { value: "V", label: "V - Variable" },
                  ]}
                />
                <div className="button-container">
                  <Button text="PAGAR" className="button" link={createLink} />
                </div>
              </div>
            </Card>

            <Card className="tbk-tx-card">
              <p>Si necesitas, puedes verificar cuenta desde aqui.</p>
              <div className="button-container">
                <Button
                  text="VERIFICAR CUENTA"
                  className="button"
                  link={{
                    pathname:
                      "/transaccion-completa-standard-brand/account-verify",
                  }}
                />
              </div>
            </Card>
          </div>
        }
      />
    </>
  );
}
