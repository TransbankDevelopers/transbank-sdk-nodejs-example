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
import { CustomError } from "@/components/customError/CustomError";
import { PageRefresh } from "@/components/pageRefresh/PageRefresh";
import { Text } from "@/components/text/Text";
import InfoBlue from "@/assets/svg/InfoBlue.svg";
import Image from "next/image";

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
  if ("errorMessage" in trxData) {
    return (
      <CustomError
        errorMessage={trxData.errorMessage}
        actualBread={actualBread}
      />
    );
  }
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
            <form action={trxData.url} method="POST">
              <input type="hidden" name="token_ws" value={trxData.token} />
              <div className="tbk-info-token">
                <Image
                  src={InfoBlue}
                  alt="tbk info blue"
                  className="tbk-info-token-icon"
                />
                <Text className="tbk-info-token-text">
                  El token generado en esta aplicación se renueva automáticamente cada 5 minutos.
                </Text>
              </div>
              <div className="button-container">
              <Button
                text="PAGAR"
                className="button"
                type={ButtonTypes.SUBMIT}
              />
            </div>
            </form>
          </Card>
        }
      />
    </>
  );
}
