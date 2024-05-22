import { Button, ButtonTypes } from "../button/Button";
import { Card } from "../card/Card";
import { InputText } from "../input/InputText";

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
      <div className="button-container">
        <form action={props.webpayUrl} method="POST">
          <input type="hidden" name={tokenInputName} value={props.token} />
          <Button
            text={buttonText}
            className="button"
            type={ButtonTypes.SUBMIT}
          />
        </form>
      </div>
    </Card>
  );
};
