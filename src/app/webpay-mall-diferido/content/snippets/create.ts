export const getStepOne = () => {
  return `const {
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
TransactionDetail,
WebpayPlus
} = require('transbank-sdk') // ES5

import { 
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
TransactionDetail,
WebpayPlus 
} from 'transbank-sdk'; // ES6

const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL_DEFERRED, // Código de comercio Mall
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

let details = [
  new TransactionDetail(
    amount,
    commerceCodeStore1, // Código de comercio Tienda 1
    buyOrderStore1),
  new TransactionDetail(
    amount2,
    commerceCodeStore2, // Código de comercio Tienda 2
    buyOrderStore2)
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
