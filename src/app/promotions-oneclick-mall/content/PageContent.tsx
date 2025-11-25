"use client";
import { CardPay, TokenPropNames } from "@/components/cardpay/CardPay";
import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { getCreateTRXSteps } from "./steps/create";
import { CreateTransactionResult } from "@/app/lib/oneclick-mall/data";
import { Route } from "@/types/menu";
import { NavigationItem } from "@/components/layout/Navigation";
import { useEffect } from "react";
import { localStorageUserKey } from "@/consts";
import { PageRefresh } from "@/components/pageRefresh/PageRefresh";

export type PageContentProps = {
  trxData: CreateTransactionResult;
  actualBread: Route[];
  navigationItems: NavigationItem[];
};

export const PageContent = (props: PageContentProps) => {
  const {
    trxData: { userName },
  } = props;

  useEffect(() => {
    window?.localStorage?.setItem(localStorageUserKey, userName);
  }, [userName]);

  return (
    <>
      <PageRefresh />
      <Head>
        <title>Transbank SDK Node - Creación de inscripción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall Promociones - Creación de Inscripción"
        pageDescription="En esta etapa comienza el proceso de inscripción del medio de pago. Este paso inicial es fundamental para redirigir al tarjetahabiente al formulario de
inscripción. Durante esta etapa no verás diferencias en la experiencia de usuario ni en la integración de tu producto."
        actualBread={props.actualBread}
        activeRoute="/promotions-oneclick-mall"
        navigationItems={props.navigationItems}
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
