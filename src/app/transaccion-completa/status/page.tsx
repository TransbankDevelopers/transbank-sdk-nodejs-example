import { Route } from "@/types/menu";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { getStatusTRXSteps } from "@/app/transaccion-completa/content/steps/status";
import { statusTxCompleteTransaction } from "@/app/lib/transaccion-completa/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";

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
    name: "Status",
    path: "/transaccion-completa/status",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Peticion",
    sectionId: "peticion",
  },
  {
    title: "Respuesta",
    sectionId: "respuesta",
  },
];

export default async function StatusWebpaytxfullPage({
  searchParams,
}: NextPageProps) {
  const { token } = searchParams;

  const statusResponse = await statusTxCompleteTransaction(token as string);

  return (
    <>
      <Head>
        <title>Transacción Completa - Estado de transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa - Estado de transacción"
        pageDescription="En esta fase, tendrás la capacidad de solicitar el estado actual de una transacción hasta 7 días después de su realización. Es importante destacar que no hay límite en la cantidad de solicitudes de este tipo durante este período. Sin embargo, una vez transcurridos los 7 días, ya no podrás revisar el estado de la transacción."
        actualBread={actualBread}
        activeRoute="/transaccion-completa/status"
        navigationItems={navigationItems}
        steps={getStatusTRXSteps(token as string, statusResponse)}
      />
    </>
  );
}
