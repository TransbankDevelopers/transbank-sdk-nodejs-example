import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import {
  createStandardBrandTransaction,
  StandardBrandCreatePayload,
} from "@/app/lib/transaccion-completa-standard-brand/data";
import { getCreateStandardBrandSteps } from "@/app/transaccion-completa-standard-brand/content/steps/create";
import { CreateActionsCard } from "@/app/transaccion-completa-standard-brand/create/components/CreateActionsCard";

const actualBread: Route[] = [
  { name: "Inicio", path: "/" },
  {
    name: "Transacción Completa Estándar Marca",
    path: "/transaccion-completa-standard-brand",
  },
  {
    name: "Crear",
    path: "/transaccion-completa-standard-brand/create",
  },
];

const navigationItems: NavigationItem[] = [
  { title: "Peticion", sectionId: "peticion" },
  { title: "Respuesta", sectionId: "respuesta" },
  { title: "Siguientes pasos", sectionId: "next-steps" },
];

const normalizeDetailField = (value?: string) => (value ?? "").trim();
const normalizeDetailFieldOrNull = (value?: string) => {
  const normalized = normalizeDetailField(value);
  return normalized === "" ? null : normalized;
};
const normalizeDetailNumber = (value?: string) => {
  if (value === undefined || value === null) return 0;
  const trimmed = value.trim();
  return trimmed === "" ? 0 : Number(trimmed);
};

export default async function StandardBrandCreatePage({
  searchParams,
}: NextPageProps) {
  const buyOrder = searchParams.buy_order;
  const sessionId = searchParams.session_id;
  const cardNumber = searchParams.card_number;
  const cardExpirationDate = searchParams.card_expiration_date;
  const cvv = searchParams.cvv;
  const detailAmount = searchParams.detail_amount;
  const detailCommerceCode = searchParams.detail_commerce_code;
  const detailBuyOrder = searchParams.detail_buy_order;

  let response: unknown = null;
  let error: string | null = null;

  const detail: StandardBrandCreatePayload["details"][number] = {
    amount: normalizeDetailNumber(detailAmount),
    commerce_code: normalizeDetailField(detailCommerceCode),
    buy_order: normalizeDetailField(detailBuyOrder),
    post_entry_mod: normalizeDetailField(searchParams.detail_post_entry_mod),
    eci: normalizeDetailFieldOrNull(searchParams.detail_eci),
    authentication_value: normalizeDetailFieldOrNull(
      searchParams.detail_authentication_value,
    ),
    message_version: normalizeDetailFieldOrNull(
      searchParams.detail_message_version,
    ),
    trans_status: normalizeDetailFieldOrNull(searchParams.detail_trans_status),
    ds_trans_id: normalizeDetailFieldOrNull(searchParams.detail_ds_trans_id),
    authentication_type: normalizeDetailFieldOrNull(
      searchParams.detail_authentication_type,
    ),
    identify_initiated_trx: normalizeDetailNumber(
      searchParams.detail_identify_initiated_trx,
    ),
    pmnt_ind: normalizeDetailFieldOrNull(searchParams.detail_pmnt_ind),
    recur_pmnt: normalizeDetailFieldOrNull(searchParams.detail_recur_pmnt),
  };

  const requestPayload: StandardBrandCreatePayload = {
    buy_order: buyOrder || "",
    session_id: sessionId || "",
    card_number: cardNumber || "",
    card_expiration_date: cardExpirationDate || "",
    cvv: Number(cvv || 0),
    details: [detail],
  };

  try {
    response = await createStandardBrandTransaction(requestPayload);
  } catch (err) {
    error = err instanceof Error ? err.message : "Error inesperado.";
  }

  const token =
    response && typeof response === "object" && "token" in response
      ? String((response as { token?: string }).token || "")
      : "";

  const steps = getCreateStandardBrandSteps(
    requestPayload,
    error ? { error } : response || {},
  );

  return (
    <>
      <Head>
        <title>Transacción Completa Estándar Marca - Crear</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Estándar Marca - Crear transacción"
        pageDescription="En este paso sucede la creación de la transacción con el objetivo de obtener un identificador único para la misma."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-standard-brand/create"
        navigationItems={navigationItems}
        steps={steps}
        additionalContent={
          <div className="flex-col gap-6">
            <CreateActionsCard
              token={token}
              buyOrder={detailBuyOrder || ""}
              commerceCode={detailCommerceCode || ""}
              amount={detailAmount || ""}
            />
          </div>
        }
      />
    </>
  );
}
