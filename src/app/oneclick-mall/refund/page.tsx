import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getRefundTRXSteps } from "@/app/oneclick-mall/content/steps/refund";
import { NextPageProps } from "@/types/general";
import { refundOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";
import { CustomError } from "@/components/customError/CustomError";
const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Mall",
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
    return <CustomError errorMessage={refundResult.errorMessage} actualBread={actualBread}/>;
  }

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Reembolsar transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Reembolsar"
        pageDescription={`Esta operación te permite solicitar el reembolso del dinero al tarjeta habiente, considerando el monto y el tiempo transcurrido. El resultado puede ser una Reversa, Anulación, o Anulación parcial, dependiendo de ciertas condiciones.`}
        actualBread={actualBread}
        activeRoute="/oneclick-mall/refund"
        steps={getRefundTRXSteps(
          refundResult.refundRequest,
          amount as string,
          buy_order as string
        )}
      />
    </>
  );
}
