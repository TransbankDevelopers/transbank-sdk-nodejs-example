import { Route } from "@/types/menu";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { Layout } from "@/components/layout/Layout";
import { getCreateTRXSteps } from "@/app/transaccion-completa-diferido/content/steps/create";
import Head from "next/head";
import { createTxComplete } from "@/app/lib/transaccion-completa-diferido/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { ConfirmCard } from "@/app/transaccion-completa-diferido/components/ConfirmCard";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transaccion Completa diferido",
    path: "/transaccion-completa-diferido",
  },
  {
    name: "Crear Transacción",
    path: "/transaccion-completa-diferido/create",
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
    sectionId: "next-step",
  },
];

export type CreateTRXProps = TBKCreateTransactionResponse &
  StartTransactionData;

export default async function CreateWebpaytxfullPage({
  searchParams,
}: NextPageProps) {
  const { cvv, cardNumber, cardExpirationDate } = searchParams;

  const trxData = await createTxComplete(
    Number(cvv),
    cardNumber as string,
    cardExpirationDate as string
  );

  return (
    <>
      <Head>
        <title>Transacción Completa diferido - crear transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa diferido - crear transacción"
        pageDescription="En este paso sucede la creación de la transacción con el objetivo de obtener un identificador único para la misma."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-diferido/create"
        navigationItems={navigationItems}
        steps={getCreateTRXSteps(trxData.token)}
        additionalContent={<ConfirmCard token={trxData.token} />}
      />
    </>
  );
}
