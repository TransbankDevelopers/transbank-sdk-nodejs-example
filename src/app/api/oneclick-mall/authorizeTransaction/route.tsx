import { NextResponse } from "next/server";
import { authorizeOneClickMallTransaction } from "@/app/lib/oneclick-mall/data";
import { TransactionDetail } from "transbank-sdk";

export async function POST(request: Request) {
  const details: TransactionDetail[] = [];

  const formData = await request.formData();
  const token = formData.get("token") as string;
  const tbkUser = formData.get("tbkUser") as string;
  const deferredAmount = formData.get("amount");
  console.log(formData.entries());
  // Validar si `detail` es una cadena
  const detailEntry = formData.get("detail");
  let paramsDetail: string[] = [];

  if (typeof detailEntry === "string") {
    // Si es una cadena, convertirla en un array (suponiendo que está delimitada por comas o similar)
    paramsDetail = Array.from(detailEntry.split(",")); // Cambia la lógica si es necesario
  } else if (detailEntry instanceof File) {
    console.error("detail es un archivo, no una cadena.");
  }

  // for (const details of paramsDetail) {
  //   const childBuyOrder = "O-" + Math.floor(Math.random() * 10000) + 1;
  //   const amount = deferredAmount ?? Math.floor(Math.random() * 1000) + 1001;

  //   details.push(
  //     new TransactionDetail(
  //       amount,
  //       childCommerceCode,
  //       childBuyOrder,
  //       deferredInstallments ?? undefined
  //     )
  //   );
  // }

  try {
    // const trxStatus = await authorizeOneClickMallTransaction(token, tbkUser);
    // return NextResponse.json(trxStatus);
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
