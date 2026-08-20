"use server";

import { revalidatePath } from "next/cache";

export async function revalidatePortfolio() {
  revalidatePath("/");
  revalidatePath("/admin");
}
