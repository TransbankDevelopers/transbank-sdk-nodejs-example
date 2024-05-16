import { TBKMallTransactionStatusResponse } from "@/types/transactions";

export const getStepOne = (token_ws: string) => {
  return `// Token: ${token_ws}
const statusResponse = await (new WebpayPlus.Transaction()).status(token);`;
};

export const getStepTwo = (
  commitResponse: TBKMallTransactionStatusResponse
) => {
  const { buy_order, session_id, accounting_date, transaction_date, details } =
    commitResponse;
  return `
  {
    details: [
      {
        amount: "${details[0].amount}",
        status: "${details[0].status}",
        authorization_code: "${details[0].authorization_code}",
        payment_type_code: "${details[0].payment_type_code}",
        response_code: ${details[0].response_code},
        installments_number: ${details[0].installments_number},
        commerce_code: "${details[0].commerce_code}",
        buy_order: "${details[0].buy_order}"
      },
      {
        amount: "${details[1].amount}",
        status: "${details[1].status}",
        authorization_code: "${details[1].authorization_code}",
        payment_type_code: "${details[1].payment_type_code}",
        response_code: ${details[1].response_code},
        installments_number: ${details[1].installments_number},
        commerce_code: "${details[1].commerce_code}",
        buy_order: "${details[1].buy_order}"
      }
    ],
    buy_order: "${buy_order}",
    session_id: "${session_id}",
    accounting_date: "${accounting_date}",
    transaction_date: "${transaction_date}"
  }
  `;
};
