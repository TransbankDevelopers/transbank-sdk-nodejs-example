"use client";
import "./page.css";
import { Layout } from "@/components/layout/Layout";
import { NavigationItem } from "@/components/layout/Navigation";
import { Route } from "@/types/menu";
import { TBKFinishInscriptionResponse } from "@/types/transactions";
import Head from "next/head";
import { getFinishInscritionSteps } from "../content/steps/finish";
import { Button } from "@/components/button/Button";
import { useEffect, useState } from "react";
import { localStorageUserKey } from "@/consts";
import { AuthorizeForm } from "@/components/authorizeForm/AuthorizeForm";
import { InfoBinButton } from "../components/InfoBinButton";

export type ContentOneclickProps = {
  actualBread: Route[];
  navigationItems: NavigationItem[];
  token: string;
  trxData: TBKFinishInscriptionResponse;
};

export const ContentOneClickMall = (props: ContentOneclickProps) => {
  const [userName, setUserName] = useState("User-XXXX");

  useEffect(() => {
    const user = window.localStorage.getItem(localStorageUserKey);
    if (user) {
      setUserName(user);
    }
  }, []);

  const removeUserLink = {
    pathname: `/promotions-oneclick-mall/remove-user`,
    query: {
      tbk_user: props.trxData.tbk_user,
      user_name: userName,
    },
  };

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Finalizar inscripción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall Promociones - Finalizar inscripción"
        pageDescription="En esta fase, completaremos el proceso de inscripción, permitiéndonos posteriormente realizar cargos a la tarjeta que el tarjetahabiente haya inscrito."
        actualBread={props.actualBread}
        activeRoute="/promotions-oneclick-mall/finish"
        navigationItems={props.navigationItems}
        steps={getFinishInscritionSteps(
          props.token,
          props.trxData,
          userName as string
        )}
        additionalContent={
          <div className="mt-8">
            <p>
              Después de una inscripción exitosa, tienen dos opciones: autorizar
              un pago o borrar al usuario que se acaba de inscribir.
            </p>
            <AuthorizeForm
              tbkUser={props.trxData.tbk_user}
              userName={userName}
              productLink={`/promotions-oneclick-mall`}
            />
            <div className="flex-start">
              <Button text="BORRAR USUARIO" link={removeUserLink} />
            </div>
            <div className="flex-start mt-2">
              <InfoBinButton tbkUser={props.trxData.tbk_user} />
            </div>
          </div>
        }
      />
    </>
  );
};
