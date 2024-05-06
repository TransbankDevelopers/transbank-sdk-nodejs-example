import cx from "classnames";

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
};

export const Button = (props: ButtonProps) => {
  const variant = props.variant || ButtonVariant.PRIMARY;
  const buttonType = props.type || ButtonTypes.BUTTON;

  return (
    <button
      type={buttonType}
      className={cx(
        "cursor-pointer",
        {
          "h-[40px] px-14 bg-tbk-red rounded flex items-center justify-center":
            variant === ButtonVariant.PRIMARY,
          "h-[46px] px-14 border border-tbk-red rounded-2lg flex items-center justify-center text-base":
            variant === ButtonVariant.SECONDARY,
        },
        props.className || ""
      )}
    >
      <span
        className={cx({
          "text-white text-sm font-medium": variant === ButtonVariant.PRIMARY,
          "text-base text-tbk-red underline":
            variant === ButtonVariant.SECONDARY,
        })}
      >
        {props.text}
      </span>
    </button>
  );
};
