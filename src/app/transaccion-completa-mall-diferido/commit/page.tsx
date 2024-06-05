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
} from "@/app/lib/transaccion-completa-mall-diferido/data";
import { localStorageFullTransactionDetails } from "@/consts";
import { TransactionDetail } from "transbank-sdk";
import { ErrorContent } from "../create/errorContent";
import { CaptureCard } from "@/components/capturecard/CaptureCard";

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
    name: "Webpay Transacción Completa Mall Diferido",
    path: "/transaccion-completa-mall-diferido",
  },
  {
    name: "Confirmar Transacción",
    path: "/transaccion-completa-mall-diferido/commit",
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
        productPage="/transaccion-completa-mall-diferido"
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
        pageTitle="Transacción Completa Mall Diferido - Confirmar Transacción"
        pageDescription="En este paso tenemos que confirmar la transacción con el objetivo de avisar a Transbank que hemos recibido la transacción ha sido recibida exitosamente. En caso de que no se confirme la transacción, ésta será reversada.En esta primera etapa necesitas obtener los datos esenciales de la tarjeta de crédito del titular. Utiliza el formulario para recolectar esta información de manera segura."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-mall-diferido/commit"
        navigationItems={navigationItems}
        steps={getCommitSteps(trxData)}
        additionalContent={
          <div className="mt-4">
            {trxData?.details.map((detail, key) => (
              <div className="mt-2" key={key}>
                <CaptureCard
                  token={token_ws}
                  parentBuyOrder={trxData.buy_order}
                  childBuyOrder={detail.buy_order}
                  childCommerceCode={detail.commerce_code}
                  authorizationCode={detail.authorization_code}
                  amount={detail.amount}
                  captureLink="/transaccion-completa-mall-diferido/capture"
                />
              </div>
            ))}
          </div>
        }
      />
    </>
  );
}
