import { redirect } from "next/navigation";

export async function POST(req: Request) {
  return redirect(`/patpass-comercio/voucher`);
}
