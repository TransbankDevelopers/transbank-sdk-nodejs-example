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
  'url': 'https://webpay3gint.transbank.cl/webpayserver/bp_multicode_inscription.cgi'
}`;
};

export const getStepThree = (token: string) => {
  return `<form action="https://webpay3gint.transbank.cl/webpayserver/bp_multicode_inscription.cgi" method="POST">
  <input type="hidden" name="TBK_TOKEN" value="${token}"/>
  <input type="submit" value="Pagar"/>
</form>`;
};
