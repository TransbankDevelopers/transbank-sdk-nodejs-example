import { Route } from "@/types/menu";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { getRefundTRXSteps } from "@/app/transaccion-completa/content/steps/refund";
import { refundTxCompleteTransaction } from "@/app/lib/transaccion-completa/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { StatusButton } from "@/app/transaccion-completa/components/StatusButton";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transaccion Completa",
    path: "/transaccion-completa",
  },
  {
    name: "Reversa",
    path: "/transaccion-completa/refund",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Peticion",
    sectionId: "peticion",
  },
  {
    title: "Respuesta",
    sectionId: "respuesta",
  },
];

export default async function RefundWebpaytxfullPage({
  searchParams,
}: NextPageProps) {
  const { token, amount } = searchParams;

  const refundResponse = await refundTxCompleteTransaction(
    token as string,
    Number(amount)
  );

  return (
    <>
      <Head>
        <title>Transacción Completa - Reembolsar</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa - Reembolsar"
        pageDescription="En esta etapa, tendrás la posibilidad de solicitar el reembolso del dinero al tarjeta habiente. El tipo de reembolso (Reversa, Anulación o Anulación parcial) dependerá del monto y el tiempo transcurrido desde la transacción."
        actualBread={actualBread}
        activeRoute="/transaccion-completa/refund"
        navigationItems={navigationItems}
        steps={getRefundTRXSteps(
          token as string,
          Number(amount),
          refundResponse
        )}
        additionalContent={<StatusButton className="mt-6" token={token} />}
      />
    </>
  );
}
