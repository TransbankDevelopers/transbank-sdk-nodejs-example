import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { installmentsStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { getInstallmentsSteps } from "@/app/transaccion-completa-standard-brand/content/steps/installments";
import { TBKInstallmentsFullTransactionResponse } from "@/types/transactions";
import { ConfirmCard } from "@/app/transaccion-completa-standard-brand/installments/components/ConfirmCard";
import { ErrorContent } from "@/app/transaccion-completa-standard-brand/errorContent";

const actualBread: Route[] = [
  { name: "Inicio", path: "/" },
  {
    name: "Transaccion Completa Estándar Marca",
    path: "/transaccion-completa-standard-brand",
  },
  { name: "Cuotas", path: "/transaccion-completa-standard-brand/installments" },
];

const navigationItems: NavigationItem[] = [
  { title: "Petición", sectionId: "peticion" },
  { title: "Respuesta", sectionId: "respuesta" },
  { title: "Confirmar", sectionId: "listo" },
];

export default async function StandardBrandInstallmentsPage({
  searchParams,
}: Readonly<NextPageProps>) {
  const token = searchParams.token;
  const buyOrder = searchParams.buy_order;
  const commerceCode = searchParams.commerce_code;
  const installmentsNumber = Number(searchParams.installments_number || 10);

  let response: TBKInstallmentsFullTransactionResponse | null = null;
  let error: string | null = null;

  if (!token || !buyOrder || !commerceCode) {
    error = "Faltan campos obligatorios para consultar cuotas.";
  } else {
    try {
      const result = (await installmentsStandardBrandTransaction(token, {
        buy_order: buyOrder,
        commerce_code: commerceCode,
        installments_number: installmentsNumber,
      })) as TBKInstallmentsFullTransactionResponse;

      response = result;
    } catch (err) {
      error = err instanceof Error ? err.message : "Error inesperado.";
    }
  }

  if (error) {
    return <ErrorContent errorMessage={error} actualRoute="/installments" />;
  }

  const idQueryInstallments = response
    ? String(response.id_query_installments || "")
    : "";

  const steps = response ? getInstallmentsSteps(response) : [];

  return (
    <>
      <Head>
        <title>Transaccion Completa Estándar Marca - Cuotas</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Estándar Marca - Consulta de cuotas"
        pageDescription="En esta etapa, realizaremos una consulta de cuotas para conocer sus condiciones. Es importante destacar que este paso es opcional y se utiliza únicamente si deseas ofrecer opciones de pago a plazos."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-standard-brand/installments"
        navigationItems={navigationItems}
        steps={steps}
        additionalContent={
          <>
            {!error && token && buyOrder && commerceCode && response && (
              <div className="mt-4">
                <ConfirmCard
                  token={token}
                  buyOrder={buyOrder}
                  commerceCode={commerceCode}
                  idQueryInstallments={idQueryInstallments}
                />
              </div>
            )}
          </>
        }
      />
    </>
  );
}
