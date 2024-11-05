"use server";

import { schema } from "@/validation";
import { cookies } from "next/headers";

const fetcher = async (
  path: string,
  body: Record<string, string> | null,
  method: "POST" | "GET"
) => {
  const cookieStore = await cookies();
  const csrftoken = cookieStore.get("_csrf");
  console.log(csrftoken?.value);
  const domain = process.env.HOST_DOMAIN;
  const res = await fetch(`${domain}/${path}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrftoken ? csrftoken.value : "",
    },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const response = await res.json();
    console.log(response);
    throw new Error("Failed to fetch");
  }

  return res;
};

export const logIn = async (prevState: unknown, formData: FormData) => {
  console.log(formData);
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }
};

export const signUp = async (prevState: unknown, formData: FormData) => {
  const validatedFields = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const res = await fetcher(
      "signup",
      {
        email: `${formData.get("email")}`,
        password: `${formData.get("password")}`,
      },
      "POST"
    );
    return res.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};
