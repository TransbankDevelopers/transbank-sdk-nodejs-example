import { Route } from "@/types/menu";
import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { getRefundTRXSteps } from "@/app/transaccion-completa-diferido/content/steps/refund";
import { refundTxCompleteTransaction } from "@/app/lib/transaccion-completa-diferido/data";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { StatusButton } from "@/app/transaccion-completa-diferido/components/StatusButton";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transacción Completa",
    path: "/transaccion-completa-diferido",
  },
  {
    name: "Reembolsar",
    path: "/transaccion-completa-diferido/refund",
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

  console.log({ searchParams });
  console.log("amount", amount);

  const refundResponse = await refundTxCompleteTransaction(
    token as string,
    Number(amount)
  );

  return (
    <>
      <Head>
        <title>Transacción Completa Diferido - Reembolsar</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Diferido - Reembolsar"
        pageDescription="En esta etapa, tendrás la posibilidad de solicitar el reembolso del dinero al tarjeta habiente. El tipo de reembolso (Reversa, Anulación o Anulación parcial) dependerá del monto y el tiempo transcurrido desde la transacción."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-diferido/refund"
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
