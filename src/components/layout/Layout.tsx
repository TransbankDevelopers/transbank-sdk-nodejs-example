import { Route } from "@/types/menu";
import { Breadcrumbs } from "./Breadcrumbs";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Text, TextType } from "../text/Text";
import { Step, StepProps } from "../step/Step";
import { Questions } from "../questions/Questions";
import { HelpMenu } from "./HelpMenu";

export type LayoutProps = {
  actualBread: Route[];
  activeRoute: string;
  steps: StepProps[];
  pageTitle: string;
  pageDescription: string | React.ReactNode;
  additionalContent?: React.ReactNode;
};

export const Layout = (props: LayoutProps) => {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="grid grid-cols-[280px,1fr,248px] px-24 py-10">
        <Menu />
        <div className="pl-20 pr-12 mt-10 flex flex-col overflow-auto">
          <div className="mb-6">
            <Breadcrumbs items={props.actualBread} active={props.activeRoute} />
          </div>
          <div className="mb-8 flex flex-col">
            <Text type={TextType.PAGE_TITLE}>{props.pageTitle}</Text>
            <Text>{props.pageDescription}</Text>
          </div>
          <div className="flex flex-col gap-y-4">
            {props.steps.map((step, idx) => (
              <Step
                key={idx}
                stepTitle={step.stepTitle}
                content={step.content}
                code={step.code}
              />
            ))}
            {props.additionalContent}
          </div>
          <div className="my-12">
            <Questions />
          </div>
        </div>
        <HelpMenu />
      </div>
      <div className="bg-tbk-black-bg h-[200px]"></div>
    </div>
  );
};
