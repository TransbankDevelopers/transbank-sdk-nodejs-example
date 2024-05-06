import "@/app/globals.css";
import { Route } from "@/types/menu";
import { StepProps } from "@/components/step/Step";
import { Table } from "@/components/table/Table";
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
import { getCreateTRXSteps } from "@/helpers/webpay-plus/createSteps";

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

export default function CreateTRX(props: CreateTRXProps) {
  const [tokenInput, setTokenInput] = useState(props.token);

  const handleTokenInputChange = (value: string) => {
    setTokenInput(value);
  };

  return (
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
        <Card>
          <span className="font-medium text-sm mb-8">
            Formulario de redirección
          </span>
          <InputText value={tokenInput} onChange={handleTokenInputChange} />
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
