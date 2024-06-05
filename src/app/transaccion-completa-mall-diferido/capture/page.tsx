import { Route } from "@/types/menu";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { getCaptureSteps } from "@/app/transaccion-completa-diferido/content/steps/capture";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { captureTransaccionCompletaMallDeferido } from "@/app/lib/transaccion-completa-mall-diferido/data";
import { MallRefundCard } from "@/components/mall-refund-card/MallRefundCard";
import { MallStatusButton } from "@/components/mall-status-button/MallStatusButton";
import { TransactionDetail } from "@/types/transactions";

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
    name: "Capturar Transacción",
    path: "/transaccion-completa-mall-diferido/capture",
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

export default async function CaptureFullTransactionMallDeferred({
  searchParams,
}: NextPageProps) {
  const {
    token_ws,
    childBuyOrder,
    authorizationCode,
    captureAmount,
    childCommerceCode,
    parentBuyOrder,
  } = searchParams;

  const captureResponse = await captureTransaccionCompletaMallDeferido({
    token: token_ws,
    childBuyOrder: childBuyOrder,
    authorizationCode: authorizationCode,
    childCommerceCode: childCommerceCode,
    amount: Number(captureAmount),
  });

  return (
    <>
      <Head>
        <title>Transacción Completa Mall Diferido- Confirmar transacción</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Mall Diferido - Confirmar transacción"
        pageDescription="En este paso debemos capturar la transacción para realmente capturar el dinero que habia sido previamente reservado al hacer la transacción."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-mall-diferido/capture"
        navigationItems={navigationItems}
        steps={getCaptureSteps(captureResponse)}
        additionalContent={
          <div>
            <MallRefundCard
              productLink="/transaccion-completa-mall-diferido"
              buyOrder={parentBuyOrder}
              detail={
                {
                  authorization_code: authorizationCode,
                  amount: Number(captureAmount),
                  commerce_code: childCommerceCode,
                  buy_order: childBuyOrder,
                } as TransactionDetail
              }
              token={token_ws}
            />
            <MallStatusButton
              productLink="/transaccion-completa-mall-diferido"
              token={token_ws}
            />
          </div>
        }
      />
    </>
  );
}
