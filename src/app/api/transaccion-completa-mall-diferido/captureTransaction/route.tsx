import { NextResponse } from "next/server";
import { captureTransaccionCompletaMallDeferido } from "@/app/lib/transaccion-completa-mall-diferido/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const token = formData.get("token") as string;
  const childCommerceCode = formData.get("commerceCode") as string;
  const authorizationCode = formData.get("authorizationCode") as string;
  const childBuyOrder = formData.get("buyOrder") as string;
  const amount = Number(formData.get("amount"));

  try {
    const trxStatus = await captureTransaccionCompletaMallDeferido({
      token,
      childCommerceCode,
      childBuyOrder,
      authorizationCode,
      amount,
    });

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
