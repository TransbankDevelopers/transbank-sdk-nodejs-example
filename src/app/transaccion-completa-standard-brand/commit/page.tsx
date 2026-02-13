import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { getCommitSteps } from "@/app/transaccion-completa-standard-brand/content/steps/commit";
import { NextPageProps } from "@/types/general";
import { commitStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { MallBSRefundCard } from "@/components/mall-refund-card/MallBSRefundCard";
import { MallStatusButton } from "@/components/mall-status-button/MallStatusButton";
import {
  TransactionDetail,
  TBKMallCommitTransactionSBResponse,
} from "@/types/transactions";
import { ErrorContent } from "@/app/transaccion-completa-standard-brand/errorContent";

const actualBread: Route[] = [
  { name: "Inicio", path: "/" },
  {
    name: "Transacción Completa Estándar Marca",
    path: "/transaccion-completa-standard-brand",
  },
  { name: "Confirmar", path: "/transaccion-completa-standard-brand/commit" },
];

const navigationItems: NavigationItem[] = [
  { title: "Confirmar", sectionId: "confirmar" },
  { title: "Otras Utilidades", sectionId: "confirm" },
];

export default async function StandardBrandCommitPage({
  searchParams,
}: Readonly<NextPageProps>) {
  const token = searchParams.token;
  const commerceCode = searchParams.commerce_code;
  const buyOrder = searchParams.buy_order;
  const idQueryInstallments = searchParams.id_query_installments;

  let response: TBKMallCommitTransactionSBResponse | null = null;
  let error: string | null = null;

  if (!token || !commerceCode || !buyOrder) {
    error = "Faltan campos obligatorios para confirmar la transaccion.";
  } else {
    try {
      response = (await commitStandardBrandTransaction(token, {
        details: [
          {
            commerce_code: commerceCode,
            buy_order: buyOrder,
            id_query_installments: idQueryInstallments
              ? Number(idQueryInstallments)
              : undefined,
          },
        ],
      })) as TBKMallCommitTransactionSBResponse;
    } catch (err) {
      error = err instanceof Error ? err.message : "Error inesperado.";
    }
  }

  if (error) {
    return <ErrorContent errorMessage={error} actualRoute="/commit" />;
  }

  const steps = response ? getCommitSteps(response) : [];
  const refundDetails: TransactionDetail[] =
    response?.details?.map?.((detail) => ({
      amount: detail.amount,
      status: detail.status,
      authorization_code: detail.authorization_code,
      payment_type_code: detail.payment_type_code,
      response_code: Number(detail.response_code_reference ?? 0),
      installments_number: detail.installments_number,
      commerce_code: detail.commerce_code,
      buy_order: detail.buy_order,
    })) ?? [];

  return (
    <>
      <Head>
        <title>Transacción Completa Estándar Marca - Confirmar</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Estándar Marca - Confirmar Transacción"
        pageDescription="En este paso tenemos que confirmar la transacción con el objetivo de avisar a Transbank que hemos recibido la transacción ha sido recibida exitosamente. En caso de que no se confirme la transacción, ésta será caducada."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-standard-brand/commit"
        navigationItems={navigationItems}
        steps={steps}
        additionalContent={
          <div className="mt-4">
            {token &&
              response &&
              refundDetails.map((detail) => (
                <MallBSRefundCard
                  productLink="/transaccion-completa-standard-brand"
                  key={detail.buy_order}
                  detail={detail}
                  token={token}
                />
              ))}
            {token && response && (
              <MallStatusButton
                productLink="/transaccion-completa-standard-brand"
                token={token}
              />
            )}
          </div>
        }
      />
    </>
  );
}
