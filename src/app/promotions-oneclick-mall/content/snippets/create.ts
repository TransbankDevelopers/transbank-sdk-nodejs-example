export const getStepOne = () => {
  return `const {
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Oneclick,
Options,
TransactionDetail
} = require('transbank-sdk'); // ES5

import { 
Environment,
IntegrationApiKeys,
IntegrationCommerceCodes,
Oneclick,
Options,
TransactionDetail 
} from 'transbank-sdk'; // ES6

const tx = new Oneclick.MallInscription(new Options(
  "597060000001", // Código de comercio
  "d8f06df8-39c7-4f01-8e74-b383c19ae836", // API Key
  Environment.Integration
));

const startResponse = await tx.start(
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
