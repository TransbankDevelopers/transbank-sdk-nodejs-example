import { Route } from "@/types/menu";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/app/transaccion-completa-diferido/content/steps/commit";
import { commitTxCompleteTransaction } from "@/app/lib/transaccion-completa-diferido/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { CaptureCard } from "@/app/transaccion-completa-diferido/components/CaptureCard";
import { StatusButton } from "@/app/transaccion-completa-diferido/components/StatusButton";

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
    name: "Confirma Transacción",
    path: "/transaccion-completa-diferido/commit",
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
        <title>Transacción Completa diferido - Confirmar transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa diferido - Confirmar transacción"
        pageDescription="En este paso crucial, procederemos a confirmar la transacción con el objetivo de notificar a Transbank que hemos recibido la transacción de manera exitosa. Es fundamental destacar que si no se confirma la transacción, esta será reversada."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-diferido/commit"
        navigationItems={navigationItems}
        steps={getCommitSteps(commitResponse)}
        additionalContent={
          <>
            <CaptureCard
              token={token as string}
              buyOrder={commitResponse.buy_order}
              authorizationCode={commitResponse.authorization_code}
              amount={commitResponse.amount}
            />
            <StatusButton token={token} />
          </>
        }
      />
    </>
  );
}
