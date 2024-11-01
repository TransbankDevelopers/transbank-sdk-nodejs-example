import { Route } from "@/types/menu";
import { Breadcrumbs } from "./Breadcrumbs";
import { StepProps } from "../step/Step";
import { Questions } from "../questions/Questions";
import { Navigation, NavigationItem } from "./Navigation";
import "./Layout.css";
import { LayoutContent } from "./LayoutContent";

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
  const { showQuestions = true, navigationItems = [] } = props;
  return (
    <div className="tbk-layout-container">
      <div className="tbk-layout-content">
        <div className="mb-6">
          <Breadcrumbs items={props.actualBread} active={props.activeRoute} />
        </div>
        <LayoutContent {...props} />
        {showQuestions && (
          <div className="my-14">
            <Questions />
          </div>
        )}
      </div>
      <Navigation items={navigationItems} />
    </div>
  );
};
