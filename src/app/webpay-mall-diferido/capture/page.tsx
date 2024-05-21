import "./page.css";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NextPageProps } from "@/types/general";
import { StatusButton } from "@/app/webpay-mall-diferido/components/StatusButton";
import { RefundCard } from "@/app/webpay-mall-diferido/components/RefundCard";
import { getCaptureSteps } from "@/app/webpay-plus-deferred/content/steps/capture";
import { captureTransaction } from "@/app/lib/webpay-mall-diferido/data";
import { TBKCaptureTransactionResponse } from "@/types/transactions";

const actualBread = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Plus Diferido",
    path: "/webpay-plus-deferred",
  },
  {
    name: "Capturar transacción diferida",
    path: "/webpay-plus-deferred/capture",
  },
];

export default async function CaptureTransactionPage({
  searchParams,
}: NextPageProps) {
  const {
    token_ws,
    buyOrder,
    authorizationCode,
    captureAmount,
    childCommerceCode,
  } = searchParams;

  const captureResponse = await captureTransaction({
    token: token_ws as string,
    buyOrder: buyOrder as string,
    authorizationCode: authorizationCode as string,
    captureAmount: Number(captureAmount as string),
    childCommerceCode: childCommerceCode as string,
  });

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Capture Transaction</title>
      </Head>
      <Layout
        pageTitle={"Webpay Plus - Capturar Transacción diferida"}
        pageDescription="En este paso debemos capturar la transacción para realmente capturar el dinero que habia sido previamente reservado al hacer la transacción"
        actualBread={actualBread}
        activeRoute="/webpay-plus-deferred/capture"
        steps={getCaptureSteps(token_ws as string, captureResponse)}
        additionalContent={
          <>
            <RefundCard
              token={token_ws as string}
              amount={Number(captureAmount as string)}
              buyOrder={buyOrder as string}
              commerceCode={childCommerceCode as string}
            />

            <StatusButton token={token_ws as string} />
          </>
        }
      />
    </>
  );
}
