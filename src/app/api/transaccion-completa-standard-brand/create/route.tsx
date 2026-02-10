import { NextResponse } from "next/server";
import {
  createStandardBrandTransaction,
  StandardBrandCreatePayload,
} from "@/app/lib/transaccion-completa-standard-brand/data";

export async function POST(request: Request) {
  try {
    const normalizeEmptyStrings = (value: unknown): unknown => {
      if (typeof value === "string") {
        const trimmed = value.trim();
        return trimmed === "" ? null : trimmed;
      }

      if (Array.isArray(value)) {
        return value.map((item) => normalizeEmptyStrings(item));
      }

      if (value && typeof value === "object") {
        return Object.fromEntries(
          Object.entries(value).map(([key, entryValue]) => [
            key,
            normalizeEmptyStrings(entryValue),
          ]),
        );
      }

      return value;
    };

    const payload = (await request.json()) as StandardBrandCreatePayload;
    const normalizedPayload = normalizeEmptyStrings(
      payload,
    ) as StandardBrandCreatePayload;
    const response = await createStandardBrandTransaction(normalizedPayload);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al crear la transacción.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
