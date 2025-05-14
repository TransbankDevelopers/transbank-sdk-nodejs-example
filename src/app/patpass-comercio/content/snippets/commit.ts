import { TBKPatpassStatusTxResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `{
  'J_TOKEN': ${token}
}`;
};

export const getStepTwo = () => {
  return `let token = request.body.J_TOKEN;
  
const tx = new PatpassComercio.Inscription(new Options(
  IntegrationCommerceCodes.PATPASS_COMERCIO,
  IntegrationApiKeys.PATPASS_COMERCIO,
  PatpassEnvironment.Integration
));

const statusResponse = await tx.status(token);`;
};

export const getStepThree = (commitResponse: TBKPatpassStatusTxResponse) => {
  return `{
    "authorized": "${commitResponse.authorized}",
    "voucherUrl": "${commitResponse.voucherUrl}"
  }`;
};

export const getStepFour = (token: string) => {
  return `<form action="https://pagoautomaticocontarjetasint.transbank.cl/nuevo-ic-rest/tokenVoucherLogin" method="POST">
   <input type="hidden" name="tokenComercio" value="${token}"/>
   <input type="submit" value="Ver Voucher"/>
</form>`;
};
