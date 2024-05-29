import { Card } from "../card/Card";
import Cards, { Focused } from "react-credit-cards-2";
import { InputText } from "../input/InputText";
import { Button } from "../button/Button";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import "./CreditCard.css";
import Image from "next/image";
import Credit from "@/assets/svg/credit.svg";

export type CreditCard = {
  number: string;
  expiry: string;
  cvc: string;
  name: string;
  focus: Focused;
};

type queryType = {
  cardNumber: string;
  cvv: string;
  cardExpirationDate: string;
};

type linkToType = {
  pathname: string;
  query: queryType;
};

export type CreditCardProps = {
  linkTo: linkToType;
  handleInputChange: (value: string, name: string) => void;
  handleInputFocus: (name: string) => void;
} & CreditCard;

export const CreditCard = (props: CreditCardProps) => {
  return (
    <Card>
      <div className="card-container">
        <Cards
          number={props.number}
          expiry={props.expiry}
          cvc={props.cvc}
          name={props.name}
          focused={props.focus}
        />

        <div className="card-inputs-container">
          <InputText
            label="Número de tarjeta"
            name="number"
            value={props.number}
            onChange={(value, name) =>
              props.handleInputChange(value, name as string)
            }
            onFocus={props.handleInputFocus}
            maxLength={19}
          />
          <div className="card-split-inputs">
            <InputText
              label="Fecha de expiración"
              name="expiry"
              value={props.expiry}
              onChange={(value, name) =>
                props.handleInputChange(value, name as string)
              }
              onFocus={props.handleInputFocus}
            />
            <InputText
              label="CVC"
              name="cvc"
              value={props.cvc}
              onChange={(value, name) =>
                props.handleInputChange(value, name as string)
              }
              onFocus={props.handleInputFocus}
              maxLength={3}
            />
          </div>
        </div>
        <div className="card-border" />
        <div className="card-footer">
          <div className="card-companies">
            <Image src={Credit} alt="credit" />
          </div>
          <Button text="PAGAR" link={props.linkTo} />
        </div>
      </div>
    </Card>
  );
};