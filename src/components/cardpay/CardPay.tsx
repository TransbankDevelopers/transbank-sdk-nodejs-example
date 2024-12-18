import { Button, ButtonTypes } from "../button/Button";
import { Card } from "../card/Card";
import { InputText } from "../input/InputText";
import { Text } from "@/components/text/Text";
import InfoBlue from "@/assets/svg/InfoBlue.svg";
import Image from "next/image";

export enum TokenPropNames {
  token_ws = "token_ws",
  TBK_TOKEN = "TBK_TOKEN",
}

export type CardPayProps = {
  webpayUrl: string;
  token: string;
  buttonText?: string;
  tokenInputName?: TokenPropNames;
};

export const CardPay = (props: CardPayProps) => {
  const { buttonText = "PAGAR", tokenInputName = TokenPropNames.token_ws } =
    props;

  return (
    <Card className="card-pay">
      <span className="title">Formulario de redirección</span>
      <InputText label="Token" value={props.token} />
      <form action={props.webpayUrl} method="POST">
        <input type="hidden" name={tokenInputName} value={props.token} />
        <div className="tbk-info-token">
          <Image
            src={InfoBlue}
            alt="tbk info blue"
            className="tbk-info-token-icon"
          />
          <Text className="tbk-info-token-text">
            El token generado en esta aplicación se renueva automáticamente cada 5 minutos.
          </Text>
        </div>
        <div className="button-container">
          <Button
            text={buttonText}
            className="button"
            type={ButtonTypes.SUBMIT}
          />
        </div>
      </form>
    </Card>
  );
};
