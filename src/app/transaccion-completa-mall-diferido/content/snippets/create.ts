export const getStepOne = () => {
  return `const {
CommitDetail,
Environment,
InstallmentDetail,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
TransaccionCompleta,
TransactionDetail
} = require('transbank-sdk'); // ES5

import { 
CommitDetail,
Environment,
InstallmentDetail,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
TransaccionCompleta,
TransactionDetail
} from 'transbank-sdk'; // ES6

const tx = new TransaccionCompleta.MallTransaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
  
const details = [
  new TransactionDetail(amount, commerceCodeStore1, buyOrderStore1)
  new TransactionDetail(amount2, commerceCodeStore2, buyOrderStore2)
];
  
// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await tx.create(
  buyOrder, 
  sessionId, 
  cardNumber,
  cardExpirationDate,
  details,
  cvv
);`;
};

export const getStepTwo = (token: string) => {
  return `{
  "token": "${token}"
}`;
};
