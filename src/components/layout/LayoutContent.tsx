import { LayoutProps } from "./Layout";
import { Text } from "../text/Text";
import { Step } from "../step/Step";

export const LayoutContent = (
  props: Omit<
    LayoutProps,
    "showQuestions" | "actualBread" | "activeRoute" | "navigationItems"
  >
) => {
  const { steps = [] } = props;
  return (
    <>
      <div className="mb-8 flex-col">
        <h1>{props.pageTitle}</h1>
        <Text>{props.pageDescription}</Text>
      </div>
      <div className="flex-col gap-8">
        {steps.map((step, idx) => (
          <Step
            key={idx}
            stepTitle={step.stepTitle}
            stepId={step.stepId}
            content={step.content}
            code={step.code}
          />
        ))}
      </div>
      {props.additionalContent}
    </>
  );
};
