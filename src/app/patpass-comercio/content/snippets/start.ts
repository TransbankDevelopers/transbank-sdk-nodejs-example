export const getStepOne = () => {
  return `const startResponse = await (new PatpassComercio.Inscription()).start(
  userName, 
  email, 
  responseUrl
  url, 
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
    url || "https://webpay3gint.transbank.cl/webpayserver/initTransaction"
  } method="POST">
  <input type="hidden" name="token_ws" value="${token}"/>
  <input type="submit" value="Pagar"/>
</form>`;
};
