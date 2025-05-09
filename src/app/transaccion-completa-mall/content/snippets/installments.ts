import { TBKInstallmentsFullTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const installmentDetails = [
  new InstallmentDetail(childCommerceCode1, childBuyOrder1, installmentsNumber)
  new InstallmentDetail(childCommerceCode2, childBuyOrder2, installmentsNumber)
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
