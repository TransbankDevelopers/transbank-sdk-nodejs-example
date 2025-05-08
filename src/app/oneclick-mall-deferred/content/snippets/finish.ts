import { TBKFinishInscriptionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `{
  'TBK_TOKEN': ${token}
}`;
};

export const getStepTwo = () => {
  return `const token = request.body.TBK_TOKEN;

const tx = new Oneclick.MallInscription(new Options(
  IntegrationCommerceCodes.ONECLICK_MALL_DEFERRED,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));

const commitResponse = await tx.finish(token);`;
};

export const getStepThree = (
  finishInscriptionResponse: TBKFinishInscriptionResponse
) => {
  const {
    response_code,
    tbk_user,
    authorization_code,
    card_type,
    card_number,
  } = finishInscriptionResponse;

  return `{
  "response_code": ${response_code},
  "tbk_user": "${tbk_user}",
  "authorization_code": "${authorization_code}",
  "card_type": "${card_type}",
  "card_number": "${card_number}"
}`;
};
