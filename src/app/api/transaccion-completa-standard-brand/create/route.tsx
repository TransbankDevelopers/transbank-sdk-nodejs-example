import { NextResponse } from "next/server";
import { createStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { StandardBrandCreatePayload } from "@/types/transactions";
import { normalizeEmptyStrings } from "@/helpers/transactions/transactionHelper";

export async function POST(request: Request) {
  try {
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
