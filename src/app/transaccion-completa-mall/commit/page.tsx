"use server";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NavigationItem } from "@/components/layout/Navigation";
import { Route } from "@/types/menu";
import { getCommitSteps } from "../content/steps/commit";
import { NextPageProps } from "@/types/general";
import { cookies } from "next/headers";
import {
  InstallmentsData,
  commitFullTransactionMallTransaction,
} from "@/app/lib/transaccion-completa-mall/data";
import { localStorageFullTransactionDetails } from "@/consts";
import { TransactionDetail } from "transbank-sdk";
import { MallRefundCard } from "@/components/mall-refund-card/MallRefundCard";
import { MallStatusButton } from "@/components/mall-status-button/MallStatusButton";
import { ErrorContent } from "../create/errorContent";

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
    name: "Confirmar Transacción",
    path: "/transaccion-completa-mall/commit",
  },
];

export default async function CommitFullTransactionMallPage({
  searchParams,
}: NextPageProps) {
  const {
    token_ws,
    id_query_installments,
    deferred_period_index,
    grace_period,
  } = searchParams;
  const cookiesStore = cookies();
  const data = cookiesStore.get(localStorageFullTransactionDetails);

  if (!data) {
    return (
      <ErrorContent
        errorMessage="No data found"
        productPage="/transaccion-completa-mall"
        actualRoute="/commit"
      />
    );
  }

  const installmentsData = id_query_installments
    ? ({
        idQueryInstallments: Number(id_query_installments),
        deferredPeriodIndex: Number(deferred_period_index),
        gracePeriod: grace_period === "true",
      } as InstallmentsData)
    : undefined;

  const trxData = await commitFullTransactionMallTransaction(
    token_ws as string,
    JSON.parse(data.value) as TransactionDetail[],
    installmentsData
  );

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Confirmar Transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Mall - Confirmar Transacción"
        pageDescription="En este paso tenemos que confirmar la transacción con el objetivo de avisar a Transbank que hemos recibido la transacción ha sido recibida exitosamente. En caso de que no se confirme la transacción, ésta será reversada.En esta primera etapa necesitas obtener los datos esenciales de la tarjeta de crédito del titular. Utiliza el formulario para recolectar esta información de manera segura."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-mall/commit"
        navigationItems={navigationItems}
        steps={getCommitSteps(trxData)}
        additionalContent={
          <div className="mt-4">
            {trxData?.details.map((detail) => (
              <MallRefundCard
                productLink="/transaccion-completa-mall"
                key={detail.buy_order}
                buyOrder={trxData.buy_order}
                detail={detail}
                token={token_ws}
              />
            ))}
            <MallStatusButton
              productLink="/transaccion-completa-mall"
              token={token_ws}
            />
          </div>
        }
      />
    </>
  );
}
