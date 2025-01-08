import { NextResponse } from "next/server";
import { redirect } from "next/navigation";

export async function POST(req: Request) {
  const contentType = req.headers.get("content-type");

  let body;
  if (contentType === "application/json") {
    body = await req.json();
  } else if (contentType === "text/plain") {
    body = await req.text();
  } else if (contentType === "application/x-www-form-urlencoded") {
    const textBody = await req.text();
    body = Object.fromEntries(new URLSearchParams(textBody));
  } else {
    console.error("Unknown content type:", contentType);
    return NextResponse.error();
  }

  return redirect(`/patpass-comercio/voucher`);
}
