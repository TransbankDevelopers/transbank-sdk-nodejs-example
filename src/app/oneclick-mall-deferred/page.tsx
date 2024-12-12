import { createOneclickMallTransaction } from "../lib/oneclick-mall/data";
import { PageContent } from "./content/PageContent";
import { CustomError } from "@/components/customError/CustomError";
import { Route } from "@/types/menu";

const actualBread: Route[] = [
  {
    name: "Inicio",
    path: "/",
  },
  {
    name: "Webpay Oneclick",
    path: "/oneclick-mall-deferred",
  },
];

export default async function CreateOneclickMallDeferredTransactionView() {
  const trxData = await createOneclickMallTransaction(true);
  if ("errorMessage" in trxData) {
    return (
      <CustomError
        errorMessage={trxData.errorMessage}
        actualBread={actualBread}
      />
    );
  }
  return <PageContent trxData={trxData} />;
}
