"use client";
import "./page.css";
import { Layout } from "@/components/layout/Layout";
import { NavigationItem } from "@/components/layout/Navigation";
import { Route } from "@/types/menu";
import { TBKFinishInscriptionResponse } from "@/types/transactions";
import Head from "next/head";
import { getFinishInscritionSteps } from "../content/steps/finish";
import { Card } from "@/components/card/Card";
import { Text } from "@/components/text/Text";
import { Button } from "@/components/button/Button";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { localStorageUserKey } from "@/consts";

export type ContentOneclickProps = {
  actualBread: Route[];
  navigationItems: NavigationItem[];
  token: string;
  trxData: TBKFinishInscriptionResponse;
};

export const ContentOneClickMall = (props: ContentOneclickProps) => {
  const router = useRouter();
  const [userName, setUserName] = useState("User-XXXX");

  useEffect(() => {
    const user = window.localStorage.getItem(localStorageUserKey);
    if (user) {
      setUserName(user);
    }
  }, []);

  const handleRemoveUser = () => {
    router.push(
      `/oneclick-mall/remove-user?tbk_user=${props.trxData.tbk_user}&user_name=${userName}`
    );
  };

  const handleAuthorizeTransaction = () => {
    router.push(
      `/oneclick-mall/authorize?tbk_user=${props.trxData.tbk_user}&user_name=${userName}`
    );
  };

  return (
    <>
      <Head>
        <title>Transbank SDK Node - Finalizar inscripción</title>
      </Head>
      <Layout
        pageTitle="Webpay Oneclick Mall - Finalizar inscripción"
        pageDescription="En esta fase, completaremos el proceso de inscripción, permitiéndonos posteriormente realizar cargos a la tarjeta que el tarjetahabiente haya inscrito."
        actualBread={props.actualBread}
        activeRoute="/oneclick-mall/finish"
        navigationItems={props.navigationItems}
        steps={getFinishInscritionSteps(
          props.token,
          props.trxData,
          userName as string
        )}
        additionalContent={
          <div className="mt-8">
            <Card className="finish-card">
              <div className="finish-text">
                <Text>
                  Después de una inscripción exitosa, tienen dos opciones:
                  autorizar un pago o borrar al usuario que se acaba de
                  inscribir.
                </Text>
              </div>

              <div className="button-container">
                <Button text="BORRAR USUARIO" onClick={handleRemoveUser} />
                <Button
                  text="AUTORIZAR UN PAGO"
                  onClick={handleAuthorizeTransaction}
                />
              </div>
            </Card>
          </div>
        }
      />
    </>
  );
};
