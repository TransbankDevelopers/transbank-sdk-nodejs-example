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

export default function TransaccionCompletaStandardBrandPage() {
  const randomData = useMemo(() => generateRandomTxCompletaData(), []);

  const [form, setForm] = useState({
    buy_order: randomData.buyOrder,
    session_id: randomData.sessionId,
    card_number: "4051885600446623",
    card_expiration_date: "31/12",
    cvv: "123",
    detail_amount: String(randomData.amount),
    detail_commerce_code: "597055555639",
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

  const createLink = {
    pathname: "/transaccion-completa-standard-brand/create",
    query: { ...form },
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
                <InputText
                  label="Post entry mode"
                  name="detail_post_entry_mod"
                  value={form.detail_post_entry_mod}
                  onChange={handleChange}
                />
                <InputText
                  label="ECI"
                  name="detail_eci"
                  value={form.detail_eci}
                  onChange={handleChange}
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
                <InputText
                  label="Transaction status"
                  name="detail_trans_status"
                  value={form.detail_trans_status}
                  onChange={handleChange}
                />
                <InputText
                  label="DS Trans ID"
                  name="detail_ds_trans_id"
                  value={form.detail_ds_trans_id}
                  onChange={handleChange}
                />
                <InputText
                  label="Authentication type"
                  name="detail_authentication_type"
                  value={form.detail_authentication_type}
                  onChange={handleChange}
                />
                <InputText
                  label="Identify initiated trx"
                  name="detail_identify_initiated_trx"
                  value={form.detail_identify_initiated_trx}
                  onChange={handleChange}
                />
                <InputText
                  label="pmnt_ind"
                  name="detail_pmnt_ind"
                  value={form.detail_pmnt_ind}
                  onChange={handleChange}
                />
                <InputText
                  label="recur_pmnt"
                  name="detail_recur_pmnt"
                  value={form.detail_recur_pmnt}
                  onChange={handleChange}
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
