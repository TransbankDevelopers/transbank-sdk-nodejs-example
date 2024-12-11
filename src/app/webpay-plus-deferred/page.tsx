import "./page.css";
import { Route } from "@/types/menu";
import { InputText } from "@/components/input/InputText";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Layout } from "@/components/layout/Layout";
import { getCreateTRXSteps } from "@/app/webpay-plus/content/steps/create";
import Head from "next/head";
import { createTransaction } from "../lib/webpay-plus/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { getWebpayPlusDeferredOptions } from "../lib/webpay-plus-deferred/data";
import { PageRefresh } from "@/components/pageRefresh/PageRefresh";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Plus Diferido",
    path: "/webpay-plus-deferred",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Petición",
    sectionId: "peticion",
  },
  {
    title: "Respuesta",
    sectionId: "respuesta",
  },
  {
    title: "Creación del formulario",
    sectionId: "form",
  },
  {
    title: "Ejemplo",
    sectionId: "ejemplo",
  },
];

export type CreateTRXProps = TBKCreateTransactionResponse &
  StartTransactionData;

export default async function CreateTransaction() {
  const trxData = await createTransaction(
    "/webpay-plus-deferred/commit",
    getWebpayPlusDeferredOptions()
  );
  return (
    <>
      <PageRefresh/>
      <Head>
        <title>Transbank SDK Node - Creación de transacción diferida</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus Diferido - Creación de transacción diferida"
        pageDescription="En esta fase, se procederá a la creación de una transacción diferida con el propósito de obtener un identificador único. Este identificador será esencial para dirigir al tarjetahabiente hacia el formulario de pago en el próximo paso."
        actualBread={actualBread}
        activeRoute="/webpay-plus-deferred"
        navigationItems={navigationItems}
        steps={getCreateTRXSteps(trxData.token, trxData)}
        additionalContent={
          <Card className="card-pay">
            <span className="title">Formulario de redirección</span>
            <InputText label="Token" value={trxData.token} />
            <div className="button-container">
              <form action={trxData.url} method="POST">
                <input type="hidden" name="token_ws" value={trxData.token} />
                <Button
                  text="PAGAR"
                  className="button"
                  type={ButtonTypes.SUBMIT}
                />
              </form>
            </div>
          </Card>
        }
      />
    </>
  );
}
