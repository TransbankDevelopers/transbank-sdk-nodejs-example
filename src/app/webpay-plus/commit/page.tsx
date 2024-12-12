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
import { CustomError } from "@/components/customError/CustomError";

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

const commitContent = {
  title: "Webpay Plus - Confirmar transacción",
  description: (
    <>
      En este paso es importante confirmar la transacción para notificar a
      Transbank que hemos recibido exitosamente los detalles de la transacción.{" "}
      <b>
        Es importante destacar que si la confirmación no se realiza, la
        transacción será caducada.
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
  const result = await commitTransaction(searchParams);
  if ("errorMessage" in result) {
    return (
      <CustomError  errorMessage={result.errorMessage} actualBread={getActualBread(true)}/>
    );
  }
  const { type, commitResponse, abortedResponse, timeoutResponse } = result;
  
  if (type === TBKCallbackType.ABORTED) {
    return (
      <AbortedView abortedResponse={abortedResponse as TBKAbortedResponse} />
    );
  }

  if (type === TBKCallbackType.TIMEOUT) {
    return (
      <TimeoutView
        token_ws={searchParams.token_ws}
        timeoutResponse={timeoutResponse as TBKTimeoutResponse}
      />
    );
  }

  if (type === TBKCallbackType.INVALID_PAYMENT) {
    return <InvalidPaymentView />;
  }

  const isTransactionRejected =
    commitResponse?.status === TBKTransactionStatus.FAILED;

  const content = isTransactionRejected ? rejectedContent : commitContent;

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
          searchParams.token_ws,
          commitResponse as TBKCommitTransactionResponse
        )}
        additionalContent={
          !isTransactionRejected && (
            <RefundAndStatus
              token={searchParams.token_ws}
              amount={(commitResponse as TBKCommitTransactionResponse).amount}
            />
          )
        }
      />
    </>
  );
}

