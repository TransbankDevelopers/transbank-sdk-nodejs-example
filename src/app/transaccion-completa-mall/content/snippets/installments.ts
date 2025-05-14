import { TBKInstallmentsFullTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const installmentDetails = [
  new InstallmentDetail(commerceCodeStore1, buyOrderStore1, installmentsNumber) // Código de comercio Tienda 1
  new InstallmentDetail(commerceCodeStore2, buyOrderStore2, installmentsNumber) // Código de comercio Tienda 2
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
