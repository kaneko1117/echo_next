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
  const domain = process.env.HOST_DOMAIN;
  console.log(csrftoken);
  const res = await fetch(`${domain}/${path}`, {
    method: method,
    headers: {
      "Content-Type": "application/json",
      "X-CSRF-TOKEN": csrftoken?.value ? csrftoken.value : "",
    },
    body: JSON.stringify(body),
    credentials: "same-origin",
  });
  if (!res.ok) {
    const error = await res.json();
    console.error(error);
    throw new Error("Network response was not ok");
  }

  return res;
};

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

  try {
    const res = await fetcher(
      "login",
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
