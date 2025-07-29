import { infoBinResponse } from "@/types/transactions";

export const getStepOne = (tbkUser: string) => {
  return `const tbkUser = "${tbkUser}";
const tx = new Oneclick.MallBinInfo(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const binResponse = await tx.queryBin(tbkUser);`;
};

export const getStepTwo = (binResponse: infoBinResponse) =>
  JSON.stringify(binResponse, null, 2);
