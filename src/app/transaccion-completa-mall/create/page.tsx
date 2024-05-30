"use server";
import { CreateFullTransactionMallContent } from "./content";
import { NextPageProps } from "@/types/general";

export default async function CreateTransactionPage({
  searchParams,
}: NextPageProps) {
  const { token_ws, error_message } = searchParams;

  return (
    <CreateFullTransactionMallContent
      token={token_ws}
      errorMessage={error_message}
    />
  );
}
