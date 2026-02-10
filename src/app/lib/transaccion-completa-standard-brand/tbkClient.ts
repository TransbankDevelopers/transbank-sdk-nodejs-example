const DEFAULT_BASE_URL = "https://webpay3gint.transbank.cl";

const getEnvOrThrow = (name: string) => {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `Falta la variable de entorno ${name}. Revisa tu .env o .env.local.`,
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

const parseResponseBody = async (response: Response) => {
  const text = await response.text();
  if (!text) return null;
  try {
    return JSON.parse(text);
  } catch {
    return text;
  }
};

export const tbkRequest = async <T>(
  method: "GET" | "POST" | "PUT",
  endpoint: string,
  payload?: unknown,
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
  console.log(`Making ${method} request to ${url} with payload:`, payload);

  const response = await fetch(url, options);
  const body = await parseResponseBody(response);

  if (!response.ok) {
    const message =
      typeof body === "string"
        ? body
        : JSON.stringify(body ?? { error: "Error desconocido" });
    throw new Error(`Error Transbank (${response.status}): ${message}`);
  }

  return body as T;
};
