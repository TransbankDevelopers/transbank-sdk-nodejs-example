import { NextResponse } from "next/server";
import { refundStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { TransactionCompleteStandardBrandRefundRequest } from "@/types/transactions";

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as TransactionCompleteStandardBrandRefundRequest;

    const response = await refundStandardBrandTransaction(body.token, {
      commerce_code: body.commerce_code,
      buy_order: body.buy_order,
      amount: Number(body.amount),
    });

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al reembolsar la transacción.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
