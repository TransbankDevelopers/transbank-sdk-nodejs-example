import { ColumnDefinition, ColumnValues } from "@/components/table/Table";
import { StartTransactionData } from "@/types/transactions";

export const generateRandomTransactionData = (
  protocol: string,
  host: string
): StartTransactionData => {
  const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
  const amount = Math.floor(Math.random() * 1000) + 1001;
  const returnUrl = `${protocol}://${host}/webpay_plus/commit`;

  return {
    buyOrder,
    sessionId,
    amount,
    returnUrl,
  };
};

export const getColumnValues = (
  props: StartTransactionData
): ColumnValues[] => {
  return [
    {
      field: "Orden de compra (buyOrder)",
      value: props.buyOrder,
    },
    {
      field: "ID de sesión (sessionid)",
      value: props.sessionId,
    },
    {
      field: "Monto (amount)",
      value: props.amount,
    },
    {
      field: "URL de retorno (returnUrl)",
      value: props.returnUrl,
    },
  ];
};

export const getColumnDefinition = (): ColumnDefinition[] => {
  return [
    {
      header: "Campo",
      accessor: "field",
    },
    {
      header: "Valor",
      accessor: "value",
    },
  ];
};
