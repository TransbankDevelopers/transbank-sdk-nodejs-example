import cx from "classnames";

export enum TextType {
  PAGE_TITLE = "pageTitle",
  PAGE_CONTENT = "pageContent",
  SECTION_TITLE = "pageSubtitle",
}

const pageTitleStyle = "text-tbk-black-3 text-xl font-bold mb-4";
const pageContentStyle = "text-base text-tbk-black-2";

const textStyles = {
  [TextType.PAGE_TITLE]: pageTitleStyle,
  [TextType.PAGE_CONTENT]: pageContentStyle,
  [TextType.SECTION_TITLE]: cx(pageTitleStyle, "!text-base mb-2"),
};

export type TextProps = {
  type?: TextType;
  children: React.ReactNode;
};

export const Text = (props: TextProps) => {
  return (
    <span className={textStyles[props.type || TextType.PAGE_CONTENT]}>
      {props.children}
    </span>
  );
};
