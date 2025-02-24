import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getRefundTRXSteps } from "@/app/webpay-plus/content/steps/refund";
import { NextPageProps } from "@/types/general";
import { refundTransaction } from "@/app/lib/webpay-plus/data";
import { CustomError } from "@/components/customError/CustomError";
import { Metadata } from "next";
import { StatusButton } from "@/app/webpay-plus/components/StatusButton";

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
    return (
      <CustomError
        errorMessage={refundResult.errorMessage}
        actualBread={actualBread}
      />
    );
  }

  return (
    <Layout
      pageTitle="Webpay Plus - Reembolsar"
      pageDescription={`En esta etapa, tienes la opción de solicitar el reembolso del monto al titular de la tarjeta. 
        Dependiendo del monto y el tiempo transcurrido desde la transacción, este proceso podría resultar en una Reversa o Anulación, dependiendo de ciertas condiciones (Reversa
                en las primeras 3 horas de la autorización, anulación posterior
                a eso), o una Anulación parcial si el monto es menor al total.
                Las anulaciones parciales para tarjetas débito y prepago no
                están soportadas.`}
      actualBread={actualBread}
      activeRoute="/webpay-plus/refund"
      steps={getRefundTRXSteps(refundResult, amount as string)}
      additionalContent={<StatusButton className="mt-6" token={token_ws} />}
    />
  );
}
