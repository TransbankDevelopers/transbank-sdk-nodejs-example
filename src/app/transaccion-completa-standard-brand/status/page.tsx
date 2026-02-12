import Head from "next/head";
import { Layout } from "@/components/layout/Layout";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { NextPageProps } from "@/types/general";
import { statusStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { getStatusSteps } from "@/app/transaccion-completa-standard-brand/content/steps/status";
import { ErrorContent } from "@/app/transaccion-completa-standard-brand/errorContent";

const actualBread: Route[] = [
  { name: "Inicio", path: "/" },
  {
    name: "Transaccion Completa Estándar Marca",
    path: "/transaccion-completa-standard-brand",
  },
  { name: "Estado", path: "/transaccion-completa-standard-brand/status" },
];

const navigationItems: NavigationItem[] = [
  { title: "Petición", sectionId: "peticion" },
  { title: "Respuesta", sectionId: "respuesta" },
];

export default async function StandardBrandStatusPage({
  searchParams,
}: Readonly<NextPageProps>) {
  const token = searchParams.token ?? searchParams.token_ws;

  let response: Record<string, unknown> | null = null;
  let error: string | null = null;

  if (token) {
    try {
      response = (await statusStandardBrandTransaction(token)) as Record<
        string,
        unknown
      >;
    } catch (err) {
      error = err instanceof Error ? err.message : "Error inesperado.";
    }
  } else {
    error = "Falta el token para consultar el estado.";
  }

  if (error) {
    return <ErrorContent errorMessage={error} actualRoute="/status" />;
  }

  const steps = getStatusSteps(token || "", error ? { error } : response || {});

  return (
    <>
      <Head>
        <title>Transaccion Completa Estándar Marca - Estado</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Estándar Marca - Estado de transacción"
        pageDescription="En esta fase, tendrás la capacidad de solicitar el estado actual de una transacción hasta 7 días después de su realización. Es importante destacar que no hay límite en la cantidad de solicitudes de este tipo durante este período. Sin embargo, una vez transcurridos los 7 días, ya no podrás revisar el estado de la transacción."
        actualBread={actualBread}
        activeRoute="/transaccion-completa-standard-brand/status"
        navigationItems={navigationItems}
        steps={steps}
      />
    </>
  );
}
