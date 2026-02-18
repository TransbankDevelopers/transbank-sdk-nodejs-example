const DEFAULT_BASE_URL = "https://webpay3gint.transbank.cl";

const getEnvOrThrow = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Algo salio mal en la configuracion si el problema persiste, contacta al soporte de Transbank.`,
    );
  }
  return value;
};

const getTbkHeaders = () => {
  const apiKeyId = getEnvOrThrow("TRANSACCION_COMPLETA_MALL_STANDARD_BRAND_CC");
  const apiKeySecret = getEnvOrThrow(
    "TRANSACCION_COMPLETA_MALL_STANDARD_BRAND_API_KEY",
  );

  return {
    "Content-Type": "application/json",
    Accept: "application/json",
    "Tbk-Api-Key-Id": apiKeyId,
    "Tbk-Api-Key-Secret": apiKeySecret,
  };
};

const getBaseUrl = () => {
  return process.env.TBK_TCC_SB_BASE_URL || DEFAULT_BASE_URL;
};

export const tbkRequest = async <T, U = unknown>(
  method: "GET" | "POST" | "PUT",
  endpoint: string,
  payload?: U,
): Promise<T> => {
  const url = `${getBaseUrl().replace(/\/$/, "")}/${endpoint.replace(
    /^\//,
    "",
  )}`;

  const options: RequestInit = {
    method,
    headers: getTbkHeaders(),
    cache: "no-store",
  };

  if (payload && method !== "GET") {
    options.body = JSON.stringify(payload);
  }

  let response: Response;
  try {
    response = await fetch(url, options);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    throw new Error(`Error Transbank (network): ${message}`);
  }

  const body = await response.json();

  if (!response.ok) {
    const message =
      typeof body === "string"
        ? body
        : JSON.stringify(body ?? { error: "Error desconocido" });
    throw new Error(`Error Transbank (${response.status}): ${message}`);
  }

  return body as T;
};
