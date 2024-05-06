import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { Text, TextType } from "@/components/text/Text";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { Route } from "@/types/menu";
import { Step } from "@/components/step/Step";
import { HelpMenu } from "@/components/layout/HelpMenu";
import { webpayPlusCreateSnippets } from "@/helpers/webpay-plus/snippets/create";
import { Table } from "@/components/table/Table";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Plus",
    path: "/webpay-plus",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <div className="grid grid-cols-[280px,1fr,248px] px-24 py-10">
        <Menu />
        <div className="pl-20 pr-12 mt-10 flex flex-col">
          <span>Home</span>
        </div>
        <HelpMenu />
      </div>
      <div className="bg-tbk-black-bg h-[200px]"></div>
    </div>
  );
}
