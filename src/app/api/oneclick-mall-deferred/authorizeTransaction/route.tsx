import { NextResponse } from "next/server";
import { authorizeOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("token") as string;
  const detail = formData.get("detail") as string;
  const tbkUser = formData.get("tbkUser") as string;
  const deferredAmount = formData.get("amount");

  try {
    const trxStatus = await authorizeOneClickMallTransaction(token, tbkUser);

    return NextResponse.json(trxStatus);
  } catch (error) {
    console.error(error);
    let errorMessage = "Ocurrió un error al hacer refund de la transacción.";
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === "string") {
      errorMessage = error;
    }

    return NextResponse.json({ error: errorMessage });
  }
}
