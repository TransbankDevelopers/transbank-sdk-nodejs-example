import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import {
  StandardBrandCreatePayload,
  StandardBrandCreateResponse,
} from "@/types/transactions";
import { createStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { getCreateStandardBrandSteps } from "@/app/transaccion-completa-standard-brand/content/steps/create";
import { CreateActionsCard } from "@/app/transaccion-completa-standard-brand/create/components/CreateActionsCard";
import { ErrorContent } from "@/app/transaccion-completa-standard-brand/errorContent";

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
}: Readonly<NextPageProps>) {
  const {
    buy_order: buyOrder,
    session_id: sessionId,
    card_number: cardNumber,
    card_expiration_date: cardExpirationDate,
    cvv,
    detail_amount: detailAmount,
    detail_commerce_code: detailCommerceCode,
    detail_buy_order: detailBuyOrder,
    detail_post_entry_mod: detailPostEntryMod,
    detail_eci: detailEci,
    detail_authentication_value: detailAuthenticationValue,
    detail_message_version: detailMessageVersion,
    detail_trans_status: detailTransStatus,
    detail_ds_trans_id: detailDsTransId,
    detail_authentication_type: detailAuthenticationType,
    detail_identify_initiated_trx: detailIdentifyInitiatedTrx,
    detail_pmnt_ind: detailPmntInd,
    detail_recur_pmnt: detailRecurPmnt,
  } = searchParams;

  let response: StandardBrandCreateResponse | null = null;
  let error: string | null = null;

  const detail: StandardBrandCreatePayload["details"][number] = {
    amount: normalizeDetailNumber(detailAmount),
    commerce_code: normalizeDetailField(detailCommerceCode),
    buy_order: normalizeDetailField(detailBuyOrder),
    post_entry_mod: normalizeDetailField(detailPostEntryMod),
    eci: normalizeDetailFieldOrNull(detailEci),
    authentication_value: normalizeDetailFieldOrNull(detailAuthenticationValue),
    message_version: normalizeDetailFieldOrNull(detailMessageVersion),
    trans_status: normalizeDetailFieldOrNull(detailTransStatus),
    ds_trans_id: normalizeDetailFieldOrNull(detailDsTransId),
    authentication_type: normalizeDetailFieldOrNull(detailAuthenticationType),
    identify_initiated_trx: normalizeDetailNumber(detailIdentifyInitiatedTrx),
    pmnt_ind: normalizeDetailFieldOrNull(detailPmntInd),
    recur_pmnt: normalizeDetailFieldOrNull(detailRecurPmnt),
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

  if (error) {
    return <ErrorContent errorMessage={error} actualRoute="/create" />;
  }

  const token = response?.token ?? "";

  const steps = getCreateStandardBrandSteps(requestPayload, response || {});

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
