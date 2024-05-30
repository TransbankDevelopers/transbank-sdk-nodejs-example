import { CreditCard } from "@/components/creditcard/CreditCard";
import { getCardExpiry } from "@/helpers/creditCardHelper";
import {
  CreateFullTransactionMallResponse,
  TBKInstallmentsFullTransactionResponse,
  TBKMallCommitTransactionResponse,
  TBKMallTransactionStatusResponse,
  TBKRefundMallTransactionResponse,
} from "@/types/transactions";
import {
  CommitDetail,
  Environment,
  InstallmentDetail,
  IntegrationApiKeys,
  IntegrationCommerceCodes,
  Options,
  TransaccionCompleta,
  TransactionDetail,
} from "transbank-sdk";

const getFullTransactionMallOptions = () => {
  return new Options(
    IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL,
    IntegrationApiKeys.WEBPAY,
    Environment.Integration
  );
};

export const createFullTransactionMallTransaction = async (
  card: CreditCard
): Promise<CreateFullTransactionMallResponse> => {
  const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;

  const details: TransactionDetail[] = [];

  const { month, year } = getCardExpiry(card.expiry);
  const cvv = Number(card.cvc);
  const cardNumber = card.number;

  const commerceCodes = [
    IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_CHILD1,
    IntegrationCommerceCodes.TRANSACCION_COMPLETA_MALL_CHILD2,
  ];

  for (const commerceCode of commerceCodes) {
    const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
    const amount = Math.floor(Math.random() * 1000) + 1001;

    details.push(new TransactionDetail(amount, commerceCode, childBuyOrder));
  }

  const createResponse = await new TransaccionCompleta.MallTransaction(
    getFullTransactionMallOptions()
  ).create(buyOrder, sessionId, cardNumber, year + "/" + month, details, cvv);

  return { token: createResponse.token, details };
};

export type InstallmentsData = {
  idQueryInstallments: number;
  deferredPeriodIndex: number;
  gracePeriod: boolean;
};

export const commitFullTransactionMallTransaction = async (
  token: string,
  transactionDetails: TransactionDetail[],
  installmentsData?: InstallmentsData
): Promise<TBKMallCommitTransactionResponse> => {
  const details: CommitDetail[] = [];

  for (const detail of transactionDetails) {
    details.push(
      new CommitDetail(
        detail.commerceCode,
        detail.buyOrder,
        installmentsData?.idQueryInstallments,
        installmentsData?.deferredPeriodIndex,
        installmentsData?.gracePeriod
      )
    );
  }

  const commitResponse = await new TransaccionCompleta.MallTransaction(
    getFullTransactionMallOptions()
  ).commit(token, details);

  return commitResponse;
};

type RefundParams = {
  token: string;
  buyOrder: string;
  commerceCode: string;
  amount: number;
};

export const refundFullTransactionMallTransaction = async (
  params: RefundParams
): Promise<TBKRefundMallTransactionResponse> => {
  const { token, buyOrder, commerceCode, amount } = params;
  const refundRequest = await new TransaccionCompleta.MallTransaction(
    getFullTransactionMallOptions()
  ).refund(token, buyOrder, commerceCode, amount);

  return refundRequest;
};

export const getStatusFullTransactionMallTransaction = async (
  token: string
): Promise<TBKMallTransactionStatusResponse> => {
  const statusResponse = await new TransaccionCompleta.MallTransaction(
    getFullTransactionMallOptions()
  ).status(token);

  return statusResponse;
};

export const setupInstallmentsFullTransactionMall = async (
  token: string,
  transactionDetails: TransactionDetail[],
  installmentsNumber: number
): Promise<TBKInstallmentsFullTransactionResponse[]> => {
  const installmentDetails: InstallmentDetail[] = [];

  for (const detail of transactionDetails) {
    installmentDetails.push(
      new InstallmentDetail(
        detail.commerceCode,
        detail.buyOrder,
        installmentsNumber
      )
    );
  }

  const installmentsResponse = await new TransaccionCompleta.MallTransaction(
    getFullTransactionMallOptions()
  ).installments(token, installmentDetails);

  return installmentsResponse;
};
