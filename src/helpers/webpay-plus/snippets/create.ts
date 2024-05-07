export const getStepOne = () => {
  return `const WebpayPlus = require('transbank-sdk').WebpayPlus; // ES5
import { WebpayPlus } from 'transbank-sdk'; // ES6

// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await (new WebpayPlus.Transaction()).create(
  buyOrder, 
  sessionId, 
  amount, 
  returnUrl 
);`;
};

export const getStepTwo = (token: string) => {
  return `{
  'token': '${token}',
  'url': 'https://webpay3gint.transbank.cl/webpayserver/initTransaction'
}`;
};

export const getStepThree = (token: string) => {
  return `<form action="https://webpay3gint.transbank.cl/webpayserver/initTransaction" method="POST">
  <input type="hidden" name="token_ws" value="${token}"/>
  <input type="submit" value="Pagar"/>
</form>`;
};
