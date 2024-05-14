import "./page.css";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { NextPageProps } from "@/types/general";
import { RefundAndStatus } from "@/app/webpay-plus/commit/components/RefundAndStatus";
import { getCaptureSteps } from "../content/steps/capture";
import { captureTransaction } from "@/app/lib/webpay-plus-deferred/data";
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

export default async function CaptureTransaction({
  searchParams,
}: NextPageProps) {
  const { token_ws, buyOrder, authorizationCode, captureAmount } = searchParams;
  const commitResponse = await captureTransaction({
    token: token_ws as string,
    buyOrder: buyOrder as string,
    authorizationCode: authorizationCode as string,
    captureAmount: Number(captureAmount as string),
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
        steps={getCaptureSteps(commitResponse)}
        additionalContent={
          <RefundAndStatus
            token={token_ws as string}
            amount={
              (commitResponse as TBKCaptureTransactionResponse).captured_amount
            }
          />
        }
      />
    </>
  );
}
