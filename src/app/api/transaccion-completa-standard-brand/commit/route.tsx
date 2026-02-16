import { NextResponse } from "next/server";
import { commitStandardBrandTransaction } from "@/app/lib/transaccion-completa-standard-brand/data";
import { TransactionCompleteStandardBrandCommitRequest } from "@/types/transactions";

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as TransactionCompleteStandardBrandCommitRequest;

    const response = await commitStandardBrandTransaction(body.token, {
      details: [
        {
          commerce_code: body.commerce_code,
          buy_order: body.buy_order,
          id_query_installments:
            body.id_query_installments === undefined
              ? undefined
              : Number(body.id_query_installments),
        },
      ],
    });

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al confirmar la transacción.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
