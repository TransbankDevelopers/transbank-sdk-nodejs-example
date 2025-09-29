import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getRefundTRXSteps } from "@/app/oneclick-mall/content/steps/refund";
import { NextPageProps } from "@/types/general";
import { refundOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";
import { CustomError } from "@/components/customError/CustomError";
import { StatusButton } from "@/app/oneclick-mall/components/StatusButton";
const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick Mall",
    path: "/oneclick-mall",
  },
  {
    name: "Reembolsar",
    path: "/oneclick-mall/refund",
  },
];

export default async function RefundTransaction({
  searchParams,
}: NextPageProps) {
  const { buy_order, child_commerce_code, child_buy_order, amount } =
    searchParams;

  const refundResult = await refundOneClickMallTransaction({
    buyOrder: buy_order as string,
    childCommerceCode: child_commerce_code as string,
    childBuyOrder: child_buy_order as string,
    amount: Number(amount as string),
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
        activeRoute="/oneclick-mall/refund"
        steps={getRefundTRXSteps(
          refundResult,
          amount as string,
          buy_order as string
        )}
        additionalContent={
          <StatusButton className="mt-6" buyOrder={buy_order} />
        }
      />
    </>
  );
}
