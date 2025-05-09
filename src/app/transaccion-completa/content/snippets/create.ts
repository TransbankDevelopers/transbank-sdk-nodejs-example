export const getStepOne = () => {
  return `const {
Options,
IntegrationCommerceCodes,
IntegrationApiKeys,
Environment,
TransaccionCompleta
} = require('transbank-sdk') // ES5

import {
Options,
IntegrationCommerceCodes,
IntegrationApiKeys,
Environment,
TransaccionCompleta 
} from 'transbank-sdk'; // ES6

const tx = new TransaccionCompleta.Transaction(new Options(
  IntegrationCommerceCodes.TRANSACCION_COMPLETA,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await tx.create(
  buyOrder, 
  sessionId, 
  amount, 
  cvv,
  cardNumber,
  cardExpirationDate
);`;
};

export const getStepTwo = (token: string) => {
  return `{
  'token': '${token}',
}`;
};
