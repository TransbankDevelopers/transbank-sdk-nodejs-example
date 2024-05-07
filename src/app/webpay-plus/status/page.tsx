import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getStatusTRXSteps } from "@/app/webpay-plus/content/steps/status";
import { NextPageProps } from "@/types/general";
import { getStatusTransaction } from "@/app/lib/webpay-plus/data";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Plus",
    path: "/webpay-plus",
  },
  {
    name: "Estado de transacción",
    path: "/webpay-plus/status",
  },
];

export default async function StatusTransactionView({
  searchParams,
}: NextPageProps) {
  const { token_ws } = searchParams;
  const trxStatus = await getStatusTransaction(token_ws as string);
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Estado de transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus - Consultar estado de transacción"
        pageDescription={`Puedes solicitar el estado de una transacción hasta 7 días después de su realización. 
        No hay límite de solicitudes de este tipo durante ese período. 
        Sin embargo, una vez pasados los 7 días, ya no podrás revisar su estado.`}
        actualBread={actualBread}
        activeRoute="/webpay-plus/status"
        steps={getStatusTRXSteps(trxStatus)}
      />
    </>
  );
}
