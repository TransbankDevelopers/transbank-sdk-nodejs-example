import { TBKInstallmentsFullTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const installmentDetails = [
  new InstallmentDetail(commerceCodeStore1, buyOrderStore1, installmentsNumber)
  new InstallmentDetail(commerceCodeStore2, buyOrderStore2, installmentsNumber)
];

// Es necesario ejecutar dentro de una función async para utilizar await
const installmentsResponse = await tx.installments(
  token, 
  installmentDetails
);`;
};

export const getStepTwo = (trxData: TBKInstallmentsFullTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
