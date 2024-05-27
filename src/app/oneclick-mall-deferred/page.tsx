import { createOneclickMallTransaction } from "../lib/oneclick-mall/data";
import { PageContent } from "./content/PageContent";

export default async function CreateOneclickMallDeferredTransactionView() {
  const trxData = await createOneclickMallTransaction(true);

  return <PageContent trxData={trxData} />;
}
