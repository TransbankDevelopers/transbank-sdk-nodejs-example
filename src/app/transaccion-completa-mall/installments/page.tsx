"use server";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NavigationItem } from "@/components/layout/Navigation";
import { Route } from "@/types/menu";
import { NextPageProps } from "@/types/general";
import { cookies } from "next/headers";
import {
  commitFullTransactionMallTransaction,
  setupInstallmentsFullTransactionMall,
} from "@/app/lib/transaccion-completa-mall/data";
import { localStorageFullTransactionDetails } from "@/consts";
import { TransactionDetail } from "transbank-sdk";
import { getInstallmentsSteps } from "../content/steps/installments";
import { ConfirmCard } from "./components/ConfirmCard";

const navigationItems: NavigationItem[] = [
  {
    title: "Petición",
    sectionId: "peticion",
  },
  { title: "Respuesta", sectionId: "respuesta" },
  { title: "Confirmar", sectionId: "listo" },
];

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transacción Completa Mall",
    path: "/transaccion-completa-mall",
  },
  {
    name: "Consulta de cuotas",
    path: "/transaccion-completa-mall/installments",
  },
];

export default async function InstallmentsFullTransactionMallPage({
  searchParams,
}: NextPageProps) {
  const { token_ws, installments_number } = searchParams;
  const cookiesStore = cookies();
  const data = cookiesStore.get(localStorageFullTransactionDetails);

  if (!data) {
    console.log("No data found");
    return;
  }

  const trxData = await setupInstallmentsFullTransactionMall(
    token_ws,
    JSON.parse(data.value) as TransactionDetail[],
    Number(installments_number)
  );

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Confirmar Transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Mall - Consulta de cuotas"
        pageDescription="En esta etapa, realizaremos una consulta de cuotas para conocer sus condiciones. Es importante destacar que este paso es opcional y se utiliza únicamente si deseas ofrecer opciones de pago a plazos."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-mall/installments"
        navigationItems={navigationItems}
        steps={getInstallmentsSteps(
          Array.isArray(trxData) ? trxData[0] : trxData
        )}
        additionalContent={
          <div className="mt-4">
            <ConfirmCard
              token={token_ws}
              idQueryInstallments={String(trxData[0].id_query_installments)}
            />
          </div>
        }
      />
    </>
  );
}
