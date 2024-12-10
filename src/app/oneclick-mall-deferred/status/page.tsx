import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getStatusTRXSteps } from "@/app/oneclick-mall/content/steps/status";
import { NextPageProps } from "@/types/general";
import { NavigationItem } from "@/components/layout/Navigation";
import { getStatusOneclickMallTransaction } from "@/app/lib/oneclick-mall/data";
import { CustomError } from "@/components/customError/CustomError";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick Mall Diferido",
    path: "/oneclick-mall-deferred",
  },
  {
    name: "Estado de transacción",
    path: "/oneclick-mall-deferred/status",
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
];

export default async function StatusTransactionView({
  searchParams,
}: NextPageProps) {
  const { buy_order } = searchParams;
  const trxStatus = await getStatusOneclickMallTransaction(
    buy_order as string,
    true
  );
  if ("errorMessage" in trxStatus) {
    return (
      <CustomError
        errorMessage={trxStatus.errorMessage}
        actualBread={actualBread}
      />
    );
  }
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Estado de transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall Diferido - Estado de transacción"
        pageDescription={`Con esta operación, puedes solicitar el estado actual de una transacción en cualquier momento.`}
        actualBread={actualBread}
        activeRoute="/oneclick-mall-deferred/status"
        steps={getStatusTRXSteps(buy_order as string, trxStatus)}
        navigationItems={navigationItems}
      />
    </>
  );
}
