"use client";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import {
  CreditCard,
  CreditCardState,
} from "@/components/creditcard/CreditCard";
import { useEffect, useRef, useState } from "react";
import { Focused } from "react-credit-cards-2";
import Link from "next/link";

export type PageContentProps = {
  actualBread: Route[];
  navigationItems: NavigationItem[];
};

const DEFAULT_CREDIT_CARD_VALUES: CreditCardState = {
  number: "4051 8856 0044 6623",
  expiry: "0826",
  cvc: "123",
  name: "Ariel Cardenas",
  focus: "number",
};

export const PageContent = (props: PageContentProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const [cardState, setCardState] = useState<CreditCardState>(
    DEFAULT_CREDIT_CARD_VALUES
  );
  const [token, setToken] = useState<string | null>();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleInputChange = (value: string, name: string) => {
    setCardState((prev) => ({ ...prev, [name]: value }));
  };

  const handleInputFocus = (name: string) => {
    setCardState((prev) => ({
      ...prev,
      focus: name as Focused,
    }));
  };

  const commitLink = () => {
    const query = errorMessage
      ? { error_message: errorMessage }
      : { token_ws: token };

    return {
      pathname: "/transaccion-completa-mall/create",
      query,
    };
  };

  const onPay = async () => {
    const creditCard: CreditCard = {
      number: cardState.number,
      expiry: cardState.expiry,
      cvc: cardState.cvc,
      name: cardState.name,
    };

    const request = await fetch("/api/transaccion-completa-mall/create", {
      method: "POST",
      body: JSON.stringify(creditCard),
    });

    if (!request.ok) {
      const error = await request.text();
      setErrorMessage(error);
      return;
    }

    const token = await request.text();

    setToken(token);
  };

  useEffect(() => {
    if (!token && !errorMessage) return;

    linkRef.current?.click();
  }, [token, errorMessage]);

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Formulario</title>
      </Head>
      <Layout
        pageTitle="Transacción Completa Mall - Formulario"
        pageDescription="En esta primera etapa necesitas obtener los datos esenciales de la tarjeta de crédito del titular. Utiliza el formulario para recolectar esta información de manera segura."
        actualBread={props.actualBread}
        activeRoute="/transaccion-completa-mall"
        navigationItems={props.navigationItems}
        additionalContent={
          <>
            <Link
              href={commitLink()}
              ref={linkRef}
              style={{ display: "none" }}
            />
            <CreditCard
              {...cardState}
              handleInputChange={handleInputChange}
              handleInputFocus={handleInputFocus}
              onPay={onPay}
            />
          </>
        }
      />
    </>
  );
};
