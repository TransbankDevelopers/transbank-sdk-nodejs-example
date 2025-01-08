"use client";
import { useState } from "react";
import cx from "classnames";
import "./InputText.css";

export type InputTextProps = {
  label: string;
  name?: string;
  maxLength?: number;
  value?: string | number;
  onChange?: (value: string, name?: string) => void;
  onFocus?: (name: string) => void;
  isNumber?: boolean;
};

export const InputText = (props: InputTextProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const { onChange = () => {}, isNumber = false } = props;

  const handleOnFocus = () => {
    setIsFocused(true);
    if (props.onFocus && props.name) {
      props.onFocus(props.name);
    }
  };

  const handleOnBlur = () => {
    setIsFocused(false);
  };

  return (
    <div className="flex-col">
      <span
        className={cx("tbk-label", {
          "mb-2": isFocused || props.value !== "",
          focus: isFocused,
        })}
      >
        {props.label}
      </span>

      <input
        type={isNumber ? "number" : "text"}
        name={props.name}
        maxLength={props.maxLength}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        {...(props.value !== undefined
          ? { value: props.value }
          : { defaultValue: "" })}
        onChange={(e) => onChange(e.target.value, e.target.name)}
        className={cx("tbk-input-text", {
          focus: isFocused,
        })}
      />
    </div>
  );
};
