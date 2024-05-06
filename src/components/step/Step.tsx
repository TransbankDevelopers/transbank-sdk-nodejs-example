import { Snippet } from "../snippet/Snippet";
import { Text, TextType } from "../text/Text";

export type StepProps = {
  code?: string;
  stepTitle: string;
  content: string | React.ReactNode;
};

export const Step = (props: StepProps) => {
  return (
    <div className="flex flex-col">
      <Text type={TextType.SECTION_TITLE}>{props.stepTitle}</Text>
      <Text>{props.content}</Text>
      {props.code && (
        <div className="my-4">
          <Snippet code={props.code} removeTopPadding />
        </div>
      )}
    </div>
  );
};
