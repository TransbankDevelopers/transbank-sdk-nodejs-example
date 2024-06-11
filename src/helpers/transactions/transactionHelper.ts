import { ColumnDefinition, ColumnValues } from "@/components/table/Table";
import {
  StartTransactionData,
  StartTransactionDataMall,
  StartTransactionDataOneclickMall,
  StartTxCompletedData,
  StartPatpassData,
} from "@/types/transactions";
import {
  TBKTransactionStatus,
  TransactionDetail,
  StartTxPatPassType,
} from "@/types/transactions";

export const isSomeTransactionRejected = (details: TransactionDetail[]) => {
  return details.some(
    (detail) => detail.status === TBKTransactionStatus.FAILED
  );
};

export const generateRandomTxCompletaData = (): StartTxCompletedData => {
  const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
  const amount = Math.floor(Math.random() * 1000) + 1001;

  return {
    buyOrder,
    sessionId,
    amount,
  };
};

export const generateRandomTransactionData = (
  protocol: string,
  host: string,
  returnRoute: string
): StartTransactionData => {
  const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
  const amount = Math.floor(Math.random() * 1000) + 1001;
  const returnUrl = `${protocol}://${host}${returnRoute}`;

  return {
    buyOrder,
    sessionId,
    amount,
    returnUrl,
  };
};
export const generateRandomPatpassStartData = (
  protocol: string,
  host: string,
  returnRoute: string
): StartPatpassData => {
  const serviceId = "Service_" + Math.floor(Math.random() * 10000) + 1;
  const maxAmount = 100;
  // returnUrl = 'https://2cac-186-124-124-57.ngrok-free.app';
  // para rutas locales utilizar un alias, no usar localhost ni ips locales
  const returnUrl = `${protocol}://${host}${returnRoute}`;

  console.log({ returnUrl });
  const finalUrl = `${protocol}://${host}/patpass-comercio/voucher`;

  return {
    finalUrl,
    maxAmount,
    serviceId,
    returnUrl,
  };
};

export const generateRandomTransactionDataMall = (
  protocol: string,
  host: string
): StartTransactionDataMall => {
  const commerceCode = "597055555536";
  const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const childBuyOrder2 = "O-" + Math.floor(Math.random() * 10000) + 1;
  const amount = Math.floor(Math.random() * 1000) + 1001;
  const amount2 = Math.floor(Math.random() * 1000) + 1001;
  const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
  const returnUrl = `${protocol}://${host}/webpay-mall/commit`;

  return {
    commerceCode,
    childBuyOrder,
    childBuyOrder2,
    amount2,
    buyOrder,
    sessionId,
    amount,
    returnUrl,
  };
};

export const generateRandomTransactionDataMallDeferred = (
  protocol: string,
  host: string
): StartTransactionDataMall => {
  const commerceCode = "597055555582";
  const buyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  const childBuyOrder2 = "O-" + Math.floor(Math.random() * 10000) + 1;
  const amount = Math.floor(Math.random() * 1000) + 1001;
  const amount2 = Math.floor(Math.random() * 1000) + 1001;
  const sessionId = "S-" + Math.floor(Math.random() * 10000) + 1;
  const returnUrl = `${protocol}://${host}/webpay-mall-diferido/commit`;

  return {
    commerceCode,
    childBuyOrder,
    childBuyOrder2,
    amount2,
    buyOrder,
    sessionId,
    amount,
    returnUrl,
  };
};

export const generateRandomTransactionDataOneclickMall = (
  protocol: string,
  host: string,
  isDeferred = false
): StartTransactionDataOneclickMall => {
  const randomNumber = Math.floor(Math.random() * 100000) + 1;
  const userName = "User-" + randomNumber;
  const email = "user." + randomNumber + "@example.cl";
  const returnUrl = `${protocol}://${host}/oneclick-mall${
    isDeferred ? "-deferred" : ""
  }/finish`;

  return {
    userName,
    email,
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
export const getColumnMallValues = (
  props: StartTransactionDataMall
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
      field: "URL de retorno (returnUrl)",
      value: props.returnUrl,
    },
    {
      field: "detail",
      value: [
        `Monto: ${props.amount}`,
        `Codigo de comercio: ${props.commerceCode}`,
        `Orden de compra: ${props.childBuyOrder}`,
      ],
    },
    {
      field: "",
      value: [
        `Monto: ${props.amount2}`,
        `Codigo de comercio: ${props.commerceCode}`,
        `Orden de compra: ${props.childBuyOrder2}`,
      ],
    },
  ];
};
export const getColumnPatpassValues = (
  props: StartTxPatPassType
): ColumnValues[] => {
  return [
    {
      field: "URL de retorno (returnUrl)",
      value: props.returnUrl,
    },
    {
      field: "Nombre (name)",
      value: props.name,
    },
    {
      field: "Primer Apellido (lastName)",
      value: props.lastName,
    },
    {
      field: "RUT",
      value: props.rut,
    },
    {
      field: "id del servicio (serviceId)",
      value: props.serviceId,
    },
    {
      field: "URL final (finalUrl)",
      value: props.finalUrl,
    },
    {
      field: "Monto maximo (maxAmount)",
      value: props.maxAmount,
    },
    {
      field: "Telefono (phone)",
      value: props.phone,
    },
    {
      field: "Celular (cellPhone)",
      value: props.cellPhone,
    },
    {
      field: "Nombre de la inscripcion en Patpass (patpassName)",
      value: props.patpassName,
    },
    {
      field: "Email personal(personEmail)",
      value: props.personEmail,
    },
    {
      field: "Email del commercio(commerceEmail)",
      value: props.commerceEmail,
    },
    {
      field: "Direccion(address)",
      value: props.address,
    },
    {
      field: "Ciudad(city)",
      value: props.city,
    },
  ];
};

export const getColumnOneclickMallValues = (
  props: StartTransactionDataOneclickMall
): ColumnValues[] => {
  const { showReturnUrl = true } = props;
  const values = [
    {
      field: "Nombre de usuario (userName)",
      value: props.userName,
    },
    {
      field: "Email",
      value: props.email,
    },
  ];

  if (showReturnUrl) {
    values.push({
      field: "URL de respuesta (responseUrl)",
      value: props.returnUrl,
    });
  }

  return values;
};

export const getColumnFinishOneclickMallValues = (
  userName: string,
  TBK_USER: string
): ColumnValues[] => {
  const values = [
    {
      field: "Nombre de usuario (username)",
      value: userName,
    },
    {
      field: "TBK User (tbk_user)",
      value: TBK_USER,
    },
  ];

  return values;
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

type CardExpiry = {
  month: string;
  year: string;
};

export const getCardExpiry = (expiry: string): CardExpiry => {
  if (expiry.includes("/")) {
    const [month, year] = expiry.split("/");
    return {
      month: month.padStart(2, "0"),
      year: year.padStart(2, "0"),
    };
  }
  return {
    month: expiry.slice(0, 2),
    year: expiry.slice(2),
  };
};
