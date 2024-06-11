import { generateRandomPatpassStartData } from "@/helpers/transactions/transactionHelper";
import {
  StartTxPatPassType,
  TBKCreateTransactionResponse,
} from "@/types/transactions";
import { headers } from "next/headers";
import {
  Options,
  IntegrationCommerceCodes,
  IntegrationApiKeys,
  PatpassComercio,
} from "transbank-sdk";

export const getPatpassOptions = () => {
  return new Options(
    IntegrationCommerceCodes.PATPASS_COMERCIO,
    IntegrationApiKeys.PATPASS_COMERCIO,
    "https://pagoautomaticocontarjetasint.transbank.cl"
  );
};

export const createPatpassTransaction = async (
  returnRoute: string = "/patpass/start"
): Promise<StartTxPatPassType> => {
  const headersList = headers();
  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const host = headersList.get("host") ?? "localhost:3000";

  const randomPatpassStartData = generateRandomPatpassStartData(
    protocol,
    host,
    returnRoute
  );

  const patpassData = {
    name: "Isaac",
    lastName: "Newton",
    secondLastName: "Gonzales",
    rut: "11111111-1",
    phone: "123456734",
    cellPhone: "123456723",
    patpassName: "Membresia de cable",
    personEmail: "developer@continuum.cl",
    commerceEmail: "developer@continuum.cl",
    address: "Satelite 101",
    city: "Santiago",
  };

  const startResponse: TBKCreateTransactionResponse =
    await new PatpassComercio.Inscription(getPatpassOptions()).start(
      randomPatpassStartData.returnUrl,
      patpassData.name,
      patpassData.lastName,
      patpassData.secondLastName,
      patpassData.rut,
      randomPatpassStartData.serviceId,
      randomPatpassStartData.finalUrl,
      randomPatpassStartData.maxAmount,
      patpassData.phone,
      patpassData.cellPhone,
      patpassData.patpassName,
      patpassData.personEmail,
      patpassData.commerceEmail,
      patpassData.address,
      patpassData.city
    );

  return {
    ...patpassData,
    ...randomPatpassStartData,
    ...startResponse,
  };
};

export const statusPatpassTransaction = async (token: string) => {
  const statusResponse = await new PatpassComercio.Inscription(
    getPatpassOptions()
  ).status(token);
  return statusResponse;
};
