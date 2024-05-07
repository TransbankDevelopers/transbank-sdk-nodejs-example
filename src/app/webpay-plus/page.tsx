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

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Plus",
    path: "/webpay-plus",
  },
];

export type CreateTRXProps = TBKCreateTransactionResponse &
  StartTransactionData;

export default async function CreateTransaction() {
  const trxData = await createTransaction();
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Create Transaction</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus - Creación de transacción"
        pageDescription="En esta etapa, se procederá a la creación de una transacción con
    el fin de obtener un identificador único. Esto nos permitirá
    redirigir al Tarjetahabiente hacia el formulario de pago de
    Transbank en el siguiente paso."
        actualBread={actualBread}
        activeRoute="/webpay-plus"
        steps={getCreateTRXSteps(trxData.token, trxData)}
        additionalContent={
          <Card className="flex-col">
            <span className="font-medium text-sm mb-8">
              Formulario de redirección
            </span>
            <InputText label="Token" value={trxData.token} />
            <div className="flex justify-end mt-6">
              <form action={trxData.url} method="POST">
                <input type="hidden" name="token_ws" value={trxData.token} />
                <Button
                  text="PAGAR"
                  className="max-w-[94px]"
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
