import "./page.css";
import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/app/webpay-mall-diferido/content/steps/commit";
import Head from "next/head";
import { commitTransaction } from "@/app/lib/webpay-mall-diferido/data";
import { NextPageProps } from "@/types/general";
import { CaptureCard } from "./components/CaptureCard";
import { StatusButton } from "@/app/webpay-mall-diferido/components/StatusButton";
import { AbortedView } from "./error/aborted";
import {
  TBKAbortedResponse,
  TBKCallbackType,
  TBKMallCommitTransactionResponse,
  TBKTimeoutResponse,
} from "@/types/transactions";

import { TimeoutView } from "./error/timeout";
import { isSomeTransactionRejected } from "@/helpers/transactions/transactionHelper";
import { NavigationItem } from "@/components/layout/Navigation";

const getActualBread = (isRejected: boolean): Route[] => {
  return [
    {
      name: "Inicio",
      path: "/",
    },
    {
      name: "Webpay mall diferido",
      path: "/webpay-mall-diferido",
    },
    {
      name: isRejected ? "Rechazo bancario" : "Confirmar transacción",
      path: "/webpay-mall-diferido/commit",
    },
  ];
};

const navigationItems: NavigationItem[] = [
  {
    title: "Confirmar transacción",
    sectionId: "confirmar",
  },
  {
    title: "Otras consultas",
    sectionId: "consultas",
  },
];

const commitedContent = {
  title: "Webpay Mall - Confirmar transacción",
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
  title: "Webpay Mall - Rechazo Bancario",
  description: (
    <span>
      En esta fase, pueden surgir inconvenientes, ya sea con el titular de la
      tarjeta o a nivel bancario, lo que resulta en el estado final de la
      transacción siendo marcado como &quot;FAILED&quot;.
    </span>
  ),
};

export default async function CommitTransactionPage({
  searchParams,
}: NextPageProps) {
  const { token_ws } = searchParams;
  const { type, commitResponse, abortedResponse, timeoutResponse } =
    await commitTransaction(searchParams);

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

  const isTransactionRejected = isSomeTransactionRejected(
    (commitResponse as TBKMallCommitTransactionResponse).details
  );

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
        navigationItems={navigationItems}
        activeRoute="/webpay-mall-diferido/commit"
        steps={getCommitSteps(
          token_ws as string,
          commitResponse as TBKMallCommitTransactionResponse
        )}
        additionalContent={
          !isTransactionRejected && (
            <>
              {commitResponse?.details.map((detail) => (
                <CaptureCard
                  key={detail.buy_order}
                  token={token_ws as string}
                  amount={detail.amount}
                  buyOrder={detail.buy_order}
                  commerceCode={detail.commerce_code}
                  authorizationCode={detail.authorization_code}
                />
              ))}
              <StatusButton token={token_ws as string} />
            </>
          )
        }
      />
    </>
  );
}
