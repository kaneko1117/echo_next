"use server";

import { schema } from "@/validation";
import { cookies } from "next/headers";

export const logIn = async (prevState: unknown, formData: FormData) => {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
  // cookieに保存されたcsrftokenを取得
  const cookieStore = await cookies();
  const csrftoken = cookieStore.get("csrftoken");
  console.log(csrftoken?.value);
};
