export const getStepOne = () => {
  return `const {
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
WebpayPlus
} = require('transbank-sdk') // ES5
 
import { 
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Options,
WebpayPlus 
} from 'transbank-sdk'; // ES6

const tx = new WebpayPlus.Transaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

// Es necesario ejecutar dentro de una función async para utilizar await
const createResponse = await tx.create(
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
