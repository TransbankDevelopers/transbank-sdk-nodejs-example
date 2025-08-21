import { TBKAuthorizeTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const tx = new Oneclick.MallTransaction(new Options(
  "597060000001", // Código de comercio
  "d8f06df8-39c7-4f01-8e74-b383c19ae836", // API Key
  Environment.Integration
));

const details = [
  new TransactionDetail(
    amount,
    commerceCodeStore1, // Código de comercio Tienda 1
    buyOrderStore1),
  new TransactionDetail(
    amount2,
    commerceCodeStore2, // Código de comercio Tienda 2
    buyOrderStore2)
)];

// Es necesario ejecutar dentro de una función async para utilizar await
const authorizeResponse = await tx.authorize(
  username, 
  tbkUser, 
  buyOrder,
  details
);`;
};

export const getStepTwo = (trxData: TBKAuthorizeTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
