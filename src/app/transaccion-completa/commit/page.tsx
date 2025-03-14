import { Route } from "@/types/menu";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/app/transaccion-completa/content/steps/commit";
import { commitTxCompleteTransaction } from "@/app/lib/transaccion-completa/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { StatusRefundCard } from "@/app/transaccion-completa/components/StatusRefundCard";

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
    name: "Confirmar",
    path: "/transaccion-completa/commit",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Confirmar",
    sectionId: "confirmar",
  },
  {
    title: "Otras Utilidades",
    sectionId: "confirm",
  },
];

export default async function CommitWebpaytxfullPage({
  searchParams,
}: NextPageProps) {
  const { token, idQueryInstallments } = searchParams;

  const commitResponse = await commitTxCompleteTransaction(
    token as string,
    idQueryInstallments as string
  );

  return (
    <>
      <Head>
        <title>Transacción Completa - Confirmar transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa - Confirmar transacción"
        pageDescription="En este paso crucial, procederemos a confirmar la transacción con el objetivo de notificar a Transbank que hemos recibido la transacción de manera exitosa. Es fundamental destacar que si no se confirma la transacción, esta será caducada."
        actualBread={actualBread}
        activeRoute="/transaccion-completa/commit"
        navigationItems={navigationItems}
        steps={getCommitSteps(commitResponse)}
        additionalContent={
          <StatusRefundCard
            token={token as string}
            amount={commitResponse.amount}
          />
        }
      />
    </>
  );
}
