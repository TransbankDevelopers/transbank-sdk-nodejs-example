import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/app/webpay-plus/content/steps/commit";
import Head from "next/head";
import { commitTransaction } from "@/app/lib/webpay-plus/data";
import { NextPageProps, SearchParams } from "@/types/general";
import { AbortedView } from "./error/aborted";
import {
  TBKAbortedResponse,
  TBKCallbackType,
  TBKCommitTransactionResponse,
  TBKTimeoutResponse,
  TBKTransactionStatus,
} from "@/types/transactions";
import { TimeoutView } from "./error/timeout";
import { Capture } from "./components/Capture";
import { getWebpayPlusDeferredOptions } from "@/app/lib/webpay-plus-deferred/data";

const getActualBread = (isRejected: boolean): Route[] => {
  return [
    {
      name: "Inicio",
      path: "/",
    },
    {
      name: "Webpay Plus Diferido",
      path: "/webpay-plus-deferred",
    },
    {
      name: isRejected ? "" : "Confirmar transacción diferida",
      path: "/webpay-plus-deferred/commit",
    },
  ];
};

const commitedContent = {
  title: "Webpay Plus - Confirmar Transacción diferida",
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
    await commitTransaction(
      searchParams as SearchParams,
      getWebpayPlusDeferredOptions()
    );

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
        activeRoute="/webpay-plus-deferred/commit"
        steps={getCommitSteps(
          token_ws as string,
          commitResponse as TBKCommitTransactionResponse
        )}
        additionalContent={
          <Capture
            token_ws={token_ws as string}
            commitResponse={commitResponse as TBKCommitTransactionResponse}
          />
        }
      />
    </>
  );
}
