export const getStepOne = () => {
  return `const WebpayPlus = require('transbank-sdk').WebpayPlus; // ES5
const TransactionDetail = require("transbank-sdk").TransactionDetail;
  
import { WebpayPlus, TransactionDetail } from 'transbank-sdk'; // ES6

const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

let details = [
  new TransactionDetail(135, "597055555536", "O-23101"),
  new TransactionDetail(148, "597055555536", "O-10821"),
]
  
const createResponse = await tx.create(
  buyOrder, 
  sessionId, 
  returnUrl,
  details
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
