import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/app/webpay-plus/content/steps/commit";
import Head from "next/head";
import { commitTransaction } from "@/app/lib/webpay-plus/data";
import { NextPageProps, SearchParams } from "@/types/general";
import { RefundAndStatus } from "./components/RefundAndStatus";
import { AbortedView } from "./error/aborted";
import {
  TBKAbortedResponse,
  TBKCallbackType,
  TBKCommitTransactionResponse,
  TBKTimeoutResponse,
  TBKTransactionStatus,
} from "@/types/transactions";
import { TimeoutView } from "./error/timeout";
import { InvalidPaymentView } from "./error/invalid";

const getActualBread = (isRejected: boolean): Route[] => {
  return [
    {
      name: "Inicio",
      path: "/",
    },
    {
      name: "Webpay Plus",
      path: "/webpay-plus",
    },
    {
      name: isRejected ? "Rechazo bancario" : "Confirmar transacción",
      path: "/webpay-plus/commit",
    },
  ];
};

const commitedContent = {
  title: "Webpay Plus - Confirmar transacción",
  description: (
    <>
      En este paso es importante confirmar la transacción para notificar a
      Transbank que hemos recibido exitosamente los detalles de la transacción.{" "}
      <b>
        Es importante destacar que si la confirmación no se realiza, la
        transacción será reversada.
      </b>
    </>
  ),
};

const rejectedContent = {
  title: "Webpay Plus - Rechazo Bancario",
  description: (
    <span>
      En esta fase, pueden surgir inconvenientes, ya sea con el titular de la
      tarjeta o a nivel bancario, lo que resulta en el estado final de la
      transacción siendo marcado como &quot;FAILED&quot;.
    </span>
  ),
};

export default async function CommitTransaction({
  searchParams,
}: NextPageProps) {
  const { token_ws } = searchParams;
  const { type, commitResponse, abortedResponse, timeoutResponse } =
    await commitTransaction(searchParams as SearchParams);
  if (type === TBKCallbackType.ABORTED) {
    return (
      <AbortedView abortedResponse={abortedResponse as TBKAbortedResponse} />
    );
  }

  if (type === TBKCallbackType.TIMEOUT) {
    return (
      <TimeoutView
        token_ws={token_ws as string}
        timeoutResponse={timeoutResponse as TBKTimeoutResponse}
      />
    );
  }

  if (type === TBKCallbackType.INVALID_PAYMENT) {
    return <InvalidPaymentView />;
  }

  const isTransactionRejected =
    commitResponse?.status === TBKTransactionStatus.FAILED;

  const content = isTransactionRejected ? rejectedContent : commitedContent;

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Commit Transaction</title>
      </Head>
      <Layout
        pageTitle={content.title}
        pageDescription={content.description}
        actualBread={getActualBread(isTransactionRejected)}
        activeRoute="/webpay-plus/commit"
        steps={getCommitSteps(
          token_ws as string,
          commitResponse as TBKCommitTransactionResponse
        )}
        additionalContent={
          !isTransactionRejected && (
            <RefundAndStatus
              token={token_ws as string}
              amount={(commitResponse as TBKCommitTransactionResponse).amount}
            />
          )
        }
      />
    </>
  );
}
