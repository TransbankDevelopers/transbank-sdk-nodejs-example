import { TBKAuthorizeTransactionResponse } from "@/types/transactions";

export const getStepOne = () => {
  return `const Oneclick = require('transbank-sdk').Oneclick; // CommonJS
import { Oneclick } from 'transbank-sdk'; // ES6 Modules

const details = [
  new TransactionDetail(amount, childCommerceCode, childBuyOrder), 
  new TransactionDetail(amount2, childCommerceCode2, childBuyOrder2)
)];

// Es necesario ejecutar dentro de una función async para utilizar await
const authorizeResponse = await (new Oneclick.MallTransaction()).authorize(
  username, 
  tbkUser, 
  buyOrder,
  details
);`;
};

export const getStepTwo = (trxData: TBKAuthorizeTransactionResponse) => {
  return JSON.stringify(trxData, null, 2);
};
