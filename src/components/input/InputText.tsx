import { useState } from "react";
import cx from "classnames";

export type InputTextProps = {
  value: string;
  onChange: (value: string) => void;
};

export const InputText = (props: InputTextProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = () => {
    setIsFocused(true);
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="flex flex-col">
      <span
        className={cx("text-tbk-grey text-sm font-medium pl-1", {
          "mb-2": isFocused || props.value !== "",
          "text-tbk-red": isFocused,
          "ease-out duration-300": isFocused,
          "ease-in duration-300": !isFocused,
        })}
      >
        Token
      </span>
      <input
        type="text"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        value={props.value}
        onChange={(e) => props.onChange(e.target.value)}
        className={cx(
          "bg-transparent outline-none pb-1 pl-1 font-medium text-sm",
          {
            "!border-tbk-red": isFocused,
            "border-tbk-border-blue": !isFocused,
            "border-b-2": isFocused,
            "border-b": !isFocused,
          }
        )}
      />
    </div>
  );
};
