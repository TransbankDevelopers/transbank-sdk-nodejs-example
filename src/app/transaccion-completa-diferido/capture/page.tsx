import { Route } from "@/types/menu";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { getCaptureSteps } from "@/app/transaccion-completa-diferido/content/steps/capture";
import { captureTxCompleteTransaction } from "@/app/lib/transaccion-completa-diferido/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { StatusRefundCard } from "@/app/transaccion-completa-diferido/components/StatusRefundCard";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transacción Completa diferido",
    path: "/transaccion-completa-diferido",
  },
  {
    name: "Capturar Transacción",
    path: "/transaccion-completa-diferido/capture",
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

export default async function CaptureWebpaytxfullPage({
  searchParams,
}: NextPageProps) {
  const { token, buyOrder, authorizationCode, captureAmount } = searchParams;

  const captureResponse = await captureTxCompleteTransaction(
    token as string,
    buyOrder as string,
    authorizationCode as string,
    Number(captureAmount)
  );

  return (
    <>
      <Head>
        <title>Transacción Completa Diferido- Confirmar transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Diferido - Confirmar transacción"
        pageDescription="En este paso debemos capturar la transacción para realmente capturar el dinero que habia sido previamente reservado al hacer la transacción."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-diferido/capture"
        navigationItems={navigationItems}
        steps={getCaptureSteps(captureResponse)}
        additionalContent={
          <StatusRefundCard
            token={token as string}
            amount={captureResponse.captured_amount}
          />
        }
      />
    </>
  );
}
