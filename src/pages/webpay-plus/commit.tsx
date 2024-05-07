import { Route } from "@/types/menu";
import { InputText } from "@/components/input/InputText";
import { TBKCommitTransactionResponse } from "@/types/transactions";
import { Button, ButtonTypes } from "@/components/button/Button";
import { Card } from "@/components/card/Card";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { WebpayPlus } from "transbank-sdk";
import { Layout } from "@/components/layout/Layout";
import { getCommitSteps } from "@/helpers/webpay-plus/steps/commit";
import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";

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

export type CommitTransactionProps = {
  token: string;
  commitResponse: TBKCommitTransactionResponse;
};

export default function CommitTransaction(props: CommitTransactionProps) {
  const router = useRouter();
  const [refundAmount, setRefundAmount] = useState<number>(
    props.commitResponse.amount || 0
  );

  const handleRefund = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setRefundAmount(parseFloat(value));
  };

  const handleGoToTRXStatus = () => {
    router.push(`/webpay-plus/status?token_ws=${props.token}`);
  };

  const handleGoToTRXRefund = () => {
    router.push(`/webpay-plus/refund?token_ws=${props.token}`);
  };

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
        steps={getCommitSteps(props.token, props.commitResponse)}
        additionalContent={
          <Card className="justify-between">
            <InputText
              label="Monto a reembolsar:"
              value={refundAmount}
              onChange={handleRefund}
            />
            <div className="flex flex-col gap-4 items-end">
              <Button
                text="REEMBOLSAR"
                className="px-4"
                onClick={handleGoToTRXRefund}
              />
              <Button
                text="CONSULTAR ESTADO"
                className="px-4"
                onClick={handleGoToTRXStatus}
              />
            </div>
          </Card>
        }
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

  const commitResponse: TBKCommitTransactionResponse | null =
    await new WebpayPlus.Transaction(WebpayPlus.getDefaultOptions()).commit(
      token_ws as string
    );

  return {
    props: {
      token: token_ws,
      commitResponse,
    },
  };
};
