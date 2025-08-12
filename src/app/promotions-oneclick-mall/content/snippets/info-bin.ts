import { infoBinResponse } from "@/types/transactions";

export const getStepOne = (tbkUser: string) => {
  return `const tbkUser = "${tbkUser}";
const tx = new Oneclick.MallBinInfo(new Options(
  "597060000001", // Código de comercio
  "d8f06df8-39c7-4f01-8e74-b383c19ae836", // API Key
  Environment.Integration
));
const binResponse = await tx.queryBin(tbkUser);`;
};

export const getStepTwo = (binResponse: infoBinResponse) =>
  JSON.stringify(binResponse, null, 2);
