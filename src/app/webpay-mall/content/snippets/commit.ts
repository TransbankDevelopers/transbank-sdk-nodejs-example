import { TBKMallCommitTransactionResponse } from "@/types/transactions";

export const getStepOne = (token: string) => {
  return `{
  'token_ws': ${token}
}`;
};

export const getStepTwo = () => {
  return `const token = request.body.token_ws;
const tx = new WebpayPlus.MallTransaction(new Options(
  IntegrationCommerceCodes.WEBPAY_PLUS_MALL,
  IntegrationApiKeys.WEBPAY,
  Environment.Integration
));
const commitResponse = await tx.commit(token);`;
};

export const getStepThree = (
  commitResponse: TBKMallCommitTransactionResponse
) => {
  const {
    buy_order,
    session_id,
    card_detail,
    accounting_date,
    transaction_date,
    vci,
    details,
  } = commitResponse;

  return `{
    "vci": "${vci}",
    "buy_order": "${buy_order}",
    "session_id": "${session_id}",
    "card_detail": {
      "card_number": "${card_detail.card_number}",
    },
    "accounting_date": "${accounting_date}",
    "transaction_date": "${transaction_date}",
    "details": [
      {
        "amount": ${details[0].amount},
        "status": "${details[0].status}",
        "authorization_code": "${details[0].authorization_code}",
        "payment_type_code": "${details[0].payment_type_code}",
        "response_code": ${details[0].response_code},
        "installments_number": ${details[0].installments_number},
        "commerce_code": "${details[0].commerce_code}",
        "buy_order": "${details[0].buy_order}"
      },
      {
        "amount": ${details[1].amount},
        "status": "${details[1].status}",
        "authorization_code": "${details[1].authorization_code}",
        "payment_type_code": "${details[1].payment_type_code}",
        "response_code": ${details[1].response_code},
        "installments_number": ${details[1].installments_number},
        "commerce_code": "${details[1].commerce_code}",
        "buy_order": "${details[1].buy_order}"
      }
    ],
  }
  
 `;
};
