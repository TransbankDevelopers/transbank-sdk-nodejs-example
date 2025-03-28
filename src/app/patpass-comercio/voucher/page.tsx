import { Layout } from "@/components/layout/Layout";
import Head from "next/head";
import { cookies } from "next/headers";
import { patpassJToken } from "@/consts";
import { Card } from "@/components/card/Card";
import { InputText } from "@/components/input/InputText";
import { Button, ButtonTypes } from "@/components/button/Button";

const actualBread = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Patpass Comercio",
    path: "/patpass-comercio",
  },
  {
    name: "Voucher",
    path: "/patpass-comercio/voucher",
  },
];

export default function VoucherPage() {
  const cookiesStore = cookies();

  const data = cookiesStore.get(patpassJToken);

  const j_token = data?.value ? JSON.parse(data.value)?.j_token : null;

  return (
    <>
      <Head>
        <title>PatPass Comercio - Voucher</title>
      </Head>
      <Layout
        pageTitle="PatPass Comercio -  Voucher"
        pageDescription={
          <p>
            La inscripción ya se encuentra finalizada. Una vez finalizada la
            inscripción puedes seguir consultando por el voucher.
          </p>
        }
        actualBread={actualBread}
        activeRoute="/patpass-comercio/voucher"
        additionalContent={
          <Card className="card-pay">
            <span className="title">VOUCHER</span>
            <InputText label="Token" value={j_token} />
            <div className="button-container">
              <form
                action="https://pagoautomaticocontarjetasint.transbank.cl/nuevo-ic-rest/tokenVoucherLogin"
                method="POST"
              >
                <input type="hidden" name="tokenComercio" value={j_token} />
                <Button
                  text="VER VOUCHER"
                  className="button"
                  type={ButtonTypes.SUBMIT}
                />
              </form>
            </div>
          </Card>
        }
      />
    </>
  );
}
