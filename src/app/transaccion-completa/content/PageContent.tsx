"use client";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { CreditCard } from "@/components/creditcard/CreditCard";
import { useState } from "react";
import { Focused } from "react-credit-cards-2";

export type CreatePageContentProps = {
  actualBread: Route[];
  navigationItems: NavigationItem[];
};

export function PageContent(props: CreatePageContentProps) {
  const [cardState, setCardState] = useState<CreditCard>({
    number: "",
    expiry: "",
    cvc: "",
    name: "Ariel Cardenas",
    focus: "number",
  });

  const FullTxCreateLink = {
    pathname: "/transaccion-completa/create",
    query: {
      cardNumber: cardState.number,
      cvv: cardState.cvc,
      cardExpirationDate: cardState.expiry,
    },
  };

  const handleInputChange = (value: string, name: string) => {
    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (name: string) => {
    setCardState((prev) => ({
      ...prev,
      focus: name as Focused,
    }));
  };

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Formulario</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa - Formulario"
        pageDescription="En esta primera etapa necesitas obtener los datos esenciales de la tarjeta de crédito del titular. Utiliza el formulario para recolectar esta información de manera segura."
        actualBread={props.actualBread}
        activeRoute="/fulltransaction-mall"
        navigationItems={props.navigationItems}
        additionalContent={
          <CreditCard
            {...cardState}
            linkTo={FullTxCreateLink}
            handleInputChange={handleInputChange}
            handleInputFocus={handleInputFocus}
          />
        }
      />
    </>
  );
}
