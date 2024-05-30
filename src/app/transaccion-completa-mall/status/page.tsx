import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NextPageProps } from "@/types/general";
import { NavigationItem } from "@/components/layout/Navigation";
import { getStatusTRXSteps } from "../content/steps/status";
import { getStatusFullTransactionMallTransaction } from "@/app/lib/transaccion-completa-mall/data";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transaccion Completa Mall",
    path: "/transaccion-completa-mall",
  },
  {
    name: "Estado de transacción",
    path: "/transaccion-completa-mall/status",
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
  const { token_ws } = searchParams;

  const trxStatus = await getStatusFullTransactionMallTransaction(token_ws);

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Estado de transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Transaccion Completa Mall - Estado de transacción"
        pageDescription={`En esta fase, tendrás la capacidad de solicitar el estado actual de una transacción hasta 7 días después de su realización. 
Es importante destacar que no hay límite en la cantidad de solicitudes de este tipo durante este período. Sin embargo, una vez transcurridos los 7 días, ya no podrás revisar el estado de la transacción.`}
        actualBread={actualBread}
        activeRoute="/transaccion-completa-mall/status"
        steps={getStatusTRXSteps(token_ws, trxStatus)}
        navigationItems={navigationItems}
      />
    </>
  );
}
