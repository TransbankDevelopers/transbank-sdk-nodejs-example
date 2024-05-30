"use client";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getCreateSteps } from "../content/steps/create";
import { NavigationItem } from "@/components/layout/Navigation";
import { Route } from "@/types/menu";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { useState } from "react";
import { Button } from "@/components/button/Button";
import { ErrorContent } from "./errorContent";

type CreateFullTransactionMallContentProps = {
  token: string;
  errorMessage?: string;
};

const navigationItems: NavigationItem[] = [
  {
    title: "Petición",
    sectionId: "peticion",
  },
  { title: "Respuesta", sectionId: "respuesta" },
  { title: "Confirmar", sectionId: "listo" },
];

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Transacción Completa",
    path: "/full-transaction-mall",
  },
  {
    name: "Transacción Completa Diferido",
    path: "/full-transaction-mall/create",
  },
];

export const CreateFullTransactionMallContent = (
  props: CreateFullTransactionMallContentProps
) => {
  const [installmentsNumber, setInstallmentsNumber] = useState<number>(3);

  const handleInstallments = (value: string) => {
    if (isNaN(parseFloat(value))) return;
    setInstallmentsNumber(parseFloat(value));
  };

  const commitLink = {
    pathname: "/full-transaction-mall/commit",
    query: {
      token_ws: props.token,
    },
  };

  const installmentsLink = {
    pathname: "/full-transaction-mall/installments",
    query: {
      token_ws: props.token,
      installments_number: installmentsNumber,
    },
  };

  if (props.errorMessage) {
    return <ErrorContent errorMessage={props.errorMessage} />;
  }

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Crear Transaccion</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Mall - Crear Transaccion"
        pageDescription="En esta primera etapa necesitas obtener los datos esenciales de la tarjeta de crédito del titular. Utiliza el formulario para recolectar esta información de manera segura."
        actualBread={actualBread}
        activeRoute="/full-transaction-mall/create"
        navigationItems={navigationItems}
        steps={getCreateSteps(props.token)}
        additionalContent={
          <Card className="commit-card">
            <InputText
              label="N de Cuotas"
              isNumber
              value={installmentsNumber}
              onChange={handleInstallments}
            />
            <div className="button-container">
              <Button text="CONSULTAR CUOTAS" link={installmentsLink} />
              <Button text="CONFIRMAR" link={commitLink} />
            </div>
          </Card>
        }
      />
    </>
  );
};
