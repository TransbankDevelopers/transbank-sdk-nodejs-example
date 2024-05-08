import { Route } from "@/types/menu";
import { Breadcrumbs } from "./Breadcrumbs";
import { Header } from "./Header";
import { Menu } from "./Menu";
import { Text } from "../text/Text";
import { Step, StepProps } from "../step/Step";
import { Questions } from "../questions/Questions";
import { Navigation, NavigationItem } from "./Navigation";
import "./Layout.css";

export type LayoutProps = {
  actualBread: Route[];
  activeRoute: string;
  steps?: StepProps[];
  pageTitle: string;
  pageDescription: string | React.ReactNode;
  additionalContent?: React.ReactNode;
  showQuestions?: boolean;
  navigationItems?: NavigationItem[];
};

export const Layout = (props: LayoutProps) => {
  const { steps = [], showQuestions = true, navigationItems = [] } = props;
  return (
    <div className="flex-col">
      <Header />
      <div className="tbk-layout-body">
        <Menu />
        <div className="tbk-layout-content">
          <div className="mb-6">
            <Breadcrumbs items={props.actualBread} active={props.activeRoute} />
          </div>
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
            {props.additionalContent}
          </div>
          {showQuestions && (
            <div className="my-14">
              <Questions />
            </div>
          )}
        </div>
        <Navigation items={navigationItems} />
      </div>
      <div className="tbk-layout-footer"></div>
    </div>
  );
};
