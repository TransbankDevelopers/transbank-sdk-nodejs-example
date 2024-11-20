import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getRefundTRXSteps } from "@/app/webpay-plus/content/steps/refund";
import { NextPageProps } from "@/types/general";
import { refundTransaction } from "@/app/lib/webpay-plus/data";
import { InvalidView } from "@/components/customError/CustomError";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Transbank SDK Node - Reembolsar transacción",
};

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Plus",
    path: "/webpay-plus",
  },
  {
    name: "Reembolsar",
    path: "/webpay-plus/refund",
  },
];

export default async function RefundTransaction({
  searchParams,
}: NextPageProps) {
  const { token_ws, amount } = searchParams;
  const refundResult = await refundTransaction(
    token_ws as string,
    Number(amount)
  );

  if ("errorMessage" in refundResult) {
    return <InvalidView errorMessage={refundResult.errorMessage} actualBread={actualBread}/>;
  }

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Reembolsar transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus - Reembolsar"
        pageDescription={`En esta etapa, tienes la opción de solicitar el reembolso del monto al titular de la tarjeta. 
        Dependiendo del monto y el tiempo transcurrido desde la transacción, este proceso podría resultar en una Reversa, 
        Anulación o Anulación Parcial.`}
        actualBread={actualBread}
        activeRoute="/webpay-plus/refund"
        steps={getRefundTRXSteps(refundResult.refundResponse, amount as string)}
      />
    </>
  );
  
}
