import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { Text, TextType } from "@/components/text/Text";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Route } from "@/types/menu";
import { Step } from "@/components/step/Step";
import { HelpMenu } from "@/components/layout/HelpMenu";
import * as createSnippets from "@/helpers/webpay-plus/snippets/create";
import { ColumnDefinition, Table } from "@/components/table/Table";
import { InputText } from "@/components/input/InputText";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import {
  generateRandomTransactionData,
  getColumnDefinition,
  getColumnValues,
} from "@/helpers/webpay-plus/transactionHelper";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { WebpayPlus } from "transbank-sdk";
import { useState } from "react";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Questions } from "@/components/questions/Questions";

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

export default function Home(props: CreateTRXProps) {
  const [tokenInput, setTokenInput] = useState(props.token);

  const handleTokenInputChange = (value: string) => {
    setTokenInput(value);
  };

  return (
    <div className="flex flex-col">
      <Header />
      <div className="grid grid-cols-[280px,1fr,248px] px-24 py-10">
        <Menu />
        <div className="pl-20 pr-12 mt-10 flex flex-col overflow-auto">
          <div className="mb-6">
            <Breadcrumbs items={actualBread} active="/webpay-plus" />
          </div>
          <div className="mb-8 flex flex-col">
            <Text type={TextType.PAGE_TITLE}>
              Webpay Plus - Creación de transacción
            </Text>
            <Text>
              En esta etapa, se procederá a la creación de una transacción con
              el fin de obtener un identificador único. Esto nos permitirá
              redirigir al Tarjetahabiente hacia el formulario de pago de
              Transbank en el siguiente paso.
            </Text>
          </div>
          <div className="flex flex-col gap-y-4">
            <Step
              stepTitle="Paso 1: Petición"
              content={
                <div className="flex flex-col gap-y-3">
                  <span>
                    1. Comienza por importar la librería WebpayPlus en tu
                    proyecto.
                  </span>
                  <span>
                    2. Luego, crea una transacción utilizando las funciones
                    proporcionadas mediante el SDK.
                  </span>
                </div>
              }
              code={createSnippets.getStepOne()}
            />
            <Step
              stepTitle="Paso 2: Respuesta"
              content={
                <span>
                  Una vez que hayas creado la transacción, aquí encontrarás los
                  datos de respuesta generados por el proceso.
                </span>
              }
              code={createSnippets.getStepTwo(props.token)}
            />
            <Step
              stepTitle="Paso 3: Creación del formulario"
              content={
                <span>
                  Utiliza estos datos de respuesta para redireccionar al usuario
                  al formulario de pago al Tarjetahabiente. Este formulario será
                  la interfaz a través de la cual el usuario realizará su
                  transacción.
                </span>
              }
              code={createSnippets.getStepThree(props.token)}
            />
            <Step
              stepTitle="Ejemplo"
              content={
                <div className="flex flex-col gap-y-5">
                  <span>
                    Para llevar a cabo una transacción de compra en nuestro
                    sistema, primero debemos crear la transacción. Utilizaremos
                    los siguientes datos para configurar la transacción:
                  </span>
                  <div className="my-2">
                    <Table
                      columns={getColumnDefinition()}
                      rows={getColumnValues(props)}
                    />
                  </div>
                  <span>
                    Por último, con la respuesta del servicio que confirma la
                    creación de la transacción, procedemos a crear el formulario
                    de pago. Para fines de este ejemplo, haremos visible el
                    campo &quot;token_ws&quot;, el cual es esencial para
                    completar el proceso de pago de manera exitosa.
                  </span>
                </div>
              }
            />
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
          </div>
          <div className="my-12">
            <Questions />
          </div>
        </div>
        <HelpMenu />
      </div>
      <div className="bg-tbk-black-bg h-[200px]"></div>
    </div>
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
