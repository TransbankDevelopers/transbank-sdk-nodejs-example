import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { getRefundSteps } from "@/app/transaccion-completa-standard-brand/content/steps/refund";
import { TBKRefundMallTransactionResponse } from "@/types/transactions";
import { StatusButton } from "@/app/transaccion-completa-standard-brand/components/StatusButton";
import { NextPageProps } from "@/types/general";
import { refundStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { ErrorContent } from "@/app/transaccion-completa-standard-brand/errorContent";

const actualBread: Route[] = [
  { name: "Inicio", path: "/" },
  {
    name: "Transaccion Completa Estándar Marca",
    path: "/transaccion-completa-standard-brand",
  },
  { name: "Reembolso", path: "/transaccion-completa-standard-brand/refund" },
];

const navigationItems: NavigationItem[] = [
  { title: "Petición", sectionId: "peticion" },
  { title: "Respuesta", sectionId: "respuesta" },
];

export default async function StandardBrandRefundPage({
  searchParams,
}: NextPageProps) {
  const token = searchParams.token;
  const commerceCode = searchParams.child_commerce_code;
  const buyOrder = searchParams.child_buy_order;
  const amount = searchParams.amount;

  let response: TBKRefundMallTransactionResponse | null = null;
  let error: string | null = null;

  if (!token || !commerceCode || !buyOrder || !amount) {
    error = "Faltan campos obligatorios para reembolsar.";
  } else {
    try {
      response = (await refundStandardBrandTransaction(token, {
        commerce_code: commerceCode,
        buy_order: buyOrder,
        amount: Number(amount),
      })) as TBKRefundMallTransactionResponse;
    } catch (err) {
      error = err instanceof Error ? err.message : "Error inesperado.";
    }
  }

  if (error) {
    return <ErrorContent errorMessage={error} actualRoute="/refund" />;
  }

  const steps = getRefundSteps(
    token || "",
    amount || "",
    response ?? ({} as TBKRefundMallTransactionResponse),
  );

  return (
    <>
      <Head>
        <title>Transaccion Completa Estándar Marca - Reembolso</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Estándar Marca - Reembolsar"
        pageDescription="En esta etapa, tendrás la posibilidad de solicitar el reembolso del dinero al tarjeta habiente. El tipo de reembolso (Reversa, Anulación o Anulación parcial) dependerá del monto y el tiempo transcurrido desde la transacción."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-standard-brand/refund"
        navigationItems={navigationItems}
        steps={steps}
        additionalContent={
          token ? <StatusButton className="mt-6" token={token} /> : null
        }
      />
    </>
  );
}
