import { Route } from "@/types/menu";
import { InputText } from "@/components/input/InputText";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { Layout } from "@/components/layout/Layout";
import { getStartTRXSteps } from "@/app/patpass-comercio/content/steps/start";
import Head from "next/head";
import { createPatpassTransaction } from "@/app/lib/patpass-comercio/data";
import { NavigationItem } from "@/components/layout/Navigation";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "PatPass Comercio",
    path: "/patpass-comercio",
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
    title: "Ejemplo",
    sectionId: "ejemplo",
  },
];

export type CreateTRXProps = TBKCreateTransactionResponse &
  StartTransactionData;

export default async function StartPatpassTxPage() {
  const trxData = await createPatpassTransaction();
  return (
    <>
      <Head>
        <title>PatPass Comercio - Iniciar Transacción</title>
      </Head>
      <Layout
        pageTitle="PatPass Comercio - Iniciar Transacción"
        pageDescription="En este paso inicial, procederemos a inscribir una tarjeta con el objetivo de obtener un identificador único. Esto nos permitirá redirigir al Tarjetahabiente hacia el formulario de inscripción en el siguiente paso."
        actualBread={actualBread}
        activeRoute="/patpass-comercio"
        navigationItems={navigationItems}
        steps={getStartTRXSteps(trxData)}
        additionalContent={
          <Card className="card-pay">
            <span className="title">Formulario de redirección</span>
            <InputText label="Token" value={trxData.token} />
            <div className="button-container">
              <form action={trxData.url} method="POST">
                <input
                  type="hidden"
                  name="tokenComercio"
                  value={trxData.token}
                />
                <Button
                  text="INSCRIBIR"
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
