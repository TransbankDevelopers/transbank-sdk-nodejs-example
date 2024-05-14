export const getStepOne = () => {
  return `// ES5
const WebpayPlus = require('transbank-sdk').WebpayPlus;
const TransactionDetail = require("transbank-sdk").TransactionDetail;

// ES6
import { WebpayPlus  } from 'transbank-sdk'; 
import { TransactionDetail } from 'transbank-sdk';

const details = [new TransactionDetail(1229, "597055555582", "O-76341")];

// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await (new WebpayPlus.MallTransaction()).create(buyOrder, sessionId, details,  returnUrl);`;
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
