import { Header } from "@/components/layout/Header";
import { Menu } from "@/components/layout/Menu";
import { Route } from "@/types/menu";
import { HelpMenu } from "@/components/layout/HelpMenu";
import { headers } from "next/headers";

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
  const headersList = headers();
  const hostname = headersList.get("x-forwarded-proto");
  return (
    <div className="flex flex-col">
      <Header />
      <div className="grid grid-cols-[280px,1fr,248px] px-24 py-10">
        <Menu />
        <div className="pl-20 pr-12 mt-10 flex flex-col">
          <span>Home</span>
          <div>host: {hostname}</div>
        </div>
        <HelpMenu />
      </div>
      <div className="bg-tbk-black-bg h-[200px]"></div>
    </div>
  );
}
