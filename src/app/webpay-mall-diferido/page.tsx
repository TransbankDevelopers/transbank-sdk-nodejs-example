import { Route } from "@/types/menu";
import { InputText } from "@/components/input/InputText";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Layout } from "@/components/layout/Layout";
import { getCreateTRXSteps } from "@/app/webpay-mall-diferido/content/steps/create";
import Head from "next/head";
import { createMallTransaction } from "@/app/lib/webpay-mall-diferido/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { PageRefresh } from "@/components/pageRefresh/PageRefresh";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Mall Diferido",
    path: "/webpay-mall-diferido",
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

export default async function CreateWebpyMallTransaction() {
  const trxData = await createMallTransaction();

  return (
    <>
      <PageRefresh/>
      <Head>
        <title>Transbank SDK Node - Create Transaction</title>
      </Head>
      <Layout
        pageTitle="Webpay Mall Diferido - Creación de transacción Mall Diferido"
        pageDescription="En esta etapa, se procederá a la creación de una transacción con el fin de obtener un identificador único. Esto nos permitirá redirigir al Tarjetahabiente hacia el formulario de pago en el siguiente paso."
        actualBread={actualBread}
        activeRoute="/webpay-mall-diferido"
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
