import { Layout } from "@/components/layout/Layout";
import { NavigationItem } from "@/components/layout/Navigation";
import { Route } from "@/types/menu";
import { getRefundSteps } from "../content/steps/refund";
import { NextPageProps } from "@/types/general";
import { TBKRefundMallTransactionResponse } from "@/types/transactions";
import { refundFullTransactionMallTransaction } from "@/app/lib/transaccion-completa-mall/data";
import { StatusButton } from "@/app/transaccion-completa-mall/components/StatusButton";
import "./page.css";

const navigationItems: NavigationItem[] = [
  {
    title: "Petición",
    sectionId: "peticion",
  },
  { title: "Respuesta", sectionId: "respuesta" },
];

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transacción Completa Mall",
    path: "/transaccion-completa-mall",
  },
  {
    name: "Reembolsar",
    path: "/transaccion-completa-mall/refund",
  },
];

export default async function RefundFullTransactionMallPage({
  searchParams,
}: NextPageProps) {
  const { token_ws, amount, child_buy_order, child_commerce_code } =
    searchParams;

  const trxData = await refundFullTransactionMallTransaction({
    token: token_ws,
    buyOrder: child_buy_order,
    commerceCode: child_commerce_code,
    amount: Number(amount),
  });

  return (
    <Layout
      pageTitle="Transacción Completa Mall - Reembolsar"
      pageDescription="En esta etapa, tendrás la posibilidad de solicitar el reembolso del dinero al tarjeta habiente. El tipo de reembolso (Reversa, Anulación o Anulación parcial) dependerá del monto y el tiempo transcurrido desde la transacción."
      activeRoute={"/transaccion-completa-mall/refund"}
      actualBread={actualBread}
      navigationItems={navigationItems}
      steps={getRefundSteps(
        token_ws,
        amount,
        trxData as TBKRefundMallTransactionResponse
      )}
      additionalContent={<StatusButton className="mt-6" token={token_ws} />}
    />
  );
}
