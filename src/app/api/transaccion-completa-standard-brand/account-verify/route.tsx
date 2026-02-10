import { NextResponse } from "next/server";
import { accountVerifyStandardBrand } from "@/app/lib/transaccion-completa-standard-brand/data";

export async function POST(request: Request) {
  try {
    const normalizeEmptyToNull = <T,>(value: T) => {
      if (typeof value === "string" && value.trim() === "") {
        return null as T | null;
      }
      return value as T | null;
    };

    const body = (await request.json()) as {
      card_number: string;
      card_expiration_date: string;
      cvv: string;
      eci: string | null;
      authentication_value: string | null;
      trans_status: string | null;
      message_version: string | null;
      ds_trans_id: string | null;
      commerce_code: string;
    };

    const response = await accountVerifyStandardBrand({
      card_detail: {
        card_number: body.card_number,
        card_expiration_date: body.card_expiration_date,
        cvv: body.cvv,
      },
      eci: normalizeEmptyToNull(body.eci),
      authentication_value: normalizeEmptyToNull(body.authentication_value),
      trans_status: normalizeEmptyToNull(body.trans_status),
      message_version: normalizeEmptyToNull(body.message_version),
      ds_trans_id: normalizeEmptyToNull(body.ds_trans_id),
      commerce_code: body.commerce_code,
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error
        ? error.message
        : "Ocurrió un error al verificar la cuenta.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
