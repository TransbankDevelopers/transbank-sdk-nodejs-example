import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getRefundTRXSteps } from "@/app/webpay-mall-diferido/content/steps/refund";
import { NextPageProps } from "@/types/general";
import { refundTransaction } from "@/app/lib/webpay-mall-diferido/data";
import { StatusButton } from "@/app/webpay-mall-diferido/components/StatusButton";
import { InvalidView } from "@/app/invalid/invalidRefund";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Mall Diferido",
    path: "/webpay-mall-diferido",
  },
  {
    name: "Reembolsar",
    path: "/webpay-mall-diferido/refund",
  },
];

export default async function RefundTransaction({
  searchParams,
}: NextPageProps) {
  const { token_ws, amount, buyOrder, commerceCode } = searchParams;
  const refundResult = await refundTransaction(
    token_ws as string,
    Number(amount),
    buyOrder as string,
    commerceCode as string
  );

  if (!refundResult.success) {
    return <InvalidView errorType={refundResult.errorType} />; 
  }

  if (refundResult.success) {
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Reembolsar transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Mall Diferido - Reembolsar"
        pageDescription={`En esta etapa, tienes la opción de solicitar el reembolso del monto al titular de la tarjeta. 
        Dependiendo del monto y el tiempo transcurrido desde la transacción, este proceso podría resultar en una Reversa, 
        Anulación o Anulación Parcial.`}
        actualBread={actualBread}
        activeRoute="/webpay-mall-diferido/refund"
        steps={getRefundTRXSteps(refundResult.refundResponse, amount as string)}
        additionalContent={
          <StatusButton className="mt-6" token={token_ws as string} />
        }
      />
    </>
  );
 }
}
