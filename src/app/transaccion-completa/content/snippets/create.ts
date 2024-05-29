export const getStepOne = () => {
  return `const TransaccionCompleta = require('transbank-sdk').TransaccionCompleta; // ES5
import { TransaccionCompleta } from 'transbank-sdk'; // ES6

// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await (new TransaccionCompleta.Transaction()).create(
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
