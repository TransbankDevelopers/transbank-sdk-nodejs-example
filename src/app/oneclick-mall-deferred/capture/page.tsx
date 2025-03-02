import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NextPageProps } from "@/types/general";
import { NavigationItem } from "@/components/layout/Navigation";
import { captureOneclickMallDeferredTransaction } from "@/app/lib/oneclick-mall-deferred/data";
import { TransactionDetail } from "@/types/transactions";
import { getCaptureSteps } from "../content/steps/capture";
import { MallRefundCard } from "@/components/mall-refund-card/MallRefundCard";
import { MallStatusButton } from "@/components/mall-status-button/MallStatusButton";
import { CustomError } from "@/components/customError/CustomError";

const getActualBread = (): Route[] => {
  return [
    {
      name: "Inicio",
      path: "/",
    },
    {
      name: "Webpay Oneclick Mall Diferido",
      path: "/oneclick-mall-deferred",
    },
    {
      name: "Capturar pago",
      path: "/oneclick-mall-deferred/capture",
    },
  ];
};

const navigationItems: NavigationItem[] = [
  {
    title: "Petición",
    sectionId: "peticion",
  },
  {
    title: "Respuesta",
    sectionId: "respuesta",
  },
  {
    title: "Consultas",
    sectionId: "consultas",
  },
];

export default async function AuthorizeTransactionPage({
  searchParams,
}: NextPageProps) {
  const {
    childCommerceCode,
    buyOrder,
    childBuyOrder,
    authorizationCode,
    captureAmount,
  } = searchParams;

  const trxData = await captureOneclickMallDeferredTransaction({
    commerceCode: childCommerceCode as string,
    childBuyOrder: childBuyOrder as string,
    authorizationCode: authorizationCode as string,
    captureAmount: Number(captureAmount),
  });

  if ("errorMessage" in trxData) {
    return (
      <CustomError
        errorMessage={trxData.errorMessage}
        actualBread={getActualBread()}
      />
    );
  }
  
  return (
    <>
      <Head>
        <title>
          Transbank SDK Node - Webpay Oneclick Mall Diferido - Capturar pago
        </title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Capturar pago"
        pageDescription="En este paso debemos capturar la transacción para realmente capturar el dinero que habia sido previamente reservado al hacer la transacción."
        actualBread={getActualBread()}
        navigationItems={navigationItems}
        activeRoute="/oneclick-mall-deferred/capture"
        steps={getCaptureSteps(childBuyOrder as string, trxData)}
        additionalContent={
          <>
            <MallRefundCard
              buyOrder={buyOrder as string}
              detail={
                {
                  buy_order: childBuyOrder as string,
                  authorization_code: authorizationCode as string,
                  amount: Number(captureAmount),
                  commerce_code: childCommerceCode as string,
                } as TransactionDetail
              }
              isDeferred
            />

            <MallStatusButton buyOrder={buyOrder as string} isDeferred />
          </>
        }
      />
    </>
  );
}
