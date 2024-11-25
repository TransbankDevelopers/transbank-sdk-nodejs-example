import { NextResponse } from "next/server";
import { captureOneclickMallDeferredTransaction } from "@/app/lib/oneclick-mall-deferred/data";

export async function POST(request: Request) {
  const formData = await request.formData();
  const childBuyOrder = formData.get("childBuyOrder") as string;
  const commerceCode = formData.get("commerceCode") as string;
  const authorizationCode = formData.get("authorizationCode") as string;
  const captureAmount = Number(formData.get("amount"));

  try {
    const trxStatus = await captureOneclickMallDeferredTransaction({
      commerceCode,
      childBuyOrder,
      authorizationCode,
      captureAmount,
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
