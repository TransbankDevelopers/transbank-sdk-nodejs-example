import { tbkRequest } from "./tbkClient";
import {
  StandardBrandCreatePayload,
  StandardBrandCreateResponse,
} from "@/types/transactions";

const BASE_PATH = "rswebpaytransaction/api/webpay/v1.4/transactions";
const ACCOUNT_VERIFY_PATH =
  "rswebpaytransaction/api/webpay/v1.4/account-verify";

export const createStandardBrandTransaction = async (
  payload: StandardBrandCreatePayload,
) => {
  return tbkRequest<StandardBrandCreateResponse>("POST", BASE_PATH, payload);
};

export const installmentsStandardBrandTransaction = async (
  token: string,
  payload: {
    buy_order: string;
    commerce_code: string;
    installments_number: number;
  },
) => {
  return tbkRequest("POST", `${BASE_PATH}/${token}/installments`, payload);
};

export const commitStandardBrandTransaction = async (
  token: string,
  payload: {
    details: Array<{
      commerce_code: string;
      buy_order: string;
      id_query_installments?: number;
    }>;
  },
) => {
  return tbkRequest("PUT", `${BASE_PATH}/${token}`, payload);
};

export const statusStandardBrandTransaction = async (token: string) => {
  return tbkRequest("GET", `${BASE_PATH}/${token}`);
};

export const refundStandardBrandTransaction = async (
  token: string,
  payload: {
    commerce_code: string;
    buy_order: string;
    amount: number;
  },
) => {
  return tbkRequest("POST", `${BASE_PATH}/${token}/refunds`, payload);
};

export const accountVerifyStandardBrand = async (payload: {
  card_detail: {
    card_number: string;
    card_expiration_date: string;
    cvv: string;
  };
  eci: string | null;
  authentication_value: string | null;
  trans_status: string | null;
  message_version: string | null;
  ds_trans_id: string | null;
  commerce_code: string;
}) => {
  return tbkRequest("POST", ACCOUNT_VERIFY_PATH, payload);
};
