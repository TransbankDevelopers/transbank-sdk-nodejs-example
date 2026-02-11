import { NextResponse } from "next/server";
import { accountVerifyStandardBrand } from "@/app/lib/transaccion-completa-standard-brand/data";
import { TransactionCompleteStandardBrandVerifyRequest } from "@/types/transactions";
import { normalizeEmptyStrings } from "@/helpers/transactions/transactionHelper";

export async function POST(request: Request) {
  try {
    const body =
      (await request.json()) as TransactionCompleteStandardBrandVerifyRequest;

    const response = await accountVerifyStandardBrand({
      card_detail: {
        card_number: body.card_number,
        card_expiration_date: body.card_expiration_date,
        cvv: body.cvv,
      },
      eci: normalizeEmptyStrings(body.eci),
      authentication_value: normalizeEmptyStrings(body.authentication_value),
      trans_status: normalizeEmptyStrings(body.trans_status),
      message_version: normalizeEmptyStrings(body.message_version),
      ds_trans_id: normalizeEmptyStrings(body.ds_trans_id),
      commerce_code: body.commerce_code,
    });

    return NextResponse.json(response);
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al verificar la cuenta.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
