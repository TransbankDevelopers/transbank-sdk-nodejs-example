import { NextResponse } from "next/server";
import { installmentsStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { TransactionCompleteStandardBrandInstallmentsRequest } from "@/types/transactions";

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as TransactionCompleteStandardBrandInstallmentsRequest;

    const response = await installmentsStandardBrandTransaction(body.token, {
      buy_order: body.buy_order,
      commerce_code: body.commerce_code,
      installments_number: Number(body.installments_number),
    });

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al consultar cuotas.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
