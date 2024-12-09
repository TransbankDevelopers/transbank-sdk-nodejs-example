export const getStepOne = () => {
  return `const Oneclick = require('transbank-sdk').Oneclick; // ES5
import { Oneclick } from 'transbank-sdk'; // ES6

const startResponse = await (new Oneclick.MallInscription()).start(
  userName, 
  email, 
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
