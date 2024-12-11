"use client";
import { CardPay, TokenPropNames } from "@/components/cardpay/CardPay";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getCreateTRXSteps } from "../../oneclick-mall/content/steps/create";
import { CreateTransactionResult } from "@/app/lib/oneclick-mall/data";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { useEffect } from "react";
import { localStorageUserKey } from "@/consts";
import { PageRefresh } from "@/components/pageRefresh/PageRefresh";

export type PageContentProps = {
  trxData: CreateTransactionResult;
};

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick Mall Diferido",
    path: "/oneclick-mall-deferred",
  },
];

const navigationItems: NavigationItem[] = [
  {
    title: "Petición",
    sectionId: "peticion",
  },
  {
    title: "Respuesta",
    sectionId: "respuesta",
  },
  {
    title: "Creación del formulario",
    sectionId: "form",
  },
  {
    title: "Ejemplo",
    sectionId: "ejemplo",
  },
];

export const PageContent = (props: PageContentProps) => {
  const {
    trxData: { userName },
  } = props;

  useEffect(() => {
    window?.localStorage?.setItem(localStorageUserKey, userName);
  }, [userName]);

  return (
    <>
      <PageRefresh/>
      <Head>
        <title>Transbank SDK Node - Creación de transacción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall Diferido - Creación de transacción"
        pageDescription="En esta etapa comienza el proceso de inscripción del medio de pago. Este paso inicial es fundamental, para dirigir al tarjetahabiente al formulario de inscripción."
        actualBread={actualBread}
        activeRoute="/oneclick-mall-deferred"
        navigationItems={navigationItems}
        steps={getCreateTRXSteps(props.trxData.token, props.trxData, userName)}
        additionalContent={
          <div className="mt-8">
            <CardPay
              webpayUrl={props.trxData.url_webpay}
              token={props.trxData.token}
              buttonText="INSCRIBIR"
              tokenInputName={TokenPropNames.TBK_TOKEN}
            />
          </div>
        }
      />
    </>
  );
};
