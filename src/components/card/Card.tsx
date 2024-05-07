import cx from "classnames";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = (props: CardProps) => {
  const { className = "" } = props;

  return (
    <div
      className={cx(
        "shadow-tbk-shadow-2 flex p-8 mt-4 mb-8 text-black",
        className
      )}
    >
      {props.children}
    </div>
  );
};
