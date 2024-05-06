import "@/app/globals.css";
import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { Text, TextType } from "@/components/text/Text";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Route } from "@/types/menu";
import { Step, StepProps } from "@/components/step/Step";
import { HelpMenu } from "@/components/layout/HelpMenu";
import * as commitSnippets from "@/helpers/webpay-plus/snippets/commit";
import { Table } from "@/components/table/Table";
import { InputText } from "@/components/input/InputText";
import {
  StartTransactionData,
  TBKCommitTransactionResponse,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import {
  getColumnDefinition,
  getColumnValues,
} from "@/helpers/webpay-plus/transactionHelper";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Questions } from "@/components/questions/Questions";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { WebpayPlus } from "transbank-sdk";
import { Layout } from "@/components/layout/Layout";

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

export type CommitTransactionProps = {
  token: string;
  commitResponse: TBKCommitTransactionResponse;
};

const getSteps = (
  token: string,
  commitResponse: TBKCommitTransactionResponse
): StepProps[] => {
  return [
    {
      stepTitle: "Paso 1: Datos recibidos",
      content: `Después de completar el flujo en el formulario de pago, 
recibirás un POST con la siguiente información:`,
      code: commitSnippets.getStepOne(token),
    },
    {
      stepTitle: "Paso 2: Petición",
      content: `Utilizarás el token recibido para confirmar la transacción 
mediante el SDK.`,
      code: commitSnippets.getStepTwo(),
    },
    {
      stepTitle: "Paso 3: Respuesta",
      content: `Transbank responderá con la siguiente información. Es crucial guardar
esta respuesta, y la única validación necesaria es que el campo &quot;response_code&quot; 
sea igual a cero.`,
      code: commitSnippets.getStepThree(commitResponse),
    },
    {
      stepTitle: "¡Listo!",
      content: (
        <div className="flex flex-col gap-5">
          <Text>
            Con la confirmación exitosa, ya puedes mostrar al usuario una página
            de éxito de la transacción, proporcionándole la tranquilidad de que
            el proceso ha sido completado con éxito.
          </Text>
          <div className="flex flex-col gap-2">
            <Text>
              Después de confirmar la transacción, podrás realizar otras
              operaciones útiles:
            </Text>
            <ul className="list-disc px-6">
              <li>
                <b>Reembolsar:</b> Puedes reversar o anular el pago según
                ciertas condiciones comerciales.
              </li>
              <li>
                <b>Consultar Estado:</b> Hasta 7 días después de realizada la
                transacción, podrás consultar el estado de la transacción.
              </li>
            </ul>
          </div>
        </div>
      ),
    },
  ];
};

export default function CommitTransaction(props: CommitTransactionProps) {
  return (
    <Layout
      pageTitle="Webpay Plus - Confirmar transacción"
      pageDescription={
        <>
          En este paso es importante confirmar la transacción para notificar a
          Transbank que hemos recibido exitosamente los detalles de la
          transacción.{" "}
          <b>
            Es importante destacar que si la confirmación no se realiza, la
            transacción será reversada.
          </b>
        </>
      }
      actualBread={actualBread}
      activeRoute="/webpay-plus"
      steps={getSteps(props.token, props.commitResponse)}
      additionalContent={
        <Card>
          <span className="font-medium text-sm mb-8">
            Formulario de redirección
          </span>
          <InputText value={"xd"} onChange={() => {}} />
          <div className="flex justify-end mt-6">
            <form action={"rr"} method="POST">
              <input type="hidden" name="token_ws" value={"xd"} />
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
): Promise<GetServerSidePropsResult<any>> => {
  const { token_ws = null } = context.query;

  if (!token_ws) {
    return {
      props: {
        missingToken: true,
      },
    };
  }

  const commitResponse: TBKCommitTransactionResponse | null =
    await new WebpayPlus.Transaction(WebpayPlus.getDefaultOptions()).commit(
      token_ws as string
    );

  return {
    props: {
      token: token_ws,
      commitResponse,
    },
  };
};
