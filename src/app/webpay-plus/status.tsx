import { Route } from "@/types/menu";
import { TBKTransactionStatusResponse } from "@/types/transactions";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getStatusTRXSteps } from "@/helpers/webpay-plus/steps/status";
import { WebpayPlus } from "transbank-sdk";

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
    name: "Estado de transacción",
    path: "/webpay-plus/status",
  },
];

export type StatusTRXError = {
  missingToken?: boolean;
  invalidToken?: boolean;
};

export type StatusTRXProps =
  | {
      trxStatus: TBKTransactionStatusResponse;
    }
  | StatusTRXError;

const isStatusTRXError = (object: any): object is StatusTRXError => {
  return "missingToken" in object || "invalidToken" in object;
};

export default function StatusTransaction(props: StatusTRXProps) {
  if (isStatusTRXError(props)) {
    return <span>Error</span>;
  }

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Estado de transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus - Consultar estado de transacción"
        pageDescription={`Puedes solicitar el estado de una transacción hasta 7 días después de su realización. 
        No hay límite de solicitudes de este tipo durante ese período. 
        Sin embargo, una vez pasados los 7 días, ya no podrás revisar su estado.`}
        actualBread={actualBread}
        activeRoute="/webpay-plus/status"
        steps={getStatusTRXSteps(props.trxStatus)}
      />
    </>
  );
}

export const getServerSideProps = async (
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<StatusTRXProps>> => {
  const { token_ws = null } = context.query;

  if (!token_ws) {
    return {
      props: {
        missingToken: true,
      },
    };
  }

  const trxStatus: TBKTransactionStatusResponse | null =
    await new WebpayPlus.Transaction(WebpayPlus.getDefaultOptions()).status(
      token_ws as string
    );

  if (!trxStatus) {
    return {
      props: {
        invalidToken: true,
      },
    };
  }

  return {
    props: {
      trxStatus,
    },
  };
};
