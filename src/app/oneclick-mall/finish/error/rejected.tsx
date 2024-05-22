import Head from "next/head";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { TBKFinishInscriptionResponse } from "@/types/transactions";
import { getErrorRejectedSteps } from "../../content/steps/error-rejected";
import { MallStatusButton } from "../../authorize/components/MallStatusButton";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick",
    path: "/oneclick-mall",
  },
  {
    name: "Rechazo Bancario",
    path: "/oneclick-mall/finish",
  },
];

export type RejectedInscriptionViewProps = {
  trxData: TBKFinishInscriptionResponse;
  token: string;
};

export const RejectedInscriptionView = async (
  props: RejectedInscriptionViewProps
) => {
  return (
    <>
      <Head>
        <title>Transbank SDK Node - Rechazo Bancario</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Rechazo Bancario"
        pageDescription={
          <span>
            En esta fase, pueden surgir inconvenientes, ya sea con el titular de
            la tarjeta o a nivel bancario, lo que resulta en el estado final de
            la transacción siendo marcado como &quot;FAILED&quot;.
          </span>
        }
        actualBread={actualBread}
        activeRoute="/oneclick-mall/finish"
        steps={getErrorRejectedSteps(props.trxData)}
        additionalContent={
          <div className="mt-4">
            <MallStatusButton buyOrder={props.token} />
          </div>
        }
      />
    </>
  );
};
