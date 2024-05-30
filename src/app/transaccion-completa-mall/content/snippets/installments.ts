import { TBKInstallmentsFullTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // CommonJS
const InstallmentDetail = require('transbank-sdk').InstallmentDetail; // CommonJS
import { TransaccionCompleta, InstallmentDetail } from 'transbank-sdk'; // ES6 Modules

const installmentDetails = [
  new InstallmentDetail(childCommerceCode1, childBuyOrder1, installmentsNumber)
  new InstallmentDetail(childCommerceCode2, childBuyOrder2, installmentsNumber)
];

// Es necesario ejecutar dentro de una función async para utilizar await
const installmentsResponse = await (new TransaccionCompleta.MallTransaction()).installments(
  token, 
  installmentDetails
);`;
};

export const getStepTwo = (trxData: TBKInstallmentsFullTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
