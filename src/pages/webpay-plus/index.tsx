import { Route } from "@/types/menu";
import { InputText } from "@/components/input/InputText";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { generateRandomTransactionData } from "@/helpers/webpay-plus/transactionHelper";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { WebpayPlus } from "transbank-sdk";
import { useState } from "react";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Layout } from "@/components/layout/Layout";
import { getCreateTRXSteps } from "@/helpers/webpay-plus/steps/createSteps";
import Head from "next/head";

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

export default function CreateTransaction(props: CreateTRXProps) {
  const [tokenInput, setTokenInput] = useState(props.token);

  const handleTokenInputChange = (value: string) => {
    setTokenInput(value);
  };

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
        steps={getCreateTRXSteps(props.token, props)}
        additionalContent={
          <Card className="flex-col">
            <span className="font-medium text-sm mb-8">
              Formulario de redirección
            </span>
            <InputText
              label="Token"
              value={tokenInput}
              onChange={handleTokenInputChange}
            />
            <div className="flex justify-end mt-6">
              <form action={props.url} method="POST">
                <input type="hidden" name="token_ws" value={tokenInput} />
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

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<CreateTRXProps>> => {
  const protocol = context.req.headers["x-forwarded-proto"] || "http"; // https://github.com/vercel/next.js/issues/2469
  const host = context.req.headers.host || "localhost:3000";
  const startTransactionData = generateRandomTransactionData(
    protocol as string,
    host
  );

  const createResponse: TBKCreateTransactionResponse | null =
    await new WebpayPlus.Transaction(WebpayPlus.getDefaultOptions()).create(
      startTransactionData.buyOrder,
      startTransactionData.sessionId,
      startTransactionData.amount,
      startTransactionData.returnUrl
    );

  if (!createResponse) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      ...startTransactionData,
      ...createResponse,
    },
  };
};
