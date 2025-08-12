import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getRefundTRXSteps } from "@/app/oneclick-mall/content/steps/refund";
import { NextPageProps } from "@/types/general";
import { refundOneClickMallTransaction } from "@/app/lib/promotions-oneclick-mall/data";
import { CustomError } from "@/components/customError/CustomError";
import { MallStatusButton } from "@/components/mall-status-button/MallStatusButton";
const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick Mall",
    path: "/promotions-oneclick-mall",
  },
  {
    name: "Reembolsar",
    path: "/promotions-oneclick-mall/refund",
  },
];

export default async function RefundTransaction({
  searchParams,
}: Readonly<NextPageProps>) {
  const { buy_order, child_commerce_code, child_buy_order, amount } =
    searchParams;

  const refundResult = await refundOneClickMallTransaction({
    buyOrder: buy_order,
    childCommerceCode: child_commerce_code,
    childBuyOrder: child_buy_order,
    amount: Number(amount),
  });

  if ("errorMessage" in refundResult) {
    return (
      <CustomError
        errorMessage={refundResult.errorMessage}
        actualBread={actualBread}
      />
    );
  }

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Reembolsar transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Reembolsar"
        pageDescription={`En esta etapa, tienes la opción de solicitar el reembolso del monto al titular de la tarjeta. 
        Dependiendo del monto y el tiempo transcurrido desde la autorización, este proceso podría resultar en una Reversa o Anulación, dependiendo de ciertas condiciones (Reversa
                en las primeras 3 horas de la autorización, anulación posterior
                a eso), o una Anulación parcial si el monto es menor al total.
                Las anulaciones parciales para tarjetas débito y prepago no
                están soportadas.`}
        actualBread={actualBread}
        activeRoute="/promotions-oneclick-mall/refund"
        steps={getRefundTRXSteps(refundResult, amount, buy_order)}
        additionalContent={
          <MallStatusButton
            buyOrder={buy_order}
            productLink={"/promotions-oneclick-mall"}
          />
        }
      />
    </>
  );
}
