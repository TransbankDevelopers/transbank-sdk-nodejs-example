import cx from "classnames";
import "./Card.css";

export type CardProps = {
  children: React.ReactNode;
  className?: string;
};

export const Card = (props: CardProps) => {
  const { className = "" } = props;

  return (
    <div className={cx("tbk-shadow-2 tbk-card", className)}>
      {props.children}
    </div>
  );
};
