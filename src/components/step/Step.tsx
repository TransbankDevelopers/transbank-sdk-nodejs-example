import { Snippet } from "../snippet/Snippet";
import { Text, TextType } from "../text/Text";

export type StepProps = {
  code?: string;
  stepTitle?: string;
  stepId?: string;
  content?: string | React.ReactNode;
};

export const Step = (props: StepProps) => {
  return (
    <div className="flex-col" id={props.stepId}>
      {props.stepTitle && (
        <Text type={TextType.SECTION_TITLE}>{props.stepTitle}</Text>
      )}
      {props.content}
      {props.code && (
        <div className="mt-6">
          <Snippet code={props.code} />
        </div>
      )}
    </div>
  );
};
