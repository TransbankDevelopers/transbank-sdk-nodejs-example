import { Route } from "@/types/menu";
import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/helpers/webpay-plus/steps/commit";
import Head from "next/head";
import { commitTransaction } from "@/app/lib/webpay-plus/data";
import { NextPageProps } from "@/types/general";
import { RefundAndStatus } from "./components/RefundAndStatus";

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
    name: "Confirmar transacción",
    path: "/webpay-plus/commit",
  },
];

export default async function CommitTransaction({
  searchParams,
}: NextPageProps) {
  const { token_ws } = searchParams;
  const { commitResponse } = await commitTransaction(token_ws as string);

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Commit Transaction</title>
      </Head>
      <Layout
        pageTitle="Webpay Plus - Confirmar transacción"
        pageDescription={
          <>
            En este paso es importante confirmar la transacción para notificar a
            Transbank que hemos recibido exitosamente los detalles de la
            transacción.{" "}
            <b>
              Es importante destacar que si la confirmación no se realiza, la
              transacción será reversada.
            </b>
          </>
        }
        actualBread={actualBread}
        activeRoute="/webpay-plus/commit"
        steps={getCommitSteps(token_ws as string, commitResponse)}
        additionalContent={
          <RefundAndStatus
            token={token_ws as string}
            amount={commitResponse.amount}
          />
        }
      />
    </>
  );
}
