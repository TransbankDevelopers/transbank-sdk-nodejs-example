import { NextResponse } from "next/server";
import { authorizeOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";
import { TransactionDetail } from "transbank-sdk";

export async function POST(request: Request) {
  const details: TransactionDetail[] = [];

  const formData = await request.formData();
  const buyOrder = formData.get("buyOrder") as string;
  const tbkUser = formData.get("tbkUser") as string;
  const userName = formData.get("userName") as string;

  for (let i = 0; i < 2; i++) {
    const commerceCode = formData.get(`details[${i}][commerce_code]`) as string;
    const detailBuyOrder = formData.get(`details[${i}][buy_order]`) as string;
    const amount = formData.get(`details[${i}][amount]`);
    const installmentsNumber = formData.get(
      `details[${i}][installments_number]`
    ) as string;

    if (commerceCode && detailBuyOrder && amount) {
      details.push(
        new TransactionDetail(
          Number(amount),
          commerceCode,
          detailBuyOrder,
          installmentsNumber ? Number(installmentsNumber) : undefined
        )
      );
    }
  }

  const options = { prmBuyOrder: buyOrder, prmDetails: details };

  try {
    const trxStatus = await authorizeOneClickMallTransaction(
      userName,
      tbkUser,
      false,
      options
    );
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
