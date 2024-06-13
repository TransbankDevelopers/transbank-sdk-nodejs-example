import { Route } from "@/types/menu";
import {
  StartTransactionData,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { Layout } from "@/components/layout/Layout";
import { getCreateTRXSteps } from "@/app/transaccion-completa/content/steps/installments";
import Head from "next/head";
import { consultInstallmentsCompleteTransaction } from "@/app/lib/transaccion-completa/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { InstallmentsCard } from "@/app/transaccion-completa/components/InstallmentsCard";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transaccion Completa",
    path: "/transaccion-completa",
  },
  {
    name: "Consultar Cuotas",
    path: "/transaccion-completa/installments",
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
    title: "Confirmar Transacción",
    sectionId: "confirm",
  },
];

export type CreateTRXProps = TBKCreateTransactionResponse &
  StartTransactionData;

export default async function InstallmentsWebpaytxfullPage({
  searchParams,
}: NextPageProps) {
  const { token, installments } = searchParams;

  const trxData = await consultInstallmentsCompleteTransaction(
    token as string,
    Number(installments)
  );

  return (
    <>
      <Head>
        <title>Transacción Completa - Consulta de cuotas</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa - Consulta de cuotas"
        pageDescription="En esta etapa, realizaremos una consulta de cuotas para conocer sus condiciones. Es importante destacar que este paso es opcional y se utiliza únicamente si deseas ofrecer opciones de pago a plazos."
        actualBread={actualBread}
        activeRoute="/transaccion-completa/installments"
        navigationItems={navigationItems}
        steps={getCreateTRXSteps(trxData)}
        additionalContent={
          <InstallmentsCard
            token={token as string}
            idQueryInstallments={trxData.id_query_installments}
          />
        }
      />
    </>
  );
}
