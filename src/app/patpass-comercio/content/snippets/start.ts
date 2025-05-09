export const getStepOne = () => {
  return `const {
Options,
IntegrationCommerceCodes,
IntegrationApiKeys,
PatpassEnvironment,
PatpassComercio
} = require('transbank-sdk'); // ES5
  
import {
Options,
IntegrationCommerceCodes,
IntegrationApiKeys,
PatpassEnvironment,
PatpassComercio
} from "transbank-sdk" // ES6

const tx = new PatpassComercio.Inscription(new Options(
  IntegrationCommerceCodes.PATPASS_COMERCIO,
  IntegrationApiKeys.PATPASS_COMERCIO,
  PatpassEnvironment.Integration
));
  
const startResponse = await tx.start(
  returnUrl,
  name,
  lastName,
  secondLastName,
  rut,
  serviceId,
  finalUrl,
  maxAmount,
  phone,
  cellPhone,
  patpassName,
  personEmail,
  commerceEmail,
  address,
  city
);`;
};

export const getStepTwo = (token: string, url: string) => {
  return `{
  'token': '${token}',
  'url': '${
    url ||
    "https://pagoautomaticocontarjetasint.transbank.cl/nuevo-ic-rest/tokenComercioLogin"
  }'
}`;
};

export const getStepThree = (token: string, url: string) => {
  return `<form action=${
    url ||
    "https://pagoautomaticocontarjetasint.transbank.cl/nuevo-ic-rest/tokenComercioLogin"
  } method="POST">
  <input type="hidden" name="tokenComercio" value="${token}"/>
  <input type="submit" value="Pagar"/>
</form>`;
};
