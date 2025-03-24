export const getStepOne = () => {
  return `const WebpayPlus = require('transbank-sdk').WebpayPlus; // ES5
const TransactionDetail = require("transbank-sdk").TransactionDetail;

import { WebpayPlus, TransactionDetail } from 'transbank-sdk'; // ES6

const details = [
  new TransactionDetail(135, "597055555536", "O-23101"),
  new TransactionDetail(148, "597055555536", "O-10821"),
]

const createResponse = await (new WebpayPlus.MallTransaction()).create(
  buyOrder, 
  sessionId, 
  returnUrl,
  details
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
