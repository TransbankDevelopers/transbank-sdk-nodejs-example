export const getStepOne = () => {
  return `const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // CommonJS
const TransactionDetail = require('transbank-sdk').TransactionDetail; // CommonJS
import { TransaccionCompleta, TransactionDetail } from 'transbank-sdk'; // ES6 Modules
  
const details = [
  new TransactionDetail(amount, childCommerceCode, childBuyOrder)
  new TransactionDetail(amount2, childCommerceCode2, childBuyOrder2)
];
  
// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await (new TransaccionCompleta.MallTransaction()).create(
  buyOrder, 
  sessionId, 
  cvv,
  cardNumber,
  cardExpirationDate,
  details 
);`;
};

export const getStepTwo = (token: string) => {
  return `{
  "token": "${token}"
}`;
};
