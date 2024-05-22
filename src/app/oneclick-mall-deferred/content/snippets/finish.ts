import { TBKFinishInscriptionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `{
  'TBK_TOKEN': ${token}
}`;
};

export const getStepTwo = () => {
  return `// En el caso de Express
let token = request.body.TBK_TOKEN;
const commitResponse = await (new Oneclick.MallInscription()).finish(token);`;
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
