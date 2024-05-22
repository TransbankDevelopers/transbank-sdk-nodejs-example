import cx from "classnames";

export enum TextType {
  PAGE_TITLE = "pageTitle",
  PAGE_CONTENT = "pageContent",
  SECTION_TITLE = "pageSubtitle",
}

export enum TextVariant {
  PARAGRAPH = "paragraph",
  SPAN = "span",
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
  className?: string;
  variant?: TextVariant;
};

export const Text = (props: TextProps) => {
  const { variant = TextVariant.SPAN, type = TextType.PAGE_CONTENT } = props;

  const className = cx(textStyles[type], props.className);

  if (variant === TextVariant.PARAGRAPH) {
    return <p className={className}>{props.children}</p>;
  }

  return <span className={className}>{props.children}</span>;
};
