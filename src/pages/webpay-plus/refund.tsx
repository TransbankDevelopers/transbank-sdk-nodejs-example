import { Route } from "@/types/menu";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getRefundTRXSteps } from "@/helpers/webpay-plus/steps/refund";

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

export default function RefundTransaction() {
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
        steps={getRefundTRXSteps()}
      />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<any>> => {
  const { token_ws = null } = context.query;

  if (!token_ws) {
    return {
      props: {
        missingToken: true,
      },
    };
  }

  return {
    props: {},
  };
};
