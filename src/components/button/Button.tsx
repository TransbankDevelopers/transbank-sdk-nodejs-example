import cx from "classnames";
import "./Button.css";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

export enum ButtonVariant {
  PRIMARY = "primary",
  SECONDARY = "secondary",
}

export enum ButtonTypes {
  BUTTON = "button",
  SUBMIT = "submit",
}

export type ButtonProps = {
  text: string;
  variant?: ButtonVariant;
  className?: string;
  type?: ButtonTypes;
  link?: Url;
  onClick?: () => void;
};

export const Button = (props: ButtonProps) => {
  const variant = props.variant || ButtonVariant.PRIMARY;
  const buttonType = props.type || ButtonTypes.BUTTON;

  return (
    <button
      type={buttonType}
      onClick={props.onClick}
      className={cx(
        "tbk-button",
        {
          primary: variant === ButtonVariant.PRIMARY,
          secondaty: variant === ButtonVariant.SECONDARY,
        },
        props.className
      )}
    >
      <span
        className={cx({
          "text-white text-sm font-medium": variant === ButtonVariant.PRIMARY,
          "text-base text-tbk-red underline":
            variant === ButtonVariant.SECONDARY,
        })}
      >
        {props.link ? <Link href={props.link}>{props.text}</Link> : props.text}
      </span>
    </button>
  );
};
